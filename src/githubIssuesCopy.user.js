// ==UserScript==
// @name        githubIssuesCopy
// @description Copy the GitHub issue number to close to the clipboard.
// @namespace   Violentmonkey Scripts
// @match       https://github.com/joaopalmeiro/*/issues
// @version     0.1.0
// @author      João Palmeiro
// @run-at      document-end
// ==/UserScript==

function prepareIssueNumberToClose(id) {
  const issueNumber = Number.parseInt(id.match(/\d+/)[0]);
  return `Closes #${issueNumber}`;
}

const issues = document.querySelectorAll('[id^="issue_"][id$="_link"]');

for (const issue of issues) {
  const copyButton = document.createElement("button");
  copyButton.textContent = "Copy";
  copyButton.style.all = "revert";
  copyButton.style.cursor = "pointer";
  copyButton.style.marginLeft = "1rem";

  const issueNumberToClose = prepareIssueNumberToClose(issue.id);

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
