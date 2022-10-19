"use strict";
(() => {
var exports = {};
exports.id = 438;
exports.ids = [438];
exports.modules = {

/***/ 3537:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Address)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2296);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5609);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_3__);




function Address({ formData , setFormData  }) {
    const AddressSchema = yup__WEBPACK_IMPORTED_MODULE_3__.object().shape({
        address: yup__WEBPACK_IMPORTED_MODULE_3__.string().required("Please provide an address"),
        pow: yup__WEBPACK_IMPORTED_MODULE_3__.string().required("Place of work is required"),
        district: yup__WEBPACK_IMPORTED_MODULE_3__.string().required("District is required")
    });
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Formik, {
        initialValues: {
            address: "",
            pow: "",
            district: ""
        },
        validationSchema: AddressSchema,
        children: ({ touched , errors , handleChange  })=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(formik__WEBPACK_IMPORTED_MODULE_2__.Form, {
                className: "px-3 px-md-0",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "my-4 my-lg-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "w-auto me-sm-5 mb-4 mb-sm-0 form-group",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        htmlFor: "country",
                                        className: "text-primary fw-bold form-label",
                                        children: "Country*"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                        id: "country",
                                        className: "form-select border-0 border-bottom",
                                        "aria-label": "country",
                                        value: formData.country,
                                        onChange: (e)=>setFormData({
                                                ...formData,
                                                country: e.target.value
                                            }),
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                value: "rural-work",
                                                children: "Rural work"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                value: "information",
                                                children: "RHC information"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                value: "onboarding",
                                                children: "Onboarding programme"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                value: "rhc",
                                                children: "Rural Health Club"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                value: "event",
                                                children: "Events"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "w-auto form-group",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        htmlFor: "province",
                                        className: "text-primary fw-bold form-label",
                                        children: "Province*"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                        id: "province",
                                        className: "form-select border-0 border-bottom",
                                        "aria-label": "province",
                                        value: formData.province,
                                        onChange: (e)=>setFormData({
                                                ...formData,
                                                province: e.target.value
                                            }),
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                value: "rural-work",
                                                children: "Rural work"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                value: "information",
                                                children: "RHC information"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                value: "onboarding",
                                                children: "Onboarding programme"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                value: "rhc",
                                                children: "Rural Health Club"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                value: "event",
                                                children: "Events"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "my-4 my-lg-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "w-auto me-sm-5 mb-4 mb-sm-0 form-group",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        htmlFor: "address",
                                        className: "text-primary fw-bold form-label ms-2",
                                        children: "Address*"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                        type: "text",
                                        name: "address",
                                        placeholder: "Line 1",
                                        className: `form-control border-0 border-bottom ${touched.address && errors.address ? "is-invalid" : ""}`,
                                        value: formData.address1,
                                        onChange: (e)=>{
                                            setFormData({
                                                ...formData,
                                                address1: e.target.value
                                            });
                                            handleChange(e);
                                        }
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.ErrorMessage, {
                                        component: "div",
                                        name: "address",
                                        className: "invalid-feedback"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                        className: "form-control border-0 border-bottom my-2",
                                        type: "text",
                                        placeholder: "Line 2",
                                        value: formData.address2,
                                        onChange: (e)=>{
                                            setFormData({
                                                ...formData,
                                                address2: e.target.value
                                            });
                                            handleChange(e);
                                        }
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                        className: "form-control border-0 border-bottom",
                                        type: "text",
                                        placeholder: "Line 3",
                                        value: formData.address3,
                                        onChange: (e)=>{
                                            setFormData({
                                                ...formData,
                                                address3: e.target.value
                                            });
                                            handleChange(e);
                                        }
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "w-auto",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "mb-4 form-group",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                htmlFor: "pow",
                                                className: "text-primary fw-bold form-label ms-2",
                                                children: "Place of work*"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                                type: "text",
                                                name: "pow",
                                                placeholder: "Work name",
                                                className: `form-control border-0 border-bottom ${touched.pow && errors.pow ? "is-invalid" : ""}`,
                                                value: formData.workPlace,
                                                onChange: (e)=>{
                                                    setFormData({
                                                        ...formData,
                                                        workPlace: e.target.value
                                                    });
                                                    handleChange(e);
                                                }
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.ErrorMessage, {
                                                component: "div",
                                                name: "pow",
                                                className: "invalid-feedback"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "form-group",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                htmlFor: "district",
                                                className: "text-primary fw-bold form-label ms-2",
                                                children: "District"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                                type: "text",
                                                name: "district",
                                                placeholder: "District name",
                                                className: `form-control border-0 border-bottom ${touched.district && errors.district ? "is-invalid" : ""}`,
                                                value: formData.district,
                                                onChange: (e)=>{
                                                    setFormData({
                                                        ...formData,
                                                        district: e.target.value
                                                    });
                                                    handleChange(e);
                                                }
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.ErrorMessage, {
                                                component: "div",
                                                name: "district",
                                                className: "invalid-feedback"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
    });
};


/***/ }),

/***/ 6322:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Benefits)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var marked__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8974);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([marked__WEBPACK_IMPORTED_MODULE_2__]);
marked__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



function Benefits({ content: { frontmatter , sections  }  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "bg-light",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "container p-5 d-flex flex-column flex-lg-row justify-content-between w-100",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "me-lg-5 mb-4 mb-lg-0",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                            children: "What our membership offers"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            children: frontmatter.offer
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "benefits-class",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                            children: "Benefits"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "styled-bullets",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                dangerouslySetInnerHTML: {
                                    __html: (0,marked__WEBPACK_IMPORTED_MODULE_2__.marked)(sections[sections.findIndex((e)=>e.key === "benefits")].data)
                                }
                            })
                        })
                    ]
                })
            ]
        })
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2360:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Club)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2296);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5609);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_3__);




function Club({ formData , setFormData  }) {
    const ClubSchema = yup__WEBPACK_IMPORTED_MODULE_3__.object().shape({
        clubName: yup__WEBPACK_IMPORTED_MODULE_3__.string().matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi, "Club name can only contain letters.").required("Please enter your club name"),
        uniName: yup__WEBPACK_IMPORTED_MODULE_3__.string().matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi, "University name can only contain letters.").required("University is required"),
        contactName: yup__WEBPACK_IMPORTED_MODULE_3__.string().matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi, "Contact name can only contain letters.").required("Name is required"),
        contactRole: yup__WEBPACK_IMPORTED_MODULE_3__.string().matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi, "Contact role can only contain letters.").required("Role is required"),
        contactNo: yup__WEBPACK_IMPORTED_MODULE_3__.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "Invalid phone number"),
        contactEmail: yup__WEBPACK_IMPORTED_MODULE_3__.string().email("Invalid email address").required("Email is required"),
        supportName: yup__WEBPACK_IMPORTED_MODULE_3__.string().matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi, "Name can only contain letters.").required("Name is required")
    });
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Formik, {
        initialValues: {
            clubName: "",
            uniName: "",
            contactName: "",
            contactRole: "",
            contactNo: "",
            contactEmail: "",
            contactNo: "",
            supportName: ""
        },
        validationSchema: ClubSchema,
        children: ({ touched , errors , handleChange  })=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(formik__WEBPACK_IMPORTED_MODULE_2__.Form, {
                className: "px-3 px-md-0",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "my-4 my-lg-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "w-auto me-sm-5 mb-4 mb-sm-0 form-group",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        htmlFor: "clubName",
                                        className: "text-primary fw-bold form-label ms-2",
                                        children: "Student Club*"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                        type: "text",
                                        name: "clubName",
                                        placeholder: "Student club name",
                                        className: `form-control border-0 border-bottom ${touched.clubName && errors.clubName ? "is-invalid" : ""}`,
                                        value: formData.clubName,
                                        onChange: (e)=>{
                                            setFormData({
                                                ...formData,
                                                clubName: e.target.value
                                            });
                                            handleChange(e);
                                        }
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.ErrorMessage, {
                                        component: "div",
                                        name: "clubName",
                                        className: "invalid-feedback"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                        type: "text",
                                        name: "uniName",
                                        placeholder: "University name",
                                        className: `form-control border-0 border-bottom ${touched.uniName && errors.uniName ? "is-invalid" : ""}`,
                                        value: formData.uniName,
                                        onChange: (e)=>{
                                            setFormData({
                                                ...formData,
                                                uniName: e.target.value
                                            });
                                            handleChange(e);
                                        }
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.ErrorMessage, {
                                        component: "div",
                                        name: "uniName",
                                        className: "invalid-feedback"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "w-auto form-group",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "mb-4 form-group",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                            className: "text-primary fw-bold form-label ms-2",
                                            children: "Does Your Club Recieve External Support?"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "d-flex ms-3",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "form-check me-4",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                            id: "support-yes",
                                                            className: "form-check-input",
                                                            type: "radio",
                                                            onChange: ()=>setFormData({
                                                                    ...formData,
                                                                    externalSupport: "true"
                                                                })
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                            id: "support-yes",
                                                            className: "form-check-label ms-2",
                                                            children: "Yes"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "form-check",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                            id: "support-no",
                                                            className: "form-check-input",
                                                            type: "radio",
                                                            onChange: ()=>setFormData({
                                                                    ...formData,
                                                                    externalSupport: "false"
                                                                })
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                            id: "support-no",
                                                            className: "form-check-label ms-2 checked",
                                                            children: "No"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "my-4 my-lg-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "w-auto me-sm-5 mb-4 mb-sm-0 form-group",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        htmlFor: "contactName",
                                        className: "text-primary fw-bold form-label ms-2",
                                        children: "Contact Person*"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                        type: "text",
                                        name: "contactName",
                                        placeholder: "Name",
                                        className: `form-control border-0 border-bottom ${touched.contactName && errors.contactName ? "is-invalid" : ""}`,
                                        value: formData.contactName,
                                        onChange: (e)=>{
                                            setFormData({
                                                ...formData,
                                                contactName: e.target.value
                                            });
                                            handleChange(e);
                                        }
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.ErrorMessage, {
                                        component: "div",
                                        name: "contactName",
                                        className: "invalid-feedback"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                        type: "text",
                                        name: "contactRole",
                                        placeholder: "Role",
                                        className: `form-control border-0 border-bottom ${touched.contactRole && errors.contactRole ? "is-invalid" : ""}`,
                                        value: formData.contactRole,
                                        onChange: (e)=>{
                                            setFormData({
                                                ...formData,
                                                contactRole: e.target.value
                                            });
                                            handleChange(e);
                                        }
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.ErrorMessage, {
                                        component: "div",
                                        name: "contactRole",
                                        className: "invalid-feedback"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                        type: "tel",
                                        name: "contactNo",
                                        placeholder: "Cellphone number",
                                        className: `form-control border-0 border-bottom ${touched.contactNo && errors.contactNo ? "is-invalid" : ""}`,
                                        value: formData.contactNo,
                                        onChange: (e)=>{
                                            setFormData({
                                                ...formData,
                                                contactNo: e.target.value
                                            });
                                            handleChange(e);
                                        }
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.ErrorMessage, {
                                        component: "div",
                                        name: "contactNo",
                                        className: "invalid-feedback"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                        type: "text",
                                        name: "contactEmail",
                                        placeholder: "Email",
                                        className: `form-control border-0 border-bottom ${touched.contactEmail && errors.contactEmail ? "is-invalid" : ""}`,
                                        value: formData.contactEmail,
                                        onChange: (e)=>{
                                            setFormData({
                                                ...formData,
                                                contactEmail: e.target.value
                                            });
                                            handleChange(e);
                                        }
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.ErrorMessage, {
                                        component: "div",
                                        name: "contactEmail",
                                        className: "invalid-feedback"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "w-auto form-group",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        htmlFor: "supportName",
                                        className: "text-primary fw-bold form-label ms-2",
                                        children: "Person Giving Support*"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                        type: "text",
                                        name: "supportName",
                                        placeholder: "Name",
                                        className: `form-control border-0 border-bottom ${touched.supportName && errors.supportName ? "is-invalid" : ""}`,
                                        value: formData.supportName,
                                        onChange: (e)=>{
                                            setFormData({
                                                ...formData,
                                                supportName: e.target.value
                                            });
                                            handleChange(e);
                                        }
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.ErrorMessage, {
                                        component: "div",
                                        name: "supportName",
                                        className: "invalid-feedback"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
    });
};


/***/ }),

/***/ 2080:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ General)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2296);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5609);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_3__);




function General({ formData , setFormData , setFormSubmitErr  }) {
    const GeneralSchema = yup__WEBPACK_IMPORTED_MODULE_3__.object({
        fullName: yup__WEBPACK_IMPORTED_MODULE_3__.string().matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi, "Name can only contain letters.").matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, "Please enter your full name.").required("Please enter your full name"),
        email: yup__WEBPACK_IMPORTED_MODULE_3__.string().email("Invalid email address").required("Email is required"),
        password: yup__WEBPACK_IMPORTED_MODULE_3__.string().required("Password is required").min(5, "Password must be minimum 5 characters"),
        cellNo: yup__WEBPACK_IMPORTED_MODULE_3__.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "Invalid phone number").required("Cell no. is required"),
        workNo: yup__WEBPACK_IMPORTED_MODULE_3__.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "Invalid phone number")
    });
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Formik, {
        initialValues: {
            fullName: "",
            email: "",
            password: "",
            cellNo: "",
            workNo: ""
        },
        validationSchema: GeneralSchema,
        children: ({ touched , errors , handleChange  })=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(formik__WEBPACK_IMPORTED_MODULE_2__.Form, {
                className: "px-3 px-md-0",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "my-4 my-lg-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "w-auto me-sm-5 mb-4 mb-sm-0 form-group",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        htmlFor: "fullName",
                                        className: "text-primary fw-bold form-label ms-2",
                                        children: "Full Name*"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                        type: "text",
                                        name: "fullName",
                                        placeholder: "Name",
                                        className: `form-control border-0 border-bottom ${touched.fullName && errors.fullName ? "is-invalid" : ""}`,
                                        value: formData.fullName,
                                        onChange: (e)=>{
                                            setFormData({
                                                ...formData,
                                                fullName: e.target.value
                                            });
                                            handleChange(e);
                                        }
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.ErrorMessage, {
                                        component: "div",
                                        name: "fullName",
                                        className: "invalid-feedback"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "w-auto form-group",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        htmlFor: "email",
                                        className: "text-primary fw-bold form-label ms-2",
                                        children: "Email Address*"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                        type: "email",
                                        name: "email",
                                        placeholder: "Email",
                                        className: `form-control border-0 border-bottom ${touched.email && errors.email ? "is-invalid" : ""}`,
                                        value: formData.email,
                                        onChange: (e)=>{
                                            setFormData({
                                                ...formData,
                                                email: e.target.value
                                            });
                                            setFormSubmitErr("");
                                            handleChange(e);
                                        }
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.ErrorMessage, {
                                        component: "div",
                                        name: "email",
                                        className: "invalid-feedback"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "mb-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "w-auto me-sm-5 mb-4 mb-sm-0 form-group",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        htmlFor: "password",
                                        className: "text-primary fw-bold form-label ms-2",
                                        children: "Password*"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                        type: "password",
                                        name: "password",
                                        placeholder: "Password",
                                        className: `form-control border-0 border-bottom ${touched.password && errors.password ? "is-invalid" : ""}`,
                                        value: formData.password,
                                        onChange: (e)=>{
                                            setFormData({
                                                ...formData,
                                                password: e.target.value
                                            });
                                            handleChange(e);
                                        }
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.ErrorMessage, {
                                        component: "div",
                                        name: "password",
                                        className: "invalid-feedback"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "w-auto form-group",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        htmlFor: "reason",
                                        className: "text-primary fw-bold form-label ms-2",
                                        children: "Reason for sign up*"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                        id: "reason",
                                        className: "form-select border-0 border-bottom",
                                        "aria-label": "reason",
                                        value: formData.signUpReason,
                                        onChange: (e)=>setFormData({
                                                ...formData,
                                                signUpReason: e.target.value
                                            }),
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                value: "rural-work",
                                                children: "Rural work"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                value: "information",
                                                children: "RHC information"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                value: "onboarding",
                                                children: "Onboarding programme"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                value: "rhc",
                                                children: "Rural Health Club"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                value: "event",
                                                children: "Events"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "mb-5 w-100 d-flex flex-column flex-sm-row justify-content-center justify-content-md-between",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "w-auto me-sm-5 mb-4 mb-sm-0 form-group",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        htmlFor: "cellNo",
                                        className: "text-primary fw-bold form-label ms-2",
                                        children: "Cellphone number*"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                        type: "tel",
                                        name: "cellNo",
                                        placeholder: "Number",
                                        className: `form-control border-0 border-bottom ${touched.cellNo && errors.cellNo ? "is-invalid" : ""}`,
                                        value: formData.cellNo,
                                        onChange: (e)=>{
                                            setFormData({
                                                ...formData,
                                                cellNo: e.target.value
                                            });
                                            handleChange(e);
                                        }
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.ErrorMessage, {
                                        component: "div",
                                        name: "cellNo",
                                        className: "invalid-feedback"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "w-auto form-group",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        htmlFor: "workNo",
                                        className: "text-primary fw-bold form-label ms-2",
                                        children: "Work Telephone"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
                                        type: "tel",
                                        name: "workNo",
                                        placeholder: "Number",
                                        className: `form-control border-0 border-bottom ${touched.workNo && errors.workNo ? "is-invalid" : ""}`,
                                        value: formData.workNo,
                                        onChange: (e)=>{
                                            setFormData({
                                                ...formData,
                                                workNo: e.target.value
                                            });
                                            handleChange(e);
                                        }
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.ErrorMessage, {
                                        component: "div",
                                        name: "workNo",
                                        className: "invalid-feedback"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
    });
};


/***/ }),

/***/ 472:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ ProgressBar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function ProgressBar(props) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "w-75 ms-5",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "progress-bar",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "progress-loader",
                    style: {
                        width: props.step === 0 ? "0%" : props.step === 1 ? props.thirdStep ? "50%" : "100%" : "100%"
                    }
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "d-flex justify-content-between w-100 progress-offset",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "d-flex flex-column align-items-center",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "rounded-circle bg-primary progress-circle text-white fw-bold p-1",
                                children: "1"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("small", {
                                className: "text-primary",
                                children: "General"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "d-flex flex-column align-items-center",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "rounded-circle progress-circle text-white fw-bold p-1",
                                style: {
                                    background: props.step === 0 ? "#BEBEBE" : "var(--primary)"
                                },
                                children: "2"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("small", {
                                style: {
                                    color: props.step === 0 ? "#BEBEBE" : "var(--primary)"
                                },
                                children: "Address"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: `d-flex flex-column align-items-center ${props.thirdStep ? "" : "d-none"}`,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "rounded-circle progress-circle text-white fw-bold p-1",
                                style: {
                                    background: props.step === 2 ? "var(--primary)" : "#BEBEBE"
                                },
                                children: "3"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("small", {
                                style: {
                                    color: props.step === 2 ? "var(--primary)" : "#BEBEBE"
                                },
                                children: "Health Club"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};


/***/ }),

/***/ 3120:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SignUp),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7267);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _media_svg_login_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3456);
/* harmony import */ var _components_signup_login_General__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2080);
/* harmony import */ var _components_signup_login_Address__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3537);
/* harmony import */ var _components_signup_login_Club__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2360);
/* harmony import */ var _components_signup_login_ProgressBar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(472);
/* harmony import */ var _components_signup_login_Benefits__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6322);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var gray_matter__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(8076);
/* harmony import */ var gray_matter__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(gray_matter__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _api_useUser__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(9868);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_Layout__WEBPACK_IMPORTED_MODULE_2__, _components_signup_login_Benefits__WEBPACK_IMPORTED_MODULE_10__, _api_useUser__WEBPACK_IMPORTED_MODULE_14__]);
([_components_Layout__WEBPACK_IMPORTED_MODULE_2__, _components_signup_login_Benefits__WEBPACK_IMPORTED_MODULE_10__, _api_useUser__WEBPACK_IMPORTED_MODULE_14__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);















function SignUp({ data  }) {
    const { mutateUser  } = (0,_api_useUser__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z)({
        //Check if user is already logged in, if so redirect to profile page
        redirectTo: "/portal",
        redirectIfFound: true
    });
    // Object that stores information across all components/stages of the form
    const { 0: formData , 1: setFormData  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        fullName: "",
        email: "",
        password: "",
        signUpReason: "",
        cellNo: "",
        workNo: "",
        country: "",
        province: "",
        address1: "",
        address2: "",
        address3: "",
        workPlace: "",
        district: "",
        clubName: "",
        uniName: "",
        externalSupport: "",
        contactName: "",
        contactRole: "",
        contactNo: "",
        contactEmail: "",
        supportName: ""
    });
    //Get/update the main signup form error box for when something goes wrong while submitting
    const { 0: formSubmitErr , 1: setFormSubmitErr  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    // Called when form submitted to pass data to the sheets.js API
    const handleSignup = async (vals)=>{
        const payload = {
            type: "signup",
            data: vals
        };
        try {
            const response = await fetch("/api/sheets", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }).then((resp)=>resp.json());
            if (response.status == "error" && "code" in response) {
                switch(response.code){
                    case "emailTaken":
                    case "invalidSignup":
                        setFormSubmitErr(response.message);
                        break;
                    case "default":
                        setFormSubmitErr("Something went wrong while trying to sign up. Please try again later.");
                        break;
                }
            } else {
                const loginVals = {
                    email: vals.email,
                    password: vals.password
                };
                const response1 = await fetchJson("/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(loginVals)
                });
                if (response1.status == "failed" && "code" in response1) {
                    setFormSubmitErr("Something went wrong while trying to log into your new account.\n" + "Please login manually via the Learning Portal.");
                }
                mutateUser(response1);
            }
            console.log(response);
        } catch (error) {
            console.error("FATAL ERROR\n" + error);
        }
    };
    const { 0: step , 1: setStep  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const stepDisplay = ()=>{
        switch(step){
            case 0:
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_signup_login_General__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                    formData: formData,
                    setFormData: setFormData,
                    setFormSubmitErr: setFormSubmitErr
                });
            case 1:
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_signup_login_Address__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                    formData: formData,
                    setFormData: setFormData
                });
            case 2:
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_signup_login_Club__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                    formData: formData,
                    setFormData: setFormData
                });
        }
    };
    let submitShow = false;
    if (step == 2 || step == 1 && formData.signUpReason !== "rhc") submitShow = true;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
        pageTitle: "RuDASA | Sign up",
        hide: "true",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "py-5 mb-5 container"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "d-flex justify-content-center align-items-start mb-5 pb-5",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_3___default()), {
                            src: _media_svg_login_svg__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z,
                            className: "col-sm-12 col-md-12 col-lg-5 col-xl-5",
                            width: 600,
                            height: 600,
                            alt: "Illustration"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "col-sm-12 col-md-12 col-lg-5 col-xl-5 offset-md-1 offset-lg-1 d-flex flex-column align-items-center",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                    className: "fw-bold w-100 mb-5 text-center text-primary",
                                    children: "Sign Up"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_signup_login_ProgressBar__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                                    step: step,
                                    thirdStep: formData.signUpReason === "rhc"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "w-auto",
                                    children: stepDisplay()
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "w-100 d-flex justify-content-end align-items-center",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("small", {
                                            children: [
                                                "Have an account? ",
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {
                                                    href: "/login",
                                                    children: "Log in"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            className: "btn btn-lg btn-outline",
                                            disabled: step == 0,
                                            onClick: ()=>{
                                                setStep((currStep)=>currStep - 1);
                                            },
                                            children: "Back"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: `hover-button ${submitShow ? "d-none" : ""}`,
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                className: "btn btn-lg btn-secondary",
                                                disabled: step == 2,
                                                onClick: ()=>{
                                                    setStep((currStep)=>currStep + 1);
                                                },
                                                children: "Next"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: `hover-button ${submitShow ? "" : "d-none"}`,
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                className: "btn btn-lg btn-secondary",
                                                type: "submit",
                                                onClick: ()=>{
                                                    // alert("DEBUG OUTPUT:\n" + JSON.stringify(formData));
                                                    handleSignup(formData); //WHERE WE CONNECT TO SHEET.JS
                                                },
                                                children: "Sign up"
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: "d-flex justify-content-end invalid-feedback",
                                    children: formSubmitErr
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_signup_login_Benefits__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                    content: data.find((file)=>file.slug === "offers")
                })
            ]
        })
    });
};
async function getStaticProps() {
    // Get files from the other information sub-directory
    const files = fs__WEBPACK_IMPORTED_MODULE_11___default().readdirSync(path__WEBPACK_IMPORTED_MODULE_12___default().join("markdown/sign-up"));
    // Get slug and markdown from other information
    const data = files.map((filename)=>{
        const slug = filename.replace(".md", "");
        const markdown = fs__WEBPACK_IMPORTED_MODULE_11___default().readFileSync(path__WEBPACK_IMPORTED_MODULE_12___default().join("markdown/sign-up", filename), "utf-8");
        let { data: frontmatter , content , sections  } = gray_matter__WEBPACK_IMPORTED_MODULE_13___default()(markdown, {
            section: function(section, file) {
                section.content = section.content.trim() + "\n";
            }
        });
        if (sections === undefined) {
            sections = {};
        }
        return {
            slug,
            frontmatter,
            content,
            sections
        };
    });
    return {
        props: {
            data
        }
    };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7197:
/***/ ((module) => {

module.exports = require("@fortawesome/react-fontawesome");

/***/ }),

/***/ 2296:
/***/ ((module) => {

module.exports = require("formik");

/***/ }),

/***/ 8076:
/***/ ((module) => {

module.exports = require("gray-matter");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 1925:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 358:
/***/ ((module) => {

module.exports = require("react-bootstrap");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 5609:
/***/ ((module) => {

module.exports = require("yup");

/***/ }),

/***/ 303:
/***/ ((module) => {

module.exports = import("@fortawesome/free-brands-svg-icons");;

/***/ }),

/***/ 4563:
/***/ ((module) => {

module.exports = import("@fortawesome/free-solid-svg-icons");;

/***/ }),

/***/ 8974:
/***/ ((module) => {

module.exports = import("marked");;

/***/ }),

/***/ 5941:
/***/ ((module) => {

module.exports = import("swr");;

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [311,910,952,664,675,267,456], () => (__webpack_exec__(3120)));
module.exports = __webpack_exports__;

})();