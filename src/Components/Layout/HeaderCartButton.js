import React,{useContext,useEffect,useState} from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../Store/cart-context';

const HeaderCartButton = props =>{
   
   const [bump,setBump] =  useState(false); 
   
   const cartctx = useContext(CartContext);
   const {items} = cartctx;

   const number = items.reduce((currentNum,item)=>{
       return currentNum + item.amount
   },0)
 
   const logicBtn = `${classes.button} ${bump ? classes.bump : ''} `;

   useEffect(()=>{
      if(items === 0){
          return;
      }
       setBump(true);
       const timer = setTimeout(()=>{
           setBump(false)
       },300)

       return () =>{
           clearTimeout(timer)
       }
   },[items])
   return(
       <button className={logicBtn} onClick={props.onClick}>
           <span className={classes.icon}>
             <CartIcon />
           </span>
           <span>
               Your Cart
           </span>
           <span className={classes.badge}>
               {number}
           </span>
       </button> 
   )
}

export default HeaderCartButton;