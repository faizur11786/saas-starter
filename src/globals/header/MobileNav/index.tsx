"use client";

import React from "react";

import type { Header } from "@/payload-types";

import { Home, MoreVertical, Users, FileClock } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";

export const MobileNav: React.FC<{ data: Header }> = ({ data }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 drop-shadow-[0_0px_35px_rgba(0,0,0,0.25)] w-full z-50 grid grid-cols-4 bg-white/60 backdrop-blur-lg rounded-t-lg">
      <div className="h-full flex items-center justify-center">
        <Link
          href="/"
          className="flex items-center justify-end flex-col px-3 py-2 pb-1 text-xs font-medium text-gray-700 rounded-md"
        >
          <Home className="w-5 h-5 text-red-600 mb-1" />
          Home
        </Link>
      </div>
      <div className="h-full flex items-center justify-center">
        <Link
          href="#"
          className="flex items-center justify-end flex-col px-3 py-2 pb-1 text-xs font-medium text-gray-700 rounded-md"
        >
          <Users className="w-5 h-5 text-red-600 mb-1" />
          lawyer
        </Link>
      </div>
      <div className="h-full flex items-center justify-center">
        <Link
          href="/weekly-meals"
          className="flex text-center items-center justify-end flex-col  py-2 pb-1 text-xs font-medium text-gray-700 rounded-md"
        >
          <FileClock className="w-5 h-5 text-red-600 mb-1" />
          Services
        </Link>
      </div>

      <Drawer>
        <DrawerTrigger asChild>
          <div className="cursor-pointer h-full py-3 pt-4 flex items-center justify-end flex-col text-xs font-medium text-gray-700">
            <MoreVertical className="w-5 h-5 text-red-600 mb-1" />
            More
          </div>
        </DrawerTrigger>
        <DrawerContent className="min-h-[50vh]">
          <div className="">
            <DrawerHeader className="text-left"></DrawerHeader>

            <DrawerFooter></DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
