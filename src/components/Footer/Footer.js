import React from 'react';
import logo from "../img/footer.svg";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer p-3">
        <div className="container">
            <div className="row justify-content-between">
            <div className="col-6 w-50">
                <Link to="/"><img className="w-25" src={logo} alt="logo"/></Link>
            </div>

                <div className="col-6 d-flex align-items-center justify-content-center text-light">
                    All rights reserved!
                </div>

            </div>


        </div>


        </footer>
    );
};

export default Footer;