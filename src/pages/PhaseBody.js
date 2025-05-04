import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  TableHeaderCell,
} from "semantic-ui-react";
import { getDatabase, ref, onValue, get } from "firebase/database";
import React, { useState, useEffect } from "react";
import app from "../firebaseConfig";
// Define Phase1Body as a constant function
export const Phase1Body = () => {
  return (
    <>
      <Table
        celled
        fixed
        singleLine
        basic
        style={{
          border: "none",
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        size="large"
        compact
        unstackable
        verticalAlign="middle"
      >
        <TableHeader>
          <TableRow style={{ textAlign: "center" }}>
            <TableHeaderCell style={{ border: "none" }}></TableHeaderCell>
            <TableHeaderCell style={{ border: "none", fontSize: "25px" }}>
              Ripeness
            </TableHeaderCell>
            <TableHeaderCell style={{ border: "none", fontSize: "25px" }}>
              Juiciness
            </TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow style={{ textAlign: "center" }}>
            <TableCell
              style={{
                border: "none",
              }}
            >
              <Container className="factors">
                {" "}
                <p>
                  TSS:{" "}
                  <span className="white-underline">
                    {factorsArray.length > 0 &&
                      factorsArray[factorsArray.length - 1].TSS}
                  </span>{" "}
                  <span>Brix</span>
                </p>
              </Container>
            </TableCell>

            <TableCell style={{ border: "none" }}>
              <Container className="ripeness-background">Unripe</Container>
            </TableCell>
            <TableCell style={{ border: "none" }}>
              <Container className="juiciness-background">Juicy</Container>
            </TableCell>
          </TableRow>
          <TableRow style={{ textAlign: "center" }}>
            <TableCell style={{ border: "none" }}>
              <Container className="factors">
                {" "}
                <p>
                  Vitamin C: <span className="white-underline">ssss</span>{" "}
                  <span>mg</span>
                </p>
              </Container>
            </TableCell>
            <TableCell style={{ border: "none" }}>
              <Container className="ripeness-background">Ripe</Container>
            </TableCell>
            <TableCell style={{ border: "none" }}>
              <Container className="juiciness-background">Not Juicy</Container>
            </TableCell>
          </TableRow>
          <TableRow style={{ textAlign: "center" }}>
            <TableCell style={{ border: "none" }}>
              <Container className="factors">
                {" "}
                <p>
                  pH Level: <span className="white-underline">ssss</span>
                </p>
              </Container>
            </TableCell>
            <TableCell style={{ border: "none" }}>
              <Container className="ripeness-background">Overripe</Container>
            </TableCell>
            <TableCell style={{ border: "none" }}></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

// Define AnotherPhaseBody as a constant function
export const Phase2Body = () => {
  return (
    <>
      <Table
        celled
        fixed
        singleLine
        basic
        style={{
          border: "none",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        size="large"
        compact
        unstackable
        verticalAlign="middle"
      >
        <TableHeader>
          <TableRow style={{ textAlign: "center", fontSize: "25px" }}>
            <TableHeaderCell style={{ border: "none" }}>
              Storage Condition
            </TableHeaderCell>

            <TableHeaderCell style={{ border: "none" }}></TableHeaderCell>
            <TableHeaderCell style={{ border: "none", fontSize: "25px" }}>
              Ripeness
            </TableHeaderCell>
            <TableHeaderCell style={{ border: "none", fontSize: "25px" }}>
              Juiciness
            </TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow style={{ textAlign: "center" }}>
            <TableCell
              style={{
                border: "none",
              }}
            >
              <Container className="factors">
                {" "}
                <p>
                  Temperature: <span className="white-underline">ssss</span>{" "}
                  <span>C</span>
                </p>
              </Container>
            </TableCell>
            <TableCell
              style={{
                border: "none",
              }}
            >
              <Container className="factors">
                {" "}
                <p>
                  TSS: <span className="white-underline">ssss</span>{" "}
                  <span>Brix</span>
                </p>
              </Container>
            </TableCell>

            <TableCell style={{ border: "none" }}>
              <Container className="ripeness-background">Unripe</Container>
            </TableCell>
            <TableCell style={{ border: "none" }}>
              <Container className="juiciness-background">Juicy</Container>
            </TableCell>
          </TableRow>

          <TableRow style={{ textAlign: "center" }}>
            <TableCell style={{ border: "none" }}>
              <Container className="factors">
                {" "}
                <p>
                  Humidity: <span className="white-underline">ssss</span>{" "}
                  <span>%</span>
                </p>
              </Container>
            </TableCell>
            <TableCell style={{ border: "none" }}>
              <Container className="factors">
                {" "}
                <p>
                  Vitamin C: <span className="white-underline">ssss</span>{" "}
                  <span>mg</span>
                </p>
              </Container>
            </TableCell>
            <TableCell style={{ border: "none" }}>
              <Container className="ripeness-background">Ripe</Container>
            </TableCell>
            <TableCell style={{ border: "none" }}>
              <Container className="juiciness-background">Not Juicy</Container>
            </TableCell>
          </TableRow>

          <TableRow style={{ textAlign: "center" }}>
            <TableCell style={{ border: "none" }}>
              <Container className="factors">
                {" "}
                <p>
                  Time: <span className="white-underline">ssss</span>{" "}
                  <span>day/s</span>
                </p>
              </Container>
            </TableCell>
            <TableCell style={{ border: "none" }}>
              <Container className="factors">
                {" "}
                <p>
                  pH Level: <span className="white-underline">ssss</span>
                </p>
              </Container>
            </TableCell>
            <TableCell style={{ border: "none" }}>
              <Container className="ripeness-background">Overripe</Container>
            </TableCell>
            <TableCell style={{ border: "none" }}></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
