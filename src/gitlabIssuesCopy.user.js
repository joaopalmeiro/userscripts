// ==UserScript==
// @name        gitlabIssuesCopy
// @description Copy the GitLab issue number to close to the clipboard.
// @namespace   Violentmonkey Scripts
// @match       https://gitlab.com/joaommpalmeiro/*/-/issues
// @version     0.1.0
// @author      João Palmeiro
// @run-at      document-end
// ==/UserScript==

function prepareIssueNumberToClose(href) {
  const issueNumber = Number.parseInt(href.substring(href.lastIndexOf("/") + 1));
  return `Closes #${issueNumber}`;
}

function callback(_mutations, observer) {
  const issueList = document.querySelector(".issues-list");

  if (issueList) {
    const issues = issueList.querySelectorAll(".issue-title-text");

    for (const issue of issues) {
      const copyButton = document.createElement("button");
      copyButton.textContent = "Copy";
      copyButton.style.all = "revert";
      copyButton.style.cursor = "pointer";
      copyButton.style.marginLeft = "1rem";

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

    observer.disconnect();
  }
}

const observer = new MutationObserver(callback);
observer.observe(document.body, { childList: true, subtree: true });
