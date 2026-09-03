with open("src/app/official/model-data/page.tsx", "r") as f:
    content = f.read()

start_idx = content.find("<nav className=\"flex-1 overflow-y-auto py-4\">")
end_idx = content.find("</aside>")

new_nav = """<nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            <li><Link href="/official/dashboard" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><LayoutDashboard className="w-5 h-5 mr-3" /><span className="font-medium text-sm">Overview</span></Link></li>
            <li><Link href="/official/projects" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><Briefcase className="w-5 h-5 mr-3" /><span className="font-medium text-sm">Project Portfolio</span></Link></li>
            <li><Link href="/official/risk-monitor" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><Activity className="w-5 h-5 mr-3" /><span className="font-medium text-sm">Risk Monitor</span></Link></li>
            <li><Link href="/official/gis" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><MapIcon className="w-5 h-5 mr-3" /><span className="font-medium text-sm">GIS Intelligence</span></Link></li>
            <li><Link href="/official/district-analytics" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><BarChart3 className="w-5 h-5 mr-3" /><span className="font-medium text-sm">District Analytics</span></Link></li>
            <li><Link href="/official/recommendations" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><Lightbulb className="w-5 h-5 mr-3" /><span className="font-medium text-sm">Recommendations</span></Link></li>
            <li><Link href="/official/alerts" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><Bell className="w-5 h-5 mr-3" /><span className="font-medium text-sm flex-1">Alerts</span><span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">28</span></Link></li>
            <li>
              <Link href="/official/risk-engine" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
                <Database className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm">Risk Engine</span>
              </Link>
            </li>
            <li>
              <Link href="/official/model-data" className="flex items-center px-3 py-2 bg-emerald-500/10 text-emerald-400 rounded-md transition-colors">
                <Server className="w-5 h-5 mr-3" />
                <span className="font-medium text-sm">Model & Data</span>
              </Link>
            </li>
            <li><Link href="/official/audit" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><Shield className="w-5 h-5 mr-3" /><span className="font-medium text-sm">Audit Trail</span></Link></li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-slate-800 bg-slate-900 mt-auto">
          <Link href="/" className="flex items-center text-slate-400 hover:text-white transition-colors text-sm font-medium">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Link>
        </div>
      """

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_nav + content[end_idx:]
    with open("src/app/official/model-data/page.tsx", "w") as f:
        f.write(content)
