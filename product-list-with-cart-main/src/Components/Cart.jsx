import React from 'react'

const Cart = ({cart, openModal, removeCartItem}) => {
  return (
    <div className="cols-span-1 bg-white rounded-lg h-fit">
    <div className="p-6">
      <h2 className="text-custom-red font-bold text-xl">
        Your Cart (
        {cart
          .map((item) => item.count)
          .reduce((acc, num) => acc + num, 0)}
        )
      </h2>

      {/* empty cart */}
      {cart.map((item) => item.count).reduce((acc, num) => acc + num, 0) >
      0 ? (
        <>
          <div className="py-4">
            {cart
              .filter((item) => item.count > 0)
              .map((item, index) => (
                <div key={index} className="border-b-2 border-rose-100 py-4 flex justify-between">
                  <div>
                    <p className="font-semibold text-base">{item.name}</p>
                    <p className="pt-2 text-sm">
                      <span className="font-bold text-custom-red">
                        {item.count}x
                      </span>
                      <span className="text-rose-500 px-4 font-medium">
                        @${item.price.toFixed(2)}
                      </span>
                      <span className="text-rose-800 font-medium">
                        ${(item.count * item.price).toFixed(2)}
                      </span>
                    </p>
                  </div>
                  <button onClick={removeCartItem} data-product-name={item.name}>
                    <div className="border border-rose-300 rounded-full p-1 hover:border-rose-500 fill-rose-300 hover:fill-rose-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                      >
                        <path d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z" />
                      </svg>
                    </div>
                  </button>
                </div>
              ))}
          </div>

          {/* order total */}
          <div className="flex justify-between align-middle py-6">
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

          {/* carbon neutral banner */}
          <div className="flex bg-rose-100 justify-center align-middle py-4 rounded-lg">
            <div className="flex">
              <img src="/images/icon-carbon-neutral.svg" alt="" />
              <span className="pl-2 text-rose-900">
                This is a <b className="font-medium">carbon-neutral</b>{" "}
                delivery
              </span>
            </div>
          </div>

          {/* confirm order button */}
          <button
            onClick={openModal}
            className="w-full rounded-3xl bg-custom-red mt-6 py-4 text-white font-medium hover:bg-rose-800"
          >
            Confirm Order
          </button>
        </>
      ) : (
        <div className="w-full">
          <img
            className="mx-auto"
            src="/images/illustration-empty-cart.svg"
            alt=""
          />
          <p className="text-rose-500 text-center font-medium py-4">
            Your added items will appear here
          </p>
        </div>
      )}
    </div>
  </div>
  )
}

export default Cart