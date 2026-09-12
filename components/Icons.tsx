import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function NotesIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 3h8.5L19 7.5V21H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v5h5" />
      <path d="M8.5 12.5h7M8.5 16h4.5" />
    </Icon>
  );
}

export function QuizIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9.2a2.5 2.5 0 1 1 3.3 2.4c-.6.2-.9.8-.9 1.4v.5" />
      <path d="M12 16.8h.01" />
    </Icon>
  );
}

export function PenIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m4 20 4.3-1 10.4-10.4a2.1 2.1 0 0 0-3-3L5.3 16 4 20Z" />
      <path d="m13.9 7.3 3 3" />
    </Icon>
  );
}

export function LightbulbIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8.6 18h6.8M9.5 21h5" />
      <path d="M8.3 15.2A6.5 6.5 0 1 1 15.7 15c-.5.4-.8 1-.8 1.6v.4H9.1v-.4c0-.6-.3-1.1-.8-1.4Z" />
    </Icon>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M5.5 15A2.5 2.5 0 0 1 4 12.7V6.5A2.5 2.5 0 0 1 6.5 4h6.2A2.5 2.5 0 0 1 15 5.5" />
    </Icon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </Icon>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M10.6 4.2 2.9 17.5A1.6 1.6 0 0 0 4.3 20h15.4a1.6 1.6 0 0 0 1.4-2.5L13.4 4.2a1.6 1.6 0 0 0-2.8 0Z" />
      <path d="M12 9.5v4M12 16.8h.01" />
    </Icon>
  );
}

export function EraserIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m14.5 3.8 5.7 5.7a1.5 1.5 0 0 1 0 2.1l-7.4 7.4H8.2l-4-4a1.5 1.5 0 0 1 0-2.1l8.2-9.1a1.5 1.5 0 0 1 2.1 0Z" />
      <path d="m8.6 8.3 6.4 6.4M20.5 19.5H11" />
    </Icon>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v14H6.5A2.5 2.5 0 0 0 4 19.5V5.5Z" />
      <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H19v-5" />
    </Icon>
  );
}

export function SpinnerIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth={2.2}
        opacity={0.25}
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    </svg>
  );
}
