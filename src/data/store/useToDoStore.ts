import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { generateId, getCurrentState, localStorageData } from '../helpers';

export interface Task {
  id: string;
  title: string;
  createdAt: number;
}

export interface ToDoStore {
  tasks: Task[];
  createTask: (title: string) => void;
  updateTask: (id: string, title: string) => void;
  removeTask: (id: string) => void;
}

const middleware = (store: StateCreator<ToDoStore>) =>
  devtools(localStorageData(store));

const useToDoStore = create<ToDoStore, [['zustand/devtools', never]]>(
  middleware((set, get) => ({
    tasks: getCurrentState(),
    createTask: (title) => {
      const { tasks } = get();
      const newTask: Task = {
        id: generateId(),
        title,
        createdAt: Date.now(),
      };

      set({
        tasks: [newTask].concat(tasks),
      });
    },
    updateTask: (id, title) => {
      const { tasks } = get();
      set({
        tasks: tasks.map((task) => ({
          ...task,
          title: task.id === id ? title : task.title,
        })),
      });
    },
    removeTask: (id) => {
      const { tasks } = get();
      set({
        tasks: tasks.filter((task) => task.id !== id),
      });
    },
  })),
);

export default useToDoStore;
