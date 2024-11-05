import { useState } from "react";
import ProductComponent from "./Components/ProductComponent";
import Modal from "./Components/Modal";
import Cart from "./Components/Cart";

function App() {

  const products = [
    {
      image: {
        thumbnail: "/images/image-waffle-thumbnail.jpg",
        mobile: "/images/image-waffle-mobile.jpg",
        tablet: "/images/image-waffle-tablet.jpg",
        desktop: "/images/image-waffle-desktop.jpg",
      },
      name: "Waffle with Berries",
      category: "Waffle",
      price: 6.5,
      count: 0,
    },
    {
      image: {
        thumbnail: "/images/image-creme-brulee-thumbnail.jpg",
        mobile: "/images/image-creme-brulee-mobile.jpg",
        tablet: "/images/image-creme-brulee-tablet.jpg",
        desktop: "/images/image-creme-brulee-desktop.jpg",
      },
      name: "Vanilla Bean Crème Brûlée",
      category: "Crème Brûlée",
      price: 7.0,
      count: 0,
    },
    {
      image: {
        thumbnail: "/images/image-macaron-thumbnail.jpg",
        mobile: "/images/image-macaron-mobile.jpg",
        tablet: "/images/image-macaron-tablet.jpg",
        desktop: "/images/image-macaron-desktop.jpg",
      },
      name: "Macaron Mix of Five",
      category: "Macaron",
      price: 8.0,
      count: 0,
    },
    {
      image: {
        thumbnail: "/images/image-tiramisu-thumbnail.jpg",
        mobile: "/images/image-tiramisu-mobile.jpg",
        tablet: "/images/image-tiramisu-tablet.jpg",
        desktop: "/images/image-tiramisu-desktop.jpg",
      },
      name: "Classic Tiramisu",
      category: "Tiramisu",
      price: 5.5,
      count: 0,
    },
    {
      image: {
        thumbnail: "/images/image-baklava-thumbnail.jpg",
        mobile: "/images/image-baklava-mobile.jpg",
        tablet: "/images/image-baklava-tablet.jpg",
        desktop: "/images/image-baklava-desktop.jpg",
      },
      name: "Pistachio Baklava",
      category: "Baklava",
      price: 4.0,
      count: 0,
    },
    {
      image: {
        thumbnail: "/images/image-meringue-thumbnail.jpg",
        mobile: "/images/image-meringue-mobile.jpg",
        tablet: "/images/image-meringue-tablet.jpg",
        desktop: "/images/image-meringue-desktop.jpg",
      },
      name: "Lemon Meringue Pie",
      category: "Pie",
      price: 5.0,
      count: 0,
    },
    {
      image: {
        thumbnail: "/images/image-cake-thumbnail.jpg",
        mobile: "/images/image-cake-mobile.jpg",
        tablet: "/images/image-cake-tablet.jpg",
        desktop: "/images/image-cake-desktop.jpg",
      },
      name: "Red Velvet Cake",
      category: "Cake",
      price: 4.5,
      count: 0,
    },
    {
      image: {
        thumbnail: "/images/image-brownie-thumbnail.jpg",
        mobile: "/images/image-brownie-mobile.jpg",
        tablet: "/images/image-brownie-tablet.jpg",
        desktop: "/images/image-brownie-desktop.jpg",
      },
      name: "Salted Caramel Brownie",
      category: "Brownie",
      price: 4.5,
      count: 0,
    },
    {
      image: {
        thumbnail: "/images/image-panna-cotta-thumbnail.jpg",
        mobile: "/images/image-panna-cotta-mobile.jpg",
        tablet: "/images/image-panna-cotta-tablet.jpg",
        desktop: "/images/image-panna-cotta-desktop.jpg",
      },
      name: "Vanilla Panna Cotta",
      category: "Panna Cotta",
      price: 6.5,
      count: 0,
    },
  ];

  const [cart, setCart] = useState(products);
  const [modal, setModal] = useState(false);

  const openModal = () => setModal(true);
  const closeModal = () => {
    setModal(false);
    setCart(products);
  };

  const updateCart = (productDetails, count) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.name === productDetails.name
    );

    let updatedCart;

    if (existingProductIndex !== -1) {

      updatedCart = cart.map((item, index) =>
        index === existingProductIndex ? { ...productDetails, count } : item
      );
      // }
    } else if (count > 0) {
      // Only add new items if count is greater than zero
      updatedCart = [...cart, { ...productDetails, count }];
    } else {
      // If count is zero and item is new, don't add to cart
      updatedCart = cart;
    }

    setCart(updatedCart);
  };

  const removeCartItem = (event) => {
    const productName = event.currentTarget.getAttribute('data-product-name');
    const product = cart.find((item)=>item.name === productName);
    if (product) {
      updateCart(product, 0);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 p-10 gap-6 xl:grid-cols-3 sm:p-20">
        {/* products wrapper */}
        <div className="flex flex-col col-span-2">
          <div className="pb-6">
            <h1 className="text-4xl font-bold">Desserts</h1>
          </div>
          {/* products */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 sm:grid-cols-2">
            {cart.map((item, index) => (
              <ProductComponent
                key={index}
                productDetails={item}
                updateCart={updateCart}
              />
            ))}
          </div>
        </div>

        {/* cart wrapper */}
        <Cart cart={cart} openModal={openModal} removeCartItem={removeCartItem}/>
      </div>

      {modal ? (
        <Modal cart={cart} closeModal={closeModal}/>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
