import useValidation from "../../Hooks/use-validations";

import "./CheckOutForm.css";


const CheckOutForm = (props) =>{
    const inputValidation = (value) => value.trim() !== '';
    
    const {
    value: firstNameValue,
    isInValid: firstNameIsInValid,
    valueChangeHandler: nameChangeHandler,
    blurChangeHandler: nameChangeBlurHandler,
    reset: nameInputReset,
    valueIsValid: nameInputisValid
  } = useValidation(inputValidation);

   const {
    value: addressValue,
    isInValid: addressIsInValid,
    valueChangeHandler: addressChangeHandler,
    blurChangeHandler: addressChangeBlurHandler,
    reset: addressInputReset,
    valueIsValid: addressInputisValid
   } = useValidation(inputValidation);

   const {
    value: emailValue,
    isInValid: emailIsInValid,
    valueChangeHandler: emailChangeHandler,
    blurChangeHandler: emailChangeBlurHandler,
    reset: emailInputReset,
    valueIsValid: emailInputIsValid
  } = useValidation((value) => value.includes('@'));

  const userInfoList = {
    name:firstNameValue,
    address:addressValue,
    email:emailValue
  }
  



  let formIsValid = false;
  if(nameInputisValid && emailInputIsValid && addressInputisValid){
     formIsValid = true;
  }
  
  const formSubmitHandler = (event) => {
        event.preventDefault();
        if(!formIsValid ){
          return;
        }
        props.onCheckOut(userInfoList)
      
        console.log('the beginning')
        nameInputReset();
        emailInputReset();
        addressInputReset();
        console.log('the end')

  }
  const nameClass = !firstNameIsInValid ? 'form-control' : 'form-control invalid';
  const lastNameClass = !emailIsInValid ? 'form-control' : 'form-control invalid';
  const addressClass = !addressIsInValid ? 'form-control' : 'form-control invalid';

  
return (
    
    <form onSubmit={formSubmitHandler}>
      <div className='control-group'>
        <div className={nameClass}>
          <label htmlFor='name'>Name</label>
          <input 
          type='text' 
          id='name' 
          value={firstNameValue}
          onChange={nameChangeHandler} 
          onBlur={nameChangeBlurHandler}/>
          {firstNameIsInValid && <p className='error-text'>Please Enter Name</p>}
        </div>
        <div className={addressClass}>
          <label htmlFor='name'>Home Address</label>
          <input 
          type='text' 
          id='name' 
          value={addressValue}
          onChange={addressChangeHandler} 
          onBlur={addressChangeBlurHandler}/>
          {addressIsInValid && <p className='error-text'>Please Enter Valid Address</p>}
        </div>
        <div className={lastNameClass}>
          <label htmlFor='name'>E-mail Address</label>
          <input 
          type='text' 
          id='name'
          value={emailValue}
          onChange={emailChangeHandler} 
          onBlur={emailChangeBlurHandler}/>
          {emailIsInValid && <p className='error-text'>Please Enter Valid Email</p>}  
        </div>
      </div>
      <div className='form-actions'>
        <button  disabled={!formIsValid}>Send</button>
        <button type="button" onClick={props.onChangeModal}>Back</button>
      </div>
    </form>
  );
}

export default CheckOutForm