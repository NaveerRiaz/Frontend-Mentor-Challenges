import React, { useEffect, useState } from "react";

const ProductComponent = ({ productDetails, updateCart}) => {
  const [count, setCount] = useState(0);

  const decrementCount = () => {
    setCount((prevCount) => (prevCount - 1 >= 0 ? prevCount - 1 : 0));
  };
  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  useEffect(()=>{
    updateCart(productDetails, count);
  }, [count])

  return (
    <div>
      <img
        className={
          productDetails.count > 0
            ? "rounded-lg transition-transform duration-300 hover:scale-105 outline outline-custom-red outline-2 w-full"
            : "rounded-lg transition-transform duration-300 hover:scale-105 w-full"
        }
        src={productDetails.image.desktop}
        alt=""
      />
      <div className="relative pt-10 w-full">
        <h5 className="text-rose-500">{productDetails.category}</h5>
        <h3 className="text-rose-900 font-semibold">{productDetails.name}</h3>
        <p className="text-custom-red font-semibold">
          ${productDetails.price.toFixed(2)}
        </p>
        {/* add to cart button */}
        <div className="w-full text-center absolute" style={{ top: "-1.5rem" }}>
          {productDetails.count === 0 ? (
            <button
              onClick={incrementCount}
              className="border-2 border-rose-300 bg-white rounded-3xl py-2 px-4 text-rose-900 hover:text-custom-red hover:border-custom-red mx-auto w-[70%] sm:w-[80%] md:w-[70%]"
            >
              <div className="flex items-center justify-center">
                <img
                  className="pl-2"
                  src="/images/icon-add-to-cart.svg"
                  alt=""
                />
                <p className="font-medium px-2">Add to Cart</p>
              </div>
            </button>
          ) : (
            <div className="border-2 border-custom-red bg-custom-red rounded-3xl py-2 px-4 text-white mx-auto w-[70%]">
              <div className="flex justify-between">
                <button
                  onClick={decrementCount}
                  className="border-white border-2 p-1 aspect-square rounded-full hover:bg-white fill-white hover:fill-custom-red"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" viewBox="0 0 10 2"><path d="M0 .375h10v1.25H0V.375Z"/></svg>
                </button>
                <p>{count}</p>
                <button
                  onClick={incrementCount}
                  className="border-white border-2 p-1 aspect-square rounded-full hover:bg-white fill-white hover:fill-custom-red"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10"><path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
