# TMDB Netflix Clone with Authentication

A complete React application with authentication system that fetches movies from the TMDB API and displays them in a Netflix-style interface.

## Features

### Authentication System
- **User Registration**: Sign up with username, email, phone, and password
- **Secure Login**: Password encoding using bcrypt
- **Database Integration**: Aiven MySQL database connection
- **Session Management**: User state management in React
- **Glassmorphic Design**: Minimalist UI with glass morphism effects

### Netflix-Style Interface
- **Auto-rotating Featured Section**: Hero carousel that cycles every 5 seconds
- **Movie Categories**: Trending, Popular, Top Rated, and Upcoming movies
- **Responsive Design**: Works on desktop and mobile devices
- **Smooth Animations**: Hover effects and transitions

## Database Configuration

### Aiven MySQL Database
- **Host**: mysql-3a274602-ntp94706-c886.i.aivencloud.com
- **Username**: avnadmin
- **Password**: AVNS_lo1mmel9ih9sCAdLpOM
- **Database**: defaultdb
- **Port**: 25060

### User Table Structure
```sql
CREATE TABLE users (
  userID INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phoneNo VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Project Structure

```
tmdb/
├── backend/                    # Node.js backend server
│   ├── package.json           # Backend dependencies
│   ├── server.js              # Express server with API endpoints
│   ├── database.js            # MySQL connection and table creation
│   ├── .env                   # Environment variables (DB credentials)
│   └── test-auth.js           # API testing script
├── src/
│   ├── components/
│   │   ├── Auth.js            # Login/Signup component with glassmorphism
│   │   ├── Auth.css           # Glassmorphic styling
│   │   ├── Navbar.js          # Navigation with user info
│   │   ├── Featured.js        # Hero carousel
│   │   └── MovieRow.js        # Movie rows
│   ├── services/
│   │   ├── tmdb.js            # TMDB API service
│   │   └── tmdb.test.js       # TMDB API tests
│   └── App.js                 # Main app with auth integration
└── package.json               # Frontend dependencies
```

## Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn
- Aiven MySQL database (configured)

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies
```bash
cd ..
npm install
```

### 3. Start Backend Server
```bash
cd backend
npm start
```
The backend server will run on `http://localhost:5000`

### 4. Start Frontend Development Server
```bash
cd ..
npm start
```
The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication Endpoints

#### POST /api/signup
Create a new user account
```json
{
  "username": "testuser",
  "password": "password123",
  "email": "test@example.com",
  "phoneNo": "1234567890"
}
```

#### POST /api/login
Authenticate user
```json
{
  "username": "testuser",
  "password": "password123"
}
```

#### GET /api/test-db
Test database connection

#### GET /api/users
Get all users (for testing)

## Testing

### Backend API Tests
```bash
cd backend
node test-auth.js
```

This will test:
- Database connection
- User signup
- User login
- Invalid login attempts
- User retrieval

### Frontend Tests
```bash
npm test
```

## Security Features

### Password Security
- **Encoding**: Passwords are encoded using bcrypt with salt rounds (10)
- **Verification**: Passwords are verified during login using bcrypt.compare()
- **Storage**: Only encoded passwords are stored in the database

### API Security
- **CORS**: Cross-Origin Resource Sharing configured
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Comprehensive error handling without exposing sensitive information

## UI Design

### Glassmorphic Authentication
- **Colors**: White, Blue, and Black as requested
- **Effects**: Glass morphism with backdrop blur
- **Minimalist**: Clean, modern design with smooth animations
- **Responsive**: Works on all screen sizes

### Authentication Flow
1. User sees login/signup page
2. Can toggle between login and signup modes
3. Password is encoded before storage
4. Successful signup shows login page automatically
5. Login verifies encoded password
6. Successful login redirects to Netflix interface

## Environment Variables

Backend `.env` file:
```env
DB_HOST=mysql-3a274602-ntp94706-c886.i.aivencloud.com
DB_USER=avnadmin
DB_PASSWORD=AVNS_lo1mmel9ih9sCAdLpOM
DB_NAME=defaultdb
DB_PORT=25060
PORT=5000
```

## Usage Flow

1. **Start Application**: Both backend and frontend servers
2. **User Registration**: New users can sign up with their details
3. **Login**: Existing users can login with credentials
4. **Access Netflix Interface**: After successful login, users see the movie interface
5. **Logout**: Users can logout and return to login page

## Troubleshooting

### Database Connection Issues
- Verify Aiven MySQL credentials
- Check if database is accessible
- Ensure SSL connection is properly configured

### Frontend Issues
- Check if backend server is running on port 5000
- Verify CORS configuration
- Check browser console for errors

### Authentication Issues
- Verify password encoding/decoding
- Check database table structure
- Ensure API endpoints are accessible

## Technologies Used

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MySQL2**: MySQL database driver
- **bcryptjs**: Password encoding
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Frontend
- **React 18**: Frontend framework
- **Axios**: HTTP client
- **CSS3**: Styling with glassmorphism effects
- **TMDB API**: Movie data source

## License

This project is for educational purposes only. Movie data and images are provided by TMDB API.
