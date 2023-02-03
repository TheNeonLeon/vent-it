import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../../../mockup/logo.svg";
export default function Header() {
  const router = useRouter();
  const toOverviewPage = (e: any) => {
    e.preventDefault();
    router.push("/overview");
  };
    return (
      <>
        <main>
          <div className="flex p-5 gap-10 bg-violet-900">
            <Image src={logo} alt="logo" />
            <h1 className="mt-3 text-3xl text-white">VENT-IT</h1>
            <div className="hidden sm:flex ml-auto">
              <ul className="sm:flex gap-8 text-white mt-4">
                <li>
                  Home
                </li>
                <li onClick={toOverviewPage} className="cursor-pointer hover:text-blue-400">
                  Overview
                </li>
                <li>
                  Dashboard
                </li>
                <li>
                  Sign out
                </li>
              </ul>
            </div>
          </div>
        </main>
      </>
    );
  }