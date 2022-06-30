import { useContext } from 'react';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CartContext from '../../../Store/cart-context';

const MealItem = props =>{
   
   const cardCtx = useContext(CartContext)

   const addToCartHandler = (amount) =>{
        cardCtx.addItem({
           id: props.id,
           name: props.mealName,
           price: props.mealPrice,
           amount: amount
        })
   }

  return(
     <li className={classes.meal}>
        <div>
           <h3>{props.mealName}</h3>
           <div className={classes.description}>
            {props.mealDes}
           </div>
           <div className={classes.price}>
            ${props.mealPrice}
           </div>
        </div>
        <div>
            <MealItemForm onAddToCart={addToCartHandler}/>
        </div>
     </li>
  )
}

export default MealItem