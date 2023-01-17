import React from "react";
import { useParams } from "react-router-dom";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create Document Component
const Format = (props) => {
  const { id } = useParams(); // Este se debe de llamar como lo llamamos en App.js (identificador dinamizado)
  console.log(id);
  // Create styles
  const styles = StyleSheet.create({
    page: {},

    section: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      padding: "20px 60px",
    },
    title: {
      fontWeight: "bold",
      fontSize: 30,
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
    headerTable: {
      backgroundColor: "#FF7600",
      display: "grid",
      gridTemplateColumns: "55% 15% 15% 15%",
      width: "100%",
      color: "#fff",
    },
    contentTable: {
      display: "grid",
      gridTemplateColumns: "55% 15% 15% 15%",
      width: "100%",
    },
    footerTable: {
      display: "grid",
      gridTemplateColumns: "55% 15% 15% 15%",
      width: "100%",
    },
  });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Logo</Text>
          <View style={styles.column}>
            <Text>Invoice #: {props.folio}</Text>
            <Text>Created: {props.date}</Text>
            <Text>Due: {props.date}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.column}>
            <Text>{props.client}</Text>
            <Text>{props.street}</Text>
            <Text>{props.address}</Text>
          </View>
          <View style={styles.column}>
            <Text>{props.name}</Text>
            <Text>Name</Text>
            <Text>{props.email_client}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.headerTable}>
              <Text style={styles.columnHTable}>DESCRIPTION</Text>
              <Text style={styles.columnHTable}>QTY</Text>
              <Text style={styles.columnHTable}>UNIT PRICE</Text>
              <Text style={styles.columnHTable}>TOTAL</Text>
            </View>
            <View style={styles.contentTable}>
              <Text style={styles.columnHTable}>Sahs hiauhiusaha ajkha</Text>
              <Text style={styles.columnHTable}>1</Text>
              <Text style={styles.columnHTable}>$45.00</Text>
              <Text style={styles.columnHTable}>$45.00</Text>
            </View>
            <View style={styles.contentTable}>
              <Text style={styles.columnHTable}>Sahs hiauhiusaha ajkha</Text>
              <Text style={styles.columnHTable}>1</Text>
              <Text style={styles.columnHTable}>$45.00</Text>
              <Text style={styles.columnHTable}>$45.00</Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.contentTable}>
            <Text style={styles.columnHTable}></Text>
            <Text style={styles.columnHTable}></Text>
            <View style={styles.column}>
              <Text style={styles.columnHTable}>Subtotal</Text>
              <Text style={styles.columnHTable}>Sale tax</Text>
              <hr />
              <Text style={styles.bold}>Total</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.columnHTable}>$234.00</Text>
              <Text style={styles.columnHTable}>$234.00</Text>
              <hr />
              <Text style={styles.bold}>$234.00</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default Format;
