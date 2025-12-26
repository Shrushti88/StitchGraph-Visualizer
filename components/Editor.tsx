
import React from 'react';

interface EditorProps {
  value: string;
  onChange: (val: string) => void;
  onParse: () => void;
  isLoading: boolean;
}

const Editor: React.FC<EditorProps> = ({ value, onChange, onParse, isLoading }) => {
  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 shadow-sm">
      {/* Clean Header - Switched from gray-50 to white for cleaner document feel */}
      <div className="p-5 border-b border-gray-100 bg-white flex justify-between items-center">
        <div>
          <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.15em]">Pattern Editor</h2>
          <p className="text-[10px] text-slate-400 font-medium">Standard Crochet Notation</p>
        </div>
        <button 
          onClick={onParse}
          disabled={isLoading}
          className={`px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
            isLoading 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md active:scale-95 shadow-sm'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Parsing...
            </span>
          ) : 'Generate Chart'}
        </button>
      </div>

      {/* Input Area - Pure white with high contrast slate-950 text */}
      <div className="flex-1 p-0 relative bg-white">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter instructions e.g., 'Row 1: 10 sc, turn. Row 2: 10 dc...'"
          className="w-full h-full p-8 text-slate-950 font-mono text-[15px] leading-relaxed resize-none bg-white focus:outline-none placeholder:text-slate-300"
          spellCheck={false}
        />
        
        {/* Contextual Tip Box */}
        <div className="absolute bottom-6 left-6 right-6 p-4 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 leading-normal flex gap-3 items-start">
          <div className="mt-0.5 text-indigo-500">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <strong className="text-slate-700 block mb-0.5">Quick Guide</strong>
            Use standard abbreviations like <code className="bg-white px-1 rounded border border-slate-200 text-indigo-600 font-bold">ch</code>, <code className="bg-white px-1 rounded border border-slate-200 text-indigo-600 font-bold">sc</code>, <code className="bg-white px-1 rounded border border-slate-200 text-indigo-600 font-bold">dc</code>, and <code className="bg-white px-1 rounded border border-slate-200 text-indigo-600 font-bold">inc</code>. The engine supports both rows and rounds.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
