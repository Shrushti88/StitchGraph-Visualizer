import React from 'react';
import { StitchType } from './types';

export const STITCH_SYMBOLS: Record<StitchType, React.ReactNode> = {
  /* ========= BASIC ========= */

  [StitchType.CH]: (
    <ellipse cx="0" cy="0" rx="8" ry="4" fill="none" stroke="currentColor" strokeWidth="2" />
  ),

  // sc → +
  [StitchType.SC]: (
    <g stroke="currentColor" strokeWidth="2">
      <line x1="-6" y1="0" x2="6" y2="0" />
      <line x1="0" y1="-6" x2="0" y2="6" />
    </g>
  ),

  // hdc → T
  [StitchType.HDC]: (
    <g stroke="currentColor" strokeWidth="2">
      <line x1="0" y1="-12" x2="0" y2="12" />
      <line x1="-6" y1="-12" x2="6" y2="-12" />
    </g>
  ),

  // dc → T with 1 slash
  [StitchType.DC]: (
    <g stroke="currentColor" strokeWidth="2">
      <line x1="0" y1="-14" x2="0" y2="14" />
      <line x1="-6" y1="-14" x2="6" y2="-14" />
      <line x1="-4" y1="0" x2="4" y2="-4" />
    </g>
  ),

  // tr → T with 2 slashes
  [StitchType.TR]: (
    <g stroke="currentColor" strokeWidth="2">
      <line x1="0" y1="-16" x2="0" y2="16" />
      <line x1="-6" y1="-16" x2="6" y2="-16" />
      <line x1="-4" y1="2" x2="4" y2="-2" />
      <line x1="-4" y1="-4" x2="4" y2="-8" />
    </g>
  ),

  [StitchType.SLST]: (
    <circle cx="0" cy="0" r="3" fill="currentColor" />
  ),

  /* ========= MAGIC RING ========= */

  [StitchType.MR]: (
    <path
      d="M0,0
         m-6,0
         a6,6 0 1,1 6,6
         a4,4 0 1,0 -4,-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  ),

  /* ========= INCREASES ========= */

  [StitchType.SC2INC]: (
    <g stroke="currentColor" strokeWidth="2">
      <path d="M-6,6 L0,0 L6,6" fill="none" />
      <line x1="-2" y1="-4" x2="2" y2="4" />
    </g>
  ),

  [StitchType.SC3INC]: (
    <g stroke="currentColor" strokeWidth="2">
      <path d="M-8,6 L0,-2 L8,6" fill="none" />
      <line x1="-4" y1="-6" x2="0" y2="2" />
      <line x1="4" y1="-6" x2="0" y2="2" />
    </g>
  ),

  [StitchType.DC2INC]: (
    <g stroke="currentColor" strokeWidth="2">
      <path d="M-6,8 L0,0 L6,8" fill="none" />
      <line x1="-2" y1="-8" x2="2" y2="8" />
    </g>
  ),

  [StitchType.DC3INC]: (
    <g stroke="currentColor" strokeWidth="2">
      <path d="M-8,10 L0,0 L8,10" fill="none" />
      <line x1="-4" y1="-10" x2="0" y2="6" />
      <line x1="4" y1="-10" x2="0" y2="6" />
    </g>
  ),

  /* ========= DECREASES ========= */

  [StitchType.SC2TOG]: (
    <path d="M-6,-6 L0,6 L6,-6" fill="none" stroke="currentColor" strokeWidth="2" />
  ),

  [StitchType.SC3TOG]: (
    <g stroke="currentColor" strokeWidth="2">
      <path d="M-8,-6 L0,6 L8,-6" fill="none" />
      <line x1="-4" y1="-6" x2="0" y2="2" />
      <line x1="4" y1="-6" x2="0" y2="2" />
    </g>
  ),

  [StitchType.DC2TOG]: (
    <path d="M-6,-8 L0,8 L6,-8" fill="none" stroke="currentColor" strokeWidth="2" />
  ),

  [StitchType.DC3TOG]: (
    <g stroke="currentColor" strokeWidth="2">
      <path d="M-8,-10 L0,8 L8,-10" fill="none" />
      <line x1="-4" y1="-10" x2="0" y2="4" />
      <line x1="4" y1="-10" x2="0" y2="4" />
    </g>
  ),
};

/* ========= HEIGHTS ========= */

export const STITCH_HEIGHTS: Record<StitchType, number> = {
  [StitchType.CH]: 10,
  [StitchType.SLST]: 6,
  [StitchType.SC]: 18,
  [StitchType.HDC]: 22,
  [StitchType.DC]: 30,
  [StitchType.TR]: 40,

  [StitchType.MR]: 12,

  [StitchType.SC2INC]: 20,
  [StitchType.SC3INC]: 22,
  [StitchType.DC2INC]: 30,
  [StitchType.DC3INC]: 34,

  [StitchType.SC2TOG]: 18,
  [StitchType.SC3TOG]: 20,
  [StitchType.DC2TOG]: 28,
  [StitchType.DC3TOG]: 32,
};

export const STITCH_SPACING = 30;
export const DEFAULT_ROW_HEIGHT = 20;
