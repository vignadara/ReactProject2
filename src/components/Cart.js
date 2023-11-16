import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {

    const cartItems = useSelector((store) => store.cart.items);

    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart());
    };


    return (
        <div>
            <button onClick={handleClearCart}>Clear Cart</button>
            {cartItems?.length === 0 && (
                <h1> Your cart is empty </h1>
            )}
            <ItemList items={cartItems} />
        </div>
    );
};

export default Cart;