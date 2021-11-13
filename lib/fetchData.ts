const fetchData = async (uri: string) => {
  try {
    const response = await fetch(uri, {
      headers: {
        'Cache-Control': 'public, max-age=3600',
      },
    });

    if (response.status === 200) {
      const json = await response.json();
      return json;
    } else {
      return {
        url: response.url,
        status: response.status,
        statusText: response.statusText,
      };
    }
  } catch (error) {
    console.log(error || 'An unexpected error occurred.');
  }
};

export default fetchData;
