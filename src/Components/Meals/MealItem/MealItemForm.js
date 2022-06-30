import { useState,useRef } from 'react';
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';

const MealItemForm = props =>{

   const amountInputRef = useRef();
   const [formIsValid, setFormIsValid] = useState(true)

   const onSumbitHandler = (event) =>{
        event.preventDefault()
        const enteredAmount = amountInputRef.current.value; //values gotten from ref inputs are always strings
        const numEnteredAmount = +enteredAmount
        if(enteredAmount.trim().length === 0 || numEnteredAmount < 1 || numEnteredAmount > 5){
            setFormIsValid(false);
            return;
        }
        props.onAddToCart(numEnteredAmount);
   }

    return(
        <form className={classes.form} onSubmit={onSumbitHandler}>
            <Input 
            ref={amountInputRef}
            label='Amount'
            input={
              {
                  id:'amount',
                  type:'number',
                  min:'1',
                  max:'5',
                  step:'1',
                  defaultValue:'1'
              }  
            }/>
            <button>+ Add</button>
            {!formIsValid && <p>please enter values between 1 and 5</p>}
        </form>
    )
}

export default  MealItemForm;