import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Lightbulb } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';
import { researchAPI } from '../../services/api';

const ResearchGaps = ({ project }) => {
  const [aim, setAim] = useState(project?.aim || '');
  const [papers, setPapers] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const paperList = papers.split('\n').filter(p => p.trim()).map(p => {
        const parts = p.split('|').map(s => s.trim());
        return {
          title: parts[0] || '',
          first_author: parts[1] || 'Unknown',
          year: parts[2] || '2024',
          venue: parts[3] || 'Unknown',
          doi: parts[4] || '',
          url: parts[5] || '',
          provider: 'manual'
        };
      });

      const response = await researchAPI.findGaps({
        aim,
        selected_papers: paperList
      });
      setResults(response.data);
      toast.success('Research gaps identified!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to identify gaps');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Research Gap Finder</h2>
        <p className="text-gray-600">Identify limitations and research opportunities</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Research Aim</label>
          <textarea
            value={aim}
            onChange={(e) => setAim(e.target.value)}
            placeholder="Describe your research objective..."
            required
            rows={3}
            className="input-field resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Papers (one per line, format: Title | Author | Year | Venue | DOI | URL)
          </label>
          <textarea
            value={papers}
            onChange={(e) => setPapers(e.target.value)}
            placeholder="Deep Learning in Healthcare | Smith | 2023 | Nature | 10.1234 | http://..."
            rows={6}
            className="input-field resize-none font-mono text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          {loading ? <LoadingSpinner size="sm" /> : (
            <>
              <Lightbulb className="w-5 h-5" />
              <span>Find Gaps</span>
            </>
          )}
        </button>
      </form>

      {loading && (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" text="Analyzing research gaps..." />
        </div>
      )}

      {results && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-bold text-red-700 mb-4">Limitations</h3>
            <div className="space-y-3">
              {results.limitations?.map((item, index) => (
                <div key={index} className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                  <p className="text-gray-800">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-green-700 mb-4">Opportunities</h3>
            <div className="space-y-3">
              {results.opportunities?.map((item, index) => (
                <div key={index} className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                  <p className="text-gray-800">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResearchGaps;
