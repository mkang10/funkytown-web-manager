'use client';

import DispatchDashboard from "./_dashboard/_manager/_dispatch/DispatchDashboard";
import InventoryDashboardChart from "./_dashboard/_manager/_Import/InventoryDashboardChart";

export default function DashboardManager() {
  return (
    <div className="p-6 space-y-6">

      {/* Inventory import dashboard chart */}
      <InventoryDashboardChart />
      <DispatchDashboard />
      {/* You can add more sections here */}
    </div>
  );
}
