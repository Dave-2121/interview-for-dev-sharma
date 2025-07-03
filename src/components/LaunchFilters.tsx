"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { CalendarDays, ChevronDown, Filter } from "lucide-react";

const statusOptions = [
  { label: "All Launches", value: "all" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Successful", value: "success" },
  { label: "Failed", value: "failed" },
];

export function LaunchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("status") || "all";

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("status");
    } else {
      params.set("status", value);
    }
    params.set("page", "1"); // Reset to page 1 on filter change
    router.push(`/?${params.toString()}`);
  };

  const currentLabel = statusOptions.find((o) => o.value === current)?.label;

  return (
    <div className="flex items-center justify-around sm:flex-row sm:gap-0 gap-2 flex-col">
      {/* Placeholder for future date filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 text-sm">
            <div className="bg-gray-100 p-1 rounded-full">
              <CalendarDays className="h-4 w-4 text-gray-600" />
            </div>
            Past 6 Months
            <ChevronDown className="h-4 w-4 text-muted-foreground ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>{/* Future date filters */}</DropdownMenuContent>
      </DropdownMenu>

      {/* Status Filter Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 text-sm">
            <div className="bg-gray-100 p-1 rounded-full">
              <Filter className="h-4 w-4 text-gray-600" />
            </div>
            {currentLabel}
            <ChevronDown className="h-4 w-4 text-muted-foreground ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {statusOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
