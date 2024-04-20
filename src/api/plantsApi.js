import { API_URL } from '../env';

// To populate the rows from PlantsBySpecie component
export const getPlantsBySpeciePage = async (page, pageSize, specieId, matrix, seedling, seed) => {
  const plantsPromise = await fetch(
    API_URL +
      '/plant/plants-per-specie-page/' +
      (page - 1) +
      '/page-size/' +
      pageSize +
      '/specie/' +
      specieId +
      '/' +
      matrix +
      '/' +
      seedling +
      '/' +
      seed,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('Authorization')
      }
    }
  );

  if (plantsPromise.status == 401 || plantsPromise.status == 403) {
    window.location.href = '/';
  }

  const number = +plantsPromise.headers.get('table-size');
  const plantsObj = await plantsPromise.json();
  return { list: plantsObj, number: number };
};

//gets plant object by id
export const getPlantById = async (id) => {
  const plantPromise = await fetch(API_URL + '/plant/' + id, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('Authorization')
    }
  });

  if (plantPromise.status == 401 || plantPromise.status == 403) {
    window.location.href = '/';
  }

  return await plantPromise.json();
};

//gets plant image by id
export const getPlantImage = async (id) => {
  const imagePromise = await fetch(API_URL + '/plant-images/' + id, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('Authorization')
    }
  });

  if (imagePromise.status == 401 || imagePromise.status == 403) {
    window.location.href = '/';
  }

  return await imagePromise.json();
};

export const savePlant = async (obj) => {
  //in case that the specie isn't identified in the plant obj
  let matrixSpecie = !obj.submitObj.specie ? 0 : obj.submitObj.specie;
  if (!obj.submitObj.specie && obj.submitObj.originMatrix) {
    const matrix = await getPlantById(obj.submitObj.originMatrix);
    matrixSpecie = await matrix.specie.id;
    // console.log('noSpecie: ' + obj);
  }

  obj.submitObj.specie = null;

  return await fetch(API_URL + '/plant/' + matrixSpecie + '/number/' + obj.amount, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('Authorization')
    },
    method: 'POST',
    body: JSON.stringify(obj.submitObj)
  })
    .then((response) => {
      //console.log('api: ' + response);
      return response;
    })
    .catch((rejection) => {
      console.log(rejection);
      return rejection;
    });
};

export const getCountByShelf = async () => {
  const obj = await fetch(API_URL + '/plant/count/byShelf', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('Authorization')
    }
  });

  if (obj.status == 401 || obj.status == 403) {
    window.location.href = '/';
  }

  return await obj.json();
};

export const getPlantsByShelf = async (id, index, pageSize) => {
  const response = await fetch(
    API_URL + '/plant/plants-by-shelf-page/' + index + '/page-size/' + pageSize + '/shelf/' + id,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('Authorization')
      }
    }
  );

  if (response.status == 401 || response.status == 403) {
    window.location.href = '/';
  }

  return await response.json();
};

export const getPlantsByMatrix = async (id, index, pageSize) => {
  const response = await fetch(
    API_URL +
      '/plant/plants-by-matrix-page/' +
      (index - 1) +
      '/page-size/' +
      pageSize +
      '/matrix/' +
      id,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('Authorization')
      }
    }
  );

  if (response.status == 401 || response.status == 403) {
    window.location.href = '/';
  }

  const number = +response.headers.get('table-size');
  const plantsObj = await response.json();
  return { list: plantsObj, number: number };
};

export const getPlantsByAddress = async (address, index, pageSize) => {
  const response = await fetch(
    API_URL +
      '/plant/plants-by-address-page/' +
      (index - 1) +
      '/page-size/' +
      pageSize +
      '/address/' +
      address,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('Authorization')
      }
    }
  );

  if (response.status == 401 || response.status == 403) {
    window.location.href = '/';
  }

  const number = +response.headers.get('table-size');
  const plantsObj = await response.json();
  return { list: plantsObj, number: number };
};
