"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { formatUtcDate } from "@/lib/sapce-x-helper";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  launch: any;
  rocketName: string;
  launchpadName: string;
  orbitName: string;
};

export function LaunchDetailModal({
  open,
  onClose,
  launch,
  rocketName,
  launchpadName,
  orbitName,
}: Props) {
  if (!launch) return null;

  const status = launch.upcoming
    ? "Upcoming"
    : launch.success
    ? "Success"
    : "Failure";

  const statusStyles = {
    Success: "bg-green-100 text-green-800",
    Failure: "bg-red-100 text-red-800",
    Upcoming: "bg-yellow-100 text-yellow-800",
  };

  const imageUrl =
    launch.links?.patch?.small ||
    launch.links?.patch?.large ||
    launch.links?.flickr?.original?.[0];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full sm:rounded-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Image
              src={imageUrl}
              alt="Mission Patch"
              width={60}
              height={60}
              className="rounded-md object-contain bg-white border"
              unoptimized
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {launch.name}
              </h2>
              <p className="text-sm text-gray-600">{rocketName}</p>
            </div>
          </div>
          <div
            className={`text-xs font-semibold px-2 py-1 rounded ${statusStyles[status]}`}
          >
            {status}
          </div>
        </div>

        {launch.details && (
          <p className="text-sm text-gray-700 mt-4">
            {launch.details}
            {launch.links?.wikipedia && (
              <a
                href={launch.links.wikipedia}
                target="_blank"
                className="text-blue-600 ml-1 underline"
                rel="noopener noreferrer"
              >
                Wikipedia
              </a>
            )}
          </p>
        )}

        <div className="mt-6 border-t pt-4 space-y-3 text-sm text-gray-800">
          <div className="grid grid-cols-2 gap-y-3">
            <LabelValue label="Flight Number" value={launch.flight_number} />
            <LabelValue label="Mission Name" value={launch.name} />
            <LabelValue
              label="Rocket Type"
              value={launch.rocket_type || "N/A"}
            />
            <LabelValue label="Rocket Name" value={rocketName} />
            <LabelValue label="Manufacturer" value="SpaceX" />
            <LabelValue label="Nationality" value="SpaceX" />
            <LabelValue
              label="Launch Date"
              value={formatUtcDate(launch.date_utc)}
            />
            <LabelValue
              label="Payload Type"
              value={launch.payloads?.[0]?.type || "N/A"}
            />
            <LabelValue label="Orbit" value={orbitName} />
            <LabelValue label="Launch Site" value={launchpadName} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function LabelValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="font-medium text-sm">{value}</span>
    </div>
  );
}
