import Header from './pages/header';
import About from './pages/about';
import SkillSet from './pages/skillset';
import Experience from './pages/experience';
import Education from './pages/education';
import Projects from './pages/projects';
import Contact from './pages/contact';
import Footer from './pages/footer';
import CvViewerLayout from './pages/cvViewerLayout'; // Import the layout for CV Viewer
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';


function App() {
  return (
    <Router>
      <Routes>
        {/* Main page path */}
        <Route
          path="/"
          element={
            <div className="min-h-screen">
              <Header />
              <About />
              <SkillSet />
              <Experience />
              <Education />
              <Projects />
              <Contact />
              <Footer />
            </div>
          }
        />
        {/* CV Viewer as a separate path with header and footer */}
        <Route path="/cv-viewer" element={<CvViewerLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
