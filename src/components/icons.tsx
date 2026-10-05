type IconProps = {
  className?: string;
};

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 512 512" aria-hidden="true">
      <path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
      <rect y="3" width="20" height="2" />
      <rect y="9" width="20" height="2" />
      <rect y="15" width="20" height="2" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
      <path d="M14.95 6.46 11.41 10l3.54 3.54-1.41 1.41L10 11.42l-3.53 3.53-1.42-1.42L8.58 10 5.05 6.47l1.42-1.42L10 8.58l3.54-3.53z" />
    </svg>
  );
}

/** Chevron pointing down; rotate via CSS for other directions. */
export function ChevronIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 26 14" aria-hidden="true">
      <path d="M13 13.5a1.1 1.1 0 0 1-.8-.3L.3 1.9A1 1 0 0 1 .3.4a1.1 1.1 0 0 1 1.6 0L13 10.9 24.1.4a1.1 1.1 0 0 1 1.6 0 1 1 0 0 1 0 1.5L13.8 13.2a1.1 1.1 0 0 1-.8.3z" />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 320 512" aria-hidden="true">
      <path d="M34.52 239.03 228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" />
    </svg>
  );
}
