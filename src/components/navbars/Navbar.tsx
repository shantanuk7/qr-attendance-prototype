
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import Link from "next/link";

function Navbar() {
  return (
    <header className="flex justify-between items-center bg-[#EAF0F1] p-4">
    <div className="flex items-center">
      <div className="mr-4">
        <Image src={logo} alt="logo" className="h-10 w-10" />
      </div>
      <div>
        <Link href="" className="text-[#2F363F] text-xl font-semibold">Attendify</Link>
      </div>
    </div>
    <div>
      <ul className="flex items-center space-x-4">
        <li>
          <Link href="/" className="text-[#2F363F]">About</Link>
        </li>
        <li>
          <Link href="/contact" className="text-[#2F363F]">Contact</Link>
        </li>
      </ul>
    </div>
    <div>
      <UserCircleIcon className="h-10 w-10 text-[#2F363F]" />
    </div>
  </header>
  );
}

export default Navbar;
