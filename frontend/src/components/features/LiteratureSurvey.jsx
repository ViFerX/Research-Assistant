import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Search, ExternalLink } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';
import { researchAPI } from '../../services/api';

const LiteratureSurvey = ({ projectId }) => {
  const [formData, setFormData] = useState({
    topic: '',
    keywords: '',
    n_results: 10,
    year_from: 2018,
    year_to: new Date().getFullYear(),
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const keywords = formData.keywords.split(',').map(k => k.trim()).filter(k => k);
      const response = await researchAPI.generateSurvey({
        ...formData,
        keywords,
        project_id: parseInt(projectId),
      });
      setResults(response.data);
      toast.success('Survey generated successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate survey');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Literature Survey Generator</h2>
        <p className="text-gray-600">Generate comprehensive literature surveys with AI-powered citation mining</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Topic</label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              placeholder="e.g., Few-shot learning in medical imaging"
              required
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Keywords (comma-separated)</label>
            <input
              type="text"
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              placeholder="e.g., meta-learning, radiology"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Results</label>
            <input
              type="number"
              value={formData.n_results}
              onChange={(e) => setFormData({ ...formData, n_results: parseInt(e.target.value) })}
              min="1"
              max="50"
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Year From</label>
              <input
                type="number"
                value={formData.year_from}
                onChange={(e) => setFormData({ ...formData, year_from: parseInt(e.target.value) })}
                min="1900"
                max={new Date().getFullYear()}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Year To</label>
              <input
                type="number"
                value={formData.year_to}
                onChange={(e) => setFormData({ ...formData, year_to: parseInt(e.target.value) })}
                min="1900"
                max={new Date().getFullYear()}
                className="input-field"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          {loading ? <LoadingSpinner size="sm" /> : (
            <>
              <Search className="w-5 h-5" />
              <span>Generate Survey</span>
            </>
          )}
        </button>
      </form>

      {loading && (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" text="Generating literature survey... This may take 10-25 seconds" />
        </div>
      )}

      {results && !loading && (
        <div className="space-y-6">
          {/* Papers */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Retrieved Papers ({results.papers?.length || 0})</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {results.papers?.map((paper, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <h4 className="font-semibold text-gray-900 mb-1">{paper.title}</h4>
                  <p className="text-sm text-gray-600">
                    {paper.first_author} et al. • {paper.year} • {paper.venue}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    {paper.url && (
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 text-sm flex items-center space-x-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>View Paper</span>
                      </a>
                    )}
                    {paper.doi && (
                      <span className="text-xs text-gray-500">DOI: {paper.doi}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Draft */}
          {results.draft && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Generated Survey Draft</h3>
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="prose prose-slate max-w-none whitespace-pre-wrap">
                  {results.draft}
                </div>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(results.draft);
                  toast.success('Draft copied to clipboard!');
                }}
                className="mt-4 btn-secondary"
              >
                Copy Draft
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LiteratureSurvey;
