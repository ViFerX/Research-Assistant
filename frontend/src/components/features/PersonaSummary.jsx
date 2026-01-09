import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FileText } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';
import { researchAPI } from '../../services/api';

const PersonaSummary = ({ uploadedFiles }) => {
  const [formData, setFormData] = useState({
    document_id: '',
    raw_text: '',
    persona: 'researcher',
    focus: 'overview',
    length: 'medium'
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = formData.document_id 
        ? { document_id: parseInt(formData.document_id), persona: formData.persona, focus: formData.focus, length: formData.length }
        : { raw_text: formData.raw_text, persona: formData.persona, focus: formData.focus, length: formData.length };
      const response = await researchAPI.generateSummary(payload);
      setResult(response.data);
      toast.success('Summary generated!');
    } catch (error) {
      toast.error('Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Persona Summarizer</h2>
        <p className="text-gray-600">Generate summaries tailored for different audiences</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Source</label>
          <select value={formData.document_id} onChange={(e) => setFormData({...formData, document_id: e.target.value})} className="input-field">
            <option value="">Use text input below</option>
            {uploadedFiles.map(file => <option key={file.document_id} value={file.document_id}>{file.filename}</option>)}
          </select>
        </div>
        {!formData.document_id && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Raw Text</label>
            <textarea value={formData.raw_text} onChange={(e) => setFormData({...formData, raw_text: e.target.value})} rows={6} className="input-field resize-none" placeholder="Paste text here..." />
          </div>
        )}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Persona</label>
            <select value={formData.persona} onChange={(e) => setFormData({...formData, persona: e.target.value})} className="input-field">
              <option value="student">Student</option>
              <option value="researcher">Researcher</option>
              <option value="reviewer">Reviewer</option>
              <option value="educator">Educator</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Focus</label>
            <select value={formData.focus} onChange={(e) => setFormData({...formData, focus: e.target.value})} className="input-field">
              <option value="overview">Overview</option>
              <option value="methods">Methods</option>
              <option value="results">Results</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Length</label>
            <select value={formData.length} onChange={(e) => setFormData({...formData, length: e.target.value})} className="input-field">
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
            </select>
          </div>
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? <LoadingSpinner size="sm" /> : <><FileText className="w-5 h-5 inline mr-2" />Generate Summary</>}
        </button>
      </form>
      {loading && <div className="flex justify-center py-12"><LoadingSpinner size="lg" text="Generating summary..." /></div>}
      {result && !loading && (
        <div>
          <h3 className="text-xl font-bold mb-4">Summary</h3>
          <div className="p-6 bg-gray-50 rounded-lg"><p className="whitespace-pre-wrap">{result.summary}</p></div>
        </div>
      )}
    </div>
  );
};

export default PersonaSummary;
