import { Suspense } from "react";
import Logo from "./logo";
import SignIn from "./sign-in";
import NavSession from "../avatar";

export default function Navbar() {
  return (
    <nav className="bg-white text-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Logo />
        </div>
        <div className="flex space-x-4">
          <Suspense fallback={<div className="h-6 w-24 bg-gray-200 animate-pulse rounded" />}>
            <NavSession />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}