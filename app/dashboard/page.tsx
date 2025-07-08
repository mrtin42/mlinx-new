import { Suspense } from "react";
import Fallback from "./suspense";
import Dashboard from "@/components/dash/main";


export default function DashboardPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <Dashboard />
    </Suspense>
  )
}