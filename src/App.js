import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Featured from './components/Featured';
import MovieRow from './components/MovieRow';
import Auth from './components/Auth';
import { fetchTrending, fetchPopular, fetchTopRated, fetchUpcoming } from './services/tmdb';

function App() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendingData, popularData, topRatedData, upcomingData] = await Promise.all([
          fetchTrending(),
          fetchPopular(),
          fetchTopRated(),
          fetchUpcoming()
        ]);
        
        setTrending(trendingData);
        setPopular(popularData);
        setTopRated(topRatedData);
        setUpcoming(upcomingData);
      } catch (err) {
        console.error('Error fetching movie data:', err);
        setError('Failed to load movie data');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleAuthSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setError(null);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  // Debug info
  console.log('Environment API URL:', process.env.REACT_APP_API_URL);
  console.log('Is Authenticated:', isAuthenticated);

  if (!isAuthenticated) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  if (error) {
    return (
      <div style={{ 
        padding: '50px', 
        textAlign: 'center', 
        color: 'white', 
        backgroundColor: '#141414',
        minHeight: '100vh'
      }}>
        <h1>Error Loading Movies</h1>
        <p>{error}</p>
        <button onClick={() => setError(null)}>Try Again</button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar user={user} onLogout={handleLogout} />
      <Featured movies={trending} />
      <div className="movie-rows">
        <MovieRow title="Trending Now" movies={trending} />
        <MovieRow title="Popular on Netflix" movies={popular} />
        <MovieRow title="Top Rated" movies={topRated} />
        <MovieRow title="Upcoming" movies={upcoming} />
      </div>
    </div>
  );
}

export default App;
