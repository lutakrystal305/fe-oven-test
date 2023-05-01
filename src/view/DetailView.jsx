import BoardDetail from 'components/detail/BoardDetail';
import React, { useEffect, useState } from 'react';
import TodoApi from 'apis/todo';
import { useParams } from 'react-router-dom';

const DetailView = () => {
  const [todo, setTodo] = useState(null);
  const { id } = useParams();

  const getTodo = async (id) => {
    const res = await TodoApi.getTodoById(id);
    setTodo(res.data.data);
  };

  useEffect(() => {
    if (id) {
      getTodo(id);
    }
  }, [id]);

  return (
    <div
      className="DetailView h-100 d-flex flex-column justify-content-center align-items-center"
      style={{ marginBottom: '200px' }}>
      {todo && todo.id && <h4>To do Detail: {`${todo.id.slice(0, 6)}...`}</h4>}
      {todo && <BoardDetail todo={todo} />}
    </div>
  );
};

export default DetailView;
