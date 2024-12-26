"use client";
import dynamic from 'next/dynamic';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { TaskState } from "@prisma/client";

interface Task {
  id: string;
  text: string;
  state: TaskState;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

// Create a client-side only component
const KanbanBoardContent = ({ initialTasks }: { initialTasks: Task[] }) => {
  console.log('KanbanBoard received tasks:', initialTasks);
  console.log('Task states:', initialTasks?.map(t => t.state));
  console.log('Filtered ToDo tasks:', initialTasks?.filter(task => task.state === "ToDo"));
  
  if (!initialTasks?.length) {
    return <div>Loading tasks...</div>;
  }

  const [columns, setColumns] = useState<Column[]>(() => ([
    {
      id: "TODO",
      title: "To Do",
      tasks: initialTasks.filter(task => task.state === "ToDo") || [],
    },
    {
      id: "IN_PROGRESS",
      title: "In Progress",
      tasks: initialTasks.filter(task => task.state === "InProgress") || [],
    },
    {
      id: "COMPLETED",
      title: "Completed",
      tasks: initialTasks.filter(task => task.state === "Completed") || [],
    },
  ]));

  // Add useEffect to update columns when initialTasks changes
  useEffect(() => {
    setColumns([
      {
        id: "TODO",
        title: "To Do",
        tasks: initialTasks?.filter(task => task.state === "ToDo") || [],
      },
      {
        id: "IN_PROGRESS",
        title: "In Progress",
        tasks: initialTasks?.filter(task => task.state === "InProgress") || [],
      },
      {
        id: "COMPLETED",
        title: "Completed",
        tasks: initialTasks?.filter(task => task.state === "Completed") || [],
      },
    ]);
  }, [initialTasks]);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // If dropped outside a droppable area
    if (!destination) return;

    // If dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Find source and destination columns
    const sourceColumn = columns.find(col => col.id === source.droppableId);
    const destColumn = columns.find(col => col.id === destination.droppableId);

    if (!sourceColumn || !destColumn) return;

    // Create new arrays
    const newSourceTasks = Array.from(sourceColumn.tasks);
    const newDestTasks = source.droppableId === destination.droppableId
      ? newSourceTasks
      : Array.from(destColumn.tasks);

    // Remove task from source
    const [movedTask] = newSourceTasks.splice(source.index, 1);

    // Add task to destination
    if (source.droppableId === destination.droppableId) {
      newSourceTasks.splice(destination.index, 0, movedTask);
    } else {
      newDestTasks.splice(destination.index, 0, movedTask);
    }

    // Update columns state
    setColumns(prevColumns => 
      prevColumns.map(col => {
        if (col.id === source.droppableId) {
          return { ...col, tasks: newSourceTasks };
        }
        if (col.id === destination.droppableId) {
          return { ...col, tasks: newDestTasks };
        }
        return col;
      })
    );
  };

  return (
    <div className="flex gap-4 p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map(column => (
          <div key={column.id} className="bg-gray-100 p-4 rounded-lg w-80">
            <h2 className="font-bold mb-4">{column.title}</h2>
            <Droppable 
              droppableId={column.id} 
              isDropDisabled={false}
              isCombineEnabled={false}
            >
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="min-h-[500px]"
                >
                  {column.tasks.map((task, index) => (
                    <Draggable
                      key={String(task.id)}
                      draggableId={String(task.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-4 mb-2 rounded shadow"
                        >
                          {task.text}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

// Wrap with dynamic import
const KanbanBoard = dynamic(() => Promise.resolve(KanbanBoardContent), { 
  ssr: false 
});

export default KanbanBoard; 