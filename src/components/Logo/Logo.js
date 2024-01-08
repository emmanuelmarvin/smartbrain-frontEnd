import React from "react";
import Tilt from 'react-parallax-tilt';
import "./Logo.css"
import brain from "./brain.png"

const Logo = ()=>{
    return(
    <div className="ma4 mt0" style={{width:"150px"}}>
        <Tilt className="Tilt br2 shadow-2" style={{ height: '150px',}} >
            <div className="pa3" style={{display:"flex", "justifyContent":"center"}}>
                <img src={brain} alt="b" style={{paddingTop:"30px"}}/>
            </div>
        </Tilt>
    </div>)
}

export default Logo