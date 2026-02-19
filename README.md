# TMDB Netflix Clone

A React application that fetches movies from the TMDB API and displays them in a Netflix-style interface.

## Features

- **Netflix-style Landing Page**: Modern, dark theme interface inspired by Netflix
- **Auto-rotating Featured Section**: Hero carousel that automatically cycles through trending movies every 5 seconds
- **Movie Categories**: Displays trending, popular, top-rated, and upcoming movies
- **Responsive Design**: Works on desktop and mobile devices
- **Smooth Animations**: Hover effects and transitions for better user experience
- **API Integration**: Fetches real movie data from TMDB API

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

## Installation

1. Clone the repository or extract the project files
2. Navigate to the project directory:
   ```bash
   cd tmdb
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Start the Development Server

```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`.

### Run Tests

```bash
npm test
```

This will run the test suite that verifies:
- TMDB API data fetching functionality
- Data structure validation
- API response verification
- Image URL generation

### Build for Production

```bash
npm run build
```

## API Configuration

The application uses the TMDB API with the following configuration:
- API Key: `2ac243714eb51a261560fde07afdfaf1`
- Base URL: `https://api.themoviedb.org/3`
- Image Base URL: `https://image.tmdb.org/t/p/`

## Project Structure

```
src/
├── components/
│   ├── Navbar.js          # Navigation bar component
│   ├── Featured.js        # Hero carousel with auto-rotation
│   └── MovieRow.js        # Horizontal movie rows
├── services/
│   ├── tmdb.js            # TMDB API service functions
│   └── tmdb.test.js       # Test cases for API service
├── App.js                 # Main application component
├── App.css                # Global styles
├── index.js               # Application entry point
└── index.css              # Base styles
```

## Key Components

### Featured Component
- Displays a hero carousel with trending movies
- Auto-rotates every 5 seconds
- Shows movie title, rating, year, and description
- Includes play and info buttons
- Manual navigation with indicator dots

### MovieRow Component
- Horizontal scrolling rows of movie posters
- Smooth scroll navigation with arrow buttons
- Hover effects showing movie details
- Responsive poster sizing

### TMDB Service
- Fetches trending, popular, top-rated, and upcoming movies
- Handles movie details retrieval
- Generates image URLs with different sizes
- Comprehensive error handling

## Testing

The test suite includes:

1. **API Data Validation**: Verifies that data is coming from TMDB API
2. **Response Structure**: Checks for required fields in movie objects
3. **Data Types**: Validates data types for all movie properties
4. **Image URL Generation**: Tests image URL construction
5. **Error Handling**: Ensures proper error handling for API calls

Run tests with:
```bash
npm test
```

## Technologies Used

- **React 18**: Modern React with hooks
- **Axios**: HTTP client for API requests
- **CSS3**: Custom CSS with animations and transitions
- **Jest**: Testing framework
- **React Testing Library**: Component testing utilities

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for educational purposes only. Movie data and images are provided by TMDB API.
