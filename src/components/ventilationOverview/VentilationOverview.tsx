import db from "@/firebase/firebaseConfig";
import { getAreaData, getVentilationData } from "@/utils/ventilationApi";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import CreatePumpModal from "./modal/CreatePumpModal";
import { AreaDataProps } from "./modal/types";
import { VentilationProps } from "./types";

export default function VentilationOverview() {
  const [ventilationData, setVentilationData] = useState([]);
  const [statusCondition, setStatusCondition] = useState(false);
  const [input, setInput] = useState<string>("");
  const [area, setAreaInfo] = useState([]);

  const router = useRouter();

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
      
      await updateDoc(userDoc, updateFieldData);
      setStatusCondition(true);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
    console.log(await router.replace(router.asPath));
    router.reload()
  };

  const filterArea = area.filter(function(result:any) {
    const filter = area.map((data:AreaDataProps) => data.areaType);
    const areaTypes = result.areaType;
    // console.log(filter.join(''));
    
    return result.areaType === filter;
  })

  useEffect(() => {
    getVentilationData(db);
  }, [statusCondition])

  useEffect(() => {
    const getData = async () => {
      const data: Promise<any> = getVentilationData(db);
      setVentilationData(await data);
      ventilationData.sort();
    };
    const getAreaDataFromDb = async () => {
      const fetchAreaData: Promise<any> = getAreaData(db);
      setAreaInfo(await fetchAreaData);
    };
    getAreaDataFromDb();
    getData();
    
  }, []);

  // console.log(ventilationData);
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
          <div className="flex justify-between">
            <input
              className="input-field"
              type="search"
              name="search"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Search pump number"
            />
            <select
              defaultValue="Choose"
              className="mt-1 rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:text-gray-600"
            >
              <option value="Choose" disabled>
                Choose area:
              </option>
              {filterArea.map((areaData: AreaDataProps, key) => {
                return <option key={key}>{areaData.areaType}</option>;
              })}
            </select>
          </div>
          {ventilationData
            .filter((item: VentilationProps) => {
                return input.toLowerCase() === ""
                ? item.ventilation.pump
                :
                item.ventilation.pump.pumpNumber
                  .toString()
                  .toLowerCase()
                  .includes(input)
             
            })
            .map((data: VentilationProps) => {
              return (
                <>
                  <ul>
                      <div className="md:flex md:flex-row p-7 border-spacing-5 rounded-3xl bg-white m-12 mb-5 pb-3 justify-evenly sm:flex flex-col">
                        <div className="flex flex-col">
                          <li className="opacity-70">{data.ventilation.pump.pumpDescription}</li>
                          <li className="text-xl">{data.ventilation.pump.pumpNumber}</li>
                        </div>
                        <div className="flex flex-col">
                          <p className="opacity-70">Area</p>
                          <p className="text-xl">{data.ventilation.area.areaType}</p>
                        </div>
                        <div className="flex flex-col text-xl">
                          <p className="opacity-70">Status</p>
                          {data.status.statusCondition == false ? (
                            <p className="text-red-600">Disabled</p>
                          ) : (
                            <p className="text-green-600">Active</p>
                          )}
                        </div>
                        <div className="flex justify-center text-xl text-white bg-violet-700 hover:bg-blue-800 md:w-52 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
