/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./lib/fetchJson.js":
/*!**************************!*\
  !*** ./lib/fetchJson.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FetchError\": () => (/* binding */ FetchError),\n/* harmony export */   \"default\": () => (/* binding */ fetchJson)\n/* harmony export */ });\nclass FetchError extends Error {\n    constructor(message, response, data){\n        this.name = \"FetchError\";\n        this.response = response;\n        this.data = data ?? {\n            message: message\n        };\n    }\n}\nasync function fetchJson(input, init) {\n    const response = await fetch(input, init);\n    // if the server replies, there's always some data in json\n    // if there's a network error, it will throw at the previous line\n    const data = await response.json(); //IMPORTANT\n    // response.ok is true when res.status is 2xx\n    // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok\n    if (response.ok) {\n        return data;\n    }\n    throw new FetchError({\n        message: response.statusText,\n        response,\n        data\n    });\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9saWIvZmV0Y2hKc29uLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQU8sTUFBTUEsVUFBVSxTQUFTQyxLQUFLO0lBQ2pDQyxZQUFZQyxPQUFPLEVBQUVDLFFBQVEsRUFBRUMsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQ0MsSUFBSSxHQUFHLFlBQVksQ0FBQztRQUN6QixJQUFJLENBQUNGLFFBQVEsR0FBR0EsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQ0MsSUFBSSxHQUFHQSxJQUFJLElBQUk7WUFBRUYsT0FBTyxFQUFFQSxPQUFPO1NBQUUsQ0FBQztLQUM1QztDQUNKO0FBRWMsZUFBZUksU0FBUyxDQUFFQyxLQUFLLEVBQUVDLElBQUksRUFDcEQ7SUFDRSxNQUFNTCxRQUFRLEdBQUcsTUFBTU0sS0FBSyxDQUFDRixLQUFLLEVBQUVDLElBQUksQ0FBQztJQUV6QywwREFBMEQ7SUFDMUQsaUVBQWlFO0lBRWpFLE1BQU1KLElBQUksR0FBRyxNQUFNRCxRQUFRLENBQUNPLElBQUksRUFBRSxFQUFFLFdBQVc7SUFFL0MsNkNBQTZDO0lBQzdDLCtEQUErRDtJQUMvRCxJQUFJUCxRQUFRLENBQUNRLEVBQUUsRUFBRTtRQUNmLE9BQU9QLElBQUksQ0FBQztLQUNiO0lBRUQsTUFBTSxJQUFJTCxVQUFVLENBQUM7UUFDbkJHLE9BQU8sRUFBRUMsUUFBUSxDQUFDUyxVQUFVO1FBQzVCVCxRQUFRO1FBQ1JDLElBQUk7S0FDTCxDQUFDLENBQUM7Q0FDSiIsInNvdXJjZXMiOlsid2VicGFjazovL3J1ZGFzYS13ZWJzaXRlLy4vbGliL2ZldGNoSnNvbi5qcz8xODQ2Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBGZXRjaEVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgcmVzcG9uc2UsIGRhdGEpe1xyXG4gICAgICAgIHRoaXMubmFtZSA9IFwiRmV0Y2hFcnJvclwiO1xyXG4gICAgICAgIHRoaXMucmVzcG9uc2UgPSByZXNwb25zZTtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhID8/IHsgbWVzc2FnZTogbWVzc2FnZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBmZXRjaEpzb24oIGlucHV0LCBpbml0KVxyXG57XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChpbnB1dCwgaW5pdCk7XHJcblxyXG4gIC8vIGlmIHRoZSBzZXJ2ZXIgcmVwbGllcywgdGhlcmUncyBhbHdheXMgc29tZSBkYXRhIGluIGpzb25cclxuICAvLyBpZiB0aGVyZSdzIGEgbmV0d29yayBlcnJvciwgaXQgd2lsbCB0aHJvdyBhdCB0aGUgcHJldmlvdXMgbGluZVxyXG5cclxuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpOyAvL0lNUE9SVEFOVFxyXG5cclxuICAvLyByZXNwb25zZS5vayBpcyB0cnVlIHdoZW4gcmVzLnN0YXR1cyBpcyAyeHhcclxuICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvUmVzcG9uc2Uvb2tcclxuICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH1cclxuXHJcbiAgdGhyb3cgbmV3IEZldGNoRXJyb3Ioe1xyXG4gICAgbWVzc2FnZTogcmVzcG9uc2Uuc3RhdHVzVGV4dCxcclxuICAgIHJlc3BvbnNlLFxyXG4gICAgZGF0YSxcclxuICB9KTtcclxufSJdLCJuYW1lcyI6WyJGZXRjaEVycm9yIiwiRXJyb3IiLCJjb25zdHJ1Y3RvciIsIm1lc3NhZ2UiLCJyZXNwb25zZSIsImRhdGEiLCJuYW1lIiwiZmV0Y2hKc29uIiwiaW5wdXQiLCJpbml0IiwiZmV0Y2giLCJqc29uIiwib2siLCJzdGF0dXNUZXh0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./lib/fetchJson.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_bootstrap_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/bootstrap.css */ \"./styles/bootstrap.css\");\n/* harmony import */ var _styles_bootstrap_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_bootstrap_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! swr */ \"swr\");\n/* harmony import */ var _lib_fetchJson__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/fetchJson */ \"./lib/fetchJson.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr__WEBPACK_IMPORTED_MODULE_3__]);\nswr__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n\nfunction MyApp({ Component , pageProps  }) {\n    return(//This SWRConfig wrapper is super important for static generation\n    //and fetching via swr on each page load\n    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(swr__WEBPACK_IMPORTED_MODULE_3__.SWRConfig, {\n        value: {\n            fetcher: _lib_fetchJson__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n            onError: (err)=>{\n                console.error(err);\n            }\n        },\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\Rec1dite\\\\Desktop\\\\RUDASA\\\\rudasa\\\\pages\\\\_app.js\",\n            lineNumber: 18,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Rec1dite\\\\Desktop\\\\RUDASA\\\\rudasa\\\\pages\\\\_app.js\",\n        lineNumber: 10,\n        columnNumber: 5\n    }, this));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQThCO0FBQ0U7QUFDRDtBQUNTO0FBRXhDLFNBQVNFLEtBQUssQ0FBQyxFQUFFQyxTQUFTLEdBQUVDLFNBQVMsR0FBRSxFQUFFO0lBQ3ZDLE9BQ0UsaUVBQWlFO0lBQ2pFLHdDQUF3QztrQkFDeEMsOERBQUNKLDBDQUFTO1FBQ1JLLEtBQUssRUFBRTtZQUNMQyxPQUFPLEVBQUVMLHNEQUFTO1lBQ2xCTSxPQUFPLEVBQUUsQ0FBQ0MsR0FBRyxHQUFLO2dCQUNoQkMsT0FBTyxDQUFDQyxLQUFLLENBQUNGLEdBQUcsQ0FBQzthQUNuQjtTQUNGO2tCQUVELDRFQUFDTCxTQUFTO1lBQUUsR0FBR0MsU0FBUzs7Ozs7Z0JBQUk7Ozs7O1lBQ2xCLEVBQ2I7Q0FDRjtBQUVELGlFQUFlRixLQUFLLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ydWRhc2Etd2Vic2l0ZS8uL3BhZ2VzL19hcHAuanM/ZTBhZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLmNzcydcclxuaW1wb3J0ICcuLi9zdHlsZXMvYm9vdHN0cmFwLmNzcydcclxuaW1wb3J0IHsgU1dSQ29uZmlnIH0gZnJvbSAnc3dyJ1xyXG5pbXBvcnQgZmV0Y2hKc29uIGZyb20gJy4uL2xpYi9mZXRjaEpzb24nXHJcblxyXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgLy9UaGlzIFNXUkNvbmZpZyB3cmFwcGVyIGlzIHN1cGVyIGltcG9ydGFudCBmb3Igc3RhdGljIGdlbmVyYXRpb25cclxuICAgIC8vYW5kIGZldGNoaW5nIHZpYSBzd3Igb24gZWFjaCBwYWdlIGxvYWRcclxuICAgIDxTV1JDb25maWdcclxuICAgICAgdmFsdWU9e3tcclxuICAgICAgICBmZXRjaGVyOiBmZXRjaEpzb24sXHJcbiAgICAgICAgb25FcnJvcjogKGVycikgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpXHJcbiAgICAgICAgfVxyXG4gICAgICB9fVxyXG4gICAgPlxyXG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XHJcbiAgICA8L1NXUkNvbmZpZz5cclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE15QXBwOyJdLCJuYW1lcyI6WyJTV1JDb25maWciLCJmZXRjaEpzb24iLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsInZhbHVlIiwiZmV0Y2hlciIsIm9uRXJyb3IiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./styles/bootstrap.css":
/*!******************************!*\
  !*** ./styles/bootstrap.css ***!
  \******************************/
/***/ (() => {



/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "swr":
/*!**********************!*\
  !*** external "swr" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = import("swr");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.js"));
module.exports = __webpack_exports__;

})();