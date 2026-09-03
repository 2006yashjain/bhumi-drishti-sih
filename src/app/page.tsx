import Link from 'next/link';
import { 
  Lock, 
  Activity, 
  Brain, 
  Map, 
  Zap, 
  Eye,
  Search,
  CheckCircle,
  AlertTriangle,
  BarChart,
  Target
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER */}
      <header className="absolute top-0 w-full z-50 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Left */}
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-900 tracking-tight">Bhumi Drishti</span>
              <span className="text-xs font-medium text-emerald-800">Intelligent Land Acquisition Management</span>
            </div>
            
            {/* Center/Right Nav */}
            <nav className="hidden md:flex space-x-8 items-center">
              <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">Home</Link>
              <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-slate-900">About</Link>
              <Link href="/#how-it-works" className="text-sm font-medium text-slate-600 hover:text-slate-900">How It Works</Link>
              <Link href="/public" className="text-sm font-medium text-slate-600 hover:text-slate-900">Public Portal</Link>
              <Link href="/official/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">Official Portal</Link>
            </nav>

            {/* Right CTA */}
            <div className="hidden md:flex items-center">
              <Link 
                href="/official/login" 
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition-colors"
              >
                <Lock className="w-4 h-4 mr-2" />
                Official Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-16">
        {/* HERO SECTION */}
        <section 
          className="relative min-h-[80vh] flex items-center bg-slate-800 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        >
          {/* Subtle gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/20 to-transparent sm:w-2/3"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight drop-shadow-lg">
                Smarter Land Acquisition.<br />
                <span className="text-emerald-400">Faster Decisions.</span><br />
                Greater Transparency.
              </h1>
              <p className="text-lg md:text-xl text-slate-100 mb-10 leading-relaxed font-medium drop-shadow-md">
                “Bhumi Drishti brings land acquisition project data, lifecycle monitoring, risk intelligence, GIS visualization, and corrective actions into one unified platform.”
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/public" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-slate-900 bg-white hover:bg-slate-50 transition-colors shadow-sm"
                >
                  Explore Public Portal
                </Link>
                <Link 
                  href="/official/login" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-700 hover:bg-emerald-600 transition-colors shadow-sm"
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Official Login
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CORE CAPABILITY STRIP */}
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { title: 'Lifecycle Monitoring', desc: 'Track projects across acquisition stages.', icon: Activity },
                { title: 'Delay Risk Intelligence', desc: 'Estimate stage-specific delay probability.', icon: AlertTriangle },
                { title: 'Explainable AI', desc: 'Surface the factors driving each prediction.', icon: Brain },
                { title: 'GIS Intelligence', desc: 'Visualize projects and high-risk locations.', icon: Map },
                { title: 'Action Recommendations', desc: 'Map bottlenecks to corrective actions.', icon: Zap },
                { title: 'Transparent Access', desc: 'Provide citizens with accessible information.', icon: Eye },
              ].map((cap, i) => (
                <div key={i} className="flex flex-col items-start space-y-2">
                  <cap.icon className="w-6 h-6 text-emerald-700 mb-1" />
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">{cap.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PUBLIC + OFFICIAL PORTALS */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900">One Platform. Two Experiences.</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Public Portal */}
              <div className="bg-white p-8 lg:p-10 border border-slate-200 rounded-xl shadow-sm flex flex-col">
                <h3 className="text-xs font-bold tracking-wider text-emerald-700 uppercase mb-2">For Citizens & Stakeholders</h3>
                <h4 className="text-2xl font-bold text-slate-900 mb-4">Public Portal</h4>
                <p className="text-slate-600 mb-8 flex-grow">
                  “Access published project information, track acquisition progress, explore project locations, view timelines, and follow important updates.”
                </p>
                
                <ul className="space-y-3 mb-10">
                  {['Project Search', 'Acquisition Status', 'Timeline Tracking', 'Public GIS', 'Notices & Updates', 'Grievance Access'].map((feature, i) => (
                    <li key={i} className="flex items-center text-sm font-medium text-slate-700">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href="/public" 
                  className="w-full inline-flex justify-center items-center px-4 py-3 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 transition-colors"
                >
                  Explore Public Portal
                </Link>
              </div>

              {/* Official Portal */}
              <div className="relative p-8 lg:p-10 border border-slate-800 rounded-xl shadow-md flex flex-col overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url('/interchange-bg.jpg')" }}></div>
                <div className="relative z-10 flex flex-col flex-grow">
                  <h3 className="text-xs font-bold tracking-wider text-emerald-400 uppercase mb-2">For Government Officials</h3>
                  <h4 className="text-2xl font-bold text-white mb-4">Official Portal</h4>
                  <p className="text-slate-300 mb-8 flex-grow">
                    “Monitor acquisition projects, identify emerging delay risks, understand their drivers, and take corrective action.”
                  </p>
                  
                  <ul className="space-y-3 mb-10">
                    {['Project Monitoring', 'Risk Intelligence', 'SHAP Explainability', 'GIS Analytics', 'Alerts', 'Corrective Actions'].map((feature, i) => (
                      <li key={i} className="flex items-center text-sm font-medium text-slate-300">
                        <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    href="/official/login" 
                    className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-slate-900 bg-emerald-400 hover:bg-emerald-300 transition-colors"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Official Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-20 bg-white border-t border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900">How Bhumi Drishti Works</h2>
            </div>
            
            <div className="relative">
              {/* Desktop connecting line */}
              <div className="hidden md:block absolute top-6 left-0 w-full h-0.5 bg-slate-100" aria-hidden="true"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {[
                  { num: '01', title: 'Collect', desc: 'Project, acquisition, compensation, R&R, legal, stakeholder and administrative data.' },
                  { num: '02', title: 'Monitor', desc: 'Track project progress across the acquisition lifecycle.' },
                  { num: '03', title: 'Predict', desc: 'Identify emerging delay probability at each lifecycle stage.' },
                  { num: '04', title: 'Explain', desc: 'Identify the factors contributing most strongly to the risk.' },
                  { num: '05', title: 'Act', desc: 'Recommend corrective action and notify responsible officials.' },
                ].map((step, i) => (
                  <div key={i} className="relative flex flex-col md:items-center md:text-center group">
                    <div className="w-12 h-12 rounded-full bg-slate-50 border-2 border-slate-200 flex items-center justify-center text-sm font-bold text-slate-900 mb-6 relative z-10 group-hover:border-emerald-600 group-hover:text-emerald-700 transition-colors">
                      {step.num}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-600">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* IMPACT SECTION */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900">Designed for Better Administrative Decisions</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex">
                <Search className="w-8 h-8 text-emerald-700 mr-5 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Earlier Risk Detection</h3>
                  <p className="text-slate-600">Identify emerging problems before they become critical delays.</p>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex">
                <Target className="w-8 h-8 text-emerald-700 mr-5 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Faster Intervention</h3>
                  <p className="text-slate-600">Direct attention toward factors requiring action.</p>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex">
                <Eye className="w-8 h-8 text-emerald-700 mr-5 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Greater Transparency</h3>
                  <p className="text-slate-600">Make published project progress easier to understand.</p>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex">
                <BarChart className="w-8 h-8 text-emerald-700 mr-5 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Accountable Monitoring</h3>
                  <p className="text-slate-600">Connect project status, actions, ownership and updates.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative py-24 bg-slate-900 text-center px-4 sm:px-6 lg:px-8 bg-cover bg-center" style={{ backgroundImage: "url('/interchange-bg.jpg')" }}>
          <div className="absolute inset-0 bg-slate-900/70"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Make Every Acquisition Stage Visible.<br />
              <span className="text-emerald-400">Make Every Risk Actionable.</span>
            </h2>
            <p className="text-lg text-slate-300 mb-10 leading-relaxed font-medium">
              “Bhumi Drishti connects project monitoring, predictive intelligence, spatial insights, and administrative action in one platform.”
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/public" 
                className="inline-flex items-center justify-center px-6 py-3 border border-slate-700 text-base font-medium rounded-md text-white bg-slate-800 hover:bg-slate-700 transition-colors shadow-sm"
              >
                Explore Public Portal
              </Link>
              <Link 
                href="/official/login" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-slate-900 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-sm"
              >
                <Lock className="w-5 h-5 mr-2" />
                Official Login
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8 gap-6 text-center md:text-left">
            <div>
              <span className="text-lg font-bold text-slate-900 tracking-tight block">Bhumi Drishti</span>
              <span className="text-sm font-medium text-emerald-800 block mt-1">Intelligent Land Acquisition Management</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">Home</Link>
              <Link href="/about" className="text-sm text-slate-600 hover:text-slate-900">About</Link>
              <Link href="/public" className="text-sm text-slate-600 hover:text-slate-900">Public Portal</Link>
              <Link href="/official/login" className="text-sm text-slate-600 hover:text-slate-900">Official Portal</Link>
              <Link href="/privacy" className="text-sm text-slate-600 hover:text-slate-900">Privacy</Link>
              <Link href="/accessibility" className="text-sm text-slate-600 hover:text-slate-900">Accessibility</Link>
            </div>
          </div>
          
          <div className="border-t border-slate-200 pt-8 text-center flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500 font-medium">
              Prototype for Smart India Hackathon
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
