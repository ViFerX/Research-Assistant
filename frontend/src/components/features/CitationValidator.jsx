import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { CheckCircle } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';
import { researchAPI } from '../../services/api';

const CitationValidator = () => {
  const [draftMarkdown, setDraftMarkdown] = useState('');
  const [style, setStyle] = useState('IEEE');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await researchAPI.validateCitation({ draft_markdown: draftMarkdown, style });
      setResult(response.data);
      toast.success('Validation complete!');
    } catch (error) {
      toast.error('Validation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Citation Validator</h2>
        <p className="text-gray-600">Validate citations and reference formats</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Draft Markdown</label>
          <textarea value={draftMarkdown} onChange={(e) => setDraftMarkdown(e.target.value)} rows={8} className="input-field resize-none font-mono text-sm" placeholder="Paste your markdown with citations..." required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Citation Style</label>
          <select value={style} onChange={(e) => setStyle(e.target.value)} className="input-field">
            <option value="IEEE">IEEE</option>
            <option value="APA">APA</option>
            <option value="Harvard">Harvard</option>
            <option value="MLA">MLA</option>
          </select>
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? <LoadingSpinner size="sm" /> : <><CheckCircle className="w-5 h-5 inline mr-2" />Validate</>}
        </button>
      </form>
      {loading && <div className="flex justify-center py-12"><LoadingSpinner size="lg" text="Validating..." /></div>}
      {result && !loading && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Annotated Markdown</h3>
            <div className="p-6 bg-gray-50 rounded-lg"><pre className="text-sm overflow-auto whitespace-pre-wrap">{result.annotated_markdown}</pre></div>
          </div>
          {result.references && result.references.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4">References</h3>
              <div className="p-6 bg-gray-50 rounded-lg space-y-2">
                {result.references.map((ref, index) => (
                  <p key={index} className="text-sm">{ref}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CitationValidator;
