import { useContext,useState } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../Store/cart-context';
import CartItem from './CartItem';
import CheckOutForm from '../CheckOut/CheckOutForm';


const Cart = props =>{
    const cartCtx = useContext(CartContext);
    const [summon,setSummon] = useState(false);
   

    
  const sendDataInfoHandler = (userInfo) =>{
    console.log(userInfo)
       fetch('https://react-http-1c3ee-default-rtdb.firebaseio.com/userForm.json',{
        method:'POST',
        body: JSON.stringify({
            user: userInfo,
            orderedItems: cartCtx.items
        })
       })
       
  }


    const orderHandler = () => {
        setSummon(true)
    }

    const displayBtn = cartCtx.items.length > 0;

    const cartAddItemHandler = (item) =>{
       cartCtx.addItem({...item,amount: 1});
    }

    const cartRemoveItemHandler = (id) =>{
       cartCtx.removeItem(id)
    }


    const stuff = <ul className={classes['cart-items']}>
        {cartCtx.items.map(
        item =>{
          return(
           <CartItem
             key={item.id}
             price={item.price}
             name={item.name}
             amount={item.amount}
             onAdd={cartAddItemHandler.bind(null,item)}
             onRemove={cartRemoveItemHandler.bind(null,item.id)}
            />
    )})}</ul>

    const changeModalHandler = () =>{
        setSummon(false);
    }

   
    return(

      <Modal onHide={props.onHide}>
          {summon ? 
          <CheckOutForm onChangeModal={changeModalHandler} onCheckOut={sendDataInfoHandler}/> :
          <>
          {stuff}
          <div className={classes.total}>
              <span>Total Amount</span>
              <span>{`$${cartCtx.totalAmount.toFixed(2)}`}</span>
          </div>
          <div className={classes.actions}>
              <button className={classes.btn} onClick={props.onHide}>Close</button>
              {displayBtn && <button className={classes.btn2} onClick={orderHandler}>Order</button>}
          </div>
          </>}
      </Modal>
    )
}

export default Cart