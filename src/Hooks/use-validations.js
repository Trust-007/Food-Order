import { useState } from "react";
const useValidation = (validateValue) =>{
   const [enteredValue,setEnteredValue]= useState('');
   const [isTouched,setIsTouched] = useState(false);
   const valueIsValid = validateValue(enteredValue);
   const inputIsInValid = !valueIsValid && isTouched;

   const valueChangeHandler = (event) =>{
        setEnteredValue(event.target.value)
   }
   const blurChangeHandler = (event) =>{
       setIsTouched(true)
   }
   const reset = () =>{
       setEnteredValue('');
       setIsTouched(false);
   }
   return {
     value:enteredValue,
     isInValid:inputIsInValid,
     valueChangeHandler,
     blurChangeHandler,
     valueIsValid,
     reset
   }
}

export default useValidation;