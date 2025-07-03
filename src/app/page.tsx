import { LaunchTable } from "@/components/LaunchTable";
import { PaginationFilter } from "@/components/Pagination";

export default function Home() {
  return (
    <div className="mt-6 space-y-6 flex flex-col">
      <LaunchTable />
      <PaginationFilter />
    </div>
  );
}
