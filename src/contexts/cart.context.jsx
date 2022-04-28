import { createContext,useState,useEffect } from "react";

const addCartItem = (cartItems, prodcutToAdd) => {

    const existingCartItem = cartItems.find((cartItem)=> cartItem.id === prodcutToAdd.id);

    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === prodcutToAdd.id ? {...cartItem,quantity: cartItem.quantity+1}: cartItem)
    }

    return [...cartItems, {...prodcutToAdd, quantity: 1}]
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
});



export const CartProvider = ({ children }) =>{
    const [isCartOpen,setIsCartOpen] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem)=> total+ cartItem.quantity,0)
        setCartCount(newCartCount);
    },[cartItems]);

    const addItemToCart = (prodcutToAdd) => {
        setCartItems(addCartItem(cartItems,prodcutToAdd));
    }
    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}