with open("src/app/official/projects/[projectId]/page.tsx", "r") as f:
    content = f.read()

rag_block = """          {/* PHASE 36: RAG SIMILAR CASE ARCHITECTURE */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
            <div className="p-6 border-b border-slate-200">
               <h3 className="text-sm font-bold text-slate-800 flex items-center">
                <Database className="w-4 h-4 mr-2 text-indigo-500" />
                SIMILAR HISTORICAL CASES (RAG RETRIEVAL)
              </h3>
            </div>
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
               <span className="text-xs text-slate-500 font-semibold uppercase">Querying vector database for similar compensation delays...</span>
               <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-1 rounded">PROTOTYPE</span>
            </div>
            <div className="p-0">
              <ul className="divide-y divide-slate-100">
                <li className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-900 text-sm">P-0822 (Mumbai-Pune Expressway)</h4>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">94% Match</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    <strong>Context:</strong> Similar 2.5km spatial bottleneck caused by 14 pending compensation cases due to record mismatch.
                  </p>
                  <p className="text-sm text-slate-600">
                    <strong>Historical Resolution:</strong> A dedicated camp was set up at the Tehsil office, clearing 100% of cases in 12 days.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          
          {/* INTERVENTIONS / AUDIT TRAIL PREVIEW */}"""

if "RAG SIMILAR CASE" not in content:
    content = content.replace("{/* INTERVENTIONS / AUDIT TRAIL PREVIEW */}", rag_block)
    with open("src/app/official/projects/[projectId]/page.tsx", "w") as f:
        f.write(content)
