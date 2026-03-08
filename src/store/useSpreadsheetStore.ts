import { create } from 'zustand';

export type CellValue = string; 
export type EvaluatedCell = string | number; 

export type Presence = {
  id: string;
  name: string;
  color: string;
  activeCell: string;
};

export type SpreadsheetState = {
  cells: Record<string, CellValue>;
  activeCell: string;
  others: Record<string, Presence>;
  myId: string;
  myColor: string;
};

interface SpreadsheetStore extends SpreadsheetState {
  setCell: (id: string, value: CellValue) => void;
  setActiveCell: (id: string) => void;
  evaluateCell: (id: string) => EvaluatedCell;
  getRawValue: (id: string) => CellValue;
  initSync: (spreadsheetId: string) => void;
}

// Basic formula evaluator
export const evaluateFormula = (formula: string, cells: Record<string, string>): EvaluatedCell => {
  if (!formula.startsWith('=')) return formula;

  try {
    const expression = formula.substring(1).toUpperCase();
    
    if (expression.startsWith('SUM(')) {
      const match = expression.match(/SUM\((.*?)\)/);
      if (match) {
        return "#NOT_IMPLEMENTED";
      }
    }

    const evalExpression = expression.replace(/[A-Z]+[0-9]+/g, (match) => {
      const cellVal = cells[match] || "0";
      const val = cellVal.startsWith('=') ? evaluateFormula(cellVal, cells).toString() : cellVal;
      const num = parseFloat(val);
      return isNaN(num) ? "0" : val;
    });

    if (/^[0-9+\-*/(). ]+$/.test(evalExpression)) {
      // eslint-disable-next-line no-new-func
      const result = new Function(`return ${evalExpression}`)();
      return result;
    }
    return "#ERROR";
  } catch (error) {
    return "#ERROR";
  }
};

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
const randomId = Math.random().toString(36).substring(7);
const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];

export const useSpreadsheetStore = create<SpreadsheetStore>((set, get) => {
  let channel: BroadcastChannel | null = null;
  
  return {
    cells: {},
    activeCell: 'A1',
    others: {},
    myId: randomId,
    myColor: randomColor,
    
    setCell: (id, value) => {
      set((state) => {
        const newCells = { ...state.cells, [id]: value };
        if (channel) channel.postMessage({ type: 'CELL_UPDATE', cellId: id, value });
        return { cells: newCells };
      });
    },

    setActiveCell: (id) => {
      set({ activeCell: id });
      if (channel) {
        channel.postMessage({ 
          type: 'PRESENCE_UPDATE', 
          senderId: get().myId, 
          color: get().myColor,
          activeCell: id 
        });
      }
    },
    
    evaluateCell: (id) => {
      const rawVal = get().cells[id] || "";
      return evaluateFormula(rawVal, get().cells);
    },

    getRawValue: (id) => get().cells[id] || "",

    initSync: (spreadsheetId) => {
      if (typeof window === 'undefined') return;
      
      // Fallback local-network/cross-tab sync using BroadcastChannel
      // (This simulates Firebase realtime if API keys are missing)
      if (!channel) {
        channel = new BroadcastChannel(`spreadsheet_${spreadsheetId}`);
        
        channel.onmessage = (event) => {
          const data = event.data;
          if (data.type === 'CELL_UPDATE') {
            set((state) => ({ cells: { ...state.cells, [data.cellId]: data.value } }));
          } else if (data.type === 'PRESENCE_UPDATE') {
            if (data.senderId !== get().myId) {
              set((state) => ({
                others: {
                  ...state.others,
                  [data.senderId]: {
                    id: data.senderId,
                    name: 'Guest ' + data.senderId.substring(0,3),
                    color: data.color,
                    activeCell: data.activeCell
                  }
                }
              }));
            }
          }
        };

        // Broadcast initial presence
        channel.postMessage({ 
          type: 'PRESENCE_UPDATE', 
          senderId: get().myId, 
          color: get().myColor,
          activeCell: get().activeCell 
        });
      }
    }
  };
});
