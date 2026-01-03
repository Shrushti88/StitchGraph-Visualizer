import { Stitch, StitchType, RowData } from '../types';
import { STITCH_SPACING, STITCH_HEIGHTS, DEFAULT_ROW_HEIGHT } from '../constants';

/**
 * Advanced Layout Engine
 * Converts a sequence of rows/stitches into 2D coordinates.
 * Features:
 * 1. Bottom-up vertical stacking (Row 1 at bottom).
 * 2. Proportional vertical spacing based on stitch heights.
 * 3. Zig-zagging linear rows to simulate turning work.
 * 4. Span-aware placement for inc/dec stitches.
 */
export function calculateLayout(patternData: any[]): RowData[] {
  const layout: RowData[] = [];
  let currentY = 0;
  
  patternData.forEach((rowData, rIdx) => {
    const stitches: Stitch[] = [];
    const isRound = rowData.isRound || false;
    const stitchTypes: string[] = rowData.stitches;

    // ---- Row height calculation ----
    let maxStitchHeight = 0;
    stitchTypes.forEach(type => {
      const h = STITCH_HEIGHTS[type as StitchType] || DEFAULT_ROW_HEIGHT;
      if (h > maxStitchHeight) maxStitchHeight = h;
    });

    if (rIdx > 0) {
      let prevMaxHeight = DEFAULT_ROW_HEIGHT;
      const prevRowStitches = patternData[rIdx - 1].stitches;

      prevRowStitches.forEach((t: string) => {
        const h = STITCH_HEIGHTS[t as StitchType] || DEFAULT_ROW_HEIGHT;
        if (h > prevMaxHeight) prevMaxHeight = h;
      });

      currentY -= (prevMaxHeight / 2 + maxStitchHeight / 2);
    }

    // ---- NEW: logical cursor for horizontal spacing ----
    let cursor = 0;

    stitchTypes.forEach((type, sIdx) => {
      let x = 0;
      let y = currentY;
      let angle = 0;

      // Default span = 1 (normal stitch)
      const span =
        type.includes('2tog') ? 2 :
        type.includes('3tog') ? 3 :
        type.includes('inc') ? 1 :
        1;

      if (isRound) {
        const radius = Math.abs(currentY) + 40;
        angle = (cursor / stitchTypes.length) * 2 * Math.PI;
        x = radius * Math.cos(angle);
        y = radius * Math.sin(angle);
      } else {
        const isForwardRow = rIdx % 2 === 0;
        const xOffset = isForwardRow ? cursor : (stitchTypes.length - cursor - span);
        x = xOffset * STITCH_SPACING;
      }

      stitches.push({
        id: `r${rIdx}-s${sIdx}`,
        type: type as StitchType,
        row: rowData.rowNumber || rIdx + 1,
        index: sIdx,
        x,
        y,
        angle: isRound ? (angle * 180) / Math.PI : 0
      });

      // ---- move cursor AFTER placing stitch ----
      cursor += span;
    });

    layout.push({
      number: rowData.rowNumber || rIdx + 1,
      stitches,
      type: isRound ? 'round' : 'row'
    });
  });

  return layout;
}
