import Board from 'components/home/Board';
import CreateTodo from 'components/home/CreateTodo';
import React, { useState } from 'react';

const HomeView = () => {
  const [openCreateTodo, setOpenCreateTodo] = useState(false);
  return (
    <div className="HomeView">
      <div className="handler-todo">
        <button onClick={() => setOpenCreateTodo(true)}>Create Todo</button>
        {openCreateTodo && <CreateTodo />}
      </div>
      <Board />
    </div>
  );
};

export default HomeView;
