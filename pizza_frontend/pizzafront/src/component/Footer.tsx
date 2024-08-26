import React from "react";

let Footer: React.FC = () => {
    return (
        <>
            <div className="container-fluid footer" style={{borderRadius : '50px 50px 0px 0px',backgroundColor:'#0066A7'}}>
            <div className="text-center" style={{lineHeight:'40px'}}>
                © 2024 Copyright :
                <a className="text-reset fw-bold" style={{textDecoration:'none'}} href="https://pizzaonline.dominos.co.in/"> Domino's Hut</a>
            </div>
            </div>

        </>
    )
}
export default Footer;