const fetchData = async (uri: string) => {
  try {
    const response = await fetch(uri);

    if (response.status === 200) {
      return await response.json();
    } else {
      const { url, status, statusText } = response;

      return {
        url,
        status,
        statusText,
      };
    }
  } catch (error) {
    console.log(error || 'An unexpected error occurred.');
  }
};

export default fetchData;
