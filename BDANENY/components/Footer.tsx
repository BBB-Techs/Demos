import Image from "next/image";
import { ORG, NAV } from "@/lib/content";
import { withBasePath } from "@/lib/basePath";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-white">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Image
            src={withBasePath("/brand/logo-tight.png")}
            alt="BDANENY"
            width={419}
            height={100}
            className="h-9 w-auto"
          />
          <p className="mt-4 max-w-xs text-sm text-muted">{ORG.fullName}</p>
          <p className="mt-1 text-sm text-muted">{ORG.address}</p>
        </div>

        <div>
          <p className="kicker text-muted">Explore</p>
          <ul className="mt-4 space-y-2.5">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-sm text-ink/75 hover:text-brand-deep">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="kicker text-muted">Connect</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={ORG.phoneHref} className="text-ink/75 hover:text-brand-deep">
                {ORG.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${ORG.email}`} className="text-ink/75 hover:text-brand-deep">
                {ORG.email}
              </a>
            </li>
            <li className="flex gap-4 pt-1">
              <a href={ORG.facebook} className="text-ink/75 hover:text-brand-deep" aria-label="BDANENY on Facebook">
                Facebook
              </a>
              <a href={ORG.instagram} className="text-ink/75 hover:text-brand-deep" aria-label="BDANENY on Instagram">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line py-6">
        <p className="container-x text-xs text-muted">
          © {new Date().getFullYear()} {ORG.name}. A 501(c)(3) nonprofit. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
