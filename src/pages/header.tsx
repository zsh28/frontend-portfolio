import { useState } from "react";
import fetchCv from "../api/cv";
import { Document, Page } from 'react-pdf';

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [cvBlobUrl, setCvBlobUrl] = useState<string | null>(null);

  // Smooth scroll to sections
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

  // Open CV in a modal using React PDF
  const openCvInViewer = async () => {
    const cvData = await fetchCv();
    if (typeof cvData === "object" && cvData.url) {
      setCvBlobUrl(cvData.url); // Set the blob URL to render in the viewer
    } else {
      alert("Failed to fetch CV");
    }
  };

  // Toggle the visibility of the dropdown menu (for mobile view)
  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header className="bg-transparent p-2 rounded-3xl mx-auto max-w-2xl mt-4 shadow-custom-all-around top-3 left-0 right-0 backdrop-blur-md sticky">
      <nav className="px-4 navbar">
        <div className="flex justify-between items-center">
          <div className={`md:flex space-x-4 ${dropdownVisible ? "hidden" : "hidden md:flex"}`}>
            <button
              className="hover:bg-indigo-900 p-2 rounded-full transition text-lg md:text-base sm:text-sm text-gray-300"
              onClick={() => scrollToSection("top")}
            >
              Home
            </button>
            <button
              className="hover:bg-indigo-900 p-2 rounded-full transition text-lg md:text-base sm:text-sm text-gray-300"
              onClick={() => scrollToSection("about")}
            >
              About
            </button>
            <button
              className="hover:bg-indigo-900 p-2 rounded-full transition text-lg md:text-base sm:text-sm text-gray-300"
              onClick={() => scrollToSection("skillstechstack")}
            >
              Skills
            </button>
            <button
              className="hover:bg-indigo-900 p-2 rounded-full transition text-lg md:text-base sm:text-sm text-gray-300"
              onClick={() => scrollToSection("experience")}
            >
              Experience
            </button>
            <button
              className="hover:bg-indigo-900 p-2 rounded-full transition text-lg md:text-base sm:text-sm text-gray-300"
              onClick={() => scrollToSection("education")}
            >
              Education
            </button>
            <button
              className="hover:bg-indigo-900 p-2 rounded-full transition text-lg md:text-base sm:text-sm text-gray-300"
              onClick={() => scrollToSection("projects")}
            >
              Projects
            </button>
            <button
              className="hover:bg-indigo-900 p-2 rounded-full transition text-lg md:text-base sm:text-sm text-gray-300"
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </button>
            <button
              className="hover:bg-indigo-900 p-2 rounded-full transition text-lg md:text-base sm:text-sm text-gray-300"
              onClick={openCvInViewer}
            >
              CV
            </button>
          </div>

          {/* Mobile menu */}
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
                    d="M9 5l7 7-7-7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Dropdown menu for mobile */}
        {dropdownVisible && (
          <div className="top-16 left-0 right-0 text-gray-300 ">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                className="block w-full px-3 py-2 rounded-full text-base font-medium hover:bg-indigo-900"
                onClick={() => scrollToSection("top")}
              >
                Home
              </button>
              <button
                className="block w-full px-3 py-2 rounded-full text-base font-medium hover:bg-indigo-900"
                onClick={() => scrollToSection("about")}
              >
                About
              </button>
              <button
                className="block w-full px-3 py-2 rounded-full text-base font-medium hover:bg-indigo-900"
                onClick={() => scrollToSection("skillstechstack")}
              >
                Skills
              </button>
              <button
                className="block w-full px-3 py-2 rounded-full text-base font-medium hover:bg-indigo-900"
                onClick={() => scrollToSection("experience")}
              >
                Experience
              </button>
              <button
                className="block w-full px-3 py-2 rounded-full text-base font-medium hover:bg-indigo-900"
                onClick={() => scrollToSection("education")}
              >
                Education
              </button>
              <button
                className="block w-full px-3 py-2 rounded-full text-base font-medium hover:bg-indigo-900"
                onClick={() => scrollToSection("projects")}
              >
                Projects
              </button>
              <button
                className="block w-full px-3 py-2 rounded-full text-base font-medium hover:bg-indigo-900"
                onClick={() => scrollToSection("contact")}
              >
                Contact
              </button>
              <button
                className="block w-full px-3 py-2 rounded-full text-base font-medium hover:bg-indigo-900"
                onClick={openCvInViewer}
              >
                CV
              </button>
            </div>
          </div>
        )}

        {/* PDF Viewer for CV */}
        {cvBlobUrl && (
          <div className="cv-viewer-modal">
            <Document
              file={cvBlobUrl}
              onLoadError={(error: Error) => console.error(error)} // Typed error
            >
              <Page pageNumber={1} />
            </Document>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
