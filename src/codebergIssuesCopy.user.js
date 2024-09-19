// ==UserScript==
// @name        codebergIssuesCopy
// @description Copy the issue number to close from the Issues page of a Codeberg repo.
// @namespace   Violentmonkey Scripts
// @match       https://codeberg.org/joaopalmeiro/*/issues
// @version     0.1.1
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
  copyButton.style.all = "revert";
  copyButton.style.cursor = "pointer";
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
