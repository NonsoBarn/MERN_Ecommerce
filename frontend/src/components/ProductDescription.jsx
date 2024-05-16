/* eslint-disable react/prop-types */
const ProductDescription = (props) => {
  // eslint-disable-next-line react/prop-types
  const { product } = props;

  console.log(product);
  return (
    <div className="max-padd-container mt-20">
      <div className="flex gap-3 mb-4">
        <button className="btn-dark rounded-sm !text-xs !py-[6px]">
          Description
        </button>
      </div>
      <div className="flex flex-col pb-16 text-sm">
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDescription;
