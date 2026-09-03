import re

with open("src/app/official/dashboard/page.tsx", "r") as f:
    content = f.read()

# Add import
if "casesApi" not in content:
    content = content.replace("import { useRouter } from 'next/navigation';", "import { useRouter } from 'next/navigation';\nimport { casesApi, Case } from '@/services/api/casesApi';")

# Add state
if "const [cases, setCases]" not in content:
    state_code = """
  const [cases, setCases] = useState<Case[]>([]);
  useEffect(() => {
    casesApi.getAll().then(data => setCases(data)).catch(console.error);
  }, []);
"""
    content = content.replace("const [isSidebarOpen, setIsSidebarOpen] = useState(false);", "const [isSidebarOpen, setIsSidebarOpen] = useState(false);\n" + state_code)

# Replace table body
table_body_start = content.find("<tbody>", content.find("Priority Actions"))
table_body_end = content.find("</tbody>", table_body_start) + len("</tbody>")

new_table_body = """<tbody className="divide-y divide-slate-100">
                      {cases.length > 0 ? cases.map((c, i) => (
                        <tr key={c.case_id} className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-medium text-slate-800">{c.project_code}</td>
                          <td className="px-4 py-3 text-slate-600">{c.issue_type}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                              c.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                            }`}>{c.severity}</span>
                          </td>
                          <td className="px-4 py-3 font-medium text-slate-700">{c.escalation_level}</td>
                          <td className="px-4 py-3 text-right">
                            <Link href={`/official/projects/${c.project_code}`} className="text-blue-600 hover:text-blue-800 font-medium text-xs">
                              Review
                            </Link>
                          </td>
                        </tr>
                      )) : (
                        <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400">No priority actions.</td></tr>
                      )}
                    </tbody>"""

content = content[:table_body_start] + new_table_body + content[table_body_end:]

with open("src/app/official/dashboard/page.tsx", "w") as f:
    f.write(content)
