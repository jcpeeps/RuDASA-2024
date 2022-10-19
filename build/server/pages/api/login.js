"use strict";
(() => {
var exports = {};
exports.id = 994;
exports.ids = [994];
exports.modules = {

/***/ 5506:
/***/ ((module) => {

module.exports = require("next-absolute-url");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = import("iron-session");;

/***/ }),

/***/ 4371:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "j": () => (/* binding */ withSessionRoute)
/* harmony export */ });
/* unused harmony export withSessionSsr */
/* harmony import */ var iron_session_next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8534);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([iron_session_next__WEBPACK_IMPORTED_MODULE_0__]);
iron_session_next__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
//This file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
//Used in user.js

const sessionOptions = {
    password: process.env.GLOBAL_SESSION_PASSWORD,
    cookieName: "rudasa-user-session",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        secure: "production" === "production"
    }
};
//Use when you want to fetch the session content from the client after a page load
function withSessionRoute(handler) {
    return (0,iron_session_next__WEBPACK_IMPORTED_MODULE_0__/* .withIronSessionApiRoute */ .n)(handler, sessionOptions);
}
//Use when you want to server-side render the session content
function withSessionSsr(handler) {
    return withIronSessionSsr(handler, sessionOptions);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7202:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_session__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4371);
/* harmony import */ var next_absolute_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5506);
/* harmony import */ var next_absolute_url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_absolute_url__WEBPACK_IMPORTED_MODULE_1__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_session__WEBPACK_IMPORTED_MODULE_0__]);
_lib_session__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


async function loginRoute(req, res) {
    const data = await req.body;
    //data: { email: "...", password: "..." }
    const { origin  } = next_absolute_url__WEBPACK_IMPORTED_MODULE_1___default()(req);
    //origin: "http://localhost:3000" OR "https://rudasa.org.za"
    console.log("GOT DATA IN LOGIN.JS:\n" + JSON.stringify(data));
    //===== PERFORM AUTHENTICATION VIA SHEETS.JS =====//
    const sheetsPayload = {
        type: "login",
        data: {
            //State all properties explicitly to prevent json injection attacks
            email: data.email,
            password: data.password
        }
    };
    console.log(origin);
    const resp = await fetch(`${origin}/api/sheets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sheetsPayload)
    }).then((resp)=>resp.json());
    console.log("RESPONSE FROM SHEETS.JS:");
    console.log(JSON.stringify(resp));
    //===== SAVE SESSION DATA IF VALID LOGIN =====//
    try {
        if (resp.status == "success" && resp.code == "loginSuccess") {
            //Update session
            const sessionUser = {
                status: "success",
                email: data.email,
                isLoggedIn: true
            };
            //Save user session
            req.session.user = sessionUser;
            await req.session.save();
            res.json(sessionUser); //IMPORTANT
        } else {
            res.json({
                status: "failed",
                isLoggedIn: false,
                code: resp.code,
                message: resp === null || resp === void 0 ? void 0 : resp.message
            });
        }
    } catch (error) {
        res.json({
            status: "failed",
            isLoggedIn: false,
            code: "sessionFail"
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_lib_session__WEBPACK_IMPORTED_MODULE_0__/* .withSessionRoute */ .j)(loginRoute));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [534], () => (__webpack_exec__(7202)));
module.exports = __webpack_exports__;

})();