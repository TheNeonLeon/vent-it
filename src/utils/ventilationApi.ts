import db from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import Router from "next/router";

export const getVentilationData = async (db: any) => {
  try {
    const ventilationData = collection(db, "ventilations");
    const snapshot = await getDocs(ventilationData);
    const list = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    return list;
  } catch (error) {
    console.error("Error getting user data", error);
  }
};

export const getAreaData = async (db: any) => {
  try {
    const ventilationData = collection(db, "areas");
    const snapshot = await getDocs(ventilationData);
    const list = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    return list;
  } catch (error) {
    console.error("Error getting user data", error);
  }
};

export const deletePump = async (id:string,db:any) => {
  try {
    const pumpDoc = doc(db, "ventilations", id);
    await deleteDoc(pumpDoc);
    Router.reload();
  } catch (error) {
    
  }
}

export const createVentilationPump = async (
  pumpNumber: number,
  areaType: string
) => {
  try {
    await addDoc(collection(db, "ventilations"), {
      status: {
        statusCondition: true,
      },
      ventilation: {
        pump: {
          pumpNumber: pumpNumber,
          pumpDescription: "Ventilation pump number",
        },
        area: {
          areaType: areaType,
        },
        statusTextValue:{
          valueActive: "",
          valueDisabled: ""
        }
      },
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
