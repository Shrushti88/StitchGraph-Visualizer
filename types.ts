
export enum StitchType {
  CH = 'ch',   // Chain
  SC = 'sc',   // Single Crochet
  DC = 'dc',   // Double Crochet
  HDC = 'hdc', // Half Double Crochet
  TR = 'tr',   // Treble Crochet
  SLST = 'slst', // Slip Stitch
  INC = 'inc',  // Increase (2 sc in one)
  DEC = 'dec',  // Decrease (2 sc together)
}

export interface Stitch {
  id: string;
  type: StitchType;
  row: number;
  index: number;
  x: number;
  y: number;
  angle?: number;
  parentId?: string; // ID of the stitch this one is worked into
}

export interface RowData {
  number: number;
  stitches: Stitch[];
  type: 'row' | 'round';
}

export interface Pattern {
  name: string;
  rows: RowData[];
}

export interface Point {
  x: number;
  y: number;
}
