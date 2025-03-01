const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const GET = (endpoint) => {
  return fetch(`${API_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error('Error calling API:', err);
      throw err;
    });
};

export const POST = (endpoint, body) => {
  return fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error('Error calling API:', err);
      throw err;
    });
};

export const PUT = (endpoint, body) => {
  return fetch(`${API_URL}${endpoint}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error('Error calling API:', err);
      throw err;
    });
};

export const DELETE = (endpoint, body) => {
  return fetch(`${API_URL}${endpoint}`, {
    method: 'DELETE',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error('Error calling API:', err);
      throw err;
    });
};