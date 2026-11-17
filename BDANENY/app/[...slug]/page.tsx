import { notFound } from "next/navigation";
import SitePage from "@/components/SitePage";
import { PAGE_KEYS } from "@/lib/pages";

// One static page for each inner page of bdaneny.org (about, advocacy, get help, and so on).
export function generateStaticParams() {
  return PAGE_KEYS.map((key) => ({ slug: key.split("/") }));
}

export default async function InnerPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const key = slug.join("/");
  if (!PAGE_KEYS.includes(key)) notFound();
  return <SitePage pageKey={key} />;
}
