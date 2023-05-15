import { StateCreator } from 'zustand';
import { Task, ToDoStore } from './store/useToDoStore';

type GenerateId = () => string;

const TASK_STORAGE_NAME = 'tasks';

const generateId: GenerateId = () =>
  Math.random().toString(16).slice(2) + new Date().getTime().toString(36);

const isToDoStore = (object: any): object is ToDoStore => {
  return TASK_STORAGE_NAME in object;
};

const localStorageData =
  <T>(config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) =>
    config(
      (nextState, ...args) => {
        if (isToDoStore(nextState)) {
          window.localStorage.setItem(
            TASK_STORAGE_NAME,
            JSON.stringify(nextState.tasks),
          );
        }
        set(nextState, ...args);
      },
      get,
      api,
    );

const getCurrentState = (): Task[] => {
  try {
    return JSON.parse(
      window.localStorage.getItem(TASK_STORAGE_NAME) || '[]',
    ) as Task[];
  } catch (error) {
    window.localStorage.setItem(TASK_STORAGE_NAME, '[]');
  }
  return [];
};

export { generateId, localStorageData, getCurrentState };
