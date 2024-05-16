import { useParams } from "react-router-dom";
import ProductId from "../components/ProductId";
import ProductDisplay from "../components/ProductDisplay";
import ProductDescription from "../components/ProductDescription";
import PopularProducts from "../components/PopularProducts";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
ShopContext;

const Product = () => {
  const { productId } = useParams();
  const { all_products } = useContext(ShopContext);
  console.log("productId:", productId);

  const product = all_products.find((e) => e.id === Number(productId));
  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <section>
      <div>
        <ProductId product={product} />
        <ProductDisplay product={product} />
        <ProductDescription product={product} />
        <PopularProducts />
      </div>
    </section>
  );
};

export default Product;
