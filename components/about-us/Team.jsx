import React from 'react'
import ContactCard from './ContactCard'
import PartnerCard from './PartnerCard'

export default function Team({ executives, portfolios, partners }) {

    const members = executives.frontmatter.members
    const portfolioArray = portfolios.frontmatter.members
    const partnerArray = partners.frontmatter.partners

    return (
        <section className="bg-light py-5">
            <div className="container">
                <h3 className="my-4">{executives.content}</h3>
                <div className="d-flex flex-wrap mb-5">
                    {members.map((member, index) => (
                        <ContactCard title={member.title} name={member.name} email={`mailto:${member.email}`} />
                    ))}
                </div>
                <h3 className="my-4">{portfolios.content}</h3>
                <div className="d-flex flex-wrap">
                    {portfolioArray.map((member, index) => (
                        <ContactCard title={member.title} name={member.name} email={`mailto:${member.email}`} />
                    ))}
                </div>
                <div className="my-5 py-3" /> {/*Spacing utility*/}

                <h3 className="my-4 pt-5">{partners.content}</h3>
                <div className="d-flex flex-wrap">
                    {partnerArray.map((partner, index) => (
                        <PartnerCard title={partner.title} description={partner.description} link={partner.link} />
                    ))}
                </div>
            </div>
        </section>
    )
}
