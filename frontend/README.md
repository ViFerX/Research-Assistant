# Smart Research Assistant - Frontend

A beautiful, interactive React + Tailwind CSS frontend for the Smart Research Assistant MVP platform.

## Features

- 🎨 **Attractive UI** with parallax scrolling, hover effects, and smooth animations
- 🔐 **Secure Authentication** with JWT token management
- 📊 **Project Management** with intuitive dashboard
- 🤖 **12 AI-Powered Research Tools**:
  - Literature Survey Generator
  - Research Gap Finder
  - Multi-Language Translator
  - Persona Summarizer
  - Methodology Builder
  - Experiment Replicator
  - Cross-Domain Synthesizer
  - Benchmark Explorer
  - Contradiction Analyzer
  - Citation Validator
  - LaTeX Generator
  - Voice Transcriber
- 📱 **Fully Responsive** design for all devices
- ⚡ **Fast & Efficient** with modern React practices

## Tech Stack

- **React 18** - UI library
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - API calls
- **React Hot Toast** - Notifications
- **Lucide React** - Icons
- **Vite** - Build tool

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on `http://127.0.0.1:8000`

## Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

The application will open at `http://localhost:3000`

## Backend Configuration

Make sure your backend is running at `http://127.0.0.1:8000` before starting the frontend.

The API base URL is configured in `src/services/api.js`. If your backend runs on a different port, update this line:

```javascript
const API_BASE_URL = 'http://127.0.0.1:8000';
```

## Project Structure

```
src/
├── components/
│   ├── features/          # All research feature components
│   │   ├── LiteratureSurvey.jsx
│   │   ├── ResearchGaps.jsx
│   │   ├── Translator.jsx
│   │   ├── PersonaSummary.jsx
│   │   ├── MethodologyBuilder.jsx
│   │   ├── ExperimentReplicator.jsx
│   │   ├── CrossDomainSynth.jsx
│   │   ├── BenchmarkExplorer.jsx
│   │   ├── ContradictionAnalyzer.jsx
│   │   ├── CitationValidator.jsx
│   │   ├── LatexGenerator.jsx
│   │   └── VoiceTranscriber.jsx
│   ├── Navbar.jsx           # Navigation component
│   └── LoadingSpinner.jsx   # Loading indicator
├── contexts/
│   └── AuthContext.jsx      # Authentication state management
├── pages/
│   ├── HomePage.jsx         # Landing page with parallax
│   ├── LoginPage.jsx        # Login form
│   ├── RegisterPage.jsx     # Registration form
│   ├── DashboardPage.jsx    # Projects dashboard
│   └── ProjectPage.jsx      # Main research workspace
├── services/
│   └── api.js              # API integration layer
├── utils/                  # Utility functions
├── App.jsx                 # Main app component
├── main.jsx               # Entry point
└── index.css              # Global styles

```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Usage Guide

### 1. Registration
- Visit the homepage and click "Get Started"
- Fill in your details and select your role (Student/Researcher/Educator/Scientist/Reviewer/Others)
- Submit to create your account

### 2. Login
- Use your email and password to sign in
- Your JWT token will be stored securely in localStorage

### 3. Create a Project
- After login, you'll see the dashboard
- Click "New Project" to create a research project
- Fill in: Title, Domain, and Research Aim

### 4. Using Research Features
Inside a project, you can access 12 powerful features:

- **Upload Paper**: Upload PDF, TXT, DOC files for analysis
- **Literature Survey**: Generate surveys with citation mining
- **Research Gaps**: Identify limitations and opportunities
- **Translator**: Translate papers to multiple languages
- **Persona Summary**: Generate audience-specific summaries
- **Methodology Builder**: Design research methodologies
- **Experiment Replicator**: Suggest experimental variants
- **Cross-Domain Synth**: Build interdisciplinary connections
- **Benchmark Explorer**: Get evaluation metric recommendations
- **Contradiction Analyzer**: Detect conflicting claims
- **Citation Validator**: Validate references in different styles
- **LaTeX Generator**: Convert markdown to LaTeX
- **Voice Transcriber**: Transcribe audio to text

## API Integration

All API calls are handled through `src/services/api.js`:

```javascript
// Authentication
authAPI.register(data)
authAPI.login(data)
authAPI.getMe()

// Projects
projectAPI.create(data)
projectAPI.getAll()
projectAPI.getById(id)

// Research Features
researchAPI.generateSurvey(data)
researchAPI.findGaps(data)
researchAPI.translate(data)
// ... and more
```

## Customization

### Colors
Modify colors in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: { ... },
      accent: { ... }
    }
  }
}
```

### Animations
Add custom animations in `src/index.css` or `tailwind.config.js`

### Features
Add new features by:
1. Creating a new component in `src/components/features/`
2. Adding it to `ProjectPage.jsx` features array
3. Implementing the API call in `src/services/api.js`

## Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure your backend has proper CORS configuration:
```python
# In your FastAPI backend
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### API Connection Failed
- Verify backend is running on `http://127.0.0.1:8000`
- Check browser console for detailed error messages
- Ensure all required backend endpoints are implemented

### Loading Issues
- Clear browser cache and localStorage
- Check network tab for failed requests
- Verify API responses match expected format

## Performance Tips

- Use React Developer Tools for performance profiling
- Lazy load feature components if needed
- Implement pagination for large datasets
- Use React.memo() for expensive components

## Security Notes

- JWT tokens are stored in localStorage
- All authenticated requests include Bearer token
- Tokens expire based on backend configuration
- Logout clears all local storage data

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project for your research!

## Support

For issues or questions:
- Check the troubleshooting section
- Review API documentation
- Contact the development team

## Acknowledgments

Built with ❤️ for researchers worldwide using:
- React ecosystem
- Tailwind CSS
- Modern web technologies

---

**Happy Researching! 🎓✨**
