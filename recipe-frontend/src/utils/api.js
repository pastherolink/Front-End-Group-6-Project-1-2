const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:8080/api';
const DEFAULT_USER_ID = 1; // For testing without authentication

// Helper function to handle responses
const handleResponse = async (response) => {
  // Check if the response is ok (status in the range 200-299)
  if (!response.ok) {
    // Try to get error details from response
    let errorMessage;
    try {
      // Try to parse as JSON
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || `Error: ${response.status}`;
    } catch (e) {
      // If parsing fails, get text content
      try {
        errorMessage = await response.text();
      } catch (textError) {
        // Fallback if even text extraction fails
        errorMessage = `HTTP error! Status: ${response.status}`;
      }
    }
    throw new Error(errorMessage);
  }
  
  // Check if the response has content
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  } else {
    // Some successful responses might not have JSON content
    return response.text();
  }
};

export const GET = (endpoint) => {
  return fetch(`${API_URL}${endpoint}`, {
    method: 'GET',
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