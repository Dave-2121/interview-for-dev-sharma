import { LaunchTableClient } from "@/components/LaunchTableWrapper";
import { PaginationFilter } from "@/components/Pagination";
import { getEntitiesLaunch } from "@/lib/sapce-x-helper";
import { getPaginatedLaunches } from "@/lib/space-x-api";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    status?: string;
    start?: string;
    end?: string;
  };
}) {
  const page = parseInt(searchParams?.page || "1");
  const status = searchParams?.status || "all";
  const startDate = searchParams?.start;
  const endDate = searchParams?.end;

  const query: any = {};

  if (status === "upcoming") query.upcoming = true;
  else if (status === "success") query.success = true;
  else if (status === "failed") query.success = false;

  if (startDate || endDate) {
    query.date_utc = {};
    if (startDate) query.date_utc.$gte = new Date(startDate).toISOString();
    if (endDate) query.date_utc.$lte = new Date(endDate).toISOString();
  }

  if (startDate && !isNaN(new Date(startDate).getTime())) {
    query.date_utc.$gte = new Date(startDate).toISOString();
  }
  if (endDate && !isNaN(new Date(endDate).getTime())) {
    query.date_utc.$lte = new Date(endDate).toISOString();
  }

  const { docs: launches, totalPages } = await getPaginatedLaunches(
    page,
    query,
    10
  );

  const rocketIds = [...new Set(launches.map((l) => l.rocket))];
  const launchpadIds = [...new Set(launches.map((l) => l.launchpad))];
  const payloadIds = [...new Set(launches.flatMap((l) => l.payloads))];

  const { rocketMap, launchpadMap, payloadMap } = await getEntitiesLaunch(
    rocketIds,
    launchpadIds,
    payloadIds
  );

  return (
    <div className="mt-6 space-y-6 flex flex-col">
      <LaunchTableClient
        launches={launches}
        rocketMap={rocketMap}
        launchpadMap={launchpadMap}
        payloadMap={payloadMap}
        page={page}
      />
      <PaginationFilter currentPage={page} totalPages={totalPages} />
    </div>
  );
}
