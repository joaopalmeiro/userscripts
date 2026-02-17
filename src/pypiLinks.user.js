// ==UserScript==
// @name        pypiLinks
// @version     2026-02-17
// @description Supplement packages with extra links for more information.
// @author      João Palmeiro
// @homepageURL https://github.com/joaopalmeiro/userscripts
// @match       https://pypi.org/project/*
// @run-at      document-end
// @supportURL  https://github.com/joaopalmeiro/userscripts/issues
// ==/UserScript==

const packageTitle = document.querySelector("h1");
const packageName = packageTitle.textContent.trim().split(" ")[0];

const section = document.querySelector("div.sidebar-section.unverified");
let projectLinks = section.querySelector("ul.vertical-tabs__list");

if (!projectLinks) {
  const heading = document.createElement("h6");
  heading.textContent = "Project links";

  projectLinks = document.createElement("ul");
  projectLinks.className = "vertical-tabs__list";

  section.appendChild(heading);
  section.appendChild(projectLinks);
}

const links = [
  {
    label: "Snyk",
    icon: "fas fa-shield-dog",
    url: `https://security.snyk.io/package/pip/${packageName}`,
  },
  {
    label: "PyPack Trends",
    icon: "fas fa-chart-line",
    url: `https://pypacktrends.com/?packages=${packageName}&time_range=allTime`,
  },
];

for (const { label, icon, url } of links) {
  const snykEntry = document.createElement("li");
  const snykLink = document.createElement("a");

  snykLink.href = url;
  snykLink.target = "_blank";
  snykLink.className = "vertical-tabs__tab vertical-tabs__tab--with-icon vertical-tabs__tab--condensed";
  snykLink.innerHTML = `<i class="${icon}" aria-hidden="true"></i>${label}`;

  snykEntry.appendChild(snykLink);
  projectLinks.appendChild(snykEntry);
}
