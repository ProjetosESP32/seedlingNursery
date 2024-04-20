import { API_URL } from '../env';

export const login = async (cred) => {
  const response = await fetch(API_URL + '/authenticate', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(cred)
  });

  const respObj = await response.json();

  if (response.ok) {
    const token = response.headers.get('Authorization').replace('Bearer ', '');
    localStorage.setItem('Authorization', token);
    localStorage.setItem('user', respObj.username);
    localStorage.setItem('authority', respObj.authority);
  }

  return response.status;
};

export const register = async (cred, authority) => {
  if (localStorage.getItem('authority') !== 'ADMIN' || !localStorage.getItem('Authorization')) {
    return 401;
  }

  const response = await fetch(API_URL + '/user/register/' + authority, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('Authorization')
    },
    method: 'POST',
    body: JSON.stringify(cred)
  });

  if (response.status == 401 || response.status == 403) {
    window.location.href = '/';
  }

  return response.status;
};
