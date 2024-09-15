// ==UserScript==
// @name        codebergIssuesCopy
// @description Copy the Codeberg issue number to close to the clipboard.
// @namespace   Violentmonkey Scripts
// @match       https://codeberg.org/joaopalmeiro/*/issues
// @version     0.1.0
// @author      João Palmeiro
// @run-at      document-end
// ==/UserScript==

function prepareIssueNumberToClose(href) {
  const issueNumber = Number.parseInt(href.substring(href.lastIndexOf("/") + 1));
  return `Closes #${issueNumber}`;
}

const issues = document.querySelectorAll(".issue-title");

for (const issue of issues) {
  const copyButton = document.createElement("button");
  copyButton.textContent = "Copy";
  copyButton.style.cursor = "pointer";
  copyButton.style.all = "revert";
  issue.parentElement.style.gap = "1rem";

  const issueNumberToClose = prepareIssueNumberToClose(issue.href);

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(issueNumberToClose);
      copyButton.textContent = "Copied!";

      setTimeout(() => {
        copyButton.textContent = "Copy";
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  });

  issue.insertAdjacentElement("afterend", copyButton);
}
