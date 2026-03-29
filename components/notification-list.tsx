"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Calendar, ChevronRight, Filter, Info, Bell, RefreshCw, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { refreshNotifications } from "@/action/results";

interface Notification {
  title: string;
  short_title: string;
  slug: string;
  url: string;
  exam_date: string;
  publish_date: string;
  degree: string;
  semester: string;
  regulation: string;
  type: string;
  category: string;
  is_rcrv: boolean;
}

interface NotificationListProps {
  notifications: Notification[];
}

export default function NotificationList({ notifications: initialNotifications }: NotificationListProps) {
  const [search, setSearch] = useState("");
  const [degreeFilter, setDegreeFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const result = await refreshNotifications();
    if (result.success && result.data) {
      setNotifications(result.data);
    }
    setIsRefreshing(false);
  };

  const filteredNotifications = useMemo(() => {
    if (!notifications || !Array.isArray(notifications)) return [];
    return notifications.filter((notif) => {
      const title = notif?.title || "";
      const degree = notif?.degree || "";
      const type = notif?.type || "";
      const matchesSearch = title.toLowerCase().includes(search.toLowerCase());
      const matchesDegree = degreeFilter === "all" || degree.toLowerCase() === degreeFilter.toLowerCase();
      const matchesType = typeFilter === "all" || type.toLowerCase() === typeFilter.toLowerCase();
      return matchesSearch && matchesDegree && matchesType;
    });
  }, [notifications, search, degreeFilter, typeFilter]);

  const degrees = Array.isArray(notifications) ? Array.from(new Set(notifications.map(n => n?.degree).filter(Boolean))) : [];
  const types = Array.isArray(notifications) ? Array.from(new Set(notifications.map(n => n?.type).filter(Boolean))) : [];

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <Card className="border-none shadow-xl shadow-blue-500/5 bg-white/80 backdrop-blur-md top-16 z-40 ">
        <CardContent className="pt-2 px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search notifications..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-10 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
              />
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-40">
                <select
                  value={degreeFilter}
                  onChange={(e) => setDegreeFilter(e.target.value)}
                  className="w-full h-10 pl-4 pr-10 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none text-sm font-medium"
                >
                  <option value="all">All Degrees</option>
                  {degrees.map(d => (
                    <option key={d} value={d}>{String(d).toUpperCase()}</option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative flex-1 md:w-40">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full h-10 pl-4 pr-10 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none text-sm font-medium"
                >
                  <option value="all">All Types</option>
                  {types.map(t => (
                    <option key={t} value={t}>{String(t).charAt(0).toUpperCase() + String(t).slice(1)}</option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-gray-500 font-medium">
          Showing <span className="text-blue-600 font-bold">{filteredNotifications.length}</span> notifications
        </p>
        {(search || degreeFilter !== "all" || typeFilter !== "all") && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => { setSearch(""); setDegreeFilter("all"); setTypeFilter("all"); }}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg text-xs"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Notifications Grid */}
      <div className="grid grid-cols-1 gap-3 md:gap-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif, index) => {
            const searchParams = new URLSearchParams({
              title: notif?.title || "",
              url: notif?.url || "",
              degree: notif?.degree || "",
              regulation: notif?.regulation || "",
              semester: notif?.semester || "",
            });
            return (
            <Link key={`${notif?.slug || index}-${index}`} href={`/notifications/${notif?.slug}?${searchParams.toString()}`}>
              <Card className="group border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 rounded-3xl overflow-hidden bg-white">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="w-2 bg-blue-600 group-hover:w-3 transition-all duration-300" />
                    <div className="flex-1 p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="space-y-1.5 md:space-y-3">
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-blue-50 text-blue-700 text-[9px] md:text-[10px] font-bold uppercase tracking-wider">
                              {notif?.degree || "N/A"}
                            </span>
                            <span className="px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-indigo-50 text-indigo-700 text-[9px] md:text-[10px] font-bold uppercase tracking-wider">
                              {notif?.regulation || "N/A"}
                            </span>
                            {notif?.is_rcrv && (
                              <span className="px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-amber-50 text-amber-700 text-[9px] md:text-[10px] font-bold uppercase tracking-wider">
                                RC/RV
                              </span>
                            )}
                            <span className="px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-gray-50 text-gray-700 text-[9px] md:text-[10px] font-bold uppercase tracking-wider">
                              {notif?.type || "N/A"}
                            </span>
                          </div>
                          
                          <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                            {notif?.title || "Untitled"}
                          </h3>
                          
                          <div className="flex items-center gap-3 md:gap-4 text-[11px] md:text-sm text-gray-500">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5 md:h-4 w-4" />
                              <span>{notif?.publish_date || "N/A"}</span>
                            </div>
                            {notif?.exam_date && (
                              <div className="flex items-center gap-1.5">
                                <Info className="h-3.5 w-3.5 md:h-4 w-4" />
                                <span>Exam: {notif.exam_date}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="hidden md:flex items-center self-end md:self-center">
                          <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                            <ChevronRight className="h-4 w-4 md:h-5 w-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
          })
        ) : (
          <Card className="border-dashed border-2 border-gray-100 rounded-3xl p-20 text-center bg-gray-50/30">
            <div className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-6">
              <Bell className="h-10 w-10 text-gray-200" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No notifications found</h3>
            <p className="text-gray-500 max-w-xs mx-auto">
              We couldn't find any notifications matching your current filters. Try adjusting your search or filters.
            </p>
            <Button 
              variant="outline" 
              className="mt-8 rounded-2xl"
              onClick={() => { setSearch(""); setDegreeFilter("all"); setTypeFilter("all"); }}
            >
              Reset all filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
