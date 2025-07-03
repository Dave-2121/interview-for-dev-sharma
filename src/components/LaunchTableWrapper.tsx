"use client";

import { useEffect, useState } from "react";
import { LaunchTable } from "./LaunchTable";

type Props = {
  launches: any[];
  rocketMap: Map<string, string>;
  launchpadMap: Map<string, string>;
  payloadMap: Map<string, string>;
  page: number;
};

export function LaunchTableClient({
  launches,
  rocketMap,
  launchpadMap,
  payloadMap,
  page,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timeout);
  }, [page]);

  return (
    <LaunchTable
      launches={launches}
      rocketMap={rocketMap}
      launchpadMap={launchpadMap}
      payloadMap={payloadMap}
      page={page}
      isLoading={isLoading}
    />
  );
}
