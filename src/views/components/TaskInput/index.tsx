import React, { useState } from 'react';
import styles from './index.module.scss';

interface TaskInputProps {
  onAdd: (title: string) => void;
}
const TaskInput: React.FC<TaskInputProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    onAdd(inputValue);
    setInputValue('');
  };

  const keyEventHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className={styles.taskInput}>
      <input
        type="text"
        className={styles.taskInputTitle}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={keyEventHandler}
        placeholder="Type here..."
      />
      <button
        type="button"
        onClick={addTask}
        aria-label="Add"
        className={styles.taskInputBtn}
      />
    </div>
  );
};

export default TaskInput;
