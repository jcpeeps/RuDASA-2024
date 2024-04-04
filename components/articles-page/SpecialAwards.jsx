import React from 'react'
import {useState} from 'react';
import {useEffect} from 'react';
import StatementCard from './StatementCard'
import SpecialAwardCard from './SpecialAwardCard';
export default function SpecialAwards({ files }) {
    // console.log("<SpecialAwards>: ", files);
    const [awards, setAwards] = useState(files.slice(0, 5));
    const [page, setPage] = useState(0);
    function next () {
        if (files.length > (page+1)*5) setPage(page+1);
    }
    function prev () {
        // if (page > 0) 
        setPage(Math.max(page-1, 0));
    }
    useEffect(() =>{
        console.log("useEffect");
        setAwards(files.slice(page, page+5));
        const response = fetch('/api/getSpecialAwards', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({files: awards}) // vals: { email: "...", password: "..." }
        })
        .then(res => res.json())
        .then(json => {
            setAwards(json.message ?? [])
        });
    }, [page])
    // setPage(0);
    return (
        <section className="bg-light">
            <div className="container px-4 px-lg-0 py-2 py-lg-4">
                <h3 className="my-4 pb-4 fw-bold mt-5">Special Awards</h3>
                <div className="d-flex flex-wrap">
                    {awards.map((award, index) => (
                        // <StatementCard title={statement.title} author={statement.author} date={statement.date} description={statement.description} link={statement.link} key={index} />
                        <SpecialAwardCard name={award?.frontmatter?.name} location={award?.frontmatter?.location} hospital={award?.frontmatter?.hospital} year={award?.frontmatter?.year} content={award?.content} />
                    ))}
                </div>
            </div>
            <button onClick={next}>Next</button>
            <p>Page: {page+1}</p>
            <button onClick={prev}>Previous</button>
        </section>
    )
}
