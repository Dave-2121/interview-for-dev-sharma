"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DateRange } from "react-date-range";
import { format, subDays, subMonths, subYears } from "date-fns";

import { CalendarDays, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const presets = [
  { label: "Past week", range: [subDays(new Date(), 7), new Date()] },
  { label: "Past month", range: [subMonths(new Date(), 1), new Date()] },
  { label: "Past 3 months", range: [subMonths(new Date(), 3), new Date()] },
  { label: "Past 6 months", range: [subMonths(new Date(), 6), new Date()] },
  { label: "Past year", range: [subYears(new Date(), 1), new Date()] },
  { label: "Past 2 years", range: [subYears(new Date(), 2), new Date()] },
];

export function DateRangeModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [monthsToShow, setMonthsToShow] = useState(2);

  const [range, setRange] = useState([
    {
      startDate: subMonths(new Date(), 6),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const checkScreen = () => {
      setMonthsToShow(window.innerWidth < 768 ? 1 : 2);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const applyPreset = (startDate: Date, endDate: Date) => {
    setRange([{ ...range[0], startDate, endDate }]);
  };

  const handleApply = () => {
    const start = range[0].startDate?.toISOString().split("T")[0];
    const end = range[0].endDate?.toISOString().split("T")[0];
    const params = new URLSearchParams();
    if (start) params.set("start", start);
    if (end) params.set("end", end);
    router.push(`/?${params.toString()}`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 text-sm">
          <div className="bg-gray-100 p-1 rounded-full">
            <CalendarDays className="h-4 w-4 text-gray-600" />
          </div>
          Past 6 Months
          <ChevronDown className="h-4 w-4 text-muted-foreground ml-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl w-[95vw] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>Select Date Range</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <div className="md:min-w-[150px] flex md:flex-col flex-wrap gap-2 md:gap-2 border-b md:border-b-0 md:border-r pb-2 md:pb-0 pr-0 md:pr-4">
            {presets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => applyPreset(preset.range[0], preset.range[1])}
                className="text-left text-sm text-gray-700 hover:bg-gray-100 px-2 py-1 rounded w-full"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div>
            <DateRange
              ranges={range}
              onChange={(item) => setRange([item.selection])}
              moveRangeOnFirstSelection={false}
              months={monthsToShow}
              direction="horizontal"
              showDateDisplay={false}
              rangeColors={["#2563eb"]}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button onClick={handleApply}>Apply</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
