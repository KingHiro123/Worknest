import type { InputHTMLAttributes } from "react";
import { SearchIcon } from "@/components/ui/icons";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: "search";
  wrapperClassName?: string;
}

export function Input({ icon, className = "", wrapperClassName = "", ...props }: InputProps) {
  return (
    <div
      className={`flex h-7.5 items-center gap-2 rounded-lg border border-line bg-bg px-2.5 ${wrapperClassName}`}
    >
      {icon === "search" && <SearchIcon size={13} className="flex-none text-faint" />}
      <input
        className={`w-full min-w-0 bg-transparent text-[11.5px] text-ink placeholder:text-faint focus:outline-none ${className}`}
        {...props}
      />
    </div>
  );
}
