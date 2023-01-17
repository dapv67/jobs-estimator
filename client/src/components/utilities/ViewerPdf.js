import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import Format from "./Format";

function ViewerPdf(props) {
  return (
    <>
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <Format />
      </PDFViewer>
    </>
  );
}

export default ViewerPdf;
