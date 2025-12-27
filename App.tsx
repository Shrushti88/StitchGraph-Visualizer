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
  const [activeTab, setActiveTab] =
    useState<'visualizer' | 'architecture'>('visualizer');

  const handleParse = useCallback(async () => {
    if (!patternText.trim()) return;

    setIsLoading(true);
    setError(null);

    console.group("🧶 StitchGraph Parse Cycle");
    console.log("RAW INPUT:", patternText);

    try {
      const parsed = await parsePatternWithAI(patternText);

      console.log("PARSED AI OUTPUT:", parsed);

      if (!parsed || !Array.isArray(parsed.rows)) {
        throw new Error("Invalid AI response: rows missing or malformed");
      }

      console.log("ROWS SENT TO LAYOUT:", parsed.rows);

      const layout = calculateLayout(parsed.rows);

      console.log("FINAL LAYOUT DATA:", layout);

      setLayoutData(layout);
    } catch (err: any) {
      console.error("❌ PARSE FAILURE:", err);

      setError(
        err?.message ||
          "Failed to parse pattern. Check format or Gemini output."
      );

      // 🔁 TEMP FALLBACK (so you SEE something)
      console.warn("⚠ Using fallback parser");

      const fallbackRows = [
        { rowNumber: 1, stitches: Array(10).fill("ch"), isRound: false },
        { rowNumber: 2, stitches: Array(10).fill("sc"), isRound: false },
        { rowNumber: 3, stitches: Array(10).fill("dc"), isRound: false }
      ];

      setLayoutData(calculateLayout(fallbackRows));
    } finally {
      console.groupEnd();
      setIsLoading(false);
    }
  }, [patternText]);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="h-16 border-b border-gray-200 px-6 flex items-center justify-between bg-white">
        <h1 className="font-bold">StitchGraph</h1>

        <nav className="flex gap-2">
          <button onClick={() => setActiveTab('visualizer')}>Visualizer</button>
          <button onClick={() => setActiveTab('architecture')}>Project</button>
        </nav>
      </header>

      <main className="flex flex-1 overflow-hidden">
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
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-100 text-red-700 px-4 py-2 rounded">
                  {error}
                </div>
              )}
              <Visualizer data={layoutData} />
            </div>
          </>
        ) : (
          <div className="p-12">Architecture view</div>
        )}
      </main>
    </div>
  );
};

export default App;
