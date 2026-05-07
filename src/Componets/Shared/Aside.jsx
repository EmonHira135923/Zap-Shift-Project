"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import {
  LuLayoutDashboard,
  LuUsers,
  LuSettings,
  LuChevronDown,
  LuUserPlus,
  LuUserCheck,
  LuPackage,
  LuPackagePlus,
  LuWallet,
  LuHistory,
} from "react-icons/lu";

import useAuth from "../utils/Hooks/useAuth";
import { FiPlusCircle, FiTruck, FiUsers } from "react-icons/fi";
import { Bike, CheckCircle2, Motorbike } from "lucide-react";
import DashboardAsideNavSkeleton from "../Skeltons/DashboardAsideNavSkeleton";

const ROUTES = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LuLayoutDashboard className="w-5 h-5" />,
    roles: ["admin", "user", "rider"],
  },
  {
    label: "Manage Users",
    icon: <LuUsers className="w-5 h-5" />,
    isDropdown: true,
    roles: ["admin"],
    subLinks: [
      {
        label: "All Users",
        href: "/dashboard/users",
        icon: <LuUserCheck className="w-4 h-4" />,
      },
      {
        label: "Add User",
        href: "/dashboard/users/add",
        icon: <LuUserPlus className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "Manage Parcels",
    icon: <LuPackage className="w-5 h-5" />,
    isDropdown: true,
    roles: ["admin", "user", "rider"],
    subLinks: [
      {
        label: "All Parcels",
        href: "/dashboard/parcels",
        icon: <LuPackage className="w-4 h-4" />,
      },
      {
        label: "Add Parcel",
        href: "/send-parcel",
        icon: <LuPackagePlus className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "Manage Payment",
    icon: <LuWallet className="w-5 h-5" />,
    isDropdown: true,
    roles: ["admin", "user", "rider"],
    subLinks: [
      {
        label: "Payment History",
        href: "/dashboard/payment/history",
        icon: <LuHistory className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "Manage Riders",
    icon: <Motorbike className="w-5 h-5" />,
    isDropdown: true,
    roles: ["admin", "user", "rider"],
    subLinks: [
      {
        label: "All Riders",
        href: "/dashboard/rider/all-riders",
        icon: <FiUsers className="w-4 h-4" />,
        roles: ["admin"],
      },
      {
        label: "Assign Rider",
        href: "/dashboard/rider/assign-rider",
        icon: <Bike className="w-4 h-4" />,
        roles: ["admin"],
      },
      {
        label: "Be a Rider",
        href: "/be-a-rider",
        icon: <FiPlusCircle className="w-4 h-4" />,
        roles: ["admin", "user", "rider"],
      },
      {
        label: "Assign Delivery",
        href: "/dashboard/rider/assign-delivery",
        icon: <FiTruck className="w-4 h-4" />,
        roles: ["rider"],
      },
      {
        label: "Complete Delivery",
        href: "/dashboard/rider/complete-delivery",
        icon: <CheckCircle2 className="w-4 h-4" />, // Lucide React বা অন্য লাইব্রেরি থেকে আইকনটি ইমপোর্ট করে নিবেন
        roles: ["rider"],
      },
    ],
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <LuSettings className="w-5 h-5" />,
    roles: ["admin", "user", "rider"],
  },
];

const Aside = ({ sidebarOpen, onClose, collapsed }) => {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const filteredRoutes = ROUTES.filter((route) =>
    route.roles ? route.roles.includes(user?.role) : true,
  );

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-white border-r border-gray-100 transition-all duration-300 ease-in-out
          ${collapsed ? "md:w-[85px]" : "md:w-64"}
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }
          w-64
        `}
      >
        <div
          className={`flex items-center h-20 ${
            collapsed ? "justify-center px-0" : "px-6"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#D4F06D] rounded-lg flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-black/5 rotate-45 translate-x-4" />
              <span className="text-black font-black text-xs relative z-10">
                ZS
              </span>
            </div>

            {!collapsed && (
              <span className="font-black text-xl text-[#1A1A1A] tracking-tight">
                ZapShift
              </span>
            )}
          </div>
        </div>

        {!collapsed && (
          <div className="px-7 py-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
              Menu
            </p>
          </div>
        )}

        <nav
          className={`flex-1 px-4 py-4 space-y-2 scrollbar-hide ${
            collapsed ? "overflow-visible" : "overflow-y-auto"
          }`}
        >
          {loading ? (
            <DashboardAsideNavSkeleton collapsed={collapsed} />
          ) : (
            filteredRoutes.map((route) => {
              if (route.isDropdown) {
                const visibleSubLinks = route.subLinks.filter((sub) =>
                  sub.roles ? sub.roles.includes(user?.role) : true,
                );

                const isSubActive = visibleSubLinks.some(
                  (sub) => pathname === sub.href,
                );

                const isOpen = openMenus[route.label] ?? isSubActive;

                return (
                  <div key={route.label} className="relative group space-y-1">
                    <button
                      type="button"
                      title={collapsed ? route.label : ""}
                      onClick={() => {
                        if (!collapsed) toggleMenu(route.label);
                      }}
                      className={`w-full flex items-center gap-3 rounded-2xl transition-all duration-300
                        ${
                          collapsed
                            ? "justify-center w-12 h-12 px-0 mx-auto"
                            : "px-4 py-3.5"
                        }
                        ${
                          isSubActive
                            ? "bg-[#D4F06D] text-black shadow-lg shadow-[#D4F06D]/20"
                            : "text-gray-500 hover:bg-gray-50 hover:text-black"
                        }
                      `}
                    >
                      <span className="group-hover:scale-110 transition-transform">
                        {route.icon}
                      </span>

                      {!collapsed && (
                        <>
                          <span className="text-[14px] font-bold tracking-tight flex-1 text-left">
                            {route.label}
                          </span>

                          <LuChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </>
                      )}
                    </button>

                    {!collapsed && isOpen && (
                      <div className="ml-4 pl-4 border-l-2 border-gray-100 space-y-1 mt-1">
                        {visibleSubLinks.map((sub) => {
                          const active = pathname === sub.href;

                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => {
                                if (window.innerWidth < 768) onClose();
                              }}
                              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all
                                ${
                                  active
                                    ? "text-[#98B42C] font-bold bg-[#98B42C]/5"
                                    : "text-gray-500 hover:text-black"
                                }`}
                            >
                              {sub.icon}
                              <span className="text-sm">{sub.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}

                    {collapsed && (
                      <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute left-[58px] top-0 z-[999] w-56 rounded-2xl bg-white border border-gray-100 shadow-xl p-2 transition-all">
                        <p className="px-3 py-2 text-xs font-bold text-gray-400 uppercase">
                          {route.label}
                        </p>

                        {visibleSubLinks.map((sub) => {
                          const active = pathname === sub.href;

                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all
                                ${
                                  active
                                    ? "text-[#98B42C] font-bold bg-[#98B42C]/10"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-black"
                                }`}
                            >
                              {sub.icon}
                              <span className="text-sm font-semibold">
                                {sub.label}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              const active = pathname === route.href;

              return (
                <Link
                  key={route.href}
                  href={route.href}
                  title={collapsed ? route.label : ""}
                  onClick={() => {
                    if (window.innerWidth < 768) onClose();
                  }}
                  className={`group flex items-center gap-3 rounded-2xl transition-all duration-300 relative
                    ${
                      collapsed
                        ? "justify-center w-12 h-12 px-0 mx-auto"
                        : "px-4 py-3.5"
                    }
                    ${
                      active
                        ? "bg-[#D4F06D] text-black shadow-lg shadow-[#D4F06D]/20"
                        : "text-gray-500 hover:bg-gray-50 hover:text-black"
                    }
                  `}
                >
                  <span
                    className={`transition-transform duration-300 ${
                      active ? "scale-110" : "group-hover:scale-110"
                    }`}
                  >
                    {route.icon}
                  </span>

                  {!collapsed && (
                    <span
                      className={`text-[14px] font-bold tracking-tight ${
                        active ? "text-black" : "text-gray-600"
                      }`}
                    >
                      {route.label}
                    </span>
                  )}
                </Link>
              );
            })
          )}
        </nav>
      </aside>
    </>
  );
};

export default Aside;
