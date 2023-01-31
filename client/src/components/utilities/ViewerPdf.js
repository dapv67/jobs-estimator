import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import Format from "./Format";
import { useParams, useLocation } from "react-router-dom";

function ViewerPdf(props) {
  const { id } = useParams(); // Este se debe de llamar como lo llamamos en App.js (identificador dinamizado)
  const location = useLocation();
  const { type } = location.state;
  const { prices } = location.state;
  console.log(id);
  console.log(type);
  console.log(prices);
  return (
    <>
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <Format id={id} type={type} prices={prices} />
      </PDFViewer>
    </>
  );
}

export default ViewerPdf;
