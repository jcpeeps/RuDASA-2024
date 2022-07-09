import React from 'react'
import StatementCard from './StatementCard'

export default function Statements({ markdown: { frontmatter, content } }) {
    return (
        <section className="bg-light">
            <div className="container py-5">
                <h3 className="my-4 pb-4 fw-bold mt-5">{content}</h3>
                <div className="d-flex flex-wrap">
                    {frontmatter.statements.map((statement, index) => (
                        <StatementCard title={statement.title} author={statement.author} date={statement.date} description={statement.description} link={statement.link} />
                    ))}
                </div>
            </div>
        </section>
    )
}
