const fetch = require('node-fetch');

const API_BASE = 'http://localhost:5000/api';

// Test functions
const testDatabaseConnection = async () => {
  console.log('🔍 Testing database connection...');
  try {
    const response = await fetch(`${API_BASE}/test-db`);
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Database connection successful');
      return true;
    } else {
      console.log('❌ Database connection failed:', data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Database connection error:', error.message);
    return false;
  }
};

const testSignup = async () => {
  console.log('🔍 Testing user signup...');
  try {
    const testUser = {
      username: `testuser_${Date.now()}`,
      password: 'testpassword123',
      email: `test_${Date.now()}@example.com`,
      phoneNo: '1234567890'
    };

    const response = await fetch(`${API_BASE}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser),
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Signup successful');
      console.log(`   User ID: ${data.userId}`);
      return { success: true, user: testUser };
    } else {
      console.log('❌ Signup failed:', data.message);
      return { success: false, error: data.message };
    }
  } catch (error) {
    console.log('❌ Signup error:', error.message);
    return { success: false, error: error.message };
  }
};

const testLogin = async (user) => {
  console.log('🔍 Testing user login...');
  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password
      }),
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Login successful');
      console.log(`   Welcome: ${data.user.username}`);
      console.log(`   Email: ${data.user.email}`);
      return true;
    } else {
      console.log('❌ Login failed:', data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Login error:', error.message);
    return false;
  }
};

const testInvalidLogin = async () => {
  console.log('🔍 Testing invalid login...');
  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'nonexistentuser',
        password: 'wrongpassword'
      }),
    });

    const data = await response.json();
    
    if (!data.success) {
      console.log('✅ Invalid login properly rejected');
      console.log(`   Error message: ${data.message}`);
      return true;
    } else {
      console.log('❌ Invalid login should have failed');
      return false;
    }
  } catch (error) {
    console.log('❌ Invalid login test error:', error.message);
    return false;
  }
};

const testGetUsers = async () => {
  console.log('🔍 Testing get users endpoint...');
  try {
    const response = await fetch(`${API_BASE}/users`);
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Get users successful');
      console.log(`   Total users: ${data.users.length}`);
      data.users.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.username} (${user.email})`);
      });
      return true;
    } else {
      console.log('❌ Get users failed:', data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Get users error:', error.message);
    return false;
  }
};

// Run all tests
const runAllTests = async () => {
  console.log('🚀 Starting Authentication API Tests\n');
  
  let allTestsPassed = true;

  // Test database connection
  const dbConnected = await testDatabaseConnection();
  allTestsPassed = allTestsPassed && dbConnected;
  console.log('');

  if (!dbConnected) {
    console.log('❌ Database connection failed. Stopping tests.');
    return;
  }

  // Test signup
  const signupResult = await testSignup();
  allTestsPassed = allTestsPassed && signupResult.success;
  console.log('');

  // Test login with valid credentials
  if (signupResult.success) {
    const loginSuccess = await testLogin(signupResult.user);
    allTestsPassed = allTestsPassed && loginSuccess;
    console.log('');
  }

  // Test invalid login
  const invalidLoginTest = await testInvalidLogin();
  allTestsPassed = allTestsPassed && invalidLoginTest;
  console.log('');

  // Test get users
  const getUsersTest = await testGetUsers();
  allTestsPassed = allTestsPassed && getUsersTest;
  console.log('');

  // Final result
  if (allTestsPassed) {
    console.log('🎉 All tests passed! Authentication system is working correctly.');
  } else {
    console.log('❌ Some tests failed. Please check the errors above.');
  }
};

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = {
  testDatabaseConnection,
  testSignup,
  testLogin,
  testInvalidLogin,
  testGetUsers,
  runAllTests
};
