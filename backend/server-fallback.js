const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;

// In-memory storage for testing (fallback when database is not available)
const users = [];

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log('🚀 Starting server in fallback mode (in-memory storage)');

// Helper function to encode password
const encodePassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Helper function to decode and verify password
const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { username, password, email, phoneNo } = req.body;

    // Validate input
    if (!username || !password || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username, password, and email are required' 
      });
    }

    // Check if user already exists in memory
    const existingUser = users.find(user => 
      user.username === username || user.email === email
    );

    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username or email already exists' 
      });
    }

    // Encode password
    const encodedPassword = await encodePassword(password);

    // Create new user
    const newUser = {
      userID: users.length + 1,
      username,
      password: encodedPassword,
      email,
      phoneNo: phoneNo || null,
      created_at: new Date().toISOString()
    };

    users.push(newUser);

    console.log(`✅ New user created: ${username} (${email})`);

    res.status(201).json({ 
      success: true, 
      message: 'User created successfully',
      userId: newUser.userID
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required' 
      });
    }

    // Find user by username in memory
    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    console.log(`✅ User logged in: ${username}`);

    res.status(200).json({ 
      success: true, 
      message: 'Login successful',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Test database connection endpoint (fallback)
app.get('/api/test-db', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running in fallback mode (in-memory storage)',
    userCount: users.length
  });
});

// Get all users (for testing)
app.get('/api/users', (req, res) => {
  const usersWithoutPasswords = users.map(({ password, ...user }) => user);
  res.json({ 
    success: true, 
    users: usersWithoutPasswords
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} (fallback mode)`);
  console.log('📝 Note: Using in-memory storage. Data will be lost on server restart.');
  console.log('🔗 Test the API at: http://localhost:5000/api/test-db');
});
