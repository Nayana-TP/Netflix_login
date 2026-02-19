# 🔧 Environment Variable Fix

## Problem
```
Environment Variable "REACT_APP_API_URL" references Secret "api_url", which does not exist.
```

## ✅ Solution

### Option 1: Set Environment Variable in Vercel (Recommended)

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Go to Settings** → **Environment Variables**
4. **Add Environment Variable**:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `http://localhost:5000/api` (for testing)
   - **Environment**: Production, Preview, Development
5. **Save**
6. **Redeploy** your project

### Option 2: Update vercel.json

Remove the secret reference and use hardcoded URL:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Option 3: Update Code to Handle Missing API

Modify Auth.js to use fallback URL:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

---

## 🎯 Quick Fix Steps

### For Immediate Testing:
1. **In Vercel Dashboard** → Settings → Environment Variables
2. **Add**: `REACT_APP_API_URL`
3. **Value**: `http://localhost:5000/api`
4. **Save** and **Redeploy**

### For Production:
1. **Deploy backend first** (Railway/Render)
2. **Get backend URL**
3. **Update environment variable** with real URL
4. **Redeploy frontend**

---

## 📋 Environment Variables You Need

### For Development:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### For Production (after backend deployment):
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

---

## 🆘 Common Environment Variable Issues

### Missing Variable:
- **Error**: "references Secret which does not exist"
- **Fix**: Add the variable in Vercel dashboard

### Incorrect Name:
- **Error**: Variable not found in code
- **Fix**: Use exact name `REACT_APP_API_URL`

### Wrong Value:
- **Error**: API calls fail
- **Fix**: Verify URL is correct and accessible

---

## 🚀 After Fix

Once you set the environment variable:
- ✅ Build will succeed
- ✅ No more secret reference errors
- ✅ API calls will work
- ✅ Authentication will function

---

## 🔍 Testing the Fix

### 1. Set Variable in Vercel:
- Go to project settings
- Add `REACT_APP_API_URL`
- Set value to `http://localhost:5000/api`

### 2. Redeploy:
- Vercel will automatically rebuild
- New environment variable will be available

### 3. Test:
- Visit your Vercel URL
- Try signup/login functionality

---

**The fix is simple: just add the environment variable in Vercel dashboard!** 🎯
