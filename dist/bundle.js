var nlib =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var $ = __webpack_require__(1);
	var note_id = 0;
	function init_note_add() {
	    var txt = "<textarea id=\"note_" + (note_id += 1) + "\"></textarea>";
	    var br = "<br>";
	    $("#note_area_texts").append(txt, br);
	}
	exports.init_note_add = init_note_add;
	function note_add() {
	    var data = [];
	    for (var i = 0; i <= note_id - 1; i += 1) {
	        data[i] = $("#note_" + (i + 1)).val();
	    }
	    // $.post({
	    //     url: "/api/node", data: JSON.stringify(data), success: function () {
	    //         $(this).addClass("done");
	    //     }
	    // });
	    $.ajax({
	        type: "POST",
	        url: "/api/node",
	        contentType: "application/json; charset=utf-8",
	        data: JSON.stringify(data),
	        dataType: "json",
	        success: function (message) {
	            alert("请求已提交！我们会尽快与您取得联系");
	        },
	        error: function (message) {
	            alert("请求已提交！我们会尽快与您取得联2系");
	        }
	    });
	}
	exports.note_add = note_add;


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = $;

/***/ }
/******/ ]);