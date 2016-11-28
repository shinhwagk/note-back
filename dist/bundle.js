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
	var note_textarea_number = 0;
	var labels_id;
	var category_id;
	function init_note_add() {
	    var id = note_textarea_number += 1;
	    var txt = "<textarea id=\"note_" + id + "\" rows=\"3\" cols=\"100\"></textarea>\n               <button id=\"note_delete_" + id + "\" onclick=\"nlib.delete_note_areatext('note_" + id + "','note_delete_" + id + "')\">del</button>";
	    var br = "<br>";
	    $("#note_area_texts").append(txt, br);
	}
	exports.init_note_add = init_note_add;
	function note_label_apply() {
	    var labelsStr = $("#note_label_apply_input").val();
	    var labelArr = labelsStr.split('-');
	    $.ajax({
	        type: "POST",
	        url: "/api/node/label",
	        contentType: "application/json; charset=utf-8",
	        data: JSON.stringify(labelArr),
	        dataType: "json",
	        success: function (message) {
	            labels_id = message;
	            $("#label_display").html(labels_id.toString());
	        },
	        error: function (message) {
	            alert("请求已提交！我们会尽快与您取得联2系");
	        }
	    });
	}
	exports.note_label_apply = note_label_apply;
	function note_category_apply() {
	    var category = $("#note_category_apply_input").val();
	    $.ajax({
	        type: "POST",
	        url: "/api/node/category",
	        contentType: "application/json; charset=utf-8",
	        data: JSON.stringify([category, labels_id]),
	        dataType: "json",
	        success: function (message) {
	            category_id = message;
	            $("#category_display").html(category_id.toString());
	        },
	        error: function (message) {
	            alert("请求已提交！我们会尽快与您取得联2系");
	        }
	    });
	}
	exports.note_category_apply = note_category_apply;
	function note_add() {
	    var data = [];
	    for (var i = 0; i <= note_textarea_number - 1; i += 1) {
	        data[i] = $("#note_" + (i + 1)).val();
	    }
	    $.ajax({
	        type: "POST",
	        url: "/api/node/node",
	        contentType: "application/json; charset=utf-8",
	        data: JSON.stringify({ c_id: category_id, data: data }),
	        success: function (message) { return alert(message); },
	        error: function (message) { return alert(message.error + "f"); }
	    });
	}
	exports.note_add = note_add;
	function delete_note_areatext(text_id, text_del_id) {
	    $("#" + text_id).remove();
	    $("#" + text_del_id).remove();
	}
	exports.delete_note_areatext = delete_note_areatext;


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = $;

/***/ }
/******/ ]);