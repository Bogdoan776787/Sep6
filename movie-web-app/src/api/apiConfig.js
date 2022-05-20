const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "1a5d678111271243b3609a39b93e61f2",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
