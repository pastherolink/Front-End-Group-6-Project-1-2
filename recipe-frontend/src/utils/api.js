const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:8080/api';
const DEFAULT_USER_ID = 1; // For testing without authentication

// Enhanced error handler
const handleResponse = async (response) => {
  const url = response.url;
  console.log(`Processing response from: ${url}, status: ${response.status}`);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`API error response (${response.status}) for ${url}:`, errorText);
    
    if (response.status === 404) {
      throw new Error(`Resource not found: ${url} - ${errorText || 'No additional error information'}`);
    } else if (response.status === 500) {
      throw new Error("Internal Server Error: " + errorText);
    } else if (response.status === 400) {
      throw new Error("Bad Request: " + errorText);
    } else {
      throw new Error(errorText || response.statusText);
    }
  }
  
  // Check if there's a response body
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const json = await response.json();
    console.log(`API JSON Response for ${url}:`, json);
    return json;
  }
  
  const text = await response.text();
  console.log(`API Text Response for ${url}:`, text);
  return text;
};

export const GET = (endpoint) => {
  console.log(`API GET Request: ${API_URL}${endpoint}`);
  
  return fetch(`${API_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
    .then(response => {
      console.log(`API GET Response Status: ${response.status} ${response.statusText} for ${endpoint}`);
      return handleResponse(response);
    })
    .catch((err) => {
      console.error(`API GET Error for ${endpoint}:`, err);
      throw err;
    });
};

export const POST = (endpoint, body) => {
  // Automatically add userId if not present
  const enrichedBody = {
    ...body,
    userId: body.userId || DEFAULT_USER_ID
  };

  return fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    body: JSON.stringify(enrichedBody),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
    .then(handleResponse)
    .catch((err) => {
      console.error('Error calling API:', err);
      throw err;
    });
};

export const PUT = (endpoint, body) => {
  // Automatically add userId if not present
  const enrichedBody = {
    ...body,
    userId: body.userId || DEFAULT_USER_ID
  };

  return fetch(`${API_URL}${endpoint}`, {
    method: 'PUT',
    body: JSON.stringify(enrichedBody),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
    .then(handleResponse)
    .catch((err) => {
      console.error('Error calling API:', err);
      throw err;
    });
};

export const DELETE = (endpoint, body = null) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  };
  
  if (body) {
    options.body = JSON.stringify(body);
  }
  
  return fetch(`${API_URL}${endpoint}`, options)
    .then(handleResponse)
    .catch((err) => {
      console.error('Error calling API:', err);
      throw err;
    });
};