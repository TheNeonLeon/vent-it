import Image from "next/image";
import logo from "../../../mockup/logo.svg";
export default function Header() {
    return (
      <>
        <main>
          <div className="flex p-5 gap-10 bg-violet-900">
            <Image src={logo} alt="logo" />
            <h1 className=" mt-3 text-3xl">VENT-IT</h1>
          </div>
        </main>
      </>
    );
  }