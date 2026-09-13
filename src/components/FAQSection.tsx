"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Is JANUS an on-premise solution?",
    answer: "Yes. JANUS is fully self-hosted on Ubuntu Server and operates completely on-premise. It requires zero cloud connectivity or phone-home telemetry, making it fully operational in air-gapped environments.",
  },
  {
    question: "Does JANUS support legacy devices?",
    answer: "Yes. It integrates via universal network standards—including SNMPv1/v2c/v3, standard UDP/TCP syslog (RFC 3164/5424), and SSH/CLI polling—allowing it to monitor older switches, routers, and servers without modern APIs.",
  },
  {
    question: "Can all devices be added to JANUS?",
    answer: "Yes. Any reachable device supporting ICMP, SNMP, or syslog can be monitored. There are no per-node, per-sensor, or log-volume license caps; limits are defined only by your host server's hardware capacity.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="relative w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#1b1022] text-white">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-24">
        
        {/* Top: Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column */}
          <div className="lg:w-1/3 flex flex-col items-start">
            <span className="text-purple-400 font-medium mb-4 text-sm sm:text-base">Support</span>
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight mb-6">FAQs</h2>
            <p className="text-white/70 text-lg leading-relaxed">
              Everything you need to know about the product and billing. Can't find the answer you're looking for? Please{" "}
              <a href="#" className="text-white underline decoration-white/30 hover:decoration-white underline-offset-4 transition-colors">
                chat to our friendly team
              </a>.
            </p>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:w-2/3 flex flex-col border-t border-white/10">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="border-b border-white/10 overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="text-lg sm:text-xl font-medium pr-8">{faq.question}</span>
                    <span className="text-white/40 flex-shrink-0">
                      {isOpen ? (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </span>
                  </button>
                  
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-64 opacity-100 pb-6" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-white/70 text-base sm:text-lg leading-relaxed pr-8 lg:pr-12">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom: Call to Action Box */}
        <div className="w-full rounded-3xl bg-white/5 border border-white/10 p-10 sm:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div className="max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-3">Book a call with our team</h3>
            <p className="text-white/70 text-lg">Get personalized answers and see how JANUS can work for your enterprise.</p>
          </div>
          
          <div className="w-full md:w-auto flex-shrink-0">
            <a 
              href="https://www.antilineartech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-medium transition-colors w-full sm:w-auto text-lg text-center"
            >
              Book a call
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
