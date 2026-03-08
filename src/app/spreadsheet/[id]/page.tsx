"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Type, Bold, Italic, AlignLeft, AlignCenter, AlignRight, 
  Share2, Users
} from "lucide-react";
import { useSpreadsheetStore, evaluateFormula } from "@/store/useSpreadsheetStore";

export default function SpreadsheetView({ params }: { params: { id: string } }) {
  const { cells, activeCell, others, myColor, setCell, setActiveCell, getRawValue, initSync } = useSpreadsheetStore();
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate grid boundaries
  const cols = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)); // A-Z
  const rows = Array.from({ length: 50 }, (_, i) => i + 1);

  // Initialize data syncing
  useEffect(() => {
    initSync(params.id);
  }, [params.id, initSync]);

  useEffect(() => {
    if (editingCell) {
      inputRef.current?.focus();
    }
  }, [editingCell]);
  
  useEffect(() => {
    if (!editingCell) {
      setInputValue(getRawValue(activeCell));
    }
  }, [activeCell, editingCell, getRawValue]);

  const handleCellClick = (cellId: string) => {
    if (editingCell && editingCell !== cellId) {
      commitEdit();
    }
    setActiveCell(cellId);
  };

  const handleCellDoubleClick = (cellId: string) => {
    setActiveCell(cellId);
    setEditingCell(cellId);
    setInputValue(getRawValue(cellId));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      commitEdit();
    }
  };

  const commitEdit = () => {
    if (editingCell) {
      setCell(editingCell, inputValue);
      setEditingCell(null);
    } else {
      setCell(activeCell, inputValue);
    }
  };

  const renderCellContent = (cellId: string) => {
    if (editingCell === cellId) {
      return (
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commitEdit}
          className="w-full h-full bg-white/10 text-white px-1 outline-none font-mono"
        />
      );
    }
    
    const rawVal = cells[cellId] || "";
    const displayVal = evaluateFormula(rawVal, cells);
    
    return <div className="w-full h-full px-1 truncate pointer-events-none">{displayVal}</div>;
  };

  const otherUsers = Object.values(others);

  return (
    <div className="h-screen w-screen flex flex-col bg-background text-foreground overflow-hidden">
      
      {/* Top Application Bar */}
      <header className="h-14 border-b border-white/10 glass-dark flex items-center justify-between px-4 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-white/10 rounded-md transition-colors text-white/70 hover:text-white">
            <ArrowLeft size={18} />
          </Link>
          <div className="flex flex-col">
            <input 
              type="text" 
              defaultValue="Untitled Spreadsheet"
              className="bg-transparent text-white font-medium focus:outline-none focus:bg-white/5 rounded px-2 py-0.5 text-sm -ml-2"
            />
            <div className="flex items-center gap-3 text-[11px] text-white/50 px-0.5">
              <span>File</span>
              <span>Edit</span>
              <span>View</span>
              <span>Format</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center -space-x-2 mr-2">
            {otherUsers.map((u, i) => (
              <div 
                key={u.id}
                style={{ backgroundColor: u.color }}
                className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold ring-2 ring-transparent shadow-md z-10 text-white relative group"
              >
                {u.name.charAt(u.name.length-1)}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] py-0.5 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {u.name}
                </div>
              </div>
            ))}
            <div 
              style={{ backgroundColor: myColor }}
              className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold ring-2 ring-transparent z-0 text-white shadow-md relative group"
            >
              You
            </div>
          </div>
          <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors text-sm font-medium border border-white/10">
            <Share2 size={16} />
            Share
          </button>
        </div>
      </header>

      {/* Formatting Toolbar */}
      <div className="h-10 border-b border-white/5 bg-white/5 flex items-center px-4 gap-2 shrink-0 overflow-x-auto no-scrollbar">
        <button className="p-1.5 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"><Type size={16} /></button>
        <div className="w-px h-5 bg-white/10 mx-1" />
        <button className="p-1.5 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"><Bold size={16} /></button>
        <button className="p-1.5 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"><Italic size={16} /></button>
        <div className="w-px h-5 bg-white/10 mx-1" />
        <button className="p-1.5 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"><AlignLeft size={16} /></button>
        <button className="p-1.5 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"><AlignCenter size={16} /></button>
        <button className="p-1.5 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"><AlignRight size={16} /></button>
      </div>

      {/* Formula Bar */}
      <div className="h-10 border-b border-white/10 bg-background flex items-center px-2 shrink-0">
        <div className="w-16 flex items-center justify-center border-r border-white/10 text-xs font-mono text-white/60 h-full">
          {activeCell}
        </div>
        <div className="px-3 text-brand-500 font-serif font-bold italic text-sm">fx</div>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setCell(activeCell, e.target.value);
          }}
          className="flex-1 h-full bg-transparent focus:outline-none text-sm text-white px-2 font-mono"
          placeholder="Enter a value or formula (e.g., =SUM(A1:B2) or =A1+B1)"
        />
      </div>

      {/* Spreadsheet Grid Default Table approach */}
      <div className="flex-1 overflow-auto bg-[#0a0a0c] relative">
        <div className="inline-block min-w-full">
          
          <div className="flex sticky top-0 z-20">
            <div className="w-10 min-w-[40px] h-7 bg-white/5 border-b border-r border-white/10 sticky left-0 z-30" />
            {cols.map((col) => {
              const isActive = activeCell.startsWith(col);
              const hasOther = otherUsers.some(u => u.activeCell.startsWith(col));
              return (
                <div 
                  key={col} 
                  className={`w-24 min-w-[96px] h-7 bg-white/5 border-b border-r flex items-center justify-center text-[11px] font-medium select-none cursor-pointer ${isActive ? 'bg-brand-500/20 text-brand-400 border-white/10' : hasOther ? 'bg-white/10 text-white/80 border-white/10' : 'text-white/50 border-white/10 hover:bg-white/10'}`}
                >
                  {col}
                </div>
              );
            })}
          </div>

          {rows.map((row) => (
            <div key={row} className="flex group">
              <div className={`w-10 min-w-[40px] h-7 bg-white/5 border-b border-r sticky left-0 z-10 flex items-center justify-center text-[11px] font-medium select-none cursor-pointer ${activeCell.endsWith(row.toString()) ? 'bg-brand-500/20 text-brand-400 border-white/10' : 'text-white/50 border-white/10 group-hover:bg-white/10'}`}>
                {row}
              </div>
              
              {cols.map((col) => {
                const cellId = `${col}${row}`;
                const isActive = activeCell === cellId;
                const isEditing = editingCell === cellId;
                
                // Which other user is on this cell?
                const occupancy = otherUsers.filter(u => u.activeCell === cellId);
                const hasOthers = occupancy.length > 0;
                
                let borderClasses = 'border-white/5 hover:border-white/20';
                if (isActive) borderClasses = 'ring-2 ring-brand-500 ring-inset bg-brand-500/10 z-10 border-transparent';
                else if (hasOthers) {
                  // Show the remote presence color box
                  const color = occupancy[0].color;
                  borderClasses = 'ring-1 ring-inset z-0 border-transparent bg-white/5';
                }

                return (
                  <div 
                    key={col}
                    onClick={() => handleCellClick(cellId)}
                    onDoubleClick={() => handleCellDoubleClick(cellId)}
                    style={hasOthers && !isActive ? { boxShadow: `inset 0 0 0 1px ${occupancy[0].color}` } : {}}
                    className={`
                      w-24 min-w-[96px] h-7 border-b border-r text-sm outline-none bg-transparent cursor-cell relative text-white/90
                      ${borderClasses}
                      ${isEditing ? 'p-0' : 'p-1'}
                    `}
                  >
                    {renderCellContent(cellId)}
                    {hasOthers && !isActive && (
                      <div className="absolute -top-3 -right-1 text-[8px] text-white px-1 leading-tight rounded-sm opacity-80" style={{ backgroundColor: occupancy[0].color }}>
                        {occupancy[0].name.split(' ')[1]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
