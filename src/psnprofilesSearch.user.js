// ==UserScript==
// @name        psnprofilesSearch
// @version     2026-02-24
// @description Search for a game on PlayStation Store.
// @author      João Palmeiro
// @homepageURL https://github.com/joaopalmeiro/userscripts
// @match       https://psnprofiles.com/trophies/*
// @run-at      document-end
// @supportURL  https://github.com/joaopalmeiro/userscripts/issues
// ==/UserScript==

const BASE_URL = "https://store.playstation.com/pt-pt/search/";

const gameTitle = document.querySelector("h3");
const gameName = gameTitle.lastChild.textContent.trim();

const section = document.querySelector("div.title-bar");

const storeLink = document.createElement("a");
storeLink.textContent = "Search on PS Store";
storeLink.href = `${BASE_URL}${encodeURIComponent(gameName)}`;

section.insertBefore(storeLink, section.children[1]);
