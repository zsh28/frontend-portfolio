import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io"; // Importing both icons

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get current path

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Open or fetch CV depending on current route
  const handleCvClick = async () => {
    if (location.pathname === "/cv-viewer") {
      // If already on CV viewer page, go back to main page
      navigate("/");
    } else {
      // Navigate to the CV viewer page
      navigate("/cv-viewer");
    }
  };

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLinkClick = (id: string) => {
    if (location.pathname !== "/") {
      // Navigate back to the main page before scrolling
      navigate("/", { replace: true });

      // Add a slight delay before scrolling to ensure the page has loaded
      setTimeout(() => {
        scrollToSection(id);
      }, 300);
    } else {
      // Scroll directly if already on the main page
      scrollToSection(id);
    }

    setDropdownVisible(false);
  };

  return (
    <header
      className={`p-2 rounded-3xl mx-auto max-w-2xl mt-4 shadow-custom-all-around top-0 left-0 right-0 backdrop-blur-md sticky z-50 ${
        location.pathname === "/cv-viewer" ? "bg-[rgba(3,11,82,0.85)]" : "bg-transparent"
      }`}
    >
      <nav className="px-4 navbar">
        <div className="flex justify-between items-center">
          {/* Navigation buttons for desktop */}
          <div className={`md:flex space-x-4 ${dropdownVisible ? "hidden" : "hidden md:flex"}`}>
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
              onClick={handleCvClick}
            >
              {location.pathname === "/cv-viewer" ? "Back" : "CV"}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden w-full">
            <button
              onClick={handleDropdownToggle}
              type="button"
              className="menu-button w-full bg-slate-200 bg-transparent inline-flex items-center justify-center p-2 rounded-lg text-gray-300"
            >
              <span className="sr-only">Open main menu</span>
              Menu
              {dropdownVisible ? (
                <IoIosArrowDown className="ml-2 h-5 w-5" /> // Show IoIosArrowDown when menu is opened
              ) : (
                <IoIosArrowForward className="ml-2 h-5 w-5" /> // Show IoIosArrowForward when menu is closed
              )}
            </button>
          </div>
        </div>

        {/* Dropdown menu for mobile */}
        {dropdownVisible && (
          <div className="top-16 left-0 right-0 text-gray-300">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                className="block w-full px-3 py-2 rounded-full text-base font-medium hover:bg-indigo-900"
                onClick={() => handleLinkClick("top")}
              >
                Home
              </button>
              <button
                className="block w-full px-3 py-2 rounded-full text-base font-medium hover:bg-indigo-900"
                onClick={() => handleLinkClick("about")}
              >
                About
              </button>
              <button
                className="block w-full px-3 py-2 rounded-full text-base font-medium hover:bg-indigo-900"
                onClick={() => handleLinkClick("skillstechstack")}
              >
                Skills
              </button>
              <button
                className="block w-full px-3 py-2 rounded-full text-base font-medium hover:bg-indigo-900"
                onClick={() => handleLinkClick("experience")}
              >
                Experience
              </button>
              <button
                className="block w-full px-3 py-2 rounded-full text-base font-medium hover:bg-indigo-900"
                onClick={() => handleLinkClick("education")}
              >
                Education
              </button>
              <button
                className="block w-full px-3 py-2 rounded-full text-base font-medium hover:bg-indigo-900"
                onClick={() => handleLinkClick("projects")}
              >
                Projects
              </button>
              <button
                className="block w-full px-3 py-2 rounded-full text-base font-medium hover:bg-indigo-900"
                onClick={() => handleLinkClick("contact")}
              >
                Contact
              </button>
              <button
                className="block w-full px-3 py-2 rounded-full text-base font-medium hover:bg-indigo-900"
                onClick={handleCvClick}
              >
                {location.pathname === "/cv-viewer" ? "Back" : "CV"}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
