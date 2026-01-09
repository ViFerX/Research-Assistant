import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Sparkles } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';
import { researchAPI } from '../../services/api';

const CrossDomainSynth = () => {
  const [draftText, setDraftText] = useState('');
  const [domains, setDomains] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await researchAPI.suggestCrossDomain({
        draft_text: draftText,
        target_domains: domains.split(',').map(d => d.trim()).filter(d => d)
      });
      setResult(response.data);
      toast.success('Cross-domain synthesis completed!');
    } catch (error) {
      toast.error('Failed to generate synthesis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Cross-Domain Synthesizer</h2>
        <p className="text-gray-600">Build interdisciplinary research connections</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Research Summary</label>
          <textarea value={draftText} onChange={(e) => setDraftText(e.target.value)} rows={6} className="input-field resize-none" placeholder="Paste your research summary..." required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Target Domains (comma-separated)</label>
          <input type="text" value={domains} onChange={(e) => setDomains(e.target.value)} className="input-field" placeholder="medicine, AI, policy" required />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? <LoadingSpinner size="sm" /> : <><Sparkles className="w-5 h-5 inline mr-2" />Generate Synthesis</>}
        </button>
      </form>
      {loading && <div className="flex justify-center py-12"><LoadingSpinner size="lg" text="Synthesizing..." /></div>}
      {result && !loading && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Domain Mappings</h3>
            {result.mappings?.map((mapping, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg mb-4">
                <h4 className="font-bold text-lg mb-2">{mapping.domain}</h4>
                <div className="space-y-2">
                  <div><strong>Applications:</strong> {mapping.applications?.join(', ')}</div>
                  <div><strong>Risks:</strong> {mapping.risks?.join(', ')}</div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Narrative</h3>
            <div className="p-6 bg-gray-50 rounded-lg"><p className="whitespace-pre-wrap">{result.narrative}</p></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrossDomainSynth;
