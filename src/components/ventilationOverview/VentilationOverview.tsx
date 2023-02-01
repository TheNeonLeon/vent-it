import db from "@/firebase/firebaseConfig";
import { getVentilationData } from "@/utils/ventilationApi";
import { useEffect, useState } from "react";
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
          {ventilationData.map((data: VentilationProps) => {
            return (
              <>
                <ul>
                  <div className="flex justify-around"></div>
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
