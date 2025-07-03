// components/NotFoundContent.tsx
"use client";
import { useSearchParams } from "next/navigation";

export function NotFoundContent() {
  const params = useSearchParams();
  return (
    <div>
      <h1 className="text-xl font-bold">404 - Page Not Found</h1>
      <p className="mt-2 text-muted-foreground">
        Search param: {params.get("something")}
      </p>
    </div>
  );
}
