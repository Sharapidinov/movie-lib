import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import PeopleCard from "../components/PeopleCard/PeopleCard";

const AllPeople = () => {
    const [people, setPeople] = useState([])

    const [page, setPage] = useState(1)
    const [name, setName] = useState("")
    const nav = useNavigate()

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/person/popular?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=ru&page=${page}`)
            .then(({data}) => setPeople(data.results) )
    },[page])





    const Search = e => {
        setName(e.target.value.trim())


    }

    const enter = (e) => {
        if (e.key === "Enter") {
            nav(`/search/${name}`)
        }
    }

    const onClick = () => {
        nav(`/search/${name}`)
    }

    return (
        <div className="container pt-5">

            <div className="d-flex justify-content-around align-items-center">
                <input className="form-control search-input" placeholder="Введите название" onKeyDown={enter} onChange={Search} type="text"/>
                <button onClick={onClick} className="btn btn-outline-secondary ">Найти</button>
            </div>

            <div className="btn-container">
                {page > 1 && <button onClick={() => setPage(1)}  className='btn btn-primary'>{1}</button>}
                {page > 4 && <span className="me-2">...</span>}
                {page >= 3 && <button onClick={() => setPage(page - 1)}  className='btn btn-primary'>{page - 1}</button>}
                <button onClick={() => setPage(page)}  className='btn btn-primary'>{page}</button>
                {page < 99 && <button onClick={() => setPage(page + 1)}  className='btn btn-primary'>{page + 1}</button>}
                {page <98 && <span className="me-2">...</span>}
                {page < 100 && <button onClick={() => setPage(100)}  className='btn btn-primary'>{100}</button>}
            </div>

            <div className="row pt-5">
                {
                    people.map(it => {
                        return(

                            <PeopleCard key={it.id} it={it}/>

                        )
                    })
                }
            </div>
            <div className="btn-container">
                {
                    [...Array(10).keys()].map(it => {
                        return(
                            <button onClick={() => setPage(it+1)}  className='btn btn-primary'>{it + 1}</button>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default AllPeople;