import React from 'react'

// Looker Studio embed. Report is 1270x950, so a 4:3 ratio is used.
const EMBED_URL = "https://lookerstudio.google.com/embed/reporting/03a387dc-5b5b-4bf7-ada7-9d952d863615/page/xe1yF"

export default function MemberMap() {
    return (
        <section className="px-3" id="member-map">
            <div className="container py-2 py-lg-5">
                <div className="my-5 py-2 py-lg-5">
                    <h1 className="display-4 fw-bold mb-4 text-center">Where our members work</h1>
                    <p className="text-center mx-auto mb-5" style={{ maxWidth: 700 }}>
                        RuDASA members work in rural facilities across South Africa.
                        Use the filters to explore by province or district.
                    </p>
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            paddingTop: "75%",
                            borderRadius: 12,
                            overflow: "hidden",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.12)"
                        }}
                    >
                        <iframe
                            src={EMBED_URL}
                            title="RuDASA Member Distribution Map"
                            loading="lazy"
                            allowFullScreen
                            sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                border: 0
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
