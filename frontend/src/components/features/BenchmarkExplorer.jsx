import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BarChart3 } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';
import { researchAPI } from '../../services/api';

const BenchmarkExplorer = () => {
  const [formData, setFormData] = useState({ taskType: '', datasets: '', constraints: '{}' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await researchAPI.recommendBenchmark({
        task_type: formData.taskType,
        datasets: formData.datasets.split(',').map(d => d.trim()).filter(d => d),
        constraints: JSON.parse(formData.constraints || '{}')
      });
      setResult(response.data);
      toast.success('Benchmark recommendations generated!');
    } catch (error) {
      toast.error('Failed to generate recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Benchmark Explorer</h2>
        <p className="text-gray-600">Recommend evaluation metrics for your experiments</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Task Type</label>
          <input type="text" value={formData.taskType} onChange={(e) => setFormData({...formData, taskType: e.target.value})} className="input-field" placeholder="e.g., classification, generation" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Datasets (comma-separated)</label>
          <input type="text" value={formData.datasets} onChange={(e) => setFormData({...formData, datasets: e.target.value})} className="input-field" placeholder="ImageNet, COCO" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Constraints (JSON)</label>
          <textarea value={formData.constraints} onChange={(e) => setFormData({...formData, constraints: e.target.value})} rows={3} className="input-field resize-none font-mono text-sm" placeholder='{}' />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? <LoadingSpinner size="sm" /> : <><BarChart3 className="w-5 h-5 inline mr-2" />Suggest Metrics</>}
        </button>
      </form>
      {loading && <div className="flex justify-center py-12"><LoadingSpinner size="lg" text="Analyzing benchmarks..." /></div>}
      {result && !loading && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Recommended Metrics</h3>
            <div className="space-y-3">
              {result.metrics?.map((metric, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold">{metric.name}</h4>
                  <p className="text-sm text-gray-600">Direction: {metric.direction}</p>
                  {metric.equation && <code className="text-xs bg-gray-200 px-2 py-1 rounded">{metric.equation}</code>}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Guidance</h3>
            <div className="p-6 bg-gray-50 rounded-lg"><p className="whitespace-pre-wrap">{result.guidance}</p></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BenchmarkExplorer;
