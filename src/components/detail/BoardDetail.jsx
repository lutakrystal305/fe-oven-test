import { DatePicker } from 'antd';
import React, { useState } from 'react';
import TodoApi from 'apis/todo';
import moment from 'moment';
import { TYPE_NOTIFY } from 'constants';
import { OpenNotificatoin } from 'components/common/notifications';

const BoardDetail = ({ todo }) => {
  const [updateNameDetail, setUpdateNameDetail] = useState(false);
  const [updateDateDetail, setUpdateDateDetail] = useState(false);
  const [updateStatusDetail, setUpdateStatusDetail] = useState(false);
  const [valueName, setValueName] = useState(todo.name || '');
  const [valueDate, setValueDate] = useState(todo.date || '');
  const [valueStatus, setValueStatus] = useState(todo.status || '');

  const openUpdateNameDetail = () => {
    setUpdateNameDetail(true);
    setUpdateDateDetail(false);
    setUpdateStatusDetail(false);
  };

  const openUpdateDateDetail = () => {
    setUpdateNameDetail(false);
    setUpdateDateDetail(true);
    setUpdateStatusDetail(false);
  };

  const openUpdateStatusDetail = () => {
    setUpdateNameDetail(false);
    setUpdateDateDetail(false);
    setUpdateStatusDetail(true);
  };

  const handleSaveUpdateName = async () => {
    try {
      const res = await TodoApi.updateNameTodo({ new_name: valueName }, todo.id);
      if (res.data.message) {
        console.log(res.data.message);
      }
      OpenNotificatoin('Update Name Todo', res.data.data.message, TYPE_NOTIFY.SUCCESS);
    } catch (err) {
      OpenNotificatoin('Update Name Todo', err.message, TYPE_NOTIFY.ERROR);
    }
  };

  const handleSaveUpdateDate = async () => {
    try {
      const res = await TodoApi.updateDateTodo(
        { new_date: new Date(valueDate).toISOString() },
        todo.id
      );
      if (res.data.message) {
        console.log(res.data.message);
      }
      OpenNotificatoin('Update Date Todo', res.data.data.message, TYPE_NOTIFY.SUCCESS);
    } catch (err) {
      OpenNotificatoin('Update Date Todo', err.message, TYPE_NOTIFY.ERROR);
    }
  };

  const handleSaveUpdateStatus = async () => {
    try {
      const res = await TodoApi.updateStatusTodo({ new_status: valueStatus }, todo.id);
      if (res.data.message) {
        console.log(res.data.message);
      }
      OpenNotificatoin('Update Status Todo', res.data.data.message, TYPE_NOTIFY.SUCCESS);
    } catch (err) {
      OpenNotificatoin('Update Stâtus Todo', err.message, TYPE_NOTIFY.ERROR);
    }
  };

  return (
    <div
      className="BoardDetail px-3 my-4 py-3"
      style={{ width: 600, border: '1px solid #aaa', borderRadius: '8px' }}>
      <div className="header-item d-flex" style={{ borderBottom: '1px solid #aaa' }}>
        <div className="todo-item-child-sm" style={{ width: '30%' }}>
          Name
        </div>
        <div className="todo-item-child-lg" style={{ width: '30%' }}>
          Date
        </div>
        <div className="todo-item-child-md" style={{ width: '30%' }}>
          Status
        </div>
        <div className="todo-item-child-lg"></div>
      </div>
      <div className="body-item d-flex">
        {!updateNameDetail ? (
          <div className="todo-item-child-sm" style={{ width: '30%' }}>
            {todo.name}
            <span
              className="mx-2"
              style={{ cursor: 'pointer', color: 'blue' }}
              onClick={openUpdateNameDetail}>
              Edit
            </span>
          </div>
        ) : (
          <div className="todo-item-child-sm" style={{ width: '30%' }}>
            <input type="text" value={valueName} onChange={(e) => setValueName(e.target.value)} />
            <p
              className="mx-2"
              style={{ cursor: 'pointer', color: 'green' }}
              onClick={handleSaveUpdateName}>
              save
            </p>
            <p onClick={() => setUpdateNameDetail(false)}>Cancel</p>
          </div>
        )}
        {!updateDateDetail ? (
          <div className="todo-item-child-lg" style={{ width: '30%' }}>
            {moment(todo.date).format('DD/MM/YYYY')}
            <span
              className="mx-2"
              style={{ cursor: 'pointer', color: 'blue' }}
              onClick={openUpdateDateDetail}>
              Edit
            </span>
          </div>
        ) : (
          <div className="todo-item-child-sm" style={{ width: '30%' }}>
            <DatePicker
              onChange={(value) => setValueDate(value)}
              value={moment(valueDate).format('DD/MM/YYYY')}
            />
            <p
              className="mx-2"
              style={{ cursor: 'pointer', color: 'green' }}
              onClick={handleSaveUpdateDate}>
              save
            </p>
            <p onClick={() => setUpdateDateDetail(false)}>Cancel</p>
          </div>
        )}
        {!updateStatusDetail ? (
          <div className="todo-item-child-md" style={{ width: '30%' }}>
            {todo.status === 0 ? 'DONE' : todo.status === 1 ? 'To Do' : 'In Progess'}
            <span
              className="mx-2"
              style={{ cursor: 'pointer', color: 'blue' }}
              onClick={openUpdateStatusDetail}>
              Edit
            </span>
          </div>
        ) : (
          <div className="todo-item-child-sm" style={{ width: '30%' }}>
            <select
              name="status"
              value={valueStatus}
              onChange={(e) => setValueStatus(e.target.value)}>
              <option value="0">Done</option>
              <option value="1">To Do</option>
              <option value="2">In Progess</option>
            </select>
            <p
              className="mx-2"
              style={{ cursor: 'pointer', color: 'green' }}
              onClick={handleSaveUpdateStatus}>
              save
            </p>
            <p onClick={() => setUpdateStatusDetail(false)}>Cancel</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardDetail;
