import db from "@/firebase/firebaseConfig";
import { getVentilationData } from "@/utils/ventilationApi";
import { useEffect, useState } from "react";
import CreatePumpModal from "./modal/CreatePumpModal";
import { VentilationProps } from "./types";

export default function VentilationOverview() {
  const [ventilationData, setVentilationData] = useState([]);

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
            <div data-modal-toggle="authentication-modal" data-modal-target="authentication-modal" data-modal-show="authentication-modal">
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
                      {data.ventilation.status.statusCondition == false ? (
                        <p>Disabled</p>
                      ) : (
                        <p>Active</p>
                      )}
                    </div>
                    {data.ventilation.status.statusCondition == false ? (
                      <button>Activate</button>
                    ) : (
                      <button>Deactivate</button>
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
