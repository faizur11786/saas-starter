"use client";

import React, { Fragment } from "react";

import type { Header as HeaderType } from "@/payload-types";

import { ArrowUpIcon, ArrowUpRight } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { CMSLink } from "@/components/custom/cms-link";
import { cn } from "@/lib/utils";

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  return (
    <nav className="hidden md:flex gap-3 items-center dark:text-white">
      <NavigationMenu>
        <NavigationMenuList>
          {(data.tabs || []).map((tab, i) => {
            const { enableDirectLink = false } = tab;
            return enableDirectLink ? (
              <CMSLink
                {...tab.link}
                label={tab.label}
                key={i}
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-transparent data-[state=open]:bg-transparent"
              >
                {tab.link?.newTab && tab.link.type === "custom" && (
                  <ArrowUpIcon />
                )}
              </CMSLink>
            ) : (
              <NavigationMenuItem className="" key={i}>
                <NavigationMenuTrigger className="data-[active]:bg-transparent data-[state=open]:bg-transparent hover:bg-transparent bg-transparent">
                  {tab.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-6 ">
                  <div className="w-[400px] grid grid-cols-12 gap-y-4">
                    {tab.navItems &&
                      tab.navItems.map((item, index) => {
                        return (
                          <Fragment key={index}>
                            {item.style === "list" && item.listLinks && (
                              <div className={cn("col-span-4 space-y-4")}>
                                <div>{item.listLinks.tag}</div>
                                <div className="flex flex-col">
                                  {item.listLinks.links &&
                                    item.listLinks.links.map(
                                      (link, linkIndex) => (
                                        <CMSLink
                                          key={linkIndex}
                                          {...link.link}
                                          className="text-sm font-light flex gap-1 items-start p-2 hover:bg-muted hover:rounded-lg "
                                        >
                                          {link.link?.newTab &&
                                            link.link?.type === "custom" && (
                                              <ArrowUpRight className="w-4 h-4 text-blue-500" />
                                            )}
                                        </CMSLink>
                                      )
                                    )}
                                </div>
                              </div>
                            )}
                          </Fragment>
                        );
                      })}
                    <div>
                      {tab.navItems?.map((link, linkIndex) => {
                        return (
                          <div key={linkIndex}>
                            <CMSLink
                              {...link.defaultLink?.link}
                              className="text-sm font-light"
                            >
                              {link.defaultLink?.link?.newTab &&
                                link.defaultLink?.link.type === "custom" && (
                                  <ArrowUpIcon />
                                )}
                            </CMSLink>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};
