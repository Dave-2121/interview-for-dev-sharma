"use client";

import Image from "next/image";
import { LaunchFilters } from "./LaunchFilters";
import { Suspense } from "react";

export function Header() {
  return (
    <>
      <header className="border-b py-4 px-4 flex flex-col justify-center items-center max-w-7xl mx-auto mb-8">
        <div>
          <Image src="/logo.png" alt="SpaceX Logo" width={260} height={32} />
        </div>
      </header>
      <Suspense fallback={<div>Loading filters...</div>}>
        <LaunchFilters />
      </Suspense>
    </>
  );
}
