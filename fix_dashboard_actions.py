with open("src/app/official/dashboard/page.tsx", "r") as f:
    content = f.read()

old_block = """                  <div className="divide-y divide-slate-100">
                    {priorityActions.map((action, idx) => (
                      <div key={idx} className="p-4 flex flex-col hover:bg-slate-50 transition-colors">
                        <div className="text-xs font-semibold text-slate-800 mb-1 leading-tight">
                          {idx + 1}. {action.title}
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-[11px] text-slate-500 font-medium">{action.affected} projects affected</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${action.priority === 'Critical' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                            {action.priority}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>"""

new_block = """                  <div className="divide-y divide-slate-100">
                    {cases.length > 0 ? cases.map((c, idx) => (
                      <div key={c.case_id} className="p-4 flex flex-col hover:bg-slate-50 transition-colors">
                        <div className="text-xs font-semibold text-slate-800 mb-1 leading-tight flex justify-between">
                          <span>{c.project_code}: {c.issue_type}</span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-[11px] text-slate-500 font-medium">{c.escalation_level}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${c.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                            {c.severity}
                          </span>
                        </div>
                      </div>
                    )) : (
                      <div className="p-4 text-center text-slate-400 text-xs font-medium">No open cases assigned to you.</div>
                    )}
                  </div>"""

content = content.replace(old_block, new_block)

with open("src/app/official/dashboard/page.tsx", "w") as f:
    f.write(content)
