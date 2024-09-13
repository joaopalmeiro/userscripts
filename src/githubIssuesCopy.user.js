// ==UserScript==
// @name        githubIssuesCopy
// @description Copy the GitHub issue number to close to the clipboard.
// @namespace   Violentmonkey Scripts
// @match       https://github.com/joaopalmeiro/*/issues
// @version     0.1.0
// @author      João Palmeiro
// @run-at      document-end
// ==/UserScript==

const issues = document.querySelectorAll('[id^="issue_"][id$="_link"]');

console.log(issues);
