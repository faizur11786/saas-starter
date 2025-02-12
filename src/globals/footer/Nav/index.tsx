"use client";
import { CMSLink } from "@/components/custom/cms-link";
import type { Footer as FooterType } from "@/payload-types";
export const FooterNav: React.FC<{ data: FooterType }> = ({ data }) => {
  return (
    <nav className="grid grid-cols-7 container gap-4 px-4">
      {data.columns &&
        (data.columns || []).map((column) => {
          return (
            <div className="col-span-1 space-y-3" key={column.id}>
              <h3 className="font-medium uppercase">{column.label}</h3>
              <ul className="space-y-2">
                {column.navItems &&
                  column.navItems.map((link) => {
                    return (
                      <li key={link.id} className="text-white text-sm">
                        <CMSLink {...link.link} />
                      </li>
                    );
                  })}
              </ul>
            </div>
          );
        })}
    </nav>
  );
};
