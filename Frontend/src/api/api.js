// ============= Fetch API =============

async function fetchData(url, method, data) {
  try {
    const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  return responseData;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}