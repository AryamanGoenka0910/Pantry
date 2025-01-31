import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen bg-[#2A2236] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-[#3B2B51] rounded-lg overflow-hidden shadow-lg flex">
        {/* Left side (can reuse the same image/overlay style, or use a new one) */}
        <div className="hidden md:flex md:w-1/2">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/sand-dunes.jpg')" }}
          >
            <div className="h-full w-full bg-black/30 p-6 flex flex-col justify-between">
              {/* etc... */}
            </div>
          </div>
        </div>

        {/* Right side (Login form) */}
        <div className="w-full md:w-1/2 bg-[#44365B] p-8 sm:p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-300 mb-6">
            Don&apos;t have an account?{" "}
            <Link 
              href="/auth/signup"
              className="text-purple-300 hover:underline"
            >
              Sign up
            </Link>
          </p>

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 py-2 px-3 rounded bg-[#2E2840] text-white outline-none border border-transparent focus:border-purple-500"
          />
          <div className="relative mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full py-2 px-3 rounded bg-[#2E2840] text-white outline-none border border-transparent focus:border-purple-500"
            />
            {/* Eye icon or forgot password link if desired */}
          </div>

          <button className="w-full py-2 bg-purple-500 rounded text-white font-semibold hover:bg-purple-600">
            Log In
          </button>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-500"></div>
            <p className="px-4 text-gray-300 text-sm">Or continue with</p>
            <div className="flex-1 h-px bg-gray-500"></div>
          </div>

          <div className="flex space-x-4">
            <button className="flex-1 py-2 border border-gray-400 rounded text-white hover:bg-white/10">
              Google
            </button>
            <button className="flex-1 py-2 border border-gray-400 rounded text-white hover:bg-white/10">
              Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
