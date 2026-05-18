import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Star, StarHalf, Minus, Plus, ShoppingCart, Leaf, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const product = products.find((p) => p.id === id);
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);

  if (!product) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-5 py-20 text-center">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-4">Product Not Found</h1>
          <Link to="/" className="text-accent hover:underline">← Back to Home</Link>
        </div>
      </Layout>
    );
  }

  const fullStars = Math.floor(product.rating);
  const hasHalf = product.rating % 1 >= 0.5;

  const related = products.filter((p) => p.id !== product.id && p.title === product.title).slice(0, 4);
  const showRelated = related.length > 0
    ? related
    : products.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart!",
      description: `${qty}x ${product.title} (${product.mg}) added.`,
    });
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-5 py-10">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Products</span>
        </Link>

        {/* Product Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden bg-muted aspect-square">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setLiked(!liked)}
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
            >
              <Heart
                size={22}
                className={liked ? "fill-destructive text-destructive" : "text-primary"}
              />
            </button>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <Leaf size={16} className="text-accent" />
              <span className="text-xs font-medium uppercase tracking-wider text-accent">
                100% Organic
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
              {product.title}
            </h1>

            <span className="text-sm text-muted-foreground mb-4">{product.mg}</span>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: fullStars }).map((_, i) => (
                  <Star key={i} size={18} className="fill-plantrise-gold text-plantrise-gold" />
                ))}
                {hasHalf && <StarHalf size={18} className="fill-plantrise-gold text-plantrise-gold" />}
              </div>
              <span className="text-sm text-muted-foreground">({product.rating} / 5)</span>
            </div>

            {/* Price */}
            <p className="text-3xl font-bold text-foreground mb-6">₹{product.price}</p>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            {/* Benefits */}
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">Key Benefits</h3>
              <ul className="space-y-2">
                {product.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                    <CheckCircle size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Usage */}
            <div className="bg-card rounded-xl p-4 mb-8">
              <h3 className="font-semibold text-foreground mb-2">How to Use</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{product.usage}</p>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mt-auto">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-medium text-foreground">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:brightness-110 transition-all"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
          </div>
        </motion.div>

        {/* Related Products */}
        <section className="mt-20">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-8 text-center">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {showRelated.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProductDetails;
