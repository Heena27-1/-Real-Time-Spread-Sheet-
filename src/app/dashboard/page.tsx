import Link from "next/link";
import { Plus, FileSpreadsheet, Search, Clock, MoreVertical, LayoutGrid, List } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Background ambient glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-dark border-b border-white/5 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
            <FileSpreadsheet size={18} strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-xl tracking-tight text-white">Nexus</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-brand-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search spreadsheets..." 
              className="bg-white/5 border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-transparent transition-all w-64"
            />
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-400 to-rose-400 flex items-center justify-center text-sm font-medium text-white shadow-md cursor-pointer hover:opacity-90 transition-opacity">
            H
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-10 z-10 flex flex-col gap-10">
        
        {/* Header Action Area */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Good evening, <span className="gradient-text">Hello</span>
            </h1>
            <p className="text-white/60 text-lg">Pick up where you left off or start something new.</p>
          </div>
          <Link href="/spreadsheet/new" className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-brand-600 rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-brand-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Plus size={18} className="relative z-10" />
            <span className="relative z-10">Blank Spreadsheet</span>
          </Link>
        </section>

        {/* Recent Files */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white/90 flex items-center gap-2">
              <Clock size={18} className="text-brand-500" />
              Recent Documents
            </h2>
            <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/5">
              <button className="p-1.5 rounded-md bg-white/10 text-white shadow-sm">
                <LayoutGrid size={16} />
              </button>
              <button className="p-1.5 rounded-md text-white/50 hover:text-white hover:bg-white/5 transition-colors">
                <List size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Example Card 1 */}
            <Link href="/spreadsheet/finance-1" className="group flex flex-col bg-white/5 border border-white/5 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/10 transition-all cursor-pointer backdrop-blur-sm">
              <div className="h-32 bg-gradient-to-br from-white/5 to-white/0 border-b border-white/5 p-4 flex items-center justify-center relative">
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 rounded-full bg-background/80 text-white/70 hover:text-white backdrop-blur-md">
                    <MoreVertical size={16} />
                  </button>
                </div>
                <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
                  <FileSpreadsheet size={28} className="text-brand-400" />
                </div>
              </div>
              <div className="p-4 flex flex-col gap-1">
                <h3 className="font-medium text-white truncate pr-4">Q3 Financial Projections</h3>
                <p className="text-xs text-white/50 flex flex-col gap-0.5 mt-1">
                  <span>Opened yesterday</span>
                  <span>Owned by you</span>
                </p>
              </div>
            </Link>

            {/* Example Card 2 */}
            <Link href="/spreadsheet/roster-2026" className="group flex flex-col bg-white/5 border border-white/5 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/10 transition-all cursor-pointer backdrop-blur-sm">
              <div className="h-32 bg-gradient-to-br from-emerald-500/10 to-transparent border-b border-white/5 p-4 flex items-center justify-center relative">
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 rounded-full bg-background/80 text-white/70 hover:text-white backdrop-blur-md">
                    <MoreVertical size={16} />
                  </button>
                </div>
                <div className="w-16 h-16 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-inner">
                  <FileSpreadsheet size={28} className="text-emerald-400" />
                </div>
              </div>
              <div className="p-4 flex flex-col gap-1">
                <h3 className="font-medium text-white truncate pr-4">Team Roster 2026</h3>
                <p className="text-xs text-white/50 flex flex-col gap-0.5 mt-1">
                  <span>Opened Mar 5</span>
                  <span>Owned by Sarah</span>
                </p>
              </div>
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
