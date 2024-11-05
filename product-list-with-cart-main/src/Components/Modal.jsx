import React from "react";

const Modal = ({ cart, closeModal }) => {
  return (
    <div className="fixed flex w-full h-full bg-black bg-opacity-50 top-0 justify-center items-center">
      <div className="w-full lg:w-[40%] sm:w-[50%] bg-white rounded-xl">
        <div className="lg:p-10 p-6">
          <img className="py-4" src="/images/icon-order-confirmed.svg" alt="" />
          <h2 className="text-rose-900 font-bold text-4xl">Order Confirmed</h2>
          <p className="text-rose-400 py-2">We hope you enjoy your food!</p>
          <div className="p-4 bg-rose-100 rounded-2xl mt-4">
            {cart
              .filter((item) => item.count > 0)
              .map((item, index) => (
                <div
                  key={index}
                  className="border-b-2 border-rose-50 py-4 flex justify-between items-center"
                >
                  <div className="flex">
                    <img
                      className="h-14 mr-4"
                      src={item.image.thumbnail}
                      alt=""
                    />
                    <div>
                      <p className="font-semibold text-base">{item.name}</p>
                      <p className="pt-2 text-sm">
                        <span className="font-bold text-custom-red">
                          {item.count}x
                        </span>
                        <span className="text-rose-500 px-4 font-medium">
                          @${item.price.toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className="text-rose-900 font-medium">
                      ${(item.count * item.price).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            {/* order total */}
            <div className="flex justify-between align-middle py-4">
              <p className="text-rose-500 text-sm font-medium leading-7">
                Order Total
              </p>
              <p className="text-xl text-rose-900 font-bold">
                $
                {cart
                  .map((item) => item.count * item.price)
                  .reduce((acc, num) => acc + num, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>

          {/* new order button */}
          <button
            onClick={closeModal}
            className="w-full rounded-3xl bg-custom-red mt-6 py-4 text-white font-medium hover:bg-rose-800"
          >
            Start New Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
