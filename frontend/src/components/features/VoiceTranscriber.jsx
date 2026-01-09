import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Mic } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';
import { researchAPI } from '../../services/api';

const VoiceTranscriber = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    try {
      const response = await researchAPI.transcribeVoice(file);
      setResult(response.data);
      toast.success('Transcription complete!');
    } catch (error) {
      toast.error('Transcription failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Voice Transcriber</h2>
        <p className="text-gray-600">Transcribe audio recordings to text</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
          <Mic className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <input type="file" id="audio-upload" className="hidden" onChange={(e) => setFile(e.target.files[0])} accept="audio/*,.mp3,.wav,.m4a" />
          <label htmlFor="audio-upload" className="cursor-pointer inline-block btn-primary">Choose Audio File</label>
          {file && <p className="text-gray-600 mt-4">Selected: {file.name}</p>}
          <p className="text-gray-500 mt-4">Supported: MP3, WAV, M4A</p>
        </div>
        <button type="submit" disabled={loading || !file} className="btn-primary w-full">
          {loading ? <LoadingSpinner size="sm" /> : <><Mic className="w-5 h-5 inline mr-2" />Transcribe Audio</>}
        </button>
      </form>
      {loading && <div className="flex justify-center py-12"><LoadingSpinner size="lg" text="Transcribing..." /></div>}
      {result && !loading && (
        <div>
          <h3 className="text-xl font-bold mb-4">Transcript</h3>
          <div className="p-6 bg-gray-50 rounded-lg">
            <p className="whitespace-pre-wrap">{result.transcript}</p>
          </div>
          <button onClick={() => { navigator.clipboard.writeText(result.transcript); toast.success('Copied!'); }} className="mt-4 btn-secondary">Copy to Clipboard</button>
        </div>
      )}
    </div>
  );
};

export default VoiceTranscriber;
