import React from 'react';
import styles from './index.module.scss';
import useToDoStore from '../../data/store/useToDoStore';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';

interface Props {}
const App: React.FC<Props> = () => {
  const [tasks, createTask, updateTask, removeTask] = useToDoStore((state) => [
    state.tasks,
    state.createTask,
    state.updateTask,
    state.removeTask,
  ]);

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>To Do App</h1>
      <section className={styles.articleSection}>
        <TaskInput onAdd={createTask} />
      </section>
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
