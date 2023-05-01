/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-param-reassign */
/* eslint-disable symbol-description */
import axios from 'axios';
import JSONBig from 'json-bigint';

import { isEmpty, assign } from 'lodash';
import CookieHandler from 'utils/cookies';
import { COOKIE_KEY } from 'constants';

const singletonEnforcer = Symbol();
//const BASE_URL = `${BASE_API_URL}/api/v1`
class AxiosClient {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot initialize Axios client single instance');
    }
    this.axiosClient = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    this.getExistTokenOnCookieStorage();

    this.axiosClient.defaults.transformResponse = (data) => JSONBig.parse(data);

    this.axiosClient.interceptors.request.use(
      (configure) => {
        const token = CookieHandler.getCookie(COOKIE_KEY.ACCESS_TOKEN);
        if (token) {
          configure.headers.Authorization = `Bearer ${token}`;
        }
        return configure;
      },
      (error) => Promise.reject(error)
    );

    this.axiosClient.interceptors.response.use(
      (response) => {
        const { status, data } = response;
        return {
          status,
          data
        };
      },
      (error) => {
        if (error.response) {
          const { data, status } = error.response;
          switch (status) {
            case 400:
              break;
            case 500:
              break;
            case 401:
              CookieHandler.removeAllCookie();
              window.location.reload();
              break;
            case 404:
              break;
            case 403:
              break;
            default:
              break;
          }
          throw data;
        } else {
          throw error;
        }
      }
    );
  }

  static get instance() {
    if (!this.axiosClientInstance) {
      this.axiosClientInstance = new AxiosClient(singletonEnforcer);
    }

    return this.axiosClientInstance;
  }

  async getExistTokenOnCookieStorage() {
    const userToken = CookieHandler.getCookie(COOKIE_KEY.ACCESS_TOKEN);
    if (userToken) {
      this.setHeader(userToken);
    }
  }

  setHeader = async (userToken = null) => {
    this.axiosClient.defaults.headers.common.Authorization = `Bearer ${userToken}`;
  };

  get = async (resource, slug = '', config = {}) => {
    let { headers } = config;
    if (!headers) {
      headers = this.axiosClient.defaults.headers;
    }
    slug += '';
    const requestURL = isEmpty(slug) ? `${resource}` : `${resource}/${slug}`;
    return this.axiosClient.get(requestURL, {
      data: null,
      ...assign(config, { headers })
    });
  };

  post = async (resource, data, config = {}) => {
    return this.axiosClient.post(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers)
    );
  };

  update = async (resource, data, config = {}) =>
    this.axiosClient.put(`${resource}`, data, assign(config, this.axiosClient.defaults.headers));

  put = async (resource, data, config = {}) =>
    this.axiosClient.put(`${resource}`, data, assign(config, this.axiosClient.defaults.headers));

  patch = async (resource, data, config = {}) =>
    this.axiosClient.patch(`${resource}`, data, assign(config, this.axiosClient.defaults.headers));

  delete = async (resource, data, config = {}) =>
    this.axiosClient.delete(`${resource}`, {
      data,
      ...assign(config, { headers: this.axiosClient.defaults.headers })
    });
}

export default AxiosClient.instance;
