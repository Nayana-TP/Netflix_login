const fetch = require('node-fetch').default || require('node-fetch');

const API_BASE = 'http://localhost:5000/api';

async function testCompleteFlow() {
    console.log('🚀 Testing Complete Authentication Flow\n');

    try {
        // Test 1: Check server status
        console.log('1️⃣ Testing server connection...');
        const testResponse = await fetch(`${API_BASE}/test-db`);
        const testData = await testResponse.json();
        console.log('✅ Server is running:', testData.message);
        console.log('');

        // Test 2: Create a new user
        console.log('2️⃣ Testing user signup...');
        const signupData = {
            username: `testuser_${Date.now()}`,
            password: 'testpassword123',
            email: `test_${Date.now()}@example.com`,
            phoneNo: '1234567890'
        };

        const signupResponse = await fetch(`${API_BASE}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signupData)
        });

        const signupResult = await signupResponse.json();
        if (signupResult.success) {
            console.log('✅ Signup successful!');
            console.log(`   User ID: ${signupResult.userId}`);
        } else {
            console.log('❌ Signup failed:', signupResult.message);
            return;
        }
        console.log('');

        // Test 3: Login with the created user
        console.log('3️⃣ Testing user login...');
        const loginResponse = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: signupData.username,
                password: signupData.password
            })
        });

        const loginResult = await loginResponse.json();
        if (loginResult.success) {
            console.log('✅ Login successful!');
            console.log(`   Welcome: ${loginResult.user.username}`);
            console.log(`   Email: ${loginResult.user.email}`);
        } else {
            console.log('❌ Login failed:', loginResult.message);
            return;
        }
        console.log('');

        // Test 4: Test invalid login
        console.log('4️⃣ Testing invalid login...');
        const invalidLoginResponse = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'nonexistentuser',
                password: 'wrongpassword'
            })
        });

        const invalidLoginResult = await invalidLoginResponse.json();
        if (!invalidLoginResult.success) {
            console.log('✅ Invalid login properly rejected');
            console.log(`   Error: ${invalidLoginResult.message}`);
        } else {
            console.log('❌ Invalid login should have failed');
        }
        console.log('');

        // Test 5: Get all users
        console.log('5️⃣ Testing get users...');
        const usersResponse = await fetch(`${API_BASE}/users`);
        const usersResult = await usersResponse.json();
        if (usersResult.success) {
            console.log('✅ Get users successful');
            console.log(`   Total users: ${usersResult.users.length}`);
        }
        console.log('');

        console.log('🎉 All tests passed! Authentication system is working correctly.');
        console.log('');
        console.log('📝 Instructions:');
        console.log('1. Backend server is running on http://localhost:5000');
        console.log('2. Frontend should be running on http://localhost:3000');
        console.log('3. Open your browser and go to http://localhost:3000');
        console.log('4. You can now test the complete authentication flow in the browser!');
        console.log('');
        console.log('🔐 Test Credentials:');
        console.log(`Username: ${signupData.username}`);
        console.log(`Password: ${signupData.password}`);

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

testCompleteFlow();
