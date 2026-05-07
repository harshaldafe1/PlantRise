import Layout from "@/components/Layout";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const Index = () => {
  return (
    <Layout>
      <HeroCarousel />

      <section className="max-w-7xl mx-auto px-5 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-primary mb-3">
            Our Products
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover premium wellness essentials crafted for you.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
