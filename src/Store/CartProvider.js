import React,{useReducer} from 'react';
import CartContext from './cart-context';

const defaultCartItems = {
  items: [],
  totalAmount: 0
}

const cartReducer = (state,action) =>{
    if(action.type === 'ADD'){
        const updatedTotalAmt = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(
          (item) =>  item.id === action.item.id
        );
        const  existingCartItem = state.items[existingCartItemIndex]
        let updatedItems;
        if(existingCartItem){
          const updatedItem ={
            ...existingCartItem,
            amount: existingCartItem.amount + action.item.amount
          };
          updatedItems = [...state.items]
          updatedItems[existingCartItemIndex] = updatedItem
        }
        else {
          updatedItems = state.items.concat(action.item);
        }
        
    return({
      items: updatedItems,
      totalAmount: updatedTotalAmt
    })
    }
     if(action.type === 'REMOVE'){
         const existingCartItemIndex = state.items.findIndex(
          (item) =>  item.id === action.id
        );
        const  existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmt = state.totalAmount - existingCartItem.price;
        let updatedItems;
        if(existingCartItem.amount === 1){
          updatedItems = state.items.filter((item)=> item.id !== action.id);
        }
        else{
          const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1}
          updatedItems = [...state.items]
          updatedItems[existingCartItemIndex] = updatedItem;
        }
        return(
          {
            items: updatedItems,
            totalAmount: updatedTotalAmt
          }
        )
       
     }
      if(action.type ==="CLEAR"){
          return(defaultCartItems)
        }
    return defaultCartItems
}

const CartProvider = (props) =>{

    const [cartItems,dispatchCartItems] = useReducer(cartReducer,defaultCartItems);
    
    const addItemHandler = (item) => {
        dispatchCartItems({type:'ADD',item:item})
    };

    const removeItemHandler = (id) =>{
       dispatchCartItems({type:'REMOVE',id:id})
    }

    const clearItemHandler = () => {
      defaultCartItems({type: 'CLEAR'})
    }
    const cartContext = {
    items: cartItems.items,
    totalAmount: cartItems.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearItem: clearItemHandler
    }

  return(
    <CartContext.Provider value={cartContext}>
       {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider;