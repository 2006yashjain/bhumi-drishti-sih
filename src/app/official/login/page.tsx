"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Lock, 
  ShieldCheck, 
  Info,
  Loader2
} from "lucide-react";

export default function OfficialLogin() {
  const router = useRouter();
  
  const [officialId, setOfficialId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!officialId.trim() || !password.trim()) {
      setError("Please enter your Official ID and password.");
      return;
    }

    setIsLoading(true);

    try {
      // Use the centralized API client
      const { authApi } = await import('@/services/api/authApi');
      const result = await authApi.login(officialId.trim(), password);
      
      if (result.access_token) {
        localStorage.setItem('access_token', result.access_token);
        if (result.user) {
          localStorage.setItem('user', JSON.stringify(result.user));
        }
        router.push("/official/dashboard");
      } else {
        setError("Login failed. No token received.");
      }
    } catch (err: unknown) {
      console.error("Login error:", err);
      const errorMessage = err instanceof Error ? err.message : "Invalid credentials or backend unavailable.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const useDemoAccount = () => {
    setOfficialId("guest");
    setPassword("12345");
    setError("");
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* LEFT COLUMN - VISUAL (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 flex-col justify-between p-12 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30" 
          style={{ backgroundImage: "url('/interchange-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/40" />
        
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-medium mb-12">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Bhumi Drishti
          </Link>
          
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Bhumi Drishti</h1>
          <p className="text-emerald-400 font-medium tracking-wide text-sm uppercase">
            Intelligent Land Acquisition Management
          </p>
        </div>

        <div className="relative z-10 max-w-md">
          <ShieldCheck className="w-10 h-10 text-emerald-500 mb-6" />
          <p className="text-xl text-slate-200 leading-relaxed font-medium">
            “Empowering officials with proactive project monitoring, delay intelligence and actionable insights.”
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN - FORM */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-12 md:px-20 xl:px-32 py-12 bg-white relative overflow-y-auto">
        <div className="lg:hidden mb-8">
          <Link href="/" className="inline-flex items-center text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Bhumi Drishti
          </Link>
        </div>

        <div className="w-full max-w-sm mx-auto lg:mx-0">
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-emerald-700 bg-emerald-50 w-fit px-3 py-1 rounded-full mb-6 border border-emerald-100">
              <Lock className="w-3.5 h-3.5" />
              <span className="text-xs font-bold uppercase tracking-wider">Secure Official Access</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Official Portal</h2>
            <p className="text-sm text-slate-600">Secure access for authorized government officials.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start text-red-700">
              <Info className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="officialId" className="block text-sm font-medium text-slate-700 mb-1.5">
                Official ID / Employee ID
              </label>
              <input
                id="officialId"
                type="text"
                value={officialId}
                onChange={(e) => setOfficialId(e.target.value)}
                className="block w-full px-4 py-2.5 bg-white border border-slate-300 rounded-md text-slate-900 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm sm:text-sm outline-none transition-colors"
                placeholder="Enter your ID"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-4 pr-10 py-2.5 bg-white border border-slate-300 rounded-md text-slate-900 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm sm:text-sm outline-none transition-colors"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded cursor-pointer"
                  disabled={isLoading}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 cursor-pointer">
                  Remember this device
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-emerald-700 hover:text-emerald-600 transition-colors">
                  Forgot Password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
            
            <p className="text-center text-xs text-slate-500 pt-2">
              Authorized personnel only.
            </p>
          </form>

          {/* DEMO ACCESS SECTION */}
          <div className="mt-10 pt-8 border-t border-slate-200">
            <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 border-dashed">
              <h3 className="text-sm font-bold text-slate-800 mb-1 flex items-center">
                <Info className="w-4 h-4 mr-1.5 text-slate-500" />
                Prototype Demo Access
              </h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                This is a prototype authentication screen. It does not connect to real government systems. Use the demo credentials below to proceed.
              </p>
              
              <div className="flex flex-col space-y-2 mb-4 bg-white p-3 rounded border border-slate-100">
                <div className="text-xs font-medium text-slate-700 flex justify-between">
                  <span className="text-slate-500">Official ID:</span>
                  <span className="font-mono text-slate-900">guest</span>
                </div>
                <div className="text-xs font-medium text-slate-700 flex justify-between">
                  <span className="text-slate-500">Password:</span>
                  <span className="font-mono text-slate-900">12345</span>
                </div>
              </div>

              <button
                type="button"
                onClick={useDemoAccount}
                className="w-full flex justify-center py-2 px-4 border border-slate-300 rounded-md shadow-sm text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 focus:outline-none transition-colors"
              >
                Use Demo Account
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
