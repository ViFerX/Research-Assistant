import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Code, Download } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';
import { researchAPI } from '../../services/api';

const LatexGenerator = () => {
  const [draftMarkdown, setDraftMarkdown] = useState('');
  const [template, setTemplate] = useState('Conference');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await researchAPI.generateLatex({ draft_markdown: draftMarkdown, template });
      setResult(response.data);
      toast.success('LaTeX generated successfully!');
    } catch (error) {
      toast.error('Generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">LaTeX Generator</h2>
        <p className="text-gray-600">Convert markdown drafts to LaTeX typescripts</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Draft Markdown</label>
          <textarea value={draftMarkdown} onChange={(e) => setDraftMarkdown(e.target.value)} rows={10} className="input-field resize-none font-mono text-sm" placeholder="# Paper Title\n\n## Abstract\n\n..." required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Template</label>
          <select value={template} onChange={(e) => setTemplate(e.target.value)} className="input-field">
            <option value="Conference">Conference</option>
            <option value="Journal">Journal</option>
            <option value="Thesis">Thesis</option>
          </select>
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? <LoadingSpinner size="sm" /> : <><Code className="w-5 h-5 inline mr-2" />Generate LaTeX</>}
        </button>
      </form>
      {loading && <div className="flex justify-center py-12"><LoadingSpinner size="lg" text="Generating LaTeX..." /></div>}
      {result && !loading && (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <Download className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">LaTeX Generated!</h3>
          <p className="text-gray-600 mb-6">Your LaTeX file is ready for download</p>
          {result.zip_url && (
            <a href={`http://127.0.0.1:8000${result.zip_url}`} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Download .tex File</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default LatexGenerator;
