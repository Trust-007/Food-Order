import React from "react";
import classes from './Header.module.css';
import foodPic from '../../Assets/meals.jpg';
import HeaderCartButton from "./HeaderCartButton";

const Header = props =>{
    return(
        <>
        <header className={classes.header}>
            <h1>My Cuisine</h1>
            <HeaderCartButton onClick={props.onShow}/>
        </header>
        <div className={classes['main-image']}>
            <img src={foodPic} alt="pic of food"/>
        </div>
        </>
    )
}

export default Header;