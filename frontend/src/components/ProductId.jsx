import { TbArrowLeft, TbArrowRight } from "react-icons/tb";

const ProductId = (props) => {
  const { product } = props;
  return (
    <div className="max-padd-container flex items-center flex-wrap gap-x-2 medium-16">
      Home <TbArrowRight /> Shop <TbArrowRight /> {product.category}
      <TbArrowRight /> {product.name}
    </div>
  );
};

export default ProductId;
