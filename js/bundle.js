(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const{log,logE,turnOffNonErrorLogs}=require("../node_modules/simple-log-kit/index");log("This is a normal log message");logE("This is an error log message");turnOffNonErrorLogs();log("? ");document.getElementById("note_button").onclick=function(){logE("tests")};function drawNote(){logE("testhvhgvhg")}function drawChord(){log("testhgbhgv 2")}function drawScale(){alert("TODO")}
},{"../node_modules/simple-log-kit/index":2}],2:[function(require,module,exports){
// Usage:

// in JS (ex main.js):
// const { log, logE, turnOffNonErrorLogs } = require("../node_modules/simple-log-kit/index")
// log("normal message");
// logE("error message");
// turnOffNonErrorLogs();

var LOG_NON_ERROR_MESSAGES = true;

exports.log = (msg) => {
	if (LOG_NON_ERROR_MESSAGES)
		console.log(msg);
};

exports.logE = (msg) => {
	console.log("%c ERROR: " + msg, "background: red; color: white; display: block;");
};

exports.turnOffNonErrorLogs = () => {
	LOG_NON_ERROR_MESSAGES = false
};
},{}]},{},[1]);
