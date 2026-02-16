// ==UserScript==
// @name        githubIssueCopy
// @description Copy the issue number to close from the issue's page in a GitHub repo.
// @namespace   Violentmonkey Scripts
// @match       https://github.com/*
// @version     0.1.0
// @author      João Palmeiro
// @run-at      document-end
// ==/UserScript==

function prepareIssueNumberToClose() {
  const issueNumber = Number.parseInt(location.pathname.match(/\d+/)[0]);
  return `Closes #${issueNumber}`;
}

function onUrlChange() {
  if (
    !(location.pathname.startsWith("/joaopalmeiro") && /\/issues\/\d+$/.test(location.pathname))
  ) {
    return;
  }

  const issue = document.querySelector(".gh-header-meta:not(:has(button))");

  if (issue) {
    const issueNumberToClose = prepareIssueNumberToClose();

    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy";
    copyButton.style.all = "revert";
    copyButton.style.cursor = "pointer";
    copyButton.className = "mb-2 mr-2";

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

    issue.insertBefore(copyButton, issue.firstChild);
  }
}

navigation.addEventListener("navigatesuccess", onUrlChange);
