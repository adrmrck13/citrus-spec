
import { useHistory } from "react-router-dom";
import app from "../firebaseConfig";
import { getDatabase, ref, onValue, get } from "firebase/database";
import React, { useState, useEffect } from "react";

function Phase1(){ 

  const [factorsArray, setFactorsArray] = useState([]);

     // Function to fetch data from the database
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
   } 
 
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


    const history = useHistory();
    const goToPhase2 = () => {
    history.push("/phase2");
  };
 
  const goToDatabasePhase1 = () => {
    history.push("/database1");
  };
  return(
    

    
    
    <div>
      <div className="header">
          <img
            className="calamansi-header"
            src="/images/calamansi_header.png"
            alt=""
          ></img>
          <h1 className="title">CitroSpec Phase 1</h1>
        </div>

        <div className="container">
          
          <div className="row2">
            <div className="blank"></div>

            <div className="content-1">
              <p className="factor">TSS: </p>
              <p className="input-brix">{factorsArray.length > 0 && (factorsArray[factorsArray.length - 1].TSS)}</p>
              <p className="brix">&deg;Brix</p>
            </div>

            <div className="content-2">
              <p className="factor">Vitamin C:</p>
              <p className="input-vitC">{factorsArray.length > 0 && <>{factorsArray[factorsArray.length - 1].vitaminC}</>}</p>
              <p className="mg">mg</p>
            </div>

            <div className="content-3">
              <p className="factor">pH Level:</p>
              <p className="input-ph">{factorsArray.length > 0 && <>{factorsArray[factorsArray.length - 1].pHLevel}</>}</p>
            </div>
          </div>

          <div className="row3">
            <div className="ripe-title-row">
              <p className="ripe-title">Ripeness</p>
            </div>
          
            <div className={`content-ripeness-1 ${factorsArray.length > 0 && (factorsArray[factorsArray.length - 1].ripeness === '1' ? 'unripe' : '')}`} >
              <p className="ripeness-1">Unripe</p>
            </div>

            <div className={`content-ripeness-2 ${factorsArray.length > 0 && (factorsArray[factorsArray.length - 1].ripeness === '2' ? 'ripe' : '')}`}>
              <p className="ripeness-2">Ripe</p>
            </div>

            <div className={`content-ripeness-3 ${factorsArray.length > 0 && (factorsArray[factorsArray.length - 1].ripeness === '3' ? 'overripe' : '')}`}>
              <p className="ripeness-3">Overripe</p>
            </div>
          </div>
          
          <div className="row4">
            <div className="juiceness-title-row">
              <p className="juiceness-title">Juiciness</p>
            </div>

            <div className={`content-juicy-1 ${factorsArray.length > 0 && (factorsArray[factorsArray.length - 1].juiciness === '1' ? 'juicy' : '')}`}>
              <p className="juicy-1">Juicy</p>
            </div>

            <div className={`content-juicy-1 ${factorsArray.length > 0 && (factorsArray[factorsArray.length - 1].juiciness === '0' ? 'notjuicy' : '')}`}>
              <p className="juicy-2">Not Juicy</p>
            </div>
          </div>
        </div>

        <div className="buttons-div">
          <div className="button-div">
            <button className="view-database" onClick={goToPhase2}>Go to Phase 2</button>
          </div>

          <div className="button-div">
            <button className="view-database" onClick={goToDatabasePhase1}>View Database</button>
          </div>
        </div>
    </div>
  );
}


 export default Phase1;
