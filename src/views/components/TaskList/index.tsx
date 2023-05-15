import React, { useState, useRef, useEffect } from 'react';
import { Task } from '../../../data/store/useToDoStore';
import styles from './index.module.scss';

interface TaskListProps {
  task: Task;
  onDone: (id: string) => void;
  onEdited: (id: string, value: string) => void;
  onRemoved: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  task,
  onDone,
  onEdited,
  onRemoved,
}) => {
  const [checked, setChecked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState(task.title);
  const editTitleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditMode) {
      editTitleInputRef?.current?.focus();
    }
  }, [isEditMode]);

  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      onDone(task.id);
    }
  };

  const editHandler = () => {
    onEdited(task.id, value);
    setIsEditMode(false);
  };
  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEdited(task.id, value);
      setIsEditMode(false);
    }
  };

  const removeHandler = () => {
    if (confirm('Are you sure?')) {
      onRemoved(task.id);
    }
  };
  return (
    <div className={styles.taskList}>
      <label className={styles.taskListLabel} htmlFor={task.id}>
        <input
          type="checkbox"
          disabled={isEditMode}
          className={styles.taskListCheckbox}
          id={task.id}
          checked={checked}
          onChange={checkHandler}
        />
        {isEditMode ? (
          <input
            ref={editTitleInputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={styles.taskListInput}
            onKeyDown={keyDownHandler}
          />
        ) : (
          <h3 className={styles.taskListTitle}>{task.title}</h3>
        )}
      </label>
      {isEditMode ? (
        <button
          aria-label="Save"
          className={styles.taskListSave}
          onClick={editHandler}
        />
      ) : (
        <button
          aria-label="Edit"
          className={styles.taskListEdit}
          onClick={() => setIsEditMode(true)}
        />
      )}
      <button
        aria-label="Remove"
        className={styles.taskListRemove}
        onClick={removeHandler}
      />
    </div>
  );
};

export default TaskList;
