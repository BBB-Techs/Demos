const socials = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com",
    path: "M6.94 8.5H3.56V20H6.94V8.5ZM5.25 7C6.35 7 7.19 6.16 7.19 5.06C7.19 3.97 6.35 3.13 5.25 3.13C4.16 3.13 3.31 3.97 3.31 5.06C3.31 6.16 4.16 7 5.25 7ZM20.5 13.11C20.5 9.83 18.55 8.28 15.97 8.28C13.94 8.28 13.03 9.4 12.53 10.19V8.5H9.14C9.19 9.56 9.14 20 9.14 20H12.53V13.66C12.53 13.3 12.55 12.94 12.66 12.69C12.95 11.97 13.6 11.22 14.71 11.22C16.16 11.22 17.11 12.28 17.11 13.86V20H20.5V13.11Z",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com",
    path: "M13.5 21V13.5H16L16.4 10.5H13.5V8.6C13.5 7.75 13.73 7.17 14.94 7.17H16.5V4.5C16.23 4.46 15.29 4.38 14.2 4.38C11.94 4.38 10.4 5.76 10.4 8.3V10.5H7.9V13.5H10.4V21H13.5Z",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com",
    path: "M12 8.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5ZM12 13.5A1.5 1.5 0 1 1 12 10.5 1.5 1.5 0 0 1 12 13.5ZM16.75 8.25A0.9 0.9 0 1 1 16.75 6.45 0.9 0.9 0 0 1 16.75 8.25ZM21 8.05C20.95 7.02 20.72 6.11 19.98 5.37C19.24 4.63 18.33 4.4 17.3 4.35C16.24 4.29 7.76 4.29 6.7 4.35C5.67 4.4 4.76 4.63 4.02 5.37C3.28 6.11 3.05 7.02 3 8.05C2.94 9.11 2.94 14.89 3 15.95C3.05 16.98 3.28 17.89 4.02 18.63C4.76 19.37 5.67 19.6 6.7 19.65C7.76 19.71 16.24 19.71 17.3 19.65C18.33 19.6 19.24 19.37 19.98 18.63C20.72 17.89 20.95 16.98 21 15.95C21.06 14.89 21.06 9.11 21 8.05ZM18.77 17.05C18.55 17.6 18.13 18.02 17.58 18.24C16.71 18.58 14.68 18.5 12 18.5C9.32 18.5 7.29 18.58 6.42 18.24C5.87 18.02 5.45 17.6 5.23 17.05C4.89 16.18 4.97 14.15 4.97 12C4.97 9.85 4.89 7.82 5.23 6.95C5.45 6.4 5.87 5.98 6.42 5.76C7.29 5.42 9.32 5.5 12 5.5C14.68 5.5 16.71 5.42 17.58 5.76C18.13 5.98 18.55 6.4 18.77 6.95C19.11 7.82 19.03 9.85 19.03 12C19.03 14.15 19.11 16.18 18.77 17.05Z",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
        <span className="font-display text-sm font-semibold text-ink">
          WHB<span className="text-copper">.</span>{" "}Wiggs, Haun &amp; Bohan
        </span>

        <p className="text-xs text-slate">
          &copy; {new Date().getFullYear()} WHB Sales. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`WHB on ${social.name}`}
              className="cursor-pointer text-slate transition-colors hover:text-blue"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d={social.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
