# Notes

- Violentmonkey:
  - https://violentmonkey.github.io/
  - https://violentmonkey.github.io/guide/creating-a-userscript/
  - https://violentmonkey.github.io/api/metadata-block/
  - https://violentmonkey.github.io/api/gm/:
    - https://violentmonkey.github.io/api/gm/#gm_setclipboard
  - https://violentmonkey.github.io/api/matching/
  - https://violentmonkey.github.io/posts/features-in-userscript-generator/
  - [[Feature] Manifest V3 for Chrome](https://github.com/violentmonkey/violentmonkey/issues/1934) issue
- https://github.com/chocolateboy/userscripts:
  - https://github.com/chocolateboy/userscripts/blob/b0d3ec392b14cef34c5c9687a4753eaa4cd0213a/src/more-tomatoes.user.ts
- https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
- https://marketplace.visualstudio.com/items?itemName=andywang.vscode-scriptmonkey
- https://github.com/andywang425/vscode-scriptmonkey
- https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText:
  - https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText#exceptions
- https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout
- https://www.tampermonkey.net/documentation.php?locale=en#meta:author
- https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors
- https://violentmonkey.github.io/api/matching/#matching-spa-sites-like-fb-github-twitter-youtube:
  - https://github.com/violentmonkey/vm-url
  - "Userscript extensions use the native behavior of the browser - it runs scripts defined by extensions only during the standard "hard" navigation, not during "soft" navigation via history.pushState or replaceState or #hash changes used by many modern SPA sites."
  - `// @match *://www.youtube.com/*`
- https://github.com/fabiospampinato/cash: "An absurdly small jQuery alternative for modern browsers."
- https://github.com/hotwired/turbo
- https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
- https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword
- https://github.com/d3ward/scriptz

## Snippets

- https://violentmonkey.github.io/api/matching/#matching-spa-sites-like-fb-github-twitter-youtube

```js
onUrlChange();

if (self.navigation) {
  navigation.addEventListener("navigatesuccess", onUrlChange);
} else {
  let u = location.href;
  new MutationObserver(
    () => u !== (u = location.href) && onUrlChange()
  ).observe(document, { subtree: true, childList: true });
}

function onUrlChange() {
  if (!location.pathname.startsWith("/watch")) {
    // deactivate();
    return;
  }
  console.log("processing", location.href);
  // activate();
}
```
