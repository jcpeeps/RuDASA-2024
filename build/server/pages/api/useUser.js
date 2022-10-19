"use strict";
(() => {
var exports = {};
exports.id = 955;
exports.ids = [955];
exports.modules = {

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 5941:
/***/ ((module) => {

module.exports = import("swr");;

/***/ }),

/***/ 1323:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useUser)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5941);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr__WEBPACK_IMPORTED_MODULE_2__]);
swr__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



function useUser({ redirectTo ="" , redirectIfFound =false  } = {}) {
    const { data: user , mutate: mutateUser  } = (0,swr__WEBPACK_IMPORTED_MODULE_2__["default"])("/api/user");
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        //Redirect not required or no user data available yet
        if (!redirectTo || !user) return;
        if (redirectTo && !redirectIfFound && !(user === null || user === void 0 ? void 0 : user.isLoggedIn) || redirectIfFound && (user === null || user === void 0 //redirectIfFound is also set, redirect if user found
         ? void 0 : user.isLoggedIn)) {
            next_router__WEBPACK_IMPORTED_MODULE_1___default().push(redirectTo);
        } //Redirect
    }, [
        user,
        redirectIfFound,
        redirectTo
    ]);
    return {
        user,
        mutateUser
    };
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(1323));
module.exports = __webpack_exports__;

})();