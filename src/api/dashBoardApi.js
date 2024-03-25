import rootUri from './rootUri';

export const getAllValves = async () => {
  const valvesPromise = await fetch(rootUri + '/valve/all', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('Authorization')
    }
  });

  if (valvesPromise.status == 401 || valvesPromise.status == 403) {
    window.location.href = '/';
  }

  return await valvesPromise.json();
};

export const getValve = async (id) => {
  const valvePromise = await fetch(rootUri + '/valve/' + id, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('Authorization')
    }
  });

  if (valvePromise.status == 401 || valvePromise.status == 403) {
    window.location.href = '/';
  }

  return await valvePromise.json();
};

export const getIrrigationTime = async (id) => {
  const valvePromise = await fetch(rootUri + '/irrigation-time/valve/' + id, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('Authorization')
    }
  });

  if (valvePromise.status == 401 || valvePromise.status == 403) {
    window.location.href = '/';
  }

  return await valvePromise.json();
};

export const submitIrrigationTime = async (irrigationTime, valve) => {
  const response = await fetch(rootUri + '/irrigation-time/valve/' + valve, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('Authorization')
    },
    method: 'POST',
    body: JSON.stringify(irrigationTime)
  });

  if (response.status == 401 || response.status == 403) {
    window.location.href = '/';
  }

  if (response.ok) {
    return 'ok';
  } else {
    return response.text();
  }
};

export const deleteIrrigationTime = async (id) => {
  const response = await fetch(rootUri + '/irrigation-time/delete/' + id, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('Authorization')
    },
    method: 'DELETE'
  });

  if (response.status == 401 || response.status == 403) {
    window.alert('Você não tem permissão para excluir dados.');
  }
};

export const deleteValve = async (id) => {
  const response = await fetch(rootUri + '/valve/delete/' + id, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('Authorization')
    },
    method: 'DELETE'
  });

  if (response.status == 401 || response.status == 403) {
    window.alert('Você não tem permissão para excluir dados.');
  }
};

export const saveValve = async (valve) => {
  const response = await fetch(rootUri + '/valve', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('Authorization')
    },
    method: 'POST',
    body: JSON.stringify(valve)
  });

  if (response.status == 401 || response.status == 403) {
    window.location.href = '/';
  }

  if (response.ok) {
    return 'ok';
  } else {
    return response.text();
  }
};

//************************************* Sensors ************************************/

export const getSensor = async (id) => {
  const sensorPromise = await fetch(rootUri + '/sensor/' + id, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('Authorization')
    }
  });

  if (sensorPromise.status == 401 || sensorPromise.status == 403) {
    window.location.href = '/';
  }

  return await sensorPromise.json();
};

export const getAllSensors = async () => {
  const sensorsPromise = await fetch(rootUri + '/sensor/all', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('Authorization')
    }
  });

  if (sensorsPromise.status == 401 || sensorsPromise.status == 403) {
    window.location.href = '/';
  }

  return await sensorsPromise.json();
};

export const saveSensor = async (sensor) => {
  const response = await fetch(rootUri + '/sensor', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('Authorization')
    },
    method: 'POST',
    body: JSON.stringify(sensor)
  });

  if (response.status == 401 || response.status == 403) {
    window.location.href = '/';
  }

  if (response.ok) {
    return 'ok';
  } else {
    return response.text();
  }
};

export const getRecordsBySensor = async (period, sensorId) => {
  const response = await fetch(rootUri + '/sensor-record/sensor/' + sensorId, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('Authorization')
    },
    method: 'POST',
    body: JSON.stringify(period)
  });

  if (response.status == 401 || response.status == 403) {
    window.location.href = '/';
  }

  return await response.json();
};
