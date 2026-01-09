import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { GitBranch } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';
import { researchAPI } from '../../services/api';

const MethodologyBuilder = () => {
  const [formData, setFormData] = useState({
    concept: '',
    datasets: '',
    baselines: '',
    constraints: '{}'
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await researchAPI.buildMethodology({
        concept: formData.concept,
        datasets: formData.datasets.split(',').map(s => s.trim()).filter(s => s),
        baselines: formData.baselines.split(',').map(s => s.trim()).filter(s => s),
        constraints: JSON.parse(formData.constraints || '{}')
      });
      setResult(response.data);
      toast.success('Methodology built!');
    } catch (error) {
      toast.error('Failed to build methodology');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Methodology Builder</h2>
        <p className="text-gray-600">Design step-by-step research methodologies</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Concept</label>
          <input type="text" value={formData.concept} onChange={(e) => setFormData({...formData, concept: e.target.value})} className="input-field" placeholder="e.g., Federated Learning for Healthcare" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Datasets (comma-separated)</label>
          <input type="text" value={formData.datasets} onChange={(e) => setFormData({...formData, datasets: e.target.value})} className="input-field" placeholder="MIMIC-III, ChestX-ray14" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Baselines (comma-separated)</label>
          <input type="text" value={formData.baselines} onChange={(e) => setFormData({...formData, baselines: e.target.value})} className="input-field" placeholder="ResNet, VGG" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Constraints (JSON)</label>
          <textarea value={formData.constraints} onChange={(e) => setFormData({...formData, constraints: e.target.value})} rows={3} className="input-field resize-none font-mono text-sm" placeholder='{"budget": "low", "time": "6 months"}' />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? <LoadingSpinner size="sm" /> : <><GitBranch className="w-5 h-5 inline mr-2" />Build Methodology</>}
        </button>
      </form>
      {loading && <div className="flex justify-center py-12"><LoadingSpinner size="lg" text="Building methodology..." /></div>}
      {result && !loading && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Flowchart</h3>
            <div className="p-6 bg-gray-50 rounded-lg">
              <pre className="text-sm overflow-auto">{JSON.stringify(result.flowchart_json, null, 2)}</pre>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Rationale</h3>
            <div className="p-6 bg-gray-50 rounded-lg"><p className="whitespace-pre-wrap">{result.rationale}</p></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MethodologyBuilder;
