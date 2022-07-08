import React from 'react'
import ContactCard from './ContactCard'
import PartnerCard from './PartnerCard'

export default function Team({ executives, portfolios }) {

    const members = executives.frontmatter.members
    const portfolioArray = portfolios.frontmatter.members

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

                <h3 className="my-4 pt-5">Key Partners</h3>
                <div className="d-flex flex-wrap">
                    <PartnerCard title="Professional Association of Clinical Associates SA" 
                                description="Clinical Associates are a new category of health care professionals who will help in the improvement of the health care system and well-being of communities in South Africa. This profession was introduced as one of the government’s strategy to achieve its solution in strengthening health care in South Africa."
                    />
                    <PartnerCard title="Professional Association of Clinical Associates SA" 
                                description="Clinical Associates are a new category of health care professionals who will help in the improvement of the health care system and well-being of communities in South Africa. This profession was introduced as one of the government’s strategy to achieve its solution in strengthening health care in South Africa."
                    />
                    <PartnerCard title="Professional Association of Clinical Associates SA" 
                                description="Clinical Associates are a new category of health care professionals who will help in the improvement of the health care system and well-being of communities in South Africa. This profession was introduced as one of the government’s strategy to achieve its solution in strengthening health care in South Africa."
                    />
                    <PartnerCard title="Professional Association of Clinical Associates SA" 
                                description="Clinical Associates are a new category of health care professionals who will help in the improvement of the health care system and well-being of communities in South Africa. This profession was introduced as one of the government’s strategy to achieve its solution in strengthening health care in South Africa."
                    />
                    <PartnerCard title="Professional Association of Clinical Associates SA" 
                                description="Clinical Associates are a new category of health care professionals who will help in the improvement of the health care system and well-being of communities in South Africa. This profession was introduced as one of the government’s strategy to achieve its solution in strengthening health care in South Africa."
                    />
                    <PartnerCard title="Professional Association of Clinical Associates SA" 
                                description="Clinical Associates are a new category of health care professionals who will help in the improvement of the health care system and well-being of communities in South Africa. This profession was introduced as one of the government’s strategy to achieve its solution in strengthening health care in South Africa."
                    />
                    <PartnerCard title="Professional Association of Clinical Associates SA" 
                                description="Clinical Associates are a new category of health care professionals who will help in the improvement of the health care system and well-being of communities in South Africa. This profession was introduced as one of the government’s strategy to achieve its solution in strengthening health care in South Africa."
                    />
                    <PartnerCard title="Professional Association of Clinical Associates SA" 
                                description="Clinical Associates are a new category of health care professionals who will help in the improvement of the health care system and well-being of communities in South Africa. This profession was introduced as one of the government’s strategy to achieve its solution in strengthening health care in South Africa."
                    />
                    <PartnerCard title="Professional Association of Clinical Associates SA" 
                                description="Clinical Associates are a new category of health care professionals who will help in the improvement of the health care system and well-being of communities in South Africa. This profession was introduced as one of the government’s strategy to achieve its solution in strengthening health care in South Africa."
                    />
                </div>
            </div>
        </section>
    )
}
