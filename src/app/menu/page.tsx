import { prisma } from "@/lib/prisma";
import { MenuBrowser } from "@/components/menu-browser";
import { MenuHero } from "@/components/menu-hero";
import { productImageBySlug } from "@/lib/bite-riot-images";
import { fallbackMenuProducts, type MenuProduct } from "@/lib/menu-fallback";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export default async function Menu() {
  let products: MenuProduct[] = [];
  let loadError = false;

  try {
    products = await prisma.product.findMany({
      where: { available: true, slug: { in: Object.keys(productImageBySlug) } },
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });
  } catch (error) {
    loadError = true;
    console.error("BITE RIOT menu catalogue is using its safe local fallback:", error);
  }

  // The supplied image-mapped catalogue is the reliable source for the storefront.
  // Merge database pricing/details by slug when available, but never let a partial or
  // unavailable SQLite query turn the public menu into an empty page.
  const databaseBySlug = new Map<string, MenuProduct>(products.map((product) => [product.slug, product] as const));
  products = fallbackMenuProducts.map((fallback) => {
    const live = databaseBySlug.get(fallback.slug);
    return live ? { ...fallback, ...live, image: fallback.image } : fallback;
  });
  if (loadError) console.warn("Using the built-in BITE RIOT menu catalogue.");

  return (
    <main className="br-menu-page">
      <MenuHero />
      <section className="section br-menu-content">
        <div className="wrap">
          <MenuBrowser products={products} loadError={false} />
          {loadError ? <p className="br-menu-data-note">Showing the built-in menu catalogue while the live database reconnects. You can still browse the full menu.</p> : null}
        </div>
      </section>
    </main>
  );
}
