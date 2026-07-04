"use client";

import { useEffect, useState } from "react";

interface Activity {
  id: string;
  module: string;
  action: string;
  description: string;
  createdAt: string;
}

export default function ActivityPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] =
  useState("All");

  const fetchActivities = async () => {
    try {
      const response = await fetch("/api/activity");
      const data = await response.json();

      if (data.success) {
        setActivities(data.activities);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const filteredActivities = activities.filter(
  (activity) => {
    const matchesSearch =
      activity.module
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      activity.action
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      activity.description
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesModule =
      moduleFilter === "All" ||
      activity.module === moduleFilter;

    return (
      matchesSearch &&
      matchesModule
    );
  }
);

  return (
    <div className="bg-white rounded-xl shadow border p-6">
      <h1 className="text-3xl font-bold mb-6">
        Activity Logs
      </h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
  <input
    type="text"
    placeholder="Search activities..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="border rounded-lg p-3"
  />

  <select
    value={moduleFilter}
    onChange={(e) =>
      setModuleFilter(e.target.value)
    }
    className="border rounded-lg p-3"
  >
    <option value="All">
      All Modules
    </option>

    <option value="Company">
      Company
    </option>

    <option value="Customer">
      Customer
    </option>

    <option value="Inventory">
      Inventory
    </option>

    <option value="Sales">
      Sales
    </option>

    <option value="Purchase">
      Purchase
    </option>
  </select>
</div>

      {loading ? (
        <p className="text-gray-500">
          Loading activities...
        </p>
      ) : activities.length === 0 ? (
        <p className="text-gray-500">
          No activity found
        </p>
      ) : (
        <div className="space-y-3">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="border rounded-lg p-4"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold">
                  {activity.module} • {activity.action}
                </p>

                <p className="text-xs text-gray-500">
                  {new Date(
                    activity.createdAt
                  ).toLocaleString()}
                </p>
              </div>

              <p className="text-gray-600 text-sm mt-1">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}