// ==UserScript==
// @name        githubIssuesCopy
// @description Copy the issue number to close from the Issues page of a GitHub repo.
// @namespace   Violentmonkey Scripts
// @match       https://github.com/*
// @version     0.2.1
// @author      João Palmeiro
// @run-at      document-end
// ==/UserScript==

function prepareIssueNumberToClose(id) {
  const issueNumber = Number.parseInt(id.match(/\d+/)[0]);
  return `Closes #${issueNumber}`;
}

function onUrlChange() {
  if (!(location.pathname.startsWith("/joaopalmeiro") && location.pathname.endsWith("/issues"))) {
    return;
  }

  const issues = document.querySelectorAll('[id^="issue_"][id$="_link"]:not(:has(+ button))');

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
}

navigation.addEventListener("navigatesuccess", onUrlChange);
