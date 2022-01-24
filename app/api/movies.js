import client from "./tmdbClient";

const api_key = "2070d25f741c4003ce150be29a6b7901";
const endpoint = "/movie";

const getPopular = () =>
  client.get(`${endpoint}/popular`, { api_key, language: "en-US", page: 1 });

const getProviders = (id) =>
  client.get(`${endpoint}/${id}/watch/providers`, { api_key });

const getMovieDetails = (id) => client.get(`${endpoint}/${id}`, { api_key });

const getRecommendations = (id) =>
  client.get(`${endpoint}/${id}/recommendations`, { api_key });

const getSearchedMovies = (query, page) =>
  client.get("/search/movie", {
    query,
    api_key,
    page,
    include_adult: false,
    language: "en-US",
  });

const getCast = (id) => client.get(`${endpoint}/${id}/credits`, { api_key });

const getLatest = () => client.get(`${endpoint}/latest`, { api_key });

const getMovieInformation = (
  movieId,
  setMovieInformation,
  setLoading,
  setError
) => {
  Promise.all([
    getMovieDetails(movieId),
    getCast(movieId),
    getRecommendations(movieId),
    getProviders(movieId),
  ])
    .then((res) => {
      setMovieInformation({
        movieDetails: res[0].data,
        castDetails: res[1].data,
        recommendationDetails: res[2].data,
        providerDetails: res[3].data,
      });

      console.log("movies.js - movie info gathered:", movieId);

      setLoading(false);
    })
    .catch((error) =>
      setError ? setError(error.message) : console.log(error.message)
    );
};

const setArrayOfMovieIds = async (arr, setState) => {
  return await Promise.all(arr.map((movieId) => getMovieDetails(movieId))).then(
    (res) => {
      setState(res.map((movie) => movie.data));
    }
  );
};

export default {
  getPopular,
  getProviders,
  getMovieDetails,
  getCast,
  getRecommendations,
  getSearchedMovies,
  getLatest,
  getMovieInformation,
  setArrayOfMovieIds,
};
