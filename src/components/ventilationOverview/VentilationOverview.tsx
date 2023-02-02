import db from "@/firebase/firebaseConfig";
import { getVentilationData } from "@/utils/ventilationApi";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import CreatePumpModal from "./modal/CreatePumpModal";
import { VentilationProps } from "./types";

export default function VentilationOverview() {
  const [ventilationData, setVentilationData] = useState([]);
  const [statusCondition, setStatusCondition] = useState(false);
  const [condition, setCondition] = useState("Deactivate");

  const updateStatus = async (
    id: string,
    statusCondition: boolean,
    db: any
  ) => {
    const userDoc = doc(db, "ventilations", id);
    try {
      const updateFieldData = {
        status: {
          statusCondition: !statusCondition,
        },
      };
      setStatusCondition(true);
      await updateDoc(userDoc, updateFieldData);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data: Promise<any> = getVentilationData(db);
      setVentilationData(await data);
    };
    getData();
  }, []);

  console.log(ventilationData);

  return (
    <>
      <main>
        <div>
          <div className="flex justify-between pr-10">
            <h1>Ventilation pump overview</h1>
            <div
              data-modal-toggle="authentication-modal"
              data-modal-target="authentication-modal"
              data-modal-show="authentication-modal"
            >
              <CreatePumpModal />
            </div>
          </div>
          <input placeholder="Search pump number" type="text" />
          {ventilationData.map((data: VentilationProps) => {
            return (
              <>
                <ul>
                  <div className="flex justify-evenly">
                    <div className="flex flex-col">
                      <li>{data.ventilation.pump.pumpDescription}</li>
                      <li>{data.ventilation.pump.pumpNumber}</li>
                    </div>
                    <div className="flex flex-col">
                      <p>Area</p>
                      <p>{data.ventilation.area.areaType}</p>
                    </div>
                    <div className="flex flex-col">
                      <p>Status</p>
                      {data.status.statusCondition == false ? (
                        <p>Disabled</p>
                      ) : (
                        <p>Active</p>
                      )}
                    </div>
                    {data.status.statusCondition == false ? (
                      <button
                        onClick={() => {
                          updateStatus(
                            data.id,
                            data.status.statusCondition,
                            db
                          );
                          setStatusCondition(true);
                        }}
                      >
                        Activate
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          updateStatus(
                            data.id,
                            data.status.statusCondition,
                            db
                          );
                          setStatusCondition(false);
                        }}
                      >
                        Deactivate
                      </button>
                    )}
                  </div>
                </ul>
              </>
            );
          })}
        </div>
      </main>
    </>
  );
}
