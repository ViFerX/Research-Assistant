import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Project APIs
export const projectAPI = {
  create: (data) => api.post('/projects', data),
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
  delete: (id) => api.delete(`/projects/${id}`),
};

// Upload API
export const uploadAPI = {
  uploadFile: (projectId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/upload?project_id=${projectId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Research Workflow APIs
export const researchAPI = {
  // Literature Survey
  generateSurvey: (data) => api.post('/survey/generate', data),
  
  // Research Gaps
  findGaps: (data) => api.post('/survey/gaps', data),
  
  // Translation
  translate: (data) => api.post('/translate', data),
  
  // Persona Summary
  generateSummary: (data) => api.post('/summary/persona', data),
  
  // Methodology
  buildMethodology: (data) => api.post('/methodology/build', data),
  replicateMethodology: (data) => api.post('/methodology/replicate', data),
  
  // Cross-domain
  suggestCrossDomain: (data) => api.post('/cross-domain/suggest', data),
  
  // Benchmark
  recommendBenchmark: (data) => api.post('/benchmark/recommend', data),
  
  // Contradiction
  scanContradiction: (data) => api.post('/contradiction/scan', data),
  
  // Citation
  validateCitation: (data) => api.post('/citation/validate', data),
  
  // LaTeX
  generateLatex: (data) => api.post('/latex/generate', data),
  
  // Voice
  transcribeVoice: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/voice/transcribe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Job Status API
export const jobAPI = {
  getStatus: (jobId) => api.get(`/jobs/${jobId}`),
};

export default api;
