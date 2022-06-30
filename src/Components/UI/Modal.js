import { Fragment } from 'react';
import ReactDom from 'react-dom'
import classes from'./Modal.module.css';


const BackDrop = props =>{
    return(
        <div className={classes.backdrop} onClick={props.onHide}/>
    )
}

const OverLay = props =>{
    return(
        <div className={classes.modal}>{props.children}</div>
    )

}
const overlays = document.getElementById('overlays')
const Modal = props =>{
    return(
       <Fragment>
          {ReactDom.createPortal(<BackDrop onHide={props.onHide}/>,overlays)}
          {ReactDom.createPortal(<OverLay>{props.children}</OverLay>,overlays)}
       </Fragment>
    )
}

export default Modal