
import React, { useRef, useState, useEffect } from 'react';
import { RowData, Stitch } from '../types';
import { STITCH_SYMBOLS } from '../constants';

interface VisualizerProps {
  data: RowData[];
}

const Visualizer: React.FC<VisualizerProps> = ({ data }) => {
  const [viewBox, setViewBox] = useState("-200 -200 800 600");
  const containerRef = useRef<HTMLDivElement>(null);

  // Automatically adjust viewBox based on stitch positions
  useEffect(() => {
    if (data.length === 0) return;
    
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    data.forEach(row => {
      row.stitches.forEach(s => {
        minX = Math.min(minX, s.x);
        minY = Math.min(minY, s.y);
        maxX = Math.max(maxX, s.x);
        maxY = Math.max(maxY, s.y);
      });
    });

    // Provide a comfortable margin around the tight grid
    const padding = 80;
    const width = (maxX - minX) + padding * 2;
    const height = (maxY - minY) + padding * 2;
    setViewBox(`${minX - padding} ${minY - padding} ${Math.max(width, 400)} ${Math.max(height, 400)}`);
  }, [data]);

  return (
    <div ref={containerRef} className="w-full h-full bg-[#fdfdfd] relative overflow-hidden flex items-center justify-center">
      {data.length === 0 ? (
        <div className="text-center p-8 max-w-md">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
            <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Pattern Visualizer Ready</h3>
          <p className="mt-2 text-sm text-gray-500">Paste or type your crochet instructions. The layout engine will automatically stack rows from the bottom up.</p>
        </div>
      ) : (
        <svg 
          viewBox={viewBox} 
          className="w-full h-full cursor-grab active:cursor-grabbing transition-all duration-700 ease-in-out"
        >
          {/* Subtle Grid / Foundation Reference */}
          <line x1="-1000" y1="0" x2="1000" y2="0" stroke="#f1f5f9" strokeWidth="2" />

          {/* Draw connection lines between stitches in the same row */}
          {data.map((row) => (
            <path
              key={`path-${row.number}`}
              d={row.stitches.map((s, i) => `${i === 0 ? 'M' : 'L'} ${s.x} ${s.y}`).join(' ')}
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="0.5"
              strokeDasharray="2 2"
              className="opacity-40"
            />
          ))}

          {/* Draw the stitches */}
          {data.map((row) => (
            <g key={`row-${row.number}`}>
              {row.stitches.map((stitch) => (
                <g 
                  key={stitch.id} 
                  transform={`translate(${stitch.x}, ${stitch.y}) rotate(${stitch.angle || 0})`}
                  className="text-slate-800 hover:text-indigo-600 transition-colors duration-200"
                >
                  <title>{`${stitch.type.toUpperCase()} (Row ${row.number}, Index ${stitch.index})`}</title>
                  {STITCH_SYMBOLS[stitch.type] || STITCH_SYMBOLS.sc}
                </g>
              ))}
            </g>
          ))}
        </svg>
      )}

      {/* Symbol Legend Overlay */}
      <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm shadow-2xl border border-gray-200 p-5 rounded-2xl text-[10px] flex flex-col gap-3 max-h-[70%] overflow-y-auto">
        <span className="font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 pb-2">Stitch Key</span>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          {Object.entries(STITCH_SYMBOLS).map(([type, symbol]) => (
            <div key={type} className="flex items-center gap-3 group">
              <svg width="24" height="24" viewBox="-15 -15 30 30" className="text-slate-400 group-hover:text-indigo-600 transition-colors">
                {symbol}
              </svg>
              <span className="capitalize font-semibold text-gray-600 group-hover:text-gray-900">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
