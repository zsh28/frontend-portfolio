import Header from './pages/header';
import About from './pages/about';
import SkillSet from './pages/skillset';
import Experience from './pages/experience';
import Education from './pages/education';
import Projects from './pages/projects';
import Contact from './pages/contact';
import Footer from './pages/footer';
import './index.css';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <About />
      <SkillSet />
      <Experience />
      <Education />
      <Projects />
      <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_PUBLIC_KEY || ''}>
      <Contact />
  </GoogleReCaptchaProvider>
      <Footer />
    </div>
  );
}

export default App;
