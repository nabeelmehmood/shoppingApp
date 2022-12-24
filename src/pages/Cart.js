
import { useContext } from "react"
import { Context } from "../context/Context"
import { useState } from "react"

export default function(){
    const {cart, removeItem, emptyCart, handleAdd} = useContext(Context)

    const [orderPlaced, setOrderPlaced] = useState(false)
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })

    const total = cart.length > 0 ? cart.map(product=> product.price).reduce((a, b) => {
        return a + b;
      }) : 0
    

    
    const uniqueProducts = [... new Set(cart)] //Removing duplicate items in cart to display each item once 

    const CheckoutElemets = uniqueProducts.map((product, i)=>{
        const qty = cart.filter(ye=>ye.id=== product.id).length // Actual unique item quantity in cart
        return (
            <>
            <div className="item-checkout">
            
            <small className="item-index">{i+1}.</small>
            <div className="cart-item-summary">
            <small className="cart-item"><span>{product.title}</span> </small>
            <small className="cart-item"> ${product.price} x {qty}</small>
            </div>
            <div className="cart-item-options">
            <button onClick={()=>removeItem(product.id)} className="primary-btn">Remove</button>
            <button onClick={()=>handleAdd(product)} className="primary-btn">Add +</button>
            </div>
            </div>
            <hr></hr>
           </>
        )
    })

    const message = cart.length === 0 && <small>Your cart is empty</small>
    const checkoutBtn = cart.length>0 &&  <button className="primary-btn center">Place Order</button>
        

    return (
        <>
        <div className="current-tab">
        <h3>Check Out</h3>
        {message}
        
        
        </div>
        {CheckoutElemets}
        <div className="checkout-summary flex flex-column">
        {checkoutBtn}

        <p>{cart.length > 0 && `Total: ${formatter.format(total)} `}</p>
        </div>
       
        </>
    )
}