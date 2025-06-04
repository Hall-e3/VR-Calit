import { useState } from "react";

export default function Header({
  onContactClick,
}: {
  onContactClick: () => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black/80 text-white px-4 sm:px-6 fixed top-0 left-0 w-full z-50">
      <nav className="max-w-[1460px] mx-auto z-50 h-auto">
        <div className="w-full flex justify-between items-center p-4">
          <div className="flex items-center space-x-3">
            <div
              onClick={() => {
                window.location.href = "/";
              }}
              className="h-12 w-12 rounded-full cursor-pointer"
            >
              <img
                src="/logo.png"
                alt="Kymatos Logo"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <span className="text-xl font-bold  text-white">
              Kymatos Technologies
            </span>
          </div>
          <ul className="space-x-6 hidden">
            {["About", "Pricing", "FAQ", "Blog", "Calculator"].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-white uppercase text-[13px] hover:text-white/40 font-semibold transition-colors tracking-wider"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
          <button
            className="sm:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <button
            type="button"
            onClick={onContactClick}
            className="cursor-pointer uppercase hidden sm:block tracking-wide text-white font-semibold text-sm border-[2px] border-white/40 rounded-full px-6 py-3 hover:bg-white hover:text-[#1a1a1a] transition-colors"
          >
            Contact Us
          </button>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden bg-black/90 pb-4 px-4">
            <ul className="flex flex-col space-y-4">
              {["About", "Pricing", "FAQ", "Blog", "Calculator"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="block text-white uppercase text-[13px] hover:text-white/40 font-semibold transition-colors tracking-wider py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  className="w-full uppercase tracking-wide text-white font-semibold text-sm border-[2px] border-white/40 rounded-full px-6 py-3 hover:bg-white hover:text-[#1a1a1a] transition-colors"
                  onClick={onContactClick}
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
