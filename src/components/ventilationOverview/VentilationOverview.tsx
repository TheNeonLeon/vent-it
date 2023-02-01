import db from "@/firebase/firebaseConfig";
import { getVentilationData } from "@/utils/ventilationApi";

export default function VentilationOverview() {

    const getData = async () =>{
       const data = await getVentilationData(db);
       console.log(data);
       
    }

    return (
      <>
        <main>
          <div>
            <button onClick={getData} >Click</button>
            <h1 className="text-3xl">VENT-IT</h1>
          </div>
        </main>
      </>
    );
  }