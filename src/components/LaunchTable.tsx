import { formatUtcDate } from "@/lib/sapce-x-helper";
import Image from "next/image";

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
        <tbody className="">
          {launches.map((l, i) => {
            const status = l.upcoming
              ? "Upcoming"
              : l.success
              ? "Success"
              : "Failure";

            return (
              <tr
                key={i}
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
                        ? "bg-[#DEF7EC]"
                        : status === "Failure"
                        ? "bg-[#FDE2E1]"
                        : "bg-[#FEF3C7]"
                    } ${
                      status === "Success"
                        ? "text-[#03543F]"
                        : status === "Failure"
                        ? "text-[#981B1C]"
                        : "text-[#92400F]"
                    }}`}
                  >
                    {status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  {rocketMap.get(l.rocket) || "unknown"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
