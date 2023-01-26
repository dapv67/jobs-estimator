import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import Format from "./Format";
import { useParams, useLocation } from "react-router-dom";

function ViewerPdf(props) {
  const { id } = useParams(); // Este se debe de llamar como lo llamamos en App.js (identificador dinamizado)
  const location = useLocation();
  const { type } = location.state;
  console.log(id);
  console.log(type);
  return (
    <>
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <Format id={id} type={type} />
      </PDFViewer>
    </>
  );
}

export default ViewerPdf;
