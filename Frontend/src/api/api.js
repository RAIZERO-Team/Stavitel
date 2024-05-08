// ============= Fetch API =============
async function fetchData(url, method, data = null) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return responseData;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch data.');
  }
}

export { fetchData };
