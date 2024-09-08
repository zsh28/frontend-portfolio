import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import fetchCv from "../api/cv";
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { ToolbarSlot, toolbarPlugin } from '@react-pdf-viewer/toolbar';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';

const CvViewer = () => {
  const [cvUrl, setCvUrl] = useState<string | null>(null);

  // Initialize the toolbar plugin
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;

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
    <div className="cv-viewer-page" style={{ padding: "20px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
      {cvUrl ? (
        <div className="cv-viewer-container" style={{ position: "relative", width: "100%", height: "100vh", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
          {/* Toolbar */}
          <div className="toolbar" style={{ marginBottom: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Toolbar>
              {(slots: ToolbarSlot) => (
                <div style={{ display: "flex", gap: "10px" }}>
                  <slots.ZoomIn />
                  <slots.ZoomOut />
                  <slots.Download />
                  {/* Add more controls as needed */}
                </div>
              )}
            </Toolbar>
          </div>
          {/* PDF Viewer */}
          <div className="pdf-viewer" style={{ borderRadius: "10px", height: "calc(100vh - 100px)", width: "90%", margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
              <Viewer
                fileUrl={cvUrl}
                plugins={[toolbarPluginInstance as any]}
                defaultScale={SpecialZoomLevel.PageWidth} // Fit the PDF to the width of the screen
              />
            </Worker>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default CvViewer;
