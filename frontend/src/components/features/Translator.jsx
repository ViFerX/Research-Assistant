// Translator.jsx
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Globe } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';
import { researchAPI } from '../../services/api';

const Translator = ({ uploadedFiles }) => {
  const [documentId, setDocumentId] = useState('');
  const [targetLang, setTargetLang] = useState('en');
  const [full, setFull] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await researchAPI.translate({
        document_id: parseInt(documentId),
        target_lang: targetLang,
        full
      });
      setResult(response.data);
      toast.success('Translation completed!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Translation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Multi-Language Translator</h2>
        <p className="text-gray-600">Translate research papers to multiple languages</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Document</label>
          <select
            value={documentId}
            onChange={(e) => setDocumentId(e.target.value)}
            required
            className="input-field"
          >
            <option value="">Select a document</option>
            {uploadedFiles.map(file => (
              <option key={file.document_id} value={file.document_id}>
                {file.filename}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Target Language</label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="input-field"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
              <option value="ja">Japanese</option>
              <option value="hi">Hindi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Translation</label>
            <div className="flex items-center h-12">
              <input
                type="checkbox"
                checked={full}
                onChange={(e) => setFull(e.target.checked)}
                className="w-5 h-5 text-primary-600"
              />
              <span className="ml-2 text-gray-700">Translate entire document</span>
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? <LoadingSpinner size="sm" /> : <><Globe className="w-5 h-5 inline mr-2" />Translate</>}
        </button>
      </form>

      {loading && <div className="flex justify-center py-12"><LoadingSpinner size="lg" text="Translating..." /></div>}

      {result && !loading && (
        <div>
          <h3 className="text-xl font-bold mb-4">Translated Text</h3>
          <div className="p-6 bg-gray-50 rounded-lg max-h-96 overflow-y-auto">
            <p className="whitespace-pre-wrap">{result.translated_text}</p>
          </div>
          {result.download_url && (
            <a href={result.download_url} className="btn-secondary mt-4 inline-block">Download Translation</a>
          )}
        </div>
      )}
    </div>
  );
};

export default Translator;
