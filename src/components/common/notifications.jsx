import { TYPE_NOTIFY } from 'constants';
import { notification } from 'antd';

export const OpenNotificatoin = (title, message, type) => {
  if (type === TYPE_NOTIFY.ERROR) {
    notification.error({
      message: title,
      description: message
    });
  } else if (type === TYPE_NOTIFY.SUCCESS) {
    notification.success({
      message: title,
      description: message
    });
  } else {
    notification.info({
      message: title,
      description: message
    });
  }
};
