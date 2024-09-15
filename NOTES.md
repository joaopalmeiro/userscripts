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
- https://flaviocopes.com/how-to-get-last-item-path-javascript/
- https://github.com/violentmonkey/vm-dom
- https://developer.mozilla.org/en-US/docs/Web/API/Element/classList

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

- https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement#using_parentelement

```js
if (node.parentElement) {
  node.parentElement.style.color = "red";
}
```

### GitLab

```xml
<svg data-testid="issue-type-issue-icon" role="img" aria-hidden="true" class="gl-icon s16 gl-fill-current gl-text-secondary" title="Issue"></svg>
```

- https://github.com/violentmonkey/vm-dom/blob/v2.1.7/src/index.ts#L50-L88
- https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
- https://violentmonkey.github.io/guide/observing-dom/:
  - "It is a common case to operate on elements that are created dynamically, which may not be ready even on `document-end`."
  - "A better way to do stuff when certain element is ready is to use `MutationObserver`"
  - "To observe `document.body` we must make sure `document.body` exists. This should not be a problem if `@run-at` is omitted or set to a value other than `document-start`."
- https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/MutationObserver#observing_child_elements
- https://developer.mozilla.org/en-US/docs/Web/API/Element/children

````js
/**
 * Observe an existing `node` until `callback` returns `true`.
 * The returned function can be called explicitly to disconnect the observer.
 *
 * ```js
 * VM.observe(document.body, () => {
 *   const node = document.querySelector('.profile');
 *   if (node) {
 *     console.log('It\'s there!');
 *     return true;
 *   }
 * });
 * ```
 */
export function observe(
  node: Node,
  callback: (
    mutations: MutationRecord[],
    observer: MutationObserver
  ) => boolean | void,
  options?: MutationObserverInit
): () => void {
  const observer = new MutationObserver((mutations, ob) => {
    const result = callback(mutations, ob);
    if (result) disconnect();
  });
  observer.observe(
    node,
    Object.assign(
      {
        childList: true,
        subtree: true,
      },
      options
    )
  );
  const disconnect = () => observer.disconnect();
  return disconnect;
}
````

```js
function logChanges(records, observer) {
  for (const record of records) {
    for (const addedNode of record.addedNodes) {
      log.textContent = `Added: ${addedNode.textContent}\n${log.textContent}`;
    }
    for (const removedNode of record.removedNodes) {
      log.textContent = `Removed: ${removedNode.textContent}\n${log.textContent}`;
    }
    if (record.target.childNodes.length === 0) {
      log.textContent = `Disconnected\n${log.textContent}`;
      observer.disconnect();
    }
    console.log(record.target.childNodes.length);
  }
}

const observerOptions = {
  childList: true,
  subtree: true,
};

const observer = new MutationObserver(logChanges);
observer.observe(container, observerOptions);
```
