import { Mail, Download } from 'lucide-react';
// We removed the Button import to prevent errors. 
// We will use a standard <a> tag styled as a button instead.

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-[#0F172A] px-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
          JAI BHARATH KAILASH C
        </h1>
        <p className="text-2xl md:text-3xl text-indigo-400 mb-8">
          Software Developer | AI & LLM Engineer
        </p>
        
        {/* Contact Section */}
        <div className="flex flex-wrap gap-6 justify-center mb-12">
          <a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=jaibharath2407@gmail.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span>jaibharath2407@gmail.com</span>
          </a>
        </div>

        <div className="flex gap-4 justify-center items-center">
          {/* View Projects Button */}
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg rounded-xl font-medium transition-colors">
            View Projects
          </button>

          {/* ✅ FIXED DOWNLOAD BUTTON */}
          <a 
            href="/Resumee.pdf" 
            download="Jai_Bharath_Resume.pdf"
            className="flex items-center gap-2 bg-white border border-slate-700 text-slate-950 hover:bg-slate-100 px-8 py-6 text-lg rounded-xl shadow-lg font-medium transition-colors"
          >
            <Download className="mr-2 w-5 h-5" />
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}