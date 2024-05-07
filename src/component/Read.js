import React, {useState} from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, get} from "firebase/database";

function Read(){

    let [factorsArray, setFactorsArray] = useState([]);

    const fetchData = async() =>{
        const db = getDatabase(app);
        const dbRef = ref(db, "calamansi/factor");
        const snapshot = await get(dbRef);
        if(snapshot.exists){
            setFactorsArray(Object.values(snapshot.val()))
        } else{
            alert("Error");
        }
    }

    return(
        <div>
            <button onClick={fetchData}>Display Latest Data</button>
            {factorsArray.length > 0 && (
    <li>
        pHLevel: {factorsArray[factorsArray.length - 1].pHLevel}, 
        Juiciness: {factorsArray[factorsArray.length - 1].juiciness}, 
        Ripeness: {factorsArray[factorsArray.length - 1].ripeness}, 
        Vitamin C: {factorsArray[factorsArray.length - 1].vitaminC}, 
        TSS: {factorsArray[factorsArray.length - 1].TSS} <br/>
    </li>
)}
        </div>
    )
}

export default Read