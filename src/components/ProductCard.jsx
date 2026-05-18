import { useState } from "react";
import { Heart, Star, StarHalf } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProductCard = ({ id, image, title, mg, rating, price }) => {
  const [liked, setLiked] = useState(false);

  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <motion.div
      className="bg-card rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300 w-full max-w-[300px] group"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${id}`}>
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-4 bg-muted">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          {/* Quick View */}
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-primary/90 text-primary-foreground px-4 py-2 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Quick View
          </span>
        </div>
      </Link>

      {/* Heart */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setLiked(!liked);
        }}
        className="absolute top-7 right-7 w-9 h-9 rounded-full bg-background/80 flex items-center justify-center transition-colors hover:bg-background z-10"
      >
        <Heart size={18} className={liked ? "fill-destructive text-destructive" : "text-primary"} />
      </button>

      {/* Product Info */}
      <Link to={`/product/${id}`}>
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-lg font-medium text-card-foreground font-body">{title}</h3>
          <span className="text-sm text-primary font-medium">{mg}</span>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-0.5 mb-2">
          {Array.from({ length: fullStars }).map((_, i) => (
            <Star key={i} size={16} className="fill-plantrise-gold text-plantrise-gold" />
          ))}
          {hasHalf && <StarHalf size={16} className="fill-plantrise-gold text-plantrise-gold" />}
        </div>

        <p className="text-lg font-semibold text-foreground mb-3">₹{price}</p>
      </Link>

      {/* CTA */}
      <button className="w-full py-2.5 rounded-md bg-accent text-accent-foreground font-medium text-sm hover:brightness-110 transition-all">
        Add to Cart
      </button>
    </motion.div>
  );
};

export default ProductCard;
