"use client";

import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import clsx from "clsx";


export default function Navbar() {

  const { data: session } = useSession();

  const genderStyle = clsx(
    "profile-image rounded-full overflow-hidden h-9 w-9 p-[2px]",
    {
      "bg-blue-500": session?.user.gender === "Male",
      "bg-pink-600": session?.user.gender === "Female",
    }
  );

  return (
    <nav className="px-5 h-[3.75rem] w-full sticky top-0 z-50 bg-white flex items-center justify-between text-lg border-b border-gray-200">
      <div className="logo w-[145px] h-[51.55px] flex items-center">
        <Image
          src="/logo.png"
          alt="CADEMit"
          height={100}
          width={200}
          className="mt-3 object-cover"
        />
      </div>

      <div className="user-profile flex gap-3 items-center text-sm">
        <p className="profile-email font-normal text-stone-500">{session?.user.email}</p>
        <button onClick={() => signOut()} className="text-red-700 hover:text-red-500 hover:underline hover:underline-offset-2 transition-all duration-200 font-normal">Sign out</button>
        <div className={genderStyle}>
          <div className="bg-white w-full h-full rounded-full">
            {
              session?.user &&
              <Image
                src={session?.user.image as string}
                alt={session?.user.name as string}
                height={36}
                width={36}
                className="w-full h-full object-cover rounded-full"
              />
            }
          </div>
        </div>
      </div>
    </nav>
  )
}
