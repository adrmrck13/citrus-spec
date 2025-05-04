import { useHistory } from "react-router-dom";
import app from "../firebaseConfig";
import { getDatabase, ref, onValue, get } from "firebase/database";
import React, { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";
function Database1() {
  const [factorsArray, setFactorsArray] = useState([]);
  const history = useHistory();
  const goToPhase1 = () => {
    history.push("/phase1");
  };

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "calamansi/factor/Phase1");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      setFactorsArray(Object.values(snapshot.val()));
      //  setRipenessValue(factorsArray[factorsArray.length-1].ripeness);  // Update
    } else {
      setFactorsArray([]);
    }
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchData(); // Fetch initial data

    // Attach a listener to the database reference to listen for changes
    const db = getDatabase(app);
    const dbRef = ref(db, "calamansi/factor/Phase1");
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        setFactorsArray(Object.values(snapshot.val()));
        //setRipenessValue(factorsArray[factorsArray.length-1].ripeness);  // Update
      } else {
        setFactorsArray([]);
      }
    });

    // Cleanup function to detach the listener when the component unmounts
    return () => {
      unsubscribe(); // Detach the listener
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount
  console.log(factorsArray.map(d => d.Time));

  return (
    <div className="databaseContain" style={{}}>
      <div className="header">
        <img
          className="calamansi-header"
          src="/images/calamansi_header.png"
          alt=""
        ></img>
        <h1 className="title">CitroSpec Database Phase 1</h1>
      </div>
      <div
        className="databaseContainer"
        style={{ height: "64vh", overflowY: "overlay" }}
      >
        <Table>
          <Table.Header
            className="dataRowHeader"
            style={{ position: "sticky", top: 0, zIndex: 1 }}
          >
            <Table.Row className="dataRow">
              <Table.HeaderCell className="headerNoCal">
                No. Calamansi
              </Table.HeaderCell>
              <Table.HeaderCell className="headerVitC">
                Vitamin C
              </Table.HeaderCell>
              <Table.HeaderCell className="headerTSS">
                Total Soluble Solid
              </Table.HeaderCell>
              <Table.HeaderCell className="headerPhLevel">
                Ph Level
              </Table.HeaderCell>
              <Table.HeaderCell className="headerRipeness">
                Ripeness
              </Table.HeaderCell>
              <Table.HeaderCell className="headerJuiciness">
                Juiciness
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {factorsArray
              .slice()
              .sort((a, b) => new Date(b.Time) - new Date(a.Time))
              .map((data, index, array) => (
                <Table.Row key={index} className="dataRow">
                  <Table.Cell className="databaseValue">
                    {array.length - index}
                  </Table.Cell>
                  <Table.Cell className="databaseValue">
                    {data.vitaminC + " mg"}
                  </Table.Cell>
                  <Table.Cell className="databaseValue">
                    {data.TSS + "°Brix"}
                  </Table.Cell>
                  <Table.Cell className="databaseValue">
                    {data.pHLevel}
                  </Table.Cell>
                  <Table.Cell className="databaseValue">
                    {data.ripeness === "1"
                      ? "Unripe"
                      : data.ripeness === "2"
                      ? "Ripe"
                      : "Overripe"}
                  </Table.Cell>
                  <Table.Cell className="databaseValue">
                    {data.juiciness === "0" ? "Not juicy" : "Juicy"}
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>

      <button className="goToPhase1" onClick={goToPhase1}>
        Go back to Phase 1
      </button>
    </div>
  );
}

export default Database1;
