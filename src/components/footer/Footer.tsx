import Image from "next/image";
import logo from "../../../mockup/logo.svg";
export default function Footer() {
  return (
    <>
      <div className="bg-white mt-20">
        <div className="md:flex justify-evenly p-5 gap-10 bg-white">
          <Image className="pb-5" src={logo} alt="logo" />
          <ul className="pb-5">
            <p className="text-lg text">Links</p>
            <li className="text-violet-500">Contact us</li>
            <li className="text-violet-500">About Company</li>
            <li className="text-violet-500">Careers</li>
            <li className="text-violet-500">News</li>
          </ul>
          <ul className="pb-5">
            <p className="text-lg text">Follow</p>
            <li className="text-violet-500">Instagram</li>
            <li className="text-violet-500">Linked in</li>
            <li className="text-violet-500">Facebook</li>
          </ul>
          <ul className="pb-5">
            <p className="text-lg text">Support</p>
            <li className="text-violet-500">Documentation</li>
            <li className="text-violet-500">Get help</li>
            <li className="text-violet-500">Service status</li>
          </ul>
          <ul className="pb-5">
            <p className="text-lg text">About</p>
            <li className="text-violet-500">Terms of service</li>
            <li className="text-violet-500">Privacy policy</li>
            <li className="text-violet-500">Security</li>
            <li className="text-violet-500">Sitemap</li>
          </ul>
        </div>
        <p className="text-center pb-10">© 2022 Vent-it Inc. All rights reserved.</p>
      </div>
    </>
  );
}
