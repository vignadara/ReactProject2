import React, { useContext } from "react";
import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "./uSERcONTEXT.JS";
import { useSelector } from "react-redux";
const Header = () => {
    const [btnNamereact, setBtnNameReact] = useState("Login");
    const { loggedUser } = useContext(UserContext);

    const cartItems = useSelector((store) => store.cart.items);

    return (
        <div className="flex justify-between bg-pink-50 shadow-lg sm:bg-yellow-50 lg:bg-green-50">
            <div className="p-2 m-2">
                <img className="w-16" alt ="company-logo" src={LOGO_URL}/>
            </div>
            <div className="flex items-center">
                <ul className="flex  p-2 m-2">
                    <li className="px-4">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="px-4">
                        <Link to="/about">About Us</Link>
                    </li>
                    <li className="px-4">
                        <Link to="/contact">Contact Us</Link>
                    </li>
                    <li className="px-4">
                        <Link to="/cart">Cart - {cartItems.length}</Link>
                    </li>
                    <li className="px-4">  {loggedUser}</li>
                    <li className="px-4">
                        <button onClick={()=>{
                            btnNamereact === "Login" ? setBtnNameReact("Logout") : setBtnNameReact("Login")
                        }}>{btnNamereact}</button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Header;