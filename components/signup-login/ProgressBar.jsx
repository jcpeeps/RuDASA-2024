import React from 'react'

export default function ProgressBar(props) {
    return (
        <div className="w-75 ms-5">
            <div className="progress-bar">
                <div
                    className="progress-loader"
                    style={{
                        width: props.step === 0 ? "0%" :
                            props.step === 1 ? (props.rhc ? "34%" : "55%") :
                                props.step === 2 ? (props.rhc ? "71%" : "100%")
                                : "100%"
                    }}
                />
            </div>
            <div className="d-flex justify-content-between w-100 progress-offset pe-4">
                <div className="d-flex flex-column align-items-center">
                    <div className="rounded-circle bg-primary progress-circle text-white fw-bold p-1">1</div>
                    <small className="text-primary">General</small>
                </div>

                <div className="d-flex flex-column align-items-center">
                    <div className="rounded-circle progress-circle text-white fw-bold p-1"
                        style={{ background: props.step === 0 ? "#BEBEBE" : "var(--primary)" }}
                    >
                        2
                    </div>
                    <small style={{ color: props.step === 0 ? "#BEBEBE" : "var(--primary)" }}>Address</small>
                </div>

                <div className="d-flex flex-column align-items-center">
                    <div className="rounded-circle progress-circle text-white fw-bold p-1"
                        style={{ background: props.step === 0 || props.step === 1 ? "#BEBEBE" : "var(--primary)" }}
                    >
                        3
                    </div>
                    <small style={{ color: props.step === 0 || props.step === 1 ? "#BEBEBE" : "var(--primary)" }}>Role</small>
                </div>

                <div className={`d-flex flex-column align-items-center ${
                    props.rhc ? "" : 'd-none'
                }`}>
                    <div className="rounded-circle progress-circle text-white fw-bold p-1"
                        style={{ background: props.step === 3 ? "var(--primary)" : "#BEBEBE" }}
                    >
                        4
                    </div>
                    <small style={{ color: props.step === 3 ? "var(--primary)" : "#BEBEBE" }}>Club</small>
                </div>
            </div>
        </div>
    )
}
