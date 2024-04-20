import { API_URL } from '../env';

//returns a page with 7 specie objects
export const getSpeciesList = async (page) => {
  const speciesPromise = await fetch(API_URL + '/specie/page/' + (page - 1), {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('Authorization')
    }
  });
  if (speciesPromise.status == 401 || speciesPromise.status == 403) {
    window.location.href = '/';
  }
  const number = +speciesPromise.headers.get('table-size');
  const speciesObj = await speciesPromise.json();
  return { list: speciesObj, number: number };
};

//saves specie object to database
export const saveSpecie = async (specie) => {
  const response = await fetch(API_URL + '/specie', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('Authorization')
    },
    method: 'POST',
    body: JSON.stringify(specie)
  });

  if (saveSpecie.status == 401 || saveSpecie.status == 403) {
    window.location.href = '/';
  }
};

//get specie object by id
export const getSpecie = async (id) => {
  const speciesPromise = await fetch(API_URL + '/specie/' + id, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('Authorization')
    }
  });

  if (speciesPromise.status == 401 || speciesPromise.status == 403) {
    window.location.href = '/';
  }

  return await speciesPromise.json();
};

export const getSpecieImage = async (id) => {
  const imagePromise = await fetch(API_URL + '/specie-images/' + id, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('Authorization')
    }
  });

  if (imagePromise.status == 401 || imagePromise.status == 403) {
    window.location.href = '/';
  }

  return await imagePromise.json();
};

export const getAllSpecies = async () => {
  const speciesPromise = await fetch(API_URL + '/specie/all', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('Authorization')
    }
  });

  if (speciesPromise.status == 401 || speciesPromise.status == 403) {
    window.location.href = '/';
  }

  return await speciesPromise.json();
};
