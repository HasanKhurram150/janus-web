"use client";

export default function Footer() {
  const scrollToTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (el: number | string, opts?: object) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#1b1022] border-t border-white/10 pt-20 pb-12 px-6 sm:px-10 lg:px-16 text-white overflow-hidden">
      <div className="w-full max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Mission */}
          <div className="md:col-span-5 flex flex-col items-start">
            <span className="font-normal text-xl tracking-tight text-white mb-4">
              Janus
            </span>

            <p className="text-sm text-[#a69eb0] leading-relaxed max-w-md mb-6 font-normal">
              Distributed spatial computing runtime for real-time applications, robotics, and simulation environments.
            </p>

            <div className="font-mono text-xs text-white/50">
              Low-latency edge infrastructure
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-2">
            <div className="font-mono text-xs text-white/40 uppercase tracking-wider mb-4">
              Architecture
            </div>
            <ul className="space-y-2.5 font-mono text-xs text-white/70">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Native runtime
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-white transition-colors">
                  Spatial queries
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-white transition-colors">
                  Transport layer
                </a>
              </li>
              <li>
                <a href="#usecases" className="hover:text-white transition-colors">
                  Peer sync
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-2">
            <div className="font-mono text-xs text-white/40 uppercase tracking-wider mb-4">
              Resources
            </div>
            <ul className="space-y-2.5 font-mono text-xs text-white/70">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#usecases" className="hover:text-white transition-colors">
                  Benchmarks
                </a>
              </li>
              <li>
                <a href="#tiers" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Guides
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="md:col-span-3 flex flex-col">
            <div className="font-mono text-xs text-white/40 uppercase tracking-wider mb-4">
              Updates
            </div>
            <p className="text-xs text-[#a69eb0] mb-3 font-normal">
              Receive updates on releases, benchmarks, and architectural notes.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscribed to Janus updates.");
              }}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                placeholder="engineer@domain.com"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-xs placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-white text-[#1b1022] font-mono text-xs font-medium tracking-wide hover:bg-white/90 transition-all active:scale-98"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/40">
          <div>
            &copy; {new Date().getFullYear()} Janus Spatial Systems. All rights reserved.
          </div>

          <div>
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors tracking-wide"
            >
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
