import Layout from "../layout/layout";
import { useCart, useCartActions } from "../providers/cartProvider";
import "./cartPage.css";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import Button from "@mui/material/Button";

const CartPage = () => {
  const cartState = useCart();
  const cartDispatch = useCartActions();
  const originalTotalPrice = cartState.cart.length
    ? cartState.cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
    : 0;
  const onIncrement = (item) => {
    cartDispatch({ type: "ADD_TO_CART", payload: item });
  };
  const onDecrement = (item) => {
    cartDispatch({ type: "REMOVE_PRODUCT", payload: item });
  };
  return (
    <Layout>
      <div className="container marginMainCart mt-4">
        {cartState.cart.length ? (
          <div className=" col-sm-12 d-flex justify-content-between flex-wrap">
            <section className="col-sm-12 col-lg-8 mb-5">
              {cartState.cart.map((item) => (
                <section>
                  <div key={item.id} className="cartItem mb-4">
                    <div className="cartItemDesAndImg">
                      <Link to={`/products/${item.name}`}>
                        <img
                          src={item.image}
                          className="cartItemImage"
                          alt={item.name}
                        />
                      </Link>
                      <div className="cartItemDescription">
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-inline">
                            $ {item.price * item.quantity}
                          </div>
                          <div>
                            <button
                              onClick={() => onDecrement(item)}
                              className={`button ${
                                item.quantity === 1 && "trashBtn"
                              }`}
                            >
                              {item.quantity > 1 ? "-" : <BiTrash />}
                            </button>
                            <span /* className={styles.value} */>
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => onIncrement(item)}
                              className="button increment"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </section>
            <section className="col-sm-8 col-lg-4 py-4 h-50 bg-light">
              <h2>price total</h2>
              <p>subTotal: $ {originalTotalPrice}</p>
              <p>
                Product Discounts:
                <span className="text-danger">
                  {" "}
                  $ {Math.round(originalTotalPrice - cartState.total)}
                </span>{" "}
              </p>
              <h4>Total: $ {cartState.total}</h4>
              <button type="button" class="btn btn-primary w-100 mt-4">
                <Link
                  to="/checkout"
                  className="text-white text-decoration-none"
                >
                  Go to checkout
                </Link>
              </button>
            </section>
          </div>
        ) : (
          <div className="m-auto marginEmptyCart">
            <MdAddShoppingCart className="cartEmptyIcon" />
            <h4 className="mt-4">Cart is empty</h4>
            <Link to="/shop" className="text-decoration-none">
              <Button variant="outlined" className="my-5">
                Go to products
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
