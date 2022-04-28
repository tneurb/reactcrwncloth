import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';


import './cart-dropdown.scss';


const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'> 
                {cartItems.map(item => <CartItem CartItem={item}/>)}
            </div>
            <Button>Go to Checkout</Button>
        </div>
    )
};

export default CartDropdown;