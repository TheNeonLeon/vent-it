import db from "@/firebase/firebaseConfig";
import { getVentilationData } from "@/utils/ventilationApi";
import { useEffect, useState } from "react";
import { VentilationProps } from "./types";

export default function VentilationOverview() {

    const [ventilationData, setVentilationData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data:Promise<any> = getVentilationData(db);
      setVentilationData(await data)
    };
    getData();
  }, []);

  console.log(ventilationData);
  

  return (
    <>
      <main>
        <div>
          <h1 className="text-3xl">VENT-IT</h1>
          {ventilationData.map((data:VentilationProps) => {
            return(
                <>
                <ul>
                    <li>
                        {data.ventilation.pumpNumber}
                    </li>
                </ul>
                </>
            )
          })}
        </div>
      </main>
    </>
  );
}
