export enum UserType {
  TEAM_MEMBER = 'TEAM_MEMBER',
  TEAM_MANAGER = 'TEAM_MANAGER',
  ADMIN = 'ADMIN'
}

export enum TaskState {
  ToDo = 'ToDo',
  InProgress = 'InProgress',
  Completed = 'Completed',
  Approved = 'Approved'
}

export enum TaskPriority {
  high = 'high',
  medium = 'medium',
  low = 'low'
}

export interface Task {
  id: string;
  text: string;
  createdAt: Date;
  createdById: string;
  assignedToId?: string | null;  // Optional field
  deadline: Date;
  state: TaskState;
  position: number;
  priority: TaskPriority; 
  
  // Relations (optional - include if you need them in the UI)
  createdBy?: User;
  assignedTo?: User | null;
}

export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  userType: UserType;
  managerId?: string | null;
  rewardPoints: number;
  
  // Relations (optional - include if you need them in the UI)
  manager?: User | null;
  team?: User[];
  tasksCreated?: Task[];
  tasksAssigned?: Task[];
} 