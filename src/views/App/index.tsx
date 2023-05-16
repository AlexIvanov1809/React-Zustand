import React from 'react';
import styles from './index.module.scss';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import useToDoStore from '../../data/store/useToDoStore';

const App: React.FC = () => {
  const [tasks, createTask, updateTask, removeTask, fetchTasks] = useToDoStore(
    (state) => [
      state.tasks,
      state.createTask,
      state.updateTask,
      state.removeTask,
      state.fetchTasks,
    ],
  );

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>To Do App</h1>
      <section className={styles.articleSection}>
        <TaskInput onAdd={createTask} />
        <button
          type="button"
          className={styles.articleBtn}
          onClick={fetchTasks}
        >
          Get ToDos from DB
        </button>
      </section>
      <hr />
      <section className={styles.articleSection}>
        {!tasks.length && (
          <p className={styles.articleText}>There is no one task.</p>
        )}
        {tasks.map((task) => (
          <TaskList
            key={task.id}
            task={task}
            onDone={removeTask}
            onEdited={updateTask}
            onRemoved={removeTask}
          />
        ))}
      </section>
    </article>
  );
};

export default App;
