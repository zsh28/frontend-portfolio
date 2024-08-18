import { useState } from "react";
import fetchCv from "../api/cv";

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const scrollToSection = (id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const openCvInNewTab = async () => {
    const cvData = await fetchCv();
    if (typeof cvData === "object" && cvData.url) {
      const a = document.createElement("a");
      a.href = cvData.url;
      a.target = "_blank"; // Open in a new tab
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      alert("Failed to fetch CV");
    }
};

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLinkClick = (id: string) => {
    setDropdownVisible(false);
    scrollToSection(id);
  };

  return (
    <header className="bg-transparent p-2 rounded-3xl mx-auto max-w-2xl mt-4 shadow-custom-all-around top-3 left-0 right-0 backdrop-blur-md sticky">
      <nav className="px-4 navbar">
        <div className="flex justify-between items-center">
          <div
            className={`md:flex space-x-4 ${
              dropdownVisible ? "hidden" : "hidden md:flex"
            }`}
          >
            <button
              className="hover:bg-indigo-900 p-2 rounded-full transition text-lg md:text-base sm:text-sm text-gray-300"
              onClick={() => handleLinkClick("top")}
            >
              Home
            </button>
            <button
              className="hover:bg-indigo-900 p-2 rounded-full transition text-lg md:text-base sm:text-sm text-gray-300"
              onClick={() => handleLinkClick("about")}
            >
              About
            </button>
            <button
              className="hover:bg-indigo-900 p-2 rounded-full transition text-lg md:text-base sm:text-sm text-gray-300"
              onClick={() => handleLinkClick("skillstechstack")}
            >
              Skills
            </button>
            <button
              className="hover:bg-indigo-900 p-2 rounded-full transition text-lg md:text-base sm:text-sm text-gray-300"
              onClick={() => handleLinkClick("experience")}
            >
              Experience
            </button>
            <button
              className="hover:bg-indigo-900 p-2 rounded-full transition text-lg md:text-base sm:text-sm text-gray-300"
              onClick={() => handleLinkClick("education")}
            >
              Education
            </button>
            <button
              className="hover:bg-indigo-900 p-2 rounded-full transition text-lg md:text-base sm:text-sm text-gray-300"
              onClick={() => handleLinkClick("projects")}
            >
              Projects
            </button>
            <button
              className="hover:bg-indigo-900 p-2 rounded-full transition text-lg md:text-base sm:text-sm text-gray-300"
              onClick={() => handleLinkClick("contact")}
            >
              Contact
            </button>
            <button
              className="hover:bg-indigo-900 p-2 rounded-full transition text-lg md:text-base sm:text-sm text-gray-300"
              onClick={openCvInNewTab}
            >
              CV
            </button>
          </div>
          <div className="md:hidden w-full">
            <button
              onClick={handleDropdownToggle}
              type="button"
              className="w-full bg-slate-200 bg-transparent inline-flex items-center justify-center p-2 rounded-lg text-gray-300"
            >
              <span className="sr-only">Open main menu</span>
              Menu
              {dropdownVisible ? (
                <svg
                  className="ml-2 h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              ) : (
                <svg
                  className="ml-2 h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        {dropdownVisible && (
          <div className="top-16 left-0 right-0 text-gray-300 ">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                className="block w-full px-3 py-2 rounded-full text-base font-medium hover:bg-indigo-900"
                onClick={() => handleLinkClick("top")}
              >
                Home
              </button>
              <a
                className="block w-full px-3 py-2 rounded-full text-base font-medium hover:bg-indigo-900 text-center"
                onClick={() => handleLinkClick("about")}
                href="#about"
              >
                About
              </a>
              <a
                className="block w-full px-3 py-2 rounded-full text-base font-medium hover:bg-indigo-900 text-center"
                onClick={() => handleLinkClick("skillstechstack")}
                href="#skillstechstack"
              >
                Skills
              </a>
              <a
                className="block w-full px-3 py-2 rounded-full text-base font-medium hover:bg-indigo-900 text-center"
                onClick={() => handleLinkClick("experience")}
                href="#experience"
              >
                Experience
              </a>
              <a
                className="block w-full px-3 py-2 rounded-full text-base font-medium hover:bg-indigo-900 text-center"
                onClick={() => handleLinkClick("education")}
                href="#education"
              >
                Education
              </a>
              <a
                className="block w-full px-3 py-2 rounded-full text-base font-medium hover:bg-indigo-900 text-center"
                onClick={() => handleLinkClick("projects")}
                href="#projects"
              >
                Projects
              </a>
              <a
                className="block w-full px-3 py-2 rounded-full text-base font-medium hover:bg-indigo-900 text-center"
                onClick={() => handleLinkClick("contact")}
                href="#contact"
              >
                Contact
              </a>

              <button
                className="block w-full px-3 py-2 rounded-full text-base font-medium hover:bg-indigo-900"
                onClick={openCvInNewTab}
              >
                CV
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
