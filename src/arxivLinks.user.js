// ==UserScript==
// @name        arxivLinks
// @version     2026-03-23
// @description Replace "this https URL" with the actual URL and supplement papers with extra links.
// @author      João Palmeiro
// @homepageURL https://github.com/joaopalmeiro/userscripts
// @match       https://arxiv.org/abs/*
// @run-at      document-end
// @supportURL  https://github.com/joaopalmeiro/userscripts/issues
// ==/UserScript==

document.querySelectorAll("a.link-external.link-https").forEach((a) => {
  if (a.textContent.trim() === "this https URL") {
    a.textContent = a.href;
  }
});

const paperId = document.querySelector("span.arxivid > a").textContent.split(":")[1];

const accessPaperLinks = document.querySelector("div.extra-services > div.full-text > ul");

const links = [
  {
    label: "alphaXiv",
    url: `https://www.alphaxiv.org/abs/${paperId}`,
  },
];

for (const { label, url } of links) {
  const extraEntry = document.createElement("li");
  const extraLink = document.createElement("a");

  extraLink.href = url;
  extraLink.target = "_blank";
  extraLink.textContent = label;

  extraEntry.appendChild(extraLink);
  accessPaperLinks.appendChild(extraEntry);
}
