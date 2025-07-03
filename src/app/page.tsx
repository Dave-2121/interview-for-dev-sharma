import { LaunchTableClient } from "@/components/LaunchTableWrapper";
import { PaginationFilter } from "@/components/Pagination";
import { getEntitiesLaunch } from "@/lib/sapce-x-helper";
import { getPaginatedLaunches } from "@/lib/space-x-api";

export default async function Home({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const page = parseInt(searchParams?.page || "1");
  const status = searchParams?.status || "all";

  const query: any = {};

  if (status === "upcoming") query.upcoming = true;
  else if (status === "success") query.success = true;
  else if (status === "failed") query.success = false;

  const { docs: launches, totalPages } = await getPaginatedLaunches(
    page,
    query
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
