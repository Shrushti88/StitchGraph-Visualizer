
import { Stitch, StitchType, RowData } from '../types';
import { STITCH_SPACING, STITCH_HEIGHTS, DEFAULT_ROW_HEIGHT } from '../constants';

/**
 * Advanced Layout Engine
 * Converts a sequence of rows/stitches into 2D coordinates.
 * Features:
 * 1. Bottom-up vertical stacking (Row 1 at bottom).
 * 2. Proportional vertical spacing based on stitch heights.
 * 3. Zig-zagging linear rows to simulate turning work.
 */
export function calculateLayout(patternData: any[]): RowData[] {
  const layout: RowData[] = [];
  let currentY = 0; // Cumulative Y position (moving up, so we'll subtract)
  
  patternData.forEach((rowData, rIdx) => {
    const stitches: Stitch[] = [];
    const isRound = rowData.isRound || false;
    const stitchTypes: string[] = rowData.stitches;

    // Determine the height of this specific row
    let maxStitchHeight = 0;
    stitchTypes.forEach(type => {
      const h = STITCH_HEIGHTS[type as StitchType] || DEFAULT_ROW_HEIGHT;
      if (h > maxStitchHeight) maxStitchHeight = h;
    });

    // For the very first row, we anchor its center at Y=0.
    // For subsequent rows, we move up by the average of the heights
    // to ensure they "sit" on top of the previous row.
    if (rIdx > 0) {
      // Find previous row max height
      let prevMaxHeight = DEFAULT_ROW_HEIGHT;
      const prevRowStitches = patternData[rIdx - 1].stitches;
      prevRowStitches.forEach((t: string) => {
        const h = STITCH_HEIGHTS[t as StitchType] || DEFAULT_ROW_HEIGHT;
        if (h > prevMaxHeight) prevMaxHeight = h;
      });

      // Offset is half of previous + half of current to make them touch
      // We subtract because in SVG, lower Y is "higher" on screen.
      currentY -= (prevMaxHeight / 2 + maxStitchHeight / 2);
    }

    stitchTypes.forEach((type, sIdx) => {
      let x = 0;
      let y = currentY;
      let angle = 0;

      if (isRound) {
        // Radial layout for rounds: Row 1 is center, Row 2 is further out.
        // For rounds, we use a slightly more generous spacing to prevent overlap
        const radius = Math.abs(currentY) + 40; 
        angle = (sIdx / stitchTypes.length) * 2 * Math.PI;
        x = radius * Math.cos(angle);
        y = radius * Math.sin(angle);
      } else {
        // Stacked linear layout:
        // Alternate directions for rows (zig-zagging)
        const isForwardRow = rIdx % 2 === 0;
        const xOffset = isForwardRow ? sIdx : (stitchTypes.length - 1 - sIdx);
        
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
    });

    layout.push({
      number: rowData.rowNumber || rIdx + 1,
      stitches,
      type: isRound ? 'round' : 'row'
    });
  });

  return layout;
}
