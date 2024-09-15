// ==UserScript==
// @name        gitlabIssuesCopy
// @description Copy the GitLab issue number to close to the clipboard.
// @namespace   Violentmonkey Scripts
// @match       https://gitlab.com/joaommpalmeiro/*/-/issues
// @version     0.1.0
// @author      João Palmeiro
// @run-at      document-end
// ==/UserScript==

function callback(mutations, observer) {
  const issues = document.querySelector(".issues-list");

  if (issues) {
    console.log(issues.querySelectorAll(".issue-title-text"));

    observer.disconnect();
  }
}

const observer = new MutationObserver(callback);
observer.observe(document.body, { childList: true, subtree: true });
