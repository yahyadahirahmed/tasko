// __tests__/AddTaskButton.test.tsx
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import AddTaskButton from '../app/components/AddTaskButton';

// Polyfill dialog methods in JSDOM
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function() {
    this.setAttribute('open', '');
  };
  HTMLDialogElement.prototype.close = function() {
    this.removeAttribute('open');
  };
});

describe('AddTaskButton and AddTaskForm integration', () => {
  const teamId = 'team1';
  const members = [
    { id: 'm1', username: 'Alice' },
    { id: 'm2', username: 'Bob' },
  ];
  const originalLocation = window.location;

  beforeEach(() => {
    // Stub fetch for team members and task POST
    (global as any).fetch = jest.fn((input: string | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.toString();
      if (url.endsWith(`/api/teams/${teamId}/members`)) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve(members) } as any);
      }
      if (url.endsWith('/api/tasks') && init?.method === 'POST') {
        return Promise.resolve({ ok: true } as any);
      }
      return Promise.resolve({ ok: false } as any);
    });
    // Stub location.reload
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { ...originalLocation, reload: jest.fn() },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    delete (global as any).fetch;
    Object.defineProperty(window, 'location', { writable: true, value: originalLocation });
  });

  it('renders Add Task button and opens modal without state warnings', async () => {
    // Render and wait for members fetch effect
    render(<AddTaskButton teamId={teamId} />);
    await waitFor(() => expect((global as any).fetch).toHaveBeenCalledWith(
      `/api/teams/${teamId}/members`
    ));

    const button = screen.getByRole('button', { name: /Add Task/i });
    expect(button).toBeInTheDocument();

    const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
    expect(modal.hasAttribute('open')).toBe(false);

    fireEvent.click(button);
    expect(modal.hasAttribute('open')).toBe(true);
  });

  it('fills and submits the add task form modal, then posts and reloads', async () => {
    // Render component
    const { container } = render(<AddTaskButton teamId={teamId} />);
    // Wait for team members fetch
    await waitFor(() => {
      expect((global as any).fetch).toHaveBeenCalledWith(
        `/api/teams/${teamId}/members`
      );
    });

    // Open modal via first Add Task button
    const [openButton] = screen.getAllByRole('button', { name: /Add Task/i });
    fireEvent.click(openButton);

    const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
    // Wait for form to appear
    await waitFor(() => {
      expect(within(modal).getByPlaceholderText(/Task description here/i)).toBeInTheDocument();
    });

    // Fill form fields
    fireEvent.change(
      within(modal).getByPlaceholderText(/Task description here/i),
      { target: { value: 'Integration Task' } }
    );
    const selects = within(modal).getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: 'm2' } });
    fireEvent.change(selects[1], { target: { value: 'high' } });

    const datetime = '2025-07-20T12:00';
    const deadlineInput = container.querySelector('input[type="datetime-local"]') as HTMLInputElement;
    fireEvent.change(deadlineInput, { target: { value: datetime } });

    // Submit form inside modal
    const submitButton = within(modal).getByRole('button', { name: /Add Task/i });
    fireEvent.click(submitButton);

    // Verify POST call and reload
    await waitFor(() => {
      // Get the second call which should be the POST to /api/tasks
      const calls = (global as any).fetch.mock.calls;
      const postCall = calls.find((call: any[]) => call[0] === '/api/tasks');
      expect(postCall).toBeTruthy();
      
      const [url, options] = postCall;
      expect(url).toBe('/api/tasks');
      expect(options.method).toBe('POST');
      expect(options.headers['Content-Type']).toBe('application/json');
      
      // Parse the body to verify content
      const body = JSON.parse(options.body);
      expect(body).toEqual(expect.objectContaining({
        text: 'Integration Task',
        assignedToId: 'm2',
        state: 'ToDo',
        priority: 'high',
        teamId,
        deadline: expect.any(String)
      }));
      
      // Verify the date format is correct
      const dateObj = new Date(body.deadline);
      expect(dateObj).toBeInstanceOf(Date);
      expect(isNaN(dateObj.getTime())).toBe(false);
      
      expect(window.location.reload).toHaveBeenCalled();
    });
  });
});
