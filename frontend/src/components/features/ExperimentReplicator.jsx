import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Target } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';
import { researchAPI } from '../../services/api';

const ExperimentReplicator = () => {
  const [methodologyJson, setMethodologyJson] = useState('');
  const [papers, setPapers] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const paperList = papers.split('\n').filter(p => p.trim()).map(p => {
        const parts = p.split('|').map(s => s.trim());
        return { title: parts[0] || '', first_author: parts[1] || '', year: parts[2] || '2024', venue: parts[3] || '', doi: '', url: '', provider: 'manual' };
      });
      const response = await researchAPI.replicateMethodology({
        methodology_json: JSON.parse(methodologyJson),
        candidate_papers: paperList
      });
      setResult(response.data);
      toast.success('Replication suggestions generated!');
    } catch (error) {
      toast.error('Failed to generate suggestions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Experiment Replicator</h2>
        <p className="text-gray-600">Suggest experimental variants from existing papers</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Methodology JSON</label>
          <textarea value={methodologyJson} onChange={(e) => setMethodologyJson(e.target.value)} rows={6} className="input-field resize-none font-mono text-sm" placeholder='{"nodes": [], "edges": []}' required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Candidate Papers (one per line: Title | Author | Year | Venue)</label>
          <textarea value={papers} onChange={(e) => setPapers(e.target.value)} rows={4} className="input-field resize-none font-mono text-sm" placeholder="Paper Title | Author | 2023 | Venue" />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? <LoadingSpinner size="sm" /> : <><Target className="w-5 h-5 inline mr-2" />Suggest Enhancements</>}
        </button>
      </form>
      {loading && <div className="flex justify-center py-12"><LoadingSpinner size="lg" text="Generating suggestions..." /></div>}
      {result && !loading && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Overlay JSON</h3>
            <div className="p-6 bg-gray-50 rounded-lg"><pre className="text-sm overflow-auto">{JSON.stringify(result.overlay_json, null, 2)}</pre></div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Notes</h3>
            <div className="p-6 bg-gray-50 rounded-lg"><p className="whitespace-pre-wrap">{result.notes}</p></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperimentReplicator;
