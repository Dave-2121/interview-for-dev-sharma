"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalendarDays, ChevronDown, Filter } from "lucide-react";

export function LaunchFilters() {
  return (
    <div className="flex items-center justify-around sm:flex-row sm:gap-0 gap-2 flex-col">
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
        <DropdownMenuContent></DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 text-sm">
            <div className="bg-gray-100 p-1 rounded-full">
              <Filter className="h-4 w-4 text-gray-600" />
            </div>
            All Launches
            <ChevronDown className="h-4 w-4 text-muted-foreground ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent></DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
