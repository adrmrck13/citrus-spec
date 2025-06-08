import { useHistory } from "react-router-dom";
import app from "../firebaseConfig";
import { getDatabase, ref, onValue, get } from "firebase/database";
import React, { useState, useEffect } from "react";

function Phase2() {
  const [factorsArray, setFactorsArray] = useState([]);

  // Function to fetch data from the database
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

  const goToPhase1 = () => {
    history.push("/phase1");
  };

  const goToPhaseDatabase2 = () => {
    history.push("/database2");
  };

  const ripenessRaw =
    factorsArray.length > 0
      ? parseFloat(factorsArray[factorsArray.length - 1].ripeness)
      : null;

  const juicinessRaw =
    factorsArray.length > 0
      ? parseFloat(factorsArray[factorsArray.length - 1].juiciness)
      : null;
  return (
    <div>
      <div className="header">
        <img
          className="calamansi-header"
          src="/images/calamansi_header.png"
          alt=""
        ></img>
        <h1 className="title">CitroSpec Phase 2</h1>
      </div>

      <div className="container">
        <div className="row1">
          <div className="storage-title-row">
            <p className="storage-title">Storage Condition</p>
          </div>

          <div className="content-1">
            <p className="factor">Temperature:</p>
            <p className="input-temp">
              {factorsArray.length > 0 &&
                factorsArray[factorsArray.length - 1].Temp}
            </p>
            <p className="celc">&deg;C</p>
          </div>

          <div className="content-humidity-color">
            <p className="factor">Humidity:</p>
            <p className="input-humidity">
              {factorsArray.length > 0 &&
                factorsArray[factorsArray.length - 1].Humidity}
            </p>
            <p className="mg">&#37;</p>
          </div>

          <div className="content-3">
            <p className="factor">Time:</p>
            <p className="input-days">
              {factorsArray.length > 0 &&
                factorsArray[factorsArray.length - 1].Time}
            </p>
            <p className="days">day/s</p>
          </div>
        </div>

        <div className="row2">
          <div className="blank"></div>

          <div className="content-1">
            <p className="factor">TSS: </p>
            <p className="input-brix">
              {factorsArray.length > 0 &&
                factorsArray[factorsArray.length - 1].TSS}
            </p>
            <p className="brix">&deg;Brix</p>
          </div>

          <div className="content-2">
            <p className="factor">Vitamin C:</p>
            <p className="input-vitC">
              {factorsArray.length > 0 && (
                <>{factorsArray[factorsArray.length - 1].vitaminC}</>
              )}
            </p>
            <p className="mg">mg</p>
          </div>

          <div className="content-3">
            <p className="factor">pH Level:</p>
            <p className="input-ph">
              {factorsArray.length > 0 && (
                <>{factorsArray[factorsArray.length - 1].pHLevel}</>
              )}
            </p>
          </div>
        </div>

        <div className="row3">
          <div className="ripe-title-row">
            <p className="ripe-title">Ripeness</p>
          </div>

          <div
            className={`content-ripeness-1 ${
              ripenessRaw !== null && ripenessRaw >= 0.5 && ripenessRaw <= 1.5
                ? "unripe"
                : ""
            }`}
          >
            <p className="ripeness-1">Unripe</p>
          </div>

          <div
            className={`content-ripeness-2 ${
              ripenessRaw !== null && ripenessRaw > 1.5 && ripenessRaw <= 2.5
                ? "ripe"
                : ""
            }`}
          >
            <p className="ripeness-2">Ripe</p>
          </div>

          <div
            className={`content-ripeness-3 ${
              ripenessRaw !== null &&
              (ripenessRaw < 0.5 ||
                (ripenessRaw > 2.5 && ripenessRaw <= 3.5) ||
                ripenessRaw > 3.5)
                ? "overripe"
                : ""
            }`}
          >
            <p className="ripeness-3">Overripe</p>
          </div>
        </div>

        <div className="row4">
          <div className="juiceness-title-row">
            <p className="juiceness-title">Juiciness</p>
          </div>

          <div
            className={`content-juicy-1 ${
              juicinessRaw !== null &&
              juicinessRaw >= 0.5 &&
              juicinessRaw <= 1.5
                ? "notjuicy"
                : ""
            }`}
          >
            <p className="juicy-2">Not Juicy</p>
          </div>

          <div
            className={`content-juicy-1 ${
              juicinessRaw !== null &&
              ((juicinessRaw > 1.5 && juicinessRaw <= 2.5) ||
                juicinessRaw < 0.5 ||
                juicinessRaw > 2.6)
                ? "juicy"
                : ""
            }`}
          >
            <p className="juicy-1">Juicy</p>
          </div>
        </div>
      </div>

      <div className="buttons-div">
        <div className="button-div">
          <button className="view-database" onClick={goToPhase1}>
            Go to Phase 1
          </button>
        </div>

        <div className="button-div">
          <button className="view-database" onClick={goToPhaseDatabase2}>
            View Database
          </button>
        </div>
      </div>
    </div>
  );
}

export default Phase2;
