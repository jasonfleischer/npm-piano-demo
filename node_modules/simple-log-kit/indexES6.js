// Usage:

// in JS (ex main.js):
// import {log, logE, turnOffNonErrorLogs} from "../node_modules/simple-log-kit/indexES6.js";
// log("normal message");
// logE("error message");
// turnOffNonErrorLogs();

// in HTML: add type module
// <script type="module" src="js/main.js"></script>-->

var LOG_NON_ERROR_MESSAGES = true;

export const log = (msg) => {
	if (LOG_NON_ERROR_MESSAGES)
		console.log(msg);
};
export const logE = (msg) => {
	console.log("%c ERROR: " + msg, "background: red; color: white; display: block;");
};
export const turnOffNonErrorLogs = () => {
	LOG_NON_ERROR_MESSAGES = false
};
