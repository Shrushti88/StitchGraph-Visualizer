
export enum StitchType {
  CH = 'ch',
  SC = 'sc',
  HDC = 'hdc',
  DC = 'dc',
  TR = 'tr',
  SLST = 'slst',

  // Increases
  SC2INC = 'sc2inc',
  SC3INC = 'sc3inc',
  DC2INC = 'dc2inc',
  DC3INC = 'dc3inc',

  // Decreases
  SC2TOG = 'sc2tog',
  SC3TOG = 'sc3tog',
  DC2TOG = 'dc2tog',
  DC3TOG = 'dc3tog',

  // Special
  MR = 'mr',
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
