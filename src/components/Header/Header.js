import React, {useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import logo from "../img/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
import {useState} from "react";
import {LanguageContext} from "../../languageCotext/LanguageContext";

const Header = () => {
    const [name, setName] = useState("")
    const [dis, setDis] = useState(true)
    const nav = useNavigate()

    const {language, setLanguage} = useContext(LanguageContext)

    const Search = e => {
        if (e.target.value.trim() !== ``) {
            setName(e.target.value.trim())
            setDis(false)
        }


    }

    const enter = (e) => {
        if (e.target.value.trim() !== ``) {
            setName(e.target.value.trim())
            if (e.key === "Enter") {
                nav(`/search/${name}`)
            }
        }

    }

    const onClick = () => {
        nav(`/search/${name}`)
    }

    const changeLanguage = () => {
      setLanguage(language === `ru-RU` ? `EN`: `ru-RU`)
    }

    return (
        <header>
            <div className="container d-flex align-items-center text-center justify-content-between p-3 ">
                <div className="d-flex justify-content-around align-items-center">
                    <div><Link to="/"><img className="w-75" src={logo} alt=""/></Link></div>
                        <Link className="text-decoration-none text-light fs-5 me-3" to="/films?page=1">{(language === "ru-RU") ? "Фильмы" : "Films"}</Link>
                        <Link className="text-decoration-none text-light fs-5 me-3 " to="/people?page=1">{(language === "ru-RU") ?"Актеры" :"Actors"}</Link>
                        <Link className="text-decoration-none text-light fs-5 me-3 " to="/serials?page=1">{(language === "ru-RU") ?"Сериалы": "TV series"}</Link>


                </div>
                <div className="d-flex justify-content-around align-items-center d-none d-md-flex">
                    <input className="form-control search-input" placeholder={(language === "ru-RU") ?"Введите название" : "Enter the title"} onKeyDown={enter}
                           onChange={Search} type="text"/>
                    <button onClick={onClick} disabled={dis} className="btn btn-outline-secondary me-3">{(language === "ru-RU") ?"Найти" :"Find"}</button>
                    <button className="btn btn-outline-secondary " onClick={changeLanguage}>{language.slice(-2)}</button>
                </div>

            </div>
        </header>

    );
};

export default Header;