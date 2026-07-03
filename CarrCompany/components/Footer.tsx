export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 md:flex-row md:items-center md:justify-between">
        <div>
          <a href="#top" className="display text-2xl text-paper">
            Carr<span className="text-accent">.</span>Company
          </a>
          <p className="mt-3 max-w-xs text-sm text-muted">
            The connections you need. The experience you trust. The name you can count on.
          </p>
        </div>
        <div className="flex gap-6 text-sm text-muted">
          <a
            href="https://www.facebook.com/carrcompanyflorida"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-accent"
          >
            Facebook
          </a>
          <a
            href="https://www.linkedin.com/company/the-carr-company"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-accent"
          >
            LinkedIn
          </a>
          <a href="#contact" className="transition hover:text-accent">
            Contact
          </a>
        </div>
      </div>
      <div className="border-t border-line py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} Carr Company. Florida &amp; the Carolinas.
      </div>
    </footer>
  );
}
