const ProductDescription = () => {
  return (
    <div className="max-padd-container mt-20">
      <div className="flex gap-3 mb-4">
        <button className="btn-dark rounded-sm !text-xs !py-[6px]">
          Description
        </button>
        <button className="btn-dark rounded-sm !text-xs !py-[6px]">
          Care Guide
        </button>
      </div>
      <div className="flex flex-col pb-16 text-sm">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus
          nostrum asperiores magni voluptatum temporibus consequatur illo
          impedit sunt nisi eligendi, repudiandae illum? In quibusdam
          voluptatibus maxime illum ad. Voluptatibus, aut!
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum,
            culpa? Eius ex repellat tenetur quam accusantium eos officia iusto
            impedit recusandae, voluptatum aut reprehenderit tempore dicta
            consequatur perferendis odio excepturi?
          </p>
        </p>
      </div>
    </div>
  );
};

export default ProductDescription;
