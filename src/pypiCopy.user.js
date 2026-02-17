// ==UserScript==
// @name        pypiCopy
// @version     2026-02-17
// @description Copy the package name and version as a requirement to the clipboard.
// @author      João Palmeiro
// @homepageURL https://github.com/joaopalmeiro/userscripts
// @match       https://pypi.org/project/*
// @run-at      document-end
// @supportURL  https://github.com/joaopalmeiro/userscripts/issues
// ==/UserScript==

const packageTitle = document.querySelector("h1");
const packageRequirement = packageTitle.textContent.trim().split(" ").join("==");

packageTitle.style.display = "flex";
packageTitle.style.alignItems = "center";
packageTitle.style.gap = "1rem";

const copyButton = document.createElement("button");
copyButton.textContent = "Copy";
copyButton.style.all = "revert";
copyButton.style.cursor = "pointer";

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(packageRequirement);
    copyButton.textContent = "Copied!";

    setTimeout(() => {
      copyButton.textContent = "Copy";
    }, 2000);
  } catch (error) {
    console.error(error);
  }
});

packageTitle.appendChild(copyButton);
