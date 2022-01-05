import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import logo from "../img/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
import {useState} from "react";
const Header = () => {
    const [name, setName] = useState("")
    const [dis, setDis] = useState(true)

    const nav = useNavigate()

    const Search = e => {
        if (e.target.value.trim() !== ``){
            setName(e.target.value.trim())
            setDis(false)
        }


    }

    const enter = (e) => {
        if (e.target.value.trim() !== ``){
            setName(e.target.value.trim())
            if (e.key === "Enter") {
                nav(`/search/${name}`)
            }
        }

    }

    const onClick = () => {
        nav(`/search/${name}`)
    }

    return (
        <header>
            <div className="container d-flex align-items-center text-center justify-content-between p-3 ">
                <div className="d-flex justify-content-around align-items-center">
                    <Link to="/"><img className="w-75" src={logo} alt=""/></Link>
                    <Link className="text-decoration-none text-light fs-5 me-3" to="/films">Фильмы</Link>
                    <Link className="text-decoration-none text-light fs-5 me-3 " to="/people">Актеры</Link>
                </div>
                <div className="d-flex justify-content-around align-items-center d-none d-md-flex">
                    <input className="form-control search-input" placeholder="Введите название" onKeyDown={enter} onChange={Search} type="text"/>
                    <button onClick={onClick} disabled={dis} className="btn btn-outline-secondary ">Найти</button>
                </div>

            </div>
        </header>

    );
};

export default Header;