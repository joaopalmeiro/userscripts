// ==UserScript==
// @name        pypiLinks
// @version     2026-03-23
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
    label: "PePy",
    icon: "fas fa-chart-line",
    url: `https://pepy.tech/projects/${packageName}`,
  },
  {
    label: "PyPack Trends",
    icon: "fas fa-chart-line",
    url: `https://pypacktrends.com/?packages=${packageName}&time_range=allTime`,
  },
  {
    label: "PyPI Stats",
    icon: "fas fa-chart-line",
    url: `https://pypistats.org/packages/${packageName}`,
  },
  {
    label: "Snyk",
    icon: "fas fa-shield-dog",
    url: `https://security.snyk.io/package/pip/${packageName}`,
  },
  {
    label: "Socket",
    icon: "fas fa-shield",
    url: `https://socket.dev/pypi/package/${packageName}`,
  },
];

for (const { label, icon, url } of links) {
  const extraEntry = document.createElement("li");
  const extraLink = document.createElement("a");

  extraLink.href = url;
  extraLink.target = "_blank";
  extraLink.className = "vertical-tabs__tab vertical-tabs__tab--with-icon vertical-tabs__tab--condensed";
  extraLink.innerHTML = `<i class="${icon}" aria-hidden="true"></i>${label}`;

  extraEntry.appendChild(extraLink);
  projectLinks.appendChild(extraEntry);
}
