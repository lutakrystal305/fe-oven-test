/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import TodoApi from 'apis/todo';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { SCREEN_PATH } from 'constants';
import { DatePicker, Table } from 'antd';
import { Pagination } from 'antd';
import cookies from 'utils/cookies';
import { COOKIE_KEY } from 'constants';
import moment from 'moment/moment';

const Board = () => {
  const [searchParms, _] = useSearchParams();
  const [todos, setTodos] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);
  const [searchName, setSearchName] = useState('');
  const [startDateSearch, setStartDateSearch] = useState(null);
  const [endDateSearch, setEndDateSearch] = useState(null);

  const handleSearchByDate = async () => {
    const res = await TodoApi.searchTodosByDate({
      start_date: new Date(startDateSearch).toISOString(),
      end_date: new Date(endDateSearch).toISOString()
    });
    setTodos(res.data.data);
    setPage(0);
    setTotalPage(1);
  };

  const handleSearchByName = async (key) => {
    const res = await TodoApi.searchTodosByName({ key });
    setTodos(res.data.data);
    setPage(0);
    setTotalPage(1);
  };

  const handleChangeSearchName = (e) => {
    setSearchName(e.target.value);
    if (!e.target.value || !e.target.value.length) {
      handleGetTodos({ page: 0, limit: 10 });
    } else {
      handleSearchByName(e.target.value);
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

  const handleGetTodos = async (payload) => {
    try {
      const res = await TodoApi.getTodos(payload);
      setTodos(res.data.data.todos);
      setTotalPage(res.data.data.total_page);
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      title: 'NO.',
      dataIndex: 'index'
    },
    { title: 'Name', dataIndex: 'name' },
    {
      title: 'Date',
      dataIndex: 'date',
      render: (item, record) => (
        <p style={{ fontStyle: 'italic' }}>{moment(record.date).format('DD/MM/YYYY')}</p>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (item, record) => (
        <div className="d-flex">
          <p
            style={{
              color: record.status === 0 ? '#0f0' : record.status === 1 ? 'yellow' : 'blue',
              fontWeight: 'bold',
              fontSize: 20
            }}>
            {record.status === 0 ? 'DONE' : record.status === 1 ? 'To Do' : 'In Progess'}
          </p>
        </div>
      )
    }
  ];

  useEffect(() => {
    const page = searchParms.get('page');
    handleGetTodos({ page: page || 0, limit: 10 });
  }, [page]);

  useEffect(() => {
    setPage(searchParms.get('page'));
  }, [searchParms.get('page')]);

  return (
    <div className="Board">
      <p>List Todos</p>
      <div className="search-todos d-flex align-items-center justify-content-around px-5">
        <div className="search-by-name">
          <input
            type="text"
            placeholder="name todo"
            value={searchName}
            onChange={handleChangeSearchName}
          />
        </div>
        <div className="search-by-date mr-5">
          <DatePicker
            className="mr-3"
            onChange={(value) => setStartDateSearch(value)}
            placeholder="Start Date Search"
          />
          <DatePicker onChange={(value) => setEndDateSearch(value)} placeholder="End Date Search" />
          {startDateSearch && endDateSearch && startDateSearch >= endDateSearch ? (
            <p style={{ color: '#f00' }}>End Date Search must be greater than Start Date Search</p>
          ) : (
            <button onClick={handleSearchByDate}>Search</button>
          )}
        </div>
      </div>
      <div className="Board-Content">
        <Table
          columns={columns}
          dataSource={todos.map((item, i) => ({ ...item, index: i + 1 }))}
          pagination={false}
          onRow={(record) => ({
            onClick: () => navigate(SCREEN_PATH.DETAIL + `/${record.id}`)
          })}
          rowKey="id"
        />
      </div>
      <Pagination
        showQuickJumper
        defaultCurrent={page}
        total={totalPage}
        onChange={(page) => navigate(location + `?page=${page}`)}
      />
    </div>
  );
};

export default Board;
