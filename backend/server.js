const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { connectDB, getConnection } = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to database
connectDB().catch(console.error);

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

    const connection = getConnection();

    // Check if user already exists
    const [existingUsers] = await connection.execute(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username or email already exists' 
      });
    }

    // Encode password
    const encodedPassword = await encodePassword(password);

    // Insert new user
    const [result] = await connection.execute(
      'INSERT INTO users (username, password, email, phoneNo) VALUES (?, ?, ?, ?)',
      [username, encodedPassword, email, phoneNo || null]
    );

    res.status(201).json({ 
      success: true, 
      message: 'User created successfully',
      userId: result.insertId
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

    const connection = getConnection();

    // Find user by username
    const [users] = await connection.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (users.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }

    const user = users[0];

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

// Test database connection endpoint
app.get('/api/test-db', async (req, res) => {
  try {
    const connection = getConnection();
    const [rows] = await connection.execute('SELECT 1 as test');
    res.json({ 
      success: true, 
      message: 'Database connection successful',
      data: rows 
    });
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Database connection failed' 
    });
  }
});

// Get all users (for testing)
app.get('/api/users', async (req, res) => {
  try {
    const connection = getConnection();
    const [users] = await connection.execute(
      'SELECT userID, username, email, phoneNo, created_at FROM users'
    );
    res.json({ 
      success: true, 
      users 
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
