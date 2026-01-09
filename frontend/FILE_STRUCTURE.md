# 📁 Complete File Structure

```
research-assistant-frontend/
│
├── 📄 package.json                    # Project dependencies and scripts
├── 📄 vite.config.js                  # Vite build configuration
├── 📄 tailwind.config.js              # Tailwind CSS configuration
├── 📄 postcss.config.js               # PostCSS configuration
├── 📄 index.html                      # HTML entry point
├── 📄 .gitignore                      # Git ignore rules
├── 📄 README.md                       # Full documentation
├── 📄 QUICK_START.md                  # Quick setup guide
│
└── src/                               # Source code directory
    │
    ├── 📄 main.jsx                    # React app entry point
    ├── 📄 App.jsx                     # Main app component with routing
    ├── 📄 index.css                   # Global styles and Tailwind directives
    │
    ├── 📁 components/                 # Reusable components
    │   ├── 📄 Navbar.jsx              # Navigation bar component
    │   ├── 📄 LoadingSpinner.jsx      # Loading indicator component
    │   │
    │   └── 📁 features/               # Research feature components
    │       ├── 📄 LiteratureSurvey.jsx      # Literature survey generator
    │       ├── 📄 ResearchGaps.jsx          # Research gap finder
    │       ├── 📄 Translator.jsx            # Document translator
    │       ├── 📄 PersonaSummary.jsx        # Persona-based summarizer
    │       ├── 📄 MethodologyBuilder.jsx    # Methodology builder
    │       ├── 📄 ExperimentReplicator.jsx  # Experiment replicator
    │       ├── 📄 CrossDomainSynth.jsx      # Cross-domain synthesizer
    │       ├── 📄 BenchmarkExplorer.jsx     # Benchmark recommender
    │       ├── 📄 ContradictionAnalyzer.jsx # Contradiction detector
    │       ├── 📄 CitationValidator.jsx     # Citation validator
    │       ├── 📄 LatexGenerator.jsx        # LaTeX generator
    │       └── 📄 VoiceTranscriber.jsx      # Audio transcriber
    │
    ├── 📁 pages/                      # Main page components
    │   ├── 📄 HomePage.jsx            # Landing page (with parallax)
    │   ├── 📄 LoginPage.jsx           # Login page
    │   ├── 📄 RegisterPage.jsx        # Registration page
    │   ├── 📄 DashboardPage.jsx       # Projects dashboard
    │   └── 📄 ProjectPage.jsx         # Main project workspace
    │
    ├── 📁 contexts/                   # React Context providers
    │   └── 📄 AuthContext.jsx         # Authentication state management
    │
    ├── 📁 services/                   # API integration
    │   └── 📄 api.js                  # Axios setup & API methods
    │
    └── 📁 utils/                      # Utility functions (optional)

```

## Component Hierarchy

```
App (Router)
│
├── HomePage (Public)
│   └── Navbar
│
├── LoginPage (Public)
│   └── Form
│
├── RegisterPage (Public)
│   └── Form
│
├── DashboardPage (Protected)
│   ├── Navbar
│   ├── Stats Cards
│   ├── Projects Grid
│   └── Create Project Modal
│
└── ProjectPage (Protected)
    ├── Navbar
    ├── Project Header
    ├── Feature Navigation Tabs
    └── Dynamic Feature Content
        ├── Upload Section
        ├── LiteratureSurvey
        ├── ResearchGaps
        ├── Translator
        ├── PersonaSummary
        ├── MethodologyBuilder
        ├── ExperimentReplicator
        ├── CrossDomainSynth
        ├── BenchmarkExplorer
        ├── ContradictionAnalyzer
        ├── CitationValidator
        ├── LatexGenerator
        └── VoiceTranscriber
```

## Key Files Explained

### Configuration Files

**package.json**
- Dependencies: React, Tailwind, Axios, Framer Motion, etc.
- Scripts: dev, build, preview, lint
- Project metadata

**vite.config.js**
- Development server configuration
- Proxy setup for backend API
- React plugin configuration

**tailwind.config.js**
- Custom color palette (primary, accent)
- Custom animations (float, slide, fade)
- Extended theme configuration

**postcss.config.js**
- PostCSS plugins (Tailwind, Autoprefixer)

### Core Application Files

**src/main.jsx**
- React app initialization
- Renders App component into DOM

**src/App.jsx**
- Main routing configuration
- AuthProvider wrapper
- Protected/Public route logic
- Toast notifications setup

**src/index.css**
- Tailwind directives (@tailwind base, components, utilities)
- Custom component classes (btn-primary, card, etc.)
- Custom animations and utilities
- Global styles

### Component Files

**components/Navbar.jsx**
- Responsive navigation
- User authentication status
- Mobile menu
- Logo and links

**components/LoadingSpinner.jsx**
- Reusable loading indicator
- Multiple sizes (sm, md, lg, xl)
- Optional loading text

### Feature Components (12 AI Tools)

Each feature component includes:
- Form inputs for user data
- API integration
- Loading states
- Result display
- Error handling

### Page Components

**pages/HomePage.jsx**
- Landing page with hero section
- Parallax scrolling effects
- Feature showcase grid
- CTA sections
- Animated stats

**pages/LoginPage.jsx**
- Login form
- Split layout design
- Form validation
- Token management

**pages/RegisterPage.jsx**
- Registration form
- Role selection
- Password confirmation
- Split layout design

**pages/DashboardPage.jsx**
- Project list view
- Statistics cards
- Create project modal
- Project CRUD operations

**pages/ProjectPage.jsx**
- Feature tab navigation
- Dynamic content rendering
- File upload section
- 12 integrated research features

### Service Files

**services/api.js**
- Axios instance configuration
- API base URL setup
- Request/response interceptors
- JWT token injection
- All API endpoint methods:
  - Authentication APIs
  - Project APIs
  - Upload APIs
  - Research feature APIs

### Context Files

**contexts/AuthContext.jsx**
- Global authentication state
- User information
- Token management
- Login/logout functions
- Protected route logic

## File Sizes (Approximate)

```
Package files: ~200MB (node_modules)
Source code: ~500KB
Built app: ~2MB (optimized)
```

## Import Structure Example

```javascript
// Typical component imports
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Icon } from 'lucide-react';
import ComponentName from '../components/ComponentName';
import LoadingSpinner from '../components/LoadingSpinner';
import { apiMethod } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
```

## Style Organization

1. **Tailwind Utilities** - Most styling via utility classes
2. **Custom Components** - Defined in index.css (@layer components)
3. **Custom Utilities** - Extended utilities in index.css
4. **Inline Styles** - Dynamic styles (parallax, transforms)
5. **Framer Motion** - Animation styles

## API Call Flow

```
Component → services/api.js → Axios Interceptor → Backend
                                    ↓
                            Add JWT Token
                                    ↓
                              Make Request
                                    ↓
                            Handle Response
                                    ↓
                         Update Component State
```

## State Management

- **Local State**: useState for component-specific data
- **Global State**: Context API for authentication
- **Storage**: localStorage for token persistence
- **Forms**: Controlled components with state

## Routing Structure

```
/ (HomePage)
│
├── /login (LoginPage) - Public
├── /register (RegisterPage) - Public
│
├── /dashboard (DashboardPage) - Protected
│   └── Shows all user projects
│
└── /project/:id (ProjectPage) - Protected
    └── Research workspace with 12 features
```

---

This structure provides a clean, maintainable, and scalable foundation for your research assistant platform! 🚀
