import "./App.css";
import { Route, Routes } from "react-router-dom";
import Estimates from "./components/estimates/Estimates";
import Estimate from "./components/estimates/Estimate";
import NewEstimate from "./components/estimates/NewEstimate";
import Invoices from "./components/invoices/Invoices";
import Invoice from "./components/invoices/Invoice";
import NewInvoice from "./components/invoices/NewInvoice";
import Clients from "./components/clients/Clients";
import Client from "./components/clients/Client";
import NewClient from "./components/clients/NewClient";
import Items from "./components/items/Items";
import Item from "./components/items/Item";
import NewItem from "./components/items/NewItem";
import Viewer from "./components/utilities/ViewerPdf";
// import Error404 from "./components/utilities/Error404";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Estimates />} />
        <Route path="/estimates/new" element={<NewEstimate />} />
        <Route path="/estimates/:id" element={<Estimate />} />
        <Route path="/estimates/:id/pdf" element={<Viewer />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/invoices/new" element={<NewInvoice />} />
        <Route path="/invoices/:id" element={<Invoice />} />
        <Route path="/invoices/:id/pdf" element={<Viewer />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/clients/new" element={<NewClient />} />
        <Route path="/clients/:id" element={<Client />} />
        <Route path="/items" element={<Items />} />
        <Route path="/items/new" element={<NewItem />} />
        <Route path="/items/:id" element={<Item />} />

        {/* <Route path="*" element={<Error404 />} /> */}
      </Routes>
    </div>
  );
}

export default App;
