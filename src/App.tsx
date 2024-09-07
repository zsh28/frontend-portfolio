import Header from './pages/header';
import About from './pages/about';
import SkillSet from './pages/skillset';
import Experience from './pages/experience';
import Education from './pages/education';
import Projects from './pages/projects';
import Contact from './pages/contact';
import Footer from './pages/footer';
import CvViewer from './pages/cvViewer'; // Import CvViewer
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
        {/* CV Viewer as a separate path */}
        <Route path="/cv-viewer" element={<CvViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
