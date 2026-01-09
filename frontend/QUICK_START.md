# 🚀 Quick Setup Guide

## Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd research-assistant-frontend
npm install
```

### Step 2: Ensure Backend is Running
Make sure your FastAPI backend is running on `http://127.0.0.1:8000`

### Step 3: Start Frontend
```bash
npm run dev
```

Visit: `http://localhost:3000`

## First Time Setup

1. **Open your browser** to `http://localhost:3000`
2. **Click "Get Started"** to register
3. **Fill in your details**:
   - Name
   - Email
   - Password (minimum 6 characters)
   - Select your role (Student/Researcher/Educator/Scientist/Reviewer/Others)
4. **Login** with your credentials
5. **Create your first project**
6. **Start using the 12 AI features!**

## Key Features Quick Access

Once in a project, use the feature tabs at the top:

1. **📤 Upload Paper** - Upload your research documents
2. **🔍 Literature Survey** - Auto-generate literature reviews
3. **💡 Research Gaps** - Find research opportunities
4. **🌍 Translator** - Translate to multiple languages
5. **📝 Persona Summary** - Get audience-specific summaries
6. **🔬 Methodology Builder** - Design your research methodology
7. **🎯 Experiment Replicator** - Generate experimental variants
8. **✨ Cross-Domain Synth** - Create interdisciplinary connections
9. **📊 Benchmark Explorer** - Get evaluation metrics
10. **🛡️ Contradiction Analyzer** - Detect conflicting claims
11. **✅ Citation Validator** - Validate references
12. **📄 LaTeX Generator** - Export to LaTeX
13. **🎤 Voice Transcriber** - Convert audio to text

## Common Commands

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Check code quality
npm run format       # Format code
```

## Troubleshooting

### Backend Connection Issues
- ✅ Verify backend is running: `http://127.0.0.1:8000`
- ✅ Check backend has CORS enabled
- ✅ Test backend API: `http://127.0.0.1:8000/docs`

### Installation Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```bash
# Use a different port
npm run dev -- --port 3001
```

## Project Structure Overview

```
research-assistant-frontend/
├── src/
│   ├── components/        # Reusable components
│   │   └── features/      # 12 research features
│   ├── contexts/          # State management
│   ├── pages/            # Main pages
│   ├── services/         # API integration
│   └── index.css         # Global styles
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS config
└── README.md            # Full documentation
```

## Default Credentials for Testing

After registering, you can login with your created account. There's no default test account - you need to register first!

## Need Help?

- 📖 See full README.md for detailed documentation
- 🐛 Check browser console for errors
- 🔍 Verify API responses in Network tab
- 📝 Review backend documentation at `http://127.0.0.1:8000/docs`

## Features Highlight

### Beautiful UI
- ✨ Parallax scrolling effects
- 🎨 Gradient backgrounds
- 🌊 Smooth animations
- 📱 Fully responsive
- 🎭 Hover effects

### Smart Integration
- 🔐 JWT authentication
- 💾 Local storage persistence
- ⚡ Fast API calls
- 🔄 Real-time updates
- 📊 Loading states

### Professional Components
- 🎯 12 specialized research tools
- 📤 File upload system
- 📋 Project management
- 🔔 Toast notifications
- 🎨 Beautiful cards & modals

---

**Ready to revolutionize your research! 🎓✨**

Happy researching! 🚀
