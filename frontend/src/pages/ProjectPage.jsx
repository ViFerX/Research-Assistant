import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  Search,
  Lightbulb,
  Globe,
  FileText,
  GitBranch,
  Target,
  Sparkles,
  BarChart3,
  Shield,
  CheckCircle,
  Code,
  Mic,
  Upload,
  Download,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { projectAPI, uploadAPI, researchAPI } from '../services/api';

// Feature Tab Components
import LiteratureSurvey from '../components/features/LiteratureSurvey';
import ResearchGaps from '../components/features/ResearchGaps';
import Translator from '../components/features/Translator';
import PersonaSummary from '../components/features/PersonaSummary';
import MethodologyBuilder from '../components/features/MethodologyBuilder';
import ExperimentReplicator from '../components/features/ExperimentReplicator';
import CrossDomainSynth from '../components/features/CrossDomainSynth';
import BenchmarkExplorer from '../components/features/BenchmarkExplorer';
import ContradictionAnalyzer from '../components/features/ContradictionAnalyzer';
import CitationValidator from '../components/features/CitationValidator';
import LatexGenerator from '../components/features/LatexGenerator';
import VoiceTranscriber from '../components/features/VoiceTranscriber';

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const features = [
    { id: 'upload', icon: <Upload />, label: 'Upload Paper', color: 'from-gray-600 to-gray-800' },
    { id: 'survey', icon: <Search />, label: 'Literature Survey', color: 'from-blue-500 to-cyan-500' },
    { id: 'gaps', icon: <Lightbulb />, label: 'Research Gaps', color: 'from-purple-500 to-pink-500' },
    { id: 'translate', icon: <Globe />, label: 'Translator', color: 'from-green-500 to-emerald-500' },
    { id: 'summary', icon: <FileText />, label: 'Persona Summary', color: 'from-orange-500 to-red-500' },
    { id: 'methodology', icon: <GitBranch />, label: 'Methodology Builder', color: 'from-indigo-500 to-purple-500' },
    { id: 'replicate', icon: <Target />, label: 'Experiment Replicator', color: 'from-pink-500 to-rose-500' },
    { id: 'crossdomain', icon: <Sparkles />, label: 'Cross-Domain Synth', color: 'from-yellow-500 to-orange-500' },
    { id: 'benchmark', icon: <BarChart3 />, label: 'Benchmark Explorer', color: 'from-teal-500 to-cyan-500' },
    { id: 'contradiction', icon: <Shield />, label: 'Contradiction Analyzer', color: 'from-red-500 to-orange-500' },
    { id: 'citation', icon: <CheckCircle />, label: 'Citation Validator', color: 'from-green-500 to-teal-500' },
    { id: 'latex', icon: <Code />, label: 'LaTeX Generator', color: 'from-gray-600 to-gray-800' },
    { id: 'voice', icon: <Mic />, label: 'Voice Transcriber', color: 'from-violet-500 to-purple-500' },
  ];

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await projectAPI.getById(id);
      setProject(response.data);
    } catch (error) {
      console.error('Failed to fetch project:', error);
      toast.error('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    try {
      const response = await uploadAPI.uploadFile(id, file);
      toast.success('File uploaded successfully!');
      setUploadedFiles([...uploadedFiles, response.data]);
      return response.data;
    } catch (error) {
      console.error('File upload failed:', error);
      toast.error('Failed to upload file');
      throw error;
    }
  };

  const renderFeatureContent = () => {
    const props = {
      projectId: id,
      project,
      uploadedFiles,
      onFileUpload: handleFileUpload,
    };

    switch (activeTab) {
      case 'upload':
        return <UploadSection {...props} />;
      case 'survey':
        return <LiteratureSurvey {...props} />;
      case 'gaps':
        return <ResearchGaps {...props} />;
      case 'translate':
        return <Translator {...props} />;
      case 'summary':
        return <PersonaSummary {...props} />;
      case 'methodology':
        return <MethodologyBuilder {...props} />;
      case 'replicate':
        return <ExperimentReplicator {...props} />;
      case 'crossdomain':
        return <CrossDomainSynth {...props} />;
      case 'benchmark':
        return <BenchmarkExplorer {...props} />;
      case 'contradiction':
        return <ContradictionAnalyzer {...props} />;
      case 'citation':
        return <CitationValidator {...props} />;
      case 'latex':
        return <LatexGenerator {...props} />;
      case 'voice':
        return <VoiceTranscriber {...props} />;
      default:
        return <UploadSection {...props} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading project..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
            {project?.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-gray-600">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Domain:</span>
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                {project?.domain}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Aim:</span>
              <span>{project?.aim}</span>
            </div>
          </div>
        </motion.div>

        {/* Features Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          {features.map((feature, index) => (
            <motion.button
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setActiveTab(feature.id)}
              className={`p-4 rounded-xl transition-all duration-300 ${
                activeTab === feature.id
                  ? 'bg-gradient-to-br ' + feature.color + ' text-white shadow-xl scale-105'
                  : 'bg-white hover:shadow-lg hover:scale-105'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={activeTab === feature.id ? '' : 'text-gray-700'}>
                  {feature.icon}
                </div>
                <span className="text-xs font-semibold text-center">
                  {feature.label}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Feature Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {renderFeatureContent()}
        </motion.div>
      </div>
    </div>
  );
};

// Upload Section Component
const UploadSection = ({ projectId, uploadedFiles, onFileUpload }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      await onFileUpload(file);
    } catch (error) {
      // Error handled in parent
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Research Paper</h2>
        <p className="text-gray-600">Upload PDF, TXT, or other document files for analysis</p>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-primary-500 transition-colors duration-200">
        <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
          accept=".pdf,.txt,.doc,.docx"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer inline-block btn-primary"
        >
          {uploading ? 'Uploading...' : 'Choose File'}
        </label>
        <p className="text-gray-500 mt-4">Supported formats: PDF, TXT, DOC, DOCX</p>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Uploaded Files</h3>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-primary-600" />
                  <span className="font-medium">{file.filename}</span>
                </div>
                <span className="text-sm text-gray-500">ID: {file.document_id}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
