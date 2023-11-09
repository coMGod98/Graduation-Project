import React from "react";
import styles from "./banner.module.css";
import { Link } from "react-router-dom";

function Banner() {
    return (
        <>
            <Link to="/Product/1">
                <img
                    src={require("../images/main_banner.png")} alt="logo"/>
            </Link>
        </>
    )
}

export default Banner;