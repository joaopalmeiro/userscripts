// ==UserScript==
// @name        gitlabIssuesCopy
// @description Copy the GitLab issue number to close to the clipboard.
// @namespace   Violentmonkey Scripts
// @match       https://gitlab.com/joaommpalmeiro/*/-/issues
// @version     0.1.0
// @author      João Palmeiro
// @run-at      document-end
// ==/UserScript==

console.log(document.querySelector(".issues-list"));
