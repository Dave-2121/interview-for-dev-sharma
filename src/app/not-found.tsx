// app/not-found.tsx
import { Suspense } from "react";
import { NotFoundContent } from "@/components/NotFoundContent";

export default function NotFoundPage() {
  return (
    <div className="p-6">
      <Suspense fallback={<div>Loading...</div>}>
        <NotFoundContent />
      </Suspense>
    </div>
  );
}
