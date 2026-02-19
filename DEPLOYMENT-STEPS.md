# 🚀 Deployment Steps for Your GitHub Repo

## 📋 Repository Status
✅ **Repository**: https://github.com/Nayana-TP/the-movie-database-api  
✅ **Changes Committed**: Build fixes applied  
✅ **Ready for Deployment**: All files in place  

---

## 🎯 Step 1: Deploy Frontend to Vercel

### Option A: Connect GitHub to Vercel (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Click **"Import Git Repository"**
4. Search: `Nayana-TP/the-movie-database-api`
5. Click **"Import"**
6. **Framework Preset**: React (should auto-detect)
7. **Build Command**: `npm run build` (already fixed)
8. **Output Directory**: `build`
9. Click **"Deploy"**

### Option B: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy your repo
vercel --prod
```

---

## 🗄️ Step 2: Deploy Backend

### Option 1: Railway (Easiest)
1. Go to [railway.app](https://railway.app)
2. Click **"Start a New Project"**
3. Click **"Deploy from GitHub repo"**
4. Select: `Nayana-TP/the-movie-database-api`
5. **Root Directory**: `backend`
6. **Build Command**: `npm install`
7. **Start Command**: `node server-fallback.js`
8. Click **"Deploy"**

### Option 2: Render.com
1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub
4. Select your repo
5. **Name**: tmdb-backend
6. **Root Directory**: `backend`
7. **Runtime**: Node
8. **Build Command**: `npm install`
9. **Start Command**: `node server-fallback.js`
10. Click **"Create Web Service"**

---

## ⚙️ Step 3: Connect Frontend to Backend

### After Both Are Deployed:

1. **Get Backend URL** from Railway/Render
   - Example: `https://your-app.railway.app`

2. **Set Environment Variable in Vercel**:
   - Go to Vercel Dashboard
   - Your Project → Settings → Environment Variables
   - Add Variable:
     - **Name**: `REACT_APP_API_URL`
     - **Value**: `https://your-backend-url.com/api`

3. **Redeploy Frontend**:
   ```bash
   vercel --prod
   ```

---

## 🧪 Step 4: Test Everything

### Test Checklist:
- [ ] Frontend loads at Vercel URL
- [ ] Signup works with new user
- [ ] Login works with created user
- [ ] Netflix interface appears after login
- [ ] Logout returns to login page
- [ ] No console errors

---

## 🔗 Expected URLs

### After Deployment:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.railway.app`
- **API Endpoints**: `https://your-backend.railway.app/api`

---

## 🆘 Common Issues & Solutions

### Build Fails:
- Check: Node.js version (use 18.x)
- Verify: `package.json` build script
- Check: Vercel build logs

### API Errors:
- Verify: Environment variables set
- Check: CORS configuration
- Test: Backend URL accessibility

### Database Issues:
- Use: Fallback server initially
- Later: Connect real Aiven database

---

## 📱 Quick Commands

### Local Testing:
```bash
# Start both services
npm start                    # Frontend (port 3000)
cd backend && node server-fallback.js  # Backend (port 5000)
```

### Deployment:
```bash
# Deploy frontend
vercel --prod

# Check deployment status
vercel ls
```

---

## 🎉 Success Criteria

When you're done, you'll have:
- ✅ Live Netflix clone at Vercel URL
- ✅ Working authentication system
- ✅ Backend API handling users
- ✅ Professional portfolio project
- ✅ TMDB movie integration

**Total Time**: 30-45 minutes  
**Cost**: Free tier available

---

## 🎯 Next Action

**Start with Step 1**: Deploy to Vercel now!
1. Go to vercel.com
2. Connect your GitHub repo
3. Deploy with one click

Your repository is ready! 🚀
