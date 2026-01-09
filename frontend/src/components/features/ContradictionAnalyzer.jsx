import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Shield } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';
import { researchAPI } from '../../services/api';

const ContradictionAnalyzer = () => {
  const [formData, setFormData] = useState({ methodologyText: '', resultsText: '', domain: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await researchAPI.scanContradiction({
        methodology_text: formData.methodologyText,
        results_text: formData.resultsText,
        domain: formData.domain
      });
      setResult(response.data);
      toast.success('Analysis complete!');
    } catch (error) {
      toast.error('Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Contradiction Analyzer</h2>
        <p className="text-gray-600">Detect conflicting claims in research papers</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Methodology Text</label>
          <textarea value={formData.methodologyText} onChange={(e) => setFormData({...formData, methodologyText: e.target.value})} rows={4} className="input-field resize-none" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Results Text</label>
          <textarea value={formData.resultsText} onChange={(e) => setFormData({...formData, resultsText: e.target.value})} rows={4} className="input-field resize-none" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Domain</label>
          <input type="text" value={formData.domain} onChange={(e) => setFormData({...formData, domain: e.target.value})} className="input-field" placeholder="e.g., Machine Learning" required />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? <LoadingSpinner size="sm" /> : <><Shield className="w-5 h-5 inline mr-2" />Analyze</>}
        </button>
      </form>
      {loading && <div className="flex justify-center py-12"><LoadingSpinner size="lg" text="Analyzing..." /></div>}
      {result && !loading && (
        <div>
          <h3 className="text-xl font-bold text-red-700 mb-4">Conflicts Detected</h3>
          {result.conflicts && result.conflicts.length > 0 ? (
            <div className="space-y-3">
              {result.conflicts.map((conflict, index) => (
                <div key={index} className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start space-x-3">
                  <span className="text-2xl">⚠️</span>
                  <p className="text-gray-800">{conflict.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 bg-green-50 rounded-lg text-center">
              <p className="text-green-700 font-medium">No contradictions detected!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContradictionAnalyzer;
