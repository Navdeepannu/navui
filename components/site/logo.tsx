import { cn } from "cn";

type LogoProps = {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
};

export function Logo({
  className,
  markClassName,
  showWordmark = false,
}: LogoProps) {
  return (
    <div
      className={cn(
        "inline-flex h-7 shrink-0 items-center gap-1.5 text-foreground",
        className,
      )}
    >
      <svg
        viewBox="0 0 375 336"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={cn("block h-5.5 w-auto shrink-0", markClassName)}
      >
        <path
          d="M73 62V336C33.1192 328.283 15.514 317.217 0 275V50C6.16923 19.7066 15.0898 7.88245 45 0H151.5C165.815 2.45849 173.408 6.41937 186 19L241.5 73V178.5L146 83.5C135.25 69.1031 129.226 63.1905 118.5 62H73Z"
          fill="currentColor"
        />

        <path
          d="M241.5 243.5L136 137V270.5C147.277 305.199 158.303 321.569 200.5 336H318.5C360.995 317.133 368.927 302.737 374.5 275V43C369.339 16.746 360.556 8.43176 339 0H302.5V243.5C302.5 305.758 241.5 300 241.5 243.5Z"
          fill="currentColor"
        />
      </svg>

      {showWordmark && (
        <span className="relative -top-px whitespace-nowrap text-[20px] font-semibold leading-none tracking-[-0.035em]">
          NavUI
        </span>
      )}
    </div>
  );
}
