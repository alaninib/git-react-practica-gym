export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY
  }
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
    'X-RapidAPI-Key': '96f9c7cf74msh9aab05904f1cd85p18c510jsn8d234e74487f'
  }
};


export const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if(!response.ok){
      throw new Error(`${response.status} ${response.statusText}`);
    }else{
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error)
  }
}