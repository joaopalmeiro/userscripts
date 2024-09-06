// ==UserScript==
// @name      pypi-copy
// @namespace Violentmonkey Scripts
// @match     https://pypi.org/project/*
// @version   0.1.0
// @author    João Palmeiro
// @run-at    document-end
// ==/UserScript==

const packageTitle = document.querySelector("h1");
const packageRequirement = packageTitle.textContent
  .trim()
  .split(" ")
  .join("==");

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
