
import React from 'react';
import { StitchType } from './types';

export const STITCH_SYMBOLS: Record<StitchType, React.ReactNode> = {
  [StitchType.CH]: (
    <ellipse cx="0" cy="0" rx="8" ry="4" fill="none" stroke="currentColor" strokeWidth="2" />
  ),
  [StitchType.SC]: (
    <path d="M-6,-6 L6,6 M-6,6 L6,-6" fill="none" stroke="currentColor" strokeWidth="2" />
  ),
  [StitchType.DC]: (
    <g>
      <line x1="0" y1="-12" x2="0" y2="12" stroke="currentColor" strokeWidth="2" />
      <line x1="-4" y1="0" x2="4" y2="-4" stroke="currentColor" strokeWidth="2" />
    </g>
  ),
  [StitchType.HDC]: (
    <g>
      <line x1="0" y1="-10" x2="0" y2="10" stroke="currentColor" strokeWidth="2" />
      <line x1="-5" y1="-10" x2="5" y2="-10" stroke="currentColor" strokeWidth="2" />
    </g>
  ),
  [StitchType.TR]: (
    <g>
      <line x1="0" y1="-15" x2="0" y2="15" stroke="currentColor" strokeWidth="2" />
      <line x1="-4" y1="4" x2="4" y2="0" stroke="currentColor" strokeWidth="2" />
      <line x1="-4" y1="-4" x2="4" y2="-8" stroke="currentColor" strokeWidth="2" />
    </g>
  ),
  [StitchType.SLST]: (
    <circle cx="0" cy="0" r="3" fill="currentColor" />
  ),
  [StitchType.INC]: (
    <g>
       <path d="M-6,6 L0,0 L6,6" fill="none" stroke="currentColor" strokeWidth="2" />
       <circle cx="0" cy="0" r="2" fill="currentColor" />
    </g>
  ),
  [StitchType.DEC]: (
    <g>
       <path d="M-6,-6 L0,0 L6,-6" fill="none" stroke="currentColor" strokeWidth="2" />
       <circle cx="0" cy="0" r="2" fill="currentColor" />
    </g>
  ),
};

// Physical heights for layout calculations
export const STITCH_HEIGHTS: Record<StitchType, number> = {
  [StitchType.CH]: 10,
  [StitchType.SLST]: 6,
  [StitchType.SC]: 18,
  [StitchType.HDC]: 22,
  [StitchType.DC]: 30,
  [StitchType.TR]: 40,
  [StitchType.INC]: 20,
  [StitchType.DEC]: 20,
};

export const STITCH_SPACING = 30;
export const DEFAULT_ROW_HEIGHT = 20;
