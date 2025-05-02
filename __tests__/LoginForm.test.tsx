// __tests__/LoginForm.test.tsx
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../app/components/LoginForm';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

jest.mock('next-auth/react');
jest.mock('next/navigation', () => ({ useRouter: jest.fn() }));

describe('LoginForm', () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
    (signIn as jest.Mock).mockResolvedValue({ ok: true, error: null });
    (getSession as jest.Mock).mockResolvedValue({ user: { userType: 'TEAM_MEMBER', id: 'user1' } });
  });

  afterEach(() => jest.resetAllMocks());

  it('renders username and password fields and login button', () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText(/Enter your username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('calls signIn and redirects on successful login for TEAM_MEMBER', async () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText(/Enter your username/i), { target: { value: 'user1' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), { target: { value: 'pass' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => expect(signIn).toHaveBeenCalledWith('credentials', { username: 'user1', password: 'pass', redirect: false }));
    await waitFor(() => expect(push).toHaveBeenCalledWith('/Dashboard'));
  });

  it('displays an error when authentication fails', async () => {
    (signIn as jest.Mock).mockResolvedValue({ ok: false, error: 'Invalid credentials' });
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText(/Enter your username/i), { target: { value: 'user1' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    await waitFor(() => expect(screen.getByText(/Authentication error: Invalid credentials/i)).toBeInTheDocument());
  });
});
