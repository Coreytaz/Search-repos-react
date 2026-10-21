import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function CodeIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 20" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path strokeLinecap="round" d="m16 16 5 5" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        strokeLinejoin="round"
        d="m12 2.5 3 6.1 6.7 1-4.9 4.8 1.2 6.6-6-3.1-6 3.1 1.2-6.6-4.9-4.8 6.7-1L12 2.5Z"
      />
    </svg>
  );
}

export function ForkIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle cx="6" cy="4" r="2" />
      <circle cx="18" cy="4" r="2" />
      <circle cx="12" cy="20" r="2" />
      <path d="M6 6v5a4 4 0 0 0 4 4h2m6-9v5a4 4 0 0 1-4 4h-2v3" />
    </svg>
  );
}

export function ExternalLinkIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M13 5h6v6M19 5l-9 9" />
      <path d="M19 14v5H5V5h5" />
    </svg>
  );
}
