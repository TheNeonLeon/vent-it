import db from "@/firebase/firebaseConfig";
import { createVentilationPump, getAreaData, getVentilationData } from "@/utils/ventilationApi";
import { Label, TextInput, Checkbox, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AreaDataProps, VentilationForm } from "./types";

function CreatePumpModal() {
  const [showModal, setShowModal] = useState(false);
  const [ventilationInfo, setVentilationInfo] = useState<VentilationForm[]>([]);
  const [area, setAreaInfo] = useState([])
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<VentilationForm>();

  const onsubmit = async (data: VentilationForm, e: any) => {
    e.preventDefault();
    const ventilationInfo: any = await createVentilationPump(
      data?.ventilation.pumpNumber,
      data?.ventilation.pumpArea,
    );
    setVentilationInfo(await ventilationInfo);
    getVentilationData(db);
  };

  useEffect(() => {
    const getAreaDataFromDb = async () => {
        const fetchAreaData:Promise<any> = getAreaData(db);
        setAreaInfo(await fetchAreaData);
    }
    getAreaDataFromDb();
  }, [])

  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Open regular modal
      </button>
      {showModal ? (
        <>
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-violet-50 outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Modal Title</h3>
                    <button
                    type="button"
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      Create new pump
                    </p>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Ventilation pump number:{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        {...register("ventilation.pumpNumber")}
                        className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>


                    <select
                      defaultValue="Choose"
                      className="mt-1 rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:text-gray-600"
                      {...register("ventilation.pumpArea")}
                    >
                      <option value="Choose" disabled>
                        Choose area:
                      </option>
                      {area.map((areaData:AreaDataProps,key) => {
                        return(
                            <option key={key}>
                                {areaData.areaType}
                            </option>
                        )
                      })}
                    </select>
                  </div>

                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Create pump
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
export default CreatePumpModal;
