import re

with open("src/app/official/gis/page.tsx", "r") as f:
    content = f.read()

# Add missing imports for the sidebar
imports = """
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Briefcase, Activity, BarChart3, Lightbulb, Bell, Database, Shield, LogOut, User
} from 'lucide-react';
"""

content = content.replace("import { \n  Map as MapIcon", imports + "import { \n  Map as MapIcon")

# Add isSidebarOpen state
state_code = """
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
"""

content = content.replace("export default function GISIntelligence() {\n  const [projectsList", "export default function GISIntelligence() {\n" + state_code + "  const [projectsList")

# Replace return (
#     <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50">

with the dashboard wrapper + sidebar
wrapper_code = """
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      
      {/* MOBILE HEADER */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center z-50 fixed top-0 w-full">
        <div className="font-bold">BHUMI DRISHTI</div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>

      {/* SIDEBAR */}
      <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transform md:translate-x-0 transition-transform duration-200 fixed md:sticky top-0 left-0 h-screen w-64 bg-slate-900 text-slate-300 flex flex-col z-40 border-r border-slate-800`}>
        <div className="p-6 pb-2 border-b border-slate-800 mt-12 md:mt-0">
          <h1 className="text-xl font-bold text-white tracking-tight">BHUMI DRISHTI</h1>
          <h2 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mt-1">
            Land Acquisition<br/>Intelligence
          </h2>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            <li>
              <Link href="/official/dashboard" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
                <LayoutDashboard className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm">Overview</span>
              </Link>
            </li>
            <li>
              <Link href="/official/projects" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
                <Briefcase className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm">Project Portfolio</span>
              </Link>
            </li>
            <li>
              <Link href="/official/risk-monitor" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
                <Activity className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm">Risk Monitor</span>
              </Link>
            </li>
            <li>
              <Link href="/official/gis" className="flex items-center px-3 py-2 bg-emerald-500/10 text-emerald-400 rounded-md">
                <MapIcon className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm">GIS Intelligence</span>
              </Link>
            </li>
            <li>
              <Link href="/official/district-analytics" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
                <BarChart3 className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm">District Analytics</span>
              </Link>
            </li>
            <li>
              <Link href="/official/recommendations" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
                <Lightbulb className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm">Recommendations</span>
              </Link>
            </li>
            <li>
              <Link href="/official/alerts" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
                <Bell className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm flex-1">Alerts</span>
                <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">28</span>
              </Link>
            </li>
            <li>
              <Link href="/official/risk-engine" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
                <Database className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm">Risk Engine</span>
              </Link>
            </li>
            <li>
              <Link href="/official/model-data" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
                <Server className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm">Model & Data</span>
              </Link>
            </li>
            <li>
              <Link href="/official/audit" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
                <Shield className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm">Audit Trail</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-900">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs">
              <div className="text-slate-500 font-semibold mb-1">System Status</div>
              <div className="flex items-center text-emerald-400 font-medium">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                Operational
              </div>
            </div>
            <div className="text-[10px] font-bold bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700">
              MODE: DEMO
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 mr-3">
                <User className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-white">Guest Administrator</div>
                <div className="text-slate-500">State Administrator</div>
              </div>
            </div>
            <button 
              onClick={() => { localStorage.removeItem('access_token'); localStorage.removeItem('user'); router.push('/official/login'); }}
              className="text-slate-500 hover:text-white transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden mt-14 md:mt-0 relative bg-slate-50">
"""

content = content.replace('  return (\n    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50">', wrapper_code)
content = content.replace('      <style jsx global>{`', '      </div>\n      <style jsx global>{`')

with open("src/app/official/gis/page.tsx", "w") as f:
    f.write(content)

