export function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-10 h-10 text-primary"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="url(#grad1)" />
      <path d="M12 12l5.5-3.17" stroke="hsl(var(--foreground))" strokeWidth="1" />
      <path d="M12 12l-5.5 3.17" stroke="hsl(var(--foreground))" strokeWidth="1" />
      <path d="M12 12V6.5" stroke="hsl(var(--foreground))" strokeWidth="1" />
      <path d="M12 12l-2.75 4.76" stroke="hsl(var(--foreground))" strokeWidth="1" />
      <path d="M12 12l2.75-4.76" stroke="hsl(var(--foreground))" strokeWidth="1" />
       <circle cx="12" cy="12" r="2.5" fill="hsl(var(--primary))" stroke="hsl(var(--background))" strokeWidth="1" />
    </svg>
  );
}
