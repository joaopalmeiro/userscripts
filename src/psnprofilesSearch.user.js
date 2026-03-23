// ==UserScript==
// @name        psnprofilesSearch
// @version     2026-02-24
// @description Search for a game on PlayStation Store.
// @author      João Palmeiro
// @homepageURL https://github.com/joaopalmeiro/userscripts
// @match       https://psnprofiles.com/guide/*
// @match       https://psnprofiles.com/guides/*
// @match       https://psnprofiles.com/trophies/*
// @exclude     https://psnprofiles.com/guides/
// @run-at      document-end
// @supportURL  https://github.com/joaopalmeiro/userscripts/issues
// ==/UserScript==

const BASE_URL = "https://store.playstation.com/pt-pt/search/";

const section = document.querySelector("div.title-bar");

const gameAnchor = section.querySelector('h3 > a[href^="/guides/"]:not([href="/guides"])');
const gameName = gameAnchor ? gameAnchor.textContent.trim() : section.querySelector("h3").lastChild.textContent.trim();

const storeLink = document.createElement("a");
storeLink.textContent = "Search on PS Store";
storeLink.href = `${BASE_URL}${encodeURIComponent(gameName)}`;

section.insertBefore(storeLink, section.children[1]);
