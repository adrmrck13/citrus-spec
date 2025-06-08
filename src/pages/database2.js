import { useHistory } from "react-router-dom";
import app from "../firebaseConfig";
import { getDatabase, ref, onValue, get } from "firebase/database";
import React, { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";

function Database2() {
  const [factorsArray, setFactorsArray] = useState([]);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "calamansi/factor/Phase2");
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
    const dbRef = ref(db, "calamansi/factor/Phase2");
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
  }, []);
  const history = useHistory();
  const goToPhase2 = () => {
    history.push("/phase2");
  };

  return (
    <div className="databaseContain">
      <div className="header">
        <img
          className="calamansi-header"
          src="/images/calamansi_header.png"
          alt=""
        ></img>
        <h1 className="title">CitroSpec Database Phase 2</h1>
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
              <Table.HeaderCell className="headerTemp">
                Temperature
              </Table.HeaderCell>
              <Table.HeaderCell className="headerHumidity">
                Humidity
              </Table.HeaderCell>
              <Table.HeaderCell className="headerTime">Time</Table.HeaderCell>
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
              .sort((a, b) => {
                const timeA = parseInt(a.Time);
                const timeB = parseInt(b.Time);
                return timeB - timeA; // Sort latest first
              })
              .map((data, index, array) => (
                <Table.Row key={index} className="dataRow">
                  <Table.Cell className="databaseValue">
                    {array.length - index}
                  </Table.Cell>
                  <Table.Cell className="databaseValue">
                    {data.Temp + "°C"}
                  </Table.Cell>
                  <Table.Cell className="databaseValue">
                    {data.Humidity + " %"}
                  </Table.Cell>
                  <Table.Cell className="databaseValue">
                    {data.Time + " day/s"}
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
                    {(() => {
                      const ripeness = parseFloat(data.ripeness);

                      if (ripeness >= 0.5 && ripeness <= 1.5) {
                        return "Unripe";
                      } else if (ripeness > 1.5 && ripeness <= 2.5) {
                        return "Ripe";
                      } else {
                        return "Overripe";
                      }
                    })()}
                  </Table.Cell>
                  <Table.Cell className="databaseValue">
                    {(() => {
                      const juiciness = parseFloat(data.juiciness);

                      if (juiciness >= 0.5 && juiciness <= 1.5) {
                        return "Not Juicy";
                      } else {
                        return "Juicy";
                      }
                    })()}
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>

      <button className="goToPhase1" onClick={goToPhase2}>
        Go back to Phase 2
      </button>
    </div>
  );
}
export default Database2;
