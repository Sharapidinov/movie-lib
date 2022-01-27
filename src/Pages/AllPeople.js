import React, {useState, useEffect} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import PeopleCard from "../components/PeopleCard/PeopleCard";
import Spinner from "../components/Spinner/Spinner";
import Pagination from "../components/pagination/Pagination";

const AllPeople = () => {
    const [query, setQuery] = useSearchParams()
    const [people, setPeople] = useState([])
    const [spinner, setSpinner] = useState(true)
    const [page, setPage] = useState(+query.get("page"))
    const [name, setName] = useState("")
    const nav = useNavigate()

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/person/popular?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=ru&page=${page}`)
            .then(({data}) => {
                setPeople(data.results)
                setSpinner(false)
            } )
    },[page])






    if (spinner) return <Spinner/>

    return (
        <div className="container pad">


            <Pagination page={page} setQuery={setQuery} setPage={setPage}/>

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
                            <button  onClick={() => setPage(it+1)}  className='btn btn-primary'>{it + 1}</button>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default AllPeople;