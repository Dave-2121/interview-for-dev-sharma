"use client";
// @ts-nocheck
import { formatUtcDate } from "@/lib/sapce-x-helper";
import Image from "next/image";
import { useState } from "react";
import { LaunchDetailModal } from "./LaunchDetailModal";

type Props = {
  launches: any[];
  rocketMap: Map<string, string>;
  launchpadMap: Map<string, string>;
  payloadMap: Map<string, string>;
  page: number;
  isLoading: boolean;
};

export function LaunchTable({
  launches,
  rocketMap,
  launchpadMap,
  payloadMap,
  page,
  isLoading,
}: Props) {
  const [selectedLaunch, setSelectedLaunch] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Image
          src="/Loader.png"
          alt="Loading..."
          height={44}
          width={44}
          className="w-44 h-44 animate-spin"
        />
      </div>
    );
  }

  return (
    <div className="rounded-lg border overflow-x-auto ">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 text=[#4B5563]">
          <tr>
            <th className="px-4 py-3">No.</th>
            <th className="px-4 py-3">Launched(UTC)</th>
            <th className="px-4 py-3">Location</th>
            <th className="px-4 py-3">Mission</th>
            <th className="px-4 py-3">Orbit</th>
            <th className="px-4 py-3 text-right">Launch Status</th>
            <th className="px-4 py-3 text-right">Rocket</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading && launches.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                No results found for the specified filter.
              </td>
            </tr>
          )}
          {launches.map((l, i) => {
            const status = l.upcoming
              ? "Upcoming"
              : l.success
              ? "Success"
              : "Failure";

            return (
              <tr
                key={i}
                onClick={() => {
                  setSelectedLaunch(l);
                  setOpen(true);
                }}
                className="border-t hover:bg-gray-100 cursor-pointer transition-colors duration-200"
              >
                <td className="px-4 py-3 text-[#1F2937]">{i + 1}</td>
                <td className="px-4 py-3 text-[#1F2937]">
                  {formatUtcDate(l.date_utc)}
                </td>
                <td className="px-4 py-3 text-[#1F2937]">
                  {launchpadMap.get(l.launchpad) || "Unknown"}
                </td>
                <td className="px-4 py-3 text-[#1F2937]">{l.name}</td>
                <td className="px-4 py-3 text-[#1F2937]">
                  {payloadMap.get(l.payloads[0]) || "Unknown"}
                </td>
                <td className={`px-4 py-3 text-right`}>
                  <span
                    className={`p-2 rounded-xl text-sm text-center font-semibold ${
                      status === "Success"
                        ? "bg-[#DEF7EC] text-[#03543F]"
                        : status === "Failure"
                        ? "bg-[#FDE2E1] text-[#981B1C]"
                        : "bg-[#FEF3C7] text-[#92400F]"
                    }`}
                  >
                    {status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  {rocketMap.get(l.rocket) || "Unknown"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <LaunchDetailModal
        open={open}
        onClose={() => setOpen(false)}
        launch={selectedLaunch}
        rocketName={rocketMap.get(selectedLaunch?.rocket) || "Unknown"}
        launchpadName={launchpadMap.get(selectedLaunch?.launchpad) || "Unknown"}
        orbitName={payloadMap.get(selectedLaunch?.payloads?.[0]) || "Unknown"}
      />
    </div>
  );
}
