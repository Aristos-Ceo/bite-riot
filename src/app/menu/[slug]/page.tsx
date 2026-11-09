import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { money } from "@/lib/money";
import { ProductDetailActions } from "@/components/product-detail-actions";
import { productImage } from "@/lib/bite-riot-images";
import { fallbackMenuProducts, type MenuProduct } from "@/lib/menu-fallback";

export const runtime = "nodejs";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let product: MenuProduct | undefined;

  try {
    const databaseProduct = await prisma.product.findUnique({ where: { slug } });
    if (databaseProduct?.available) product = databaseProduct;
  } catch (error) {
    console.error("BITE RIOT product detail is using the local catalogue fallback:", error);
  }

  if (!product) product = fallbackMenuProducts.find((item) => item.slug === slug);
  if (!product) notFound();

  const image = productImage(product.slug, product.image);
  return (
    <main>
      <section className="section">
        <div className="wrap detail-layout">
          <div className="detail-image">
            <img src={image} alt={product.name} />
            <span className="detail-stamp">BITE RIOT<br />GOOD FOOD. ZERO QUIET.</span>
          </div>
          <div className="detail-copy">
            <div className="eyebrow">{product.category} / MADE FOR THE CRAVING</div>
            <h1 className={`display br-product-detail-title ${slug === "fresh-lemonade" ? "br-title-fresh-lemonade" : ""} ${slug === "cheese-please" ? "br-title-cheese-please" : ""}`}>{product.name}</h1>
            <div className="detail-price">{money(product.price)}</div>
            <p>{product.description}</p>
            <div className="detail-note glass-dark">
              <b>A little note from the kitchen</b>
              <span>Customisation and allergen details should be confirmed with the restaurant before ordering.</span>
            </div>
            <ProductDetailActions product={{ id: product.id, name: product.name, price: product.price, image }} />
            <Link className="back-link" href="/menu">← Back to the full menu</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
