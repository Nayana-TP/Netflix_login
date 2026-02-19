import { 
  fetchTrending, 
  fetchPopular, 
  fetchTopRated, 
  fetchUpcoming, 
  fetchMovieDetails,
  getImageUrl 
} from './tmdb';

describe('TMDB API Service', () => {
  describe('fetchTrending', () => {
    it('should fetch trending movies successfully', async () => {
      const data = await fetchTrending();
      
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      
      const firstMovie = data[0];
      expect(firstMovie).toHaveProperty('id');
      expect(firstMovie).toHaveProperty('title');
      expect(firstMovie).toHaveProperty('overview');
      expect(firstMovie).toHaveProperty('poster_path');
      expect(firstMovie).toHaveProperty('backdrop_path');
      expect(firstMovie).toHaveProperty('vote_average');
      expect(firstMovie).toHaveProperty('release_date');
    });

    it('should return movies with valid structure', async () => {
      const data = await fetchTrending();
      
      data.forEach(movie => {
        expect(typeof movie.id).toBe('number');
        expect(typeof movie.title).toBe('string');
        expect(typeof movie.overview).toBe('string');
        expect(typeof movie.vote_average).toBe('number');
        expect(movie.vote_average).toBeGreaterThanOrEqual(0);
        expect(movie.vote_average).toBeLessThanOrEqual(10);
      });
    });
  });

  describe('fetchPopular', () => {
    it('should fetch popular movies successfully', async () => {
      const data = await fetchPopular();
      
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      
      const firstMovie = data[0];
      expect(firstMovie).toHaveProperty('id');
      expect(firstMovie).toHaveProperty('title');
      expect(firstMovie).toHaveProperty('overview');
    });
  });

  describe('fetchTopRated', () => {
    it('should fetch top rated movies successfully', async () => {
      const data = await fetchTopRated();
      
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      
      data.forEach(movie => {
        expect(movie.vote_average).toBeGreaterThanOrEqual(7);
      });
    });
  });

  describe('fetchUpcoming', () => {
    it('should fetch upcoming movies successfully', async () => {
      const data = await fetchUpcoming();
      
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      
      const firstMovie = data[0];
      expect(firstMovie).toHaveProperty('id');
      expect(firstMovie).toHaveProperty('title');
      expect(firstMovie).toHaveProperty('release_date');
    });
  });

  describe('fetchMovieDetails', () => {
    it('should fetch movie details successfully', async () => {
      const trendingMovies = await fetchTrending();
      const firstMovieId = trendingMovies[0].id;
      
      const movieDetails = await fetchMovieDetails(firstMovieId);
      
      expect(movieDetails).toHaveProperty('id', firstMovieId);
      expect(movieDetails).toHaveProperty('title');
      expect(movieDetails).toHaveProperty('overview');
      expect(movieDetails).toHaveProperty('runtime');
      expect(movieDetails).toHaveProperty('genres');
      expect(Array.isArray(movieDetails.genres)).toBe(true);
    });
  });

  describe('getImageUrl', () => {
    it('should return correct image URL for valid path', () => {
      const path = '/example.jpg';
      const url = getImageUrl(path);
      
      expect(url).toBe('https://image.tmdb.org/t/p/w500/example.jpg');
    });

    it('should return correct image URL for custom size', () => {
      const path = '/example.jpg';
      const url = getImageUrl(path, 'w300');
      
      expect(url).toBe('https://image.tmdb.org/t/p/w300/example.jpg');
    });

    it('should return null for null or undefined path', () => {
      expect(getImageUrl(null)).toBeNull();
      expect(getImageUrl(undefined)).toBeNull();
      expect(getImageUrl('')).toBeNull();
    });
  });

  describe('API Data Validation', () => {
    it('should verify data is coming from TMDB API', async () => {
      const trendingData = await fetchTrending();
      const popularData = await fetchPopular();
      
      expect(trendingData.length).toBeGreaterThan(0);
      expect(popularData.length).toBeGreaterThan(0);
      
      trendingData.forEach(movie => {
        expect(movie.poster_path).toMatch(/^\/[a-zA-Z0-9\-_\/.]+\.jpg$/);
        expect(movie.backdrop_path).toMatch(/^\/[a-zA-Z0-9\-_\/.]+\.jpg$/);
      });
    });

    it('should verify TMDB API response structure', async () => {
      const data = await fetchTrending();
      
      data.forEach(movie => {
        expect(movie).toHaveProperty('adult');
        expect(movie).toHaveProperty('backdrop_path');
        expect(movie).toHaveProperty('genre_ids');
        expect(movie).toHaveProperty('id');
        expect(movie).toHaveProperty('original_language');
        expect(movie).toHaveProperty('original_title');
        expect(movie).toHaveProperty('overview');
        expect(movie).toHaveProperty('popularity');
        expect(movie).toHaveProperty('poster_path');
        expect(movie).toHaveProperty('release_date');
        expect(movie).toHaveProperty('title');
        expect(movie).toHaveProperty('video');
        expect(movie).toHaveProperty('vote_average');
        expect(movie).toHaveProperty('vote_count');
      });
    });
  });
});
