import Header from "./header";
import Footer from "./footer";
import CvViewer from "./cvViewer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CvViewerLayout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <ToastContainer />
      <CvViewer />
      <Footer />
    </div>
  );
};

export default CvViewerLayout;
