import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DatePicker } from 'antd';
import TodoApi from 'apis/todo';
import { TYPE_NOTIFY } from 'constants';
import { OpenNotificatoin } from 'components/common/notifications';

const CreateTodo = () => {
  const schema = yup.object({
    name: yup.string().required().min(3).max(100),
    date: yup.date()
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const handleCreateTodo = async (data) => {
    try {
      const res = await TodoApi.createTodo({
        name: data.name,
        date: new Date(data.date).toISOString(),
        status: data.status
      });
      if (res.data.data.message) {
        window.location.reload();
      }
      OpenNotificatoin('Create Todo', res.data.data.message, TYPE_NOTIFY.SUCCESS);
    } catch (err) {
      OpenNotificatoin('Create Todo', err.message, TYPE_NOTIFY.ERROR);
    }
  };

  return (
    <div className="CreateTodo">
      <form>
        <input type="text" placeholder="name todo" {...register('name')} />
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <DatePicker name="date" onChange={(date) => field.onChange(date)} />
          )}
        />
        <select {...register('status')}>
          <option value="0">Done</option>
          <option value="1">To Do</option>
          <option value="2">In Progess</option>
        </select>
        {errors && (errors.name || errors.date || errors.status) && (
          <p style={{ color: '#f00' }}>{errors.name || errors.date || errors.status}</p>
        )}
        <button onClick={handleSubmit(handleCreateTodo)}>Create</button>
      </form>
    </div>
  );
};

export default CreateTodo;
