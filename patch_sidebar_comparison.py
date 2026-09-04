import os
import glob

files = glob.glob("src/app/official/*/page.tsx")

new_link = """<li><Link href="/official/project-comparison" className="flex items-center px-3 py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors"><Activity className="w-5 h-5 mr-3" /><span className="font-medium text-sm">Compare Projects</span></Link></li>"""

for file in files:
    if "project-comparison" in file: continue
    with open(file, "r") as f:
        content = f.read()
    if "project-comparison" not in content and "<nav " in content:
        content = content.replace('<li><Link href="/official/risk-monitor"', new_link + '\n            <li><Link href="/official/risk-monitor"')
        with open(file, "w") as f:
            f.write(content)
