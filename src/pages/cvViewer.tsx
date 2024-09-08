import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fetchCv from "../api/cv";
import 'pdfjs-dist/web/pdf_viewer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


const CvViewer = () => {
  const [cvUrl, setCvUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadCv = async () => {
      const loadingToastId = toast.loading("Loading CV...");
      try {
        const cvData = await fetchCv();
        if (typeof cvData === "object" && cvData.url) {
          setCvUrl(cvData.url);
          toast.update(loadingToastId, {
            render: "CV Loaded!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
        } else {
          throw new Error("Failed to fetch CV");
        }
      } catch (error) {
        toast.update(loadingToastId, {
          render: "Failed to load CV",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    };

    loadCv();
  }, []);

  return (
    <div className="cv-viewer-page">
      <ToastContainer />
      {cvUrl ? (
        <Document
          file={cvUrl}
          onLoadError={(error: Error) => {
            console.error("Error while loading PDF:", error);
            toast.error("Error while loading PDF");
          }}
        >
          <Page pageNumber={1} />
        </Document>
      ) : (
        <p>Loading CV...</p>
      )}
    </div>
  );
};

export default CvViewer;
