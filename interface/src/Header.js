import React, {useEffect} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


function Header() {

    const nav = useNavigate();
    const navToHome = () => {
        nav("/");
    }
    const navToAbout = () => {
        nav("/about");
    }
    const navToAuth = () => {
        nav("/auth");
    }


    return (
        <div className="header">
            <button className="about-us-button" onClick={navToAbout}>About Us</button>
            <button className="home-button" onClick={navToHome}>Home</button>
            <button className="sign-in-button" onClick={navToAuth}>Sign-in</button>
            <h1 className="app-name"> sRoad</h1>
        </div>
    );
}

export default Header;