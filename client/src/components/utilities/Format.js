import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create Document Component
const Format = (props) => {
  //states de los inputs
  const [userAuth, setUserAuth] = useState(localStorage.getItem("ui"));
  const [nameBusiness, setNameBusiness] = useState("");
  const [emailBusiness, setEmailBusiness] = useState(
    localStorage.getItem("userLogged")
  );
  const [addressBusiness, setAddressBusiness] = useState("");
  const [phoneBusiness, setPhoneBusiness] = useState("");

  const [folio, setFolio] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [nameClient, setNameClient] = useState("");
  const [emailClient, setEmailClient] = useState("");
  const [addressClient, setAddressClient] = useState("");
  const [job, setJob] = useState("");
  const [rate, setRate] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalTaxes, setTotalTaxes] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  const [items, setItems] = useState([]);
  // Consumo de api

  useEffect(() => {
    fetch(`http://127.0.0.1:5005/api/users/${userAuth}`)
      .then((res) => res.json())
      .then((data) => {
        setNameBusiness(data.name_business);
        setAddressBusiness(data.address_business);
        setPhoneBusiness(data.phone_business);
      });
  }, []);
  useEffect(() => {
    if (props.type !== "Invoice") {
      fetch(`http://127.0.0.1:5005/api/estimates/${props.id}`)
        .then((response) => response.json())
        .then((data) => {
          setFolio(data.folio);
          setDateCreated(data.date);
          setNameClient(data.name_client);
          setEmailClient(data.email_client);
          setAddressClient(data.address_client);
          setJob(data.job_descrip);
          setRate(data.base_rate);
          setTaxes(data.taxes);
          setDiscount(data.discount);
          setTotalTaxes(data.calculated_taxes);
          setTotalDiscount(data.calculated_discount);
          setItems(data.items);
          setSubtotal(data.subtotal);
          setTotal(data.total);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      fetch(`http://127.0.0.1:5005/api/invoices/${props.id}`)
        .then((response) => response.json())
        .then((data) => {
          setFolio(data.folio);
          setDateCreated(data.date);
          setDueDate(data.due_date);
          setNameClient(data.name_client);
          setEmailClient(data.email_client);
          setAddressClient(data.address_client);
          setJob(data.job_descrip);
          setRate(data.base_rate);
          setTaxes(data.taxes);
          setDiscount(data.discount);
          setTotalTaxes(data.calculated_taxes);
          setTotalDiscount(data.calculated_discount);
          setItems(data.items);
          setSubtotal(data.subtotal);
          setTotal(data.total);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  // Create styles
  const styles = StyleSheet.create({
    page: {
      fontSize: 16,
    },

    section: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "15px 50px",
    },
    title: {
      fontWeight: "bold",
      fontSize: 25,
    },
    bold: {
      fontWeight: "bold",
    },
    column: {
      display: "flex",
      flexDirection: "column",
    },
    table: {
      width: "100%",
      border: "1px solid grey",
    },

    footerTable: {
      display: "grid",
      gridTemplateColumns: "55% 15% 15% 15%",
      width: "100%",
    },
    headerTable: {
      flexDirection: "row",
      backgroundColor: "#FF7600",
      width: "100%",
      color: "#fff",
      paddingTop: 5,
      paddingBottom: 5,
      paddingRight: 5,
      paddingLeft: 5,
    },
    contentTable: {
      flexDirection: "row",
      width: "100%",
      paddingTop: 5,
      paddingBottom: 5,
      paddingRight: 5,
      paddingLeft: 5,
    },
    columnHTable: {
      flexDirection: "column",
      // width: 55,
    },
    columnDescrip: {
      flexDirection: "column",
      width: "50%",
    },
    columnPrice: {
      flexDirection: "column",
      width: "15%",
    },
    columnQty: {
      flexDirection: "column",
      width: "15%",
    },
    columnAmount: {
      flexDirection: "column",
      width: "20%",
      textAlign: "right",
    },
    columnRefill: {
      flexDirection: "column",
      width: "50%",
    },
    columnBalance: {
      flexDirection: "column",
      width: "25%",
      textAlign: "left",
    },
    columnNumbers: {
      flexDirection: "column",
      width: "25%",
      textAlign: "right",
    },
    columnBalances: {
      fontWeight: "bold",
      fontSize: 20,
    },
  });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>{props.type}</Text>
          <View style={styles.column}>
            <Text>Number {folio}</Text>
            <Text>Created {dateCreated}</Text>
            {props.type === "Invoice" ? <Text>Due {dueDate}</Text> : ""}
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.column}>
            <Text>From</Text>
            <Text>{nameBusiness}</Text>
            <Text>{emailBusiness}</Text>
            <Text>{addressBusiness}</Text>
            <Text>{phoneBusiness}</Text>
          </View>
          <View style={styles.column}>
            <Text>For</Text>
            <Text>{nameClient}</Text>
            <Text>{emailClient}</Text>
            <Text>{addressClient}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.headerTable}>
              <Text style={styles.columnDescrip}>DESCRIPTION</Text>
              <Text style={styles.columnPrice}>PRICE</Text>
              <Text style={styles.columnQty}>QTY</Text>
              <Text style={styles.columnAmount}>AMOUNT</Text>
            </View>
            <View style={styles.contentTable}>
              <Text style={styles.columnDescrip}>{job} (job)</Text>
              <Text style={styles.columnPrice}>
                ${props.prices === 0 ? "-" : rate}
              </Text>
              <Text style={styles.columnQty}>1</Text>
              <Text style={styles.columnAmount}>
                ${props.prices === 0 ? "-" : rate}
              </Text>
            </View>
            {items.map((indice) => {
              return (
                <View style={styles.contentTable}>
                  <Text style={styles.columnDescrip}>
                    {indice.descrip} ({indice.unit_measurement})
                  </Text>
                  <Text style={styles.columnPrice}>
                    ${props.prices === 0 ? "-" : indice.price}
                  </Text>
                  <Text style={styles.columnQty}>{indice.quantity}</Text>
                  <Text style={styles.columnAmount}>
                    ${props.prices === 0 ? "-" : indice.subtotal}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.contentTable}>
            <Text style={styles.columnRefill}></Text>
            <View style={styles.columnBalance}>
              <Text style={styles.columnHTable}>Subtotal</Text>
              <Text style={styles.columnHTable}>Tax ({taxes}%)</Text>
              <Text style={styles.columnHTable}>Discount ({discount}%)</Text>
              <Text style={styles.columnBalances}>Balance</Text>
            </View>
            <View style={styles.columnNumbers}>
              <Text style={styles.columnHTable}>${subtotal}</Text>
              <Text style={styles.columnHTable}>${totalTaxes}</Text>
              <Text style={styles.columnHTable}>${totalDiscount}</Text>
              <Text style={styles.columnBalances}>${total}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default Format;
