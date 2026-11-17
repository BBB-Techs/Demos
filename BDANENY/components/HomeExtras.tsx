// Homepage sections from bdaneny.org that were missing: About BDANENY, Research & Recall,
// Get informed, Support Us, and Keep in Touch. Text comes from lib/site-content.json.
import { Reveal, Stagger, StaggerItem } from "./motion";
import { homeText, mapHref, mapSrc } from "@/lib/pages";

const DONATE = "https://crm.bloomerang.co/HostedDonation?ApiKey=pub_270bf66a-a934-11e7-afbe-024e165d44b3&WidgetId=1665024";
const SURVEY = "https://us14.list-manage.com/survey?u=09d590358d8ac3facafdef5f1&id=2e370e8fac&attribution=false";

function Button({ href, children, primary = true }: { href: string; children: React.ReactNode; primary?: boolean }) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={`${primary ? "btn btn-primary" : "btn btn-ghost"} mt-7 mr-3`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-line shadow-xl shadow-brand/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mapSrc("/templates/yootheme/cache/eb/photo-1582213782179-e0d53f98f2ca-eb714494.jpeg")} alt="" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </Reveal>
        <Reveal>
          <p className="kicker text-coral-deep">About Us</p>
          <h2 className="display-2 mt-4">About BDANENY</h2>
          <p className="mt-5 text-muted">{homeText("Established in 1968")}</p>
          <p className="mt-4 text-muted">{homeText("Bleeding Disorders Association of Northeastern New York (BDANENY) is dedicated")}</p>
          <Button href="/about">About Us</Button>
          <Button href={mapHref("/images/forms/BDANENY_mission_statement.pdf")} primary={false}>
            View our full mission statement
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

export function ResearchSection() {
  return (
    <section className="section bg-mist">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <p className="kicker text-coral-deep">Research & Recall</p>
          <h2 className="display-2 mt-4">Research & Recall Info</h2>
          <p className="mt-5 text-muted">{homeText("Catch up on the latest news")}</p>
          <Button href="/resources/forms">Research & Recall Info</Button>
        </Reveal>
        <Reveal className="order-1 lg:order-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-line shadow-xl shadow-brand/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mapSrc("/templates/yootheme/cache/36/photo-1511174511562-5f7f18b874f8-36863e94.jpeg")} alt="" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function InformedCards() {
  const cards = [
    { title: "Get informed.", body: homeText("Read important information"), href: "/resources" },
    { title: "We can help!", body: homeText("Get help by"), href: "/get-help" },
    { title: "Advocacy", body: homeText("Get involved and read about"), href: "/advocacy" },
  ];
  return (
    <section className="section">
      <div className="container-x">
        <Stagger className="grid gap-4 sm:grid-cols-3">
          {cards.map((c) => (
            <StaggerItem key={c.title}>
              <a href={mapHref(c.href)} className="card group flex h-full flex-col p-7">
                <h3 className="text-lg font-extrabold text-ink">{c.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{c.body}</p>
                <span className="mt-4 text-sm font-semibold text-brand-deep">Read more →</span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function SupportAndTouch() {
  return (
    <section className="section bg-mist">
      <div className="container-x grid gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="kicker text-coral-deep">Support Us</p>
          <h2 className="display-2 mt-4">Support Us</h2>
          <p className="mt-5 text-muted">{homeText("You can help by making a donation")}</p>
          <Button href={DONATE}>Donate Today</Button>
        </Reveal>
        <Reveal>
          <p className="kicker text-coral-deep">Keep in Touch</p>
          <h2 className="display-2 mt-4">Keep in Touch</h2>
          <p className="mt-5 text-muted">{homeText("We want to hear from you")}</p>
          <p className="mt-4 text-muted">{homeText("• WHAT EDUCATIONAL TOPICS")}</p>
          <p className="mt-2 text-muted">{homeText("• HOW INFORMATIVE")}</p>
          <Button href={SURVEY}>Take our survey</Button>
        </Reveal>
      </div>
    </section>
  );
}
