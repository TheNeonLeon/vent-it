import db from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

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


export const createVentilationPump = async (
  pumpNumber: number,
  areaType: string,
) => {
  try {
    await addDoc(collection(db, "ventilations"), {
      ventilation: {
        pump: {
          pumpNumber: pumpNumber,
          pumpDescription: "Ventilation pump number",
        },
        area: {
          areaType: areaType,
        },
        status: {
          statusCondition: true,
        },
      },
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
