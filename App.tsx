
import React, { useState, useCallback } from 'react';
import Editor from './components/Editor';
import Visualizer from './components/Visualizer';
import { RowData } from './types';
import { parsePatternWithAI } from './services/geminiService';
import { calculateLayout } from './services/layoutEngine';

const DEFAULT_PATTERN = `Row 1: 10 ch.
Row 2: 10 sc.
Row 3: 10 dc.`;

const App: React.FC = () => {
  const [patternText, setPatternText] = useState(DEFAULT_PATTERN);
  const [layoutData, setLayoutData] = useState<RowData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'visualizer' | 'architecture'>('visualizer');

  const handleParse = useCallback(async () => {
    if (!patternText.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
  console.log("RAW PATTERN INPUT:");
  console.log(patternText);

  const parsed = await parsePatternWithAI(patternText);

  console.log("PARSED RESPONSE FROM GEMINI:");
  console.log(parsed);

  console.log("PARSED ROWS:");
  console.log(parsed?.rows);

  const layout = calculateLayout(parsed.rows);

  console.log("LAYOUT DATA:");
  console.log(layout);

  setLayoutData(layout);
}
 catch (err: any) {
      console.error(err);
      setError("Failed to parse pattern. Please check your instructions and try again.");
    } finally {
      setIsLoading(false);
    }
  }, [patternText]);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="h-16 border-b border-gray-200 px-6 flex items-center justify-between bg-white z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">StitchGraph</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Crochet Pattern Visualizer</p>
          </div>
        </div>
        
        <nav className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('visualizer')}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${activeTab === 'visualizer' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Visualizer
          </button>
          <button 
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${activeTab === 'architecture' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Project Brief
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <a href="https://github.com" target="_blank" className="text-gray-400 hover:text-indigo-600 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        {activeTab === 'visualizer' ? (
          <>
            <div className="w-1/3 min-w-[320px]">
              <Editor 
                value={patternText} 
                onChange={setPatternText} 
                onParse={handleParse}
                isLoading={isLoading}
              />
            </div>
            <div className="flex-1 relative">
              {error && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm shadow-lg flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                  {error}
                </div>
              )}
              <Visualizer data={layoutData} />
            </div>
          </>
        ) : (
          <div className="flex-1 overflow-y-auto p-12 bg-white max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">StitchGraph Project Brief</h2>
            
            <section className="mb-10">
              <h3 className="text-lg font-bold text-indigo-600 uppercase tracking-wider mb-3">Restatement of the Problem</h3>
              <p className="text-gray-600 leading-relaxed">
                StitchGraph addresses the "abstraction gap" in crochet. Beginners often find textual instructions (like "dc 5, inc in next, turn") difficult to spatialize. Existing tools are either purely textual or require painstaking manual drawing. My solution bridges this gap by creating an <strong>Automated Semantic Mapper</strong> that converts DSL (Domain Specific Language) crochet patterns into a real-time, 2D vector-based stitch diagram.
              </p>
            </section>

            <section className="mb-10">
              <h3 className="text-lg font-bold text-indigo-600 uppercase tracking-wider mb-3">Technical Components</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <h4 className="font-bold text-gray-800 mb-2">1. The NLP Parser (Gemini)</h4>
                  <p className="text-sm text-gray-600">Since human crochet patterns are inconsistently formatted, we use Gemini 3 Flash to "normalize" raw text into a strict JSON Intermediate Representation (IR).</p>
                </div>
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <h4 className="font-bold text-gray-800 mb-2">2. The Topology Engine</h4>
                  <p className="text-sm text-gray-600">The core layout logic that calculates X/Y coordinates. It must differentiate between linear growth (rows) and radial growth (rounds).</p>
                </div>
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <h4 className="font-bold text-gray-800 mb-2">3. Symbol Renderer</h4>
                  <p className="text-sm text-gray-600">A React/SVG component library that maps stitch types (sc, dc, tr) to standard crochet diagram icons with proper rotation.</p>
                </div>
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <h4 className="font-bold text-gray-800 mb-2">4. State Management</h4>
                  <p className="text-sm text-gray-600">A reactive loop that triggers re-parsing and re-rendering whenever the user pauses their typing.</p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h3 className="text-lg font-bold text-indigo-600 uppercase tracking-wider mb-3">Hardest Challenges</h3>
              <ul className="list-disc pl-5 space-y-4 text-gray-600">
                <li><strong className="text-gray-800">Recursive Geometry:</strong> Stitches like "Increase" (2 stitches worked into 1 base) create fan-like structures that complicate a simple grid layout.</li>
                <li><strong className="text-gray-800">Physical Accuracy:</strong> Unlike code, crochet is 3D. A flat 2D diagram often distorts the actual shape. Transitioning from "Logical Layout" to "Visual Layout" is non-trivial.</li>
                <li><strong className="text-gray-800">Messy Inputs:</strong> Abbreviations vary by region (UK vs US). The parser must be robust enough to handle "sc" vs "dc" contextually.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-indigo-600 uppercase tracking-wider mb-3">MVP Roadmap</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <p className="text-gray-600"><span className="font-bold text-gray-800">Phase 1 (Current):</span> Basic 2D layout for linear rows and circular rounds using simplified geometric assumptions.</p>
                </div>
                <div className="flex items-start gap-4 text-gray-400">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <p><span className="font-bold text-gray-500">Phase 2:</span> Interactive "Stitch Inspection" (hovering over a stitch highlights the base stitch it was worked into).</p>
                </div>
                <div className="flex items-start gap-4 text-gray-400">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <p><span className="font-bold text-gray-500">Phase 3:</span> Force-directed graph physics to simulate how stitches pull on each other for organic shapes.</p>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer Info */}
      <footer className="h-8 border-t border-gray-100 px-6 flex items-center justify-between text-[10px] text-gray-400 font-medium bg-gray-50">
        <div className="flex gap-4">
          <span>&copy; 2024 StitchGraph Studio</span>
          <span>Version 0.1.0-Alpha</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
          <span>Gemini-3-Flash Engine Active</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
