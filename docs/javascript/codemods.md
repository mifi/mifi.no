---
tags: [scripts, typescript, eslint, coding]
---
# Codemods

## Fix `exactOptionalPropertyTypes` in a project

Use [jscodeshift](https://github.com/facebook/jscodeshift) to fix TS code:

```bash
mkdir codemod && cd codemod
yarn init -2
yarn add jscodeshift
```

Create a file:
```js
// exactOptionalPropertyTypes.js

module.exports = function(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  return root.find(j.TSPropertySignature, { optional: true }).forEach(({ node }) => {
    if (!j.TSUnionType.check(node.typeAnnotation.typeAnnotation) || !node.typeAnnotation.typeAnnotation.types.some(t => t.type === 'TSUndefinedKeyword')) {
      node.typeAnnotation.typeAnnotation = j.tsUnionType([
        node.typeAnnotation.typeAnnotation,
        j.tsUndefinedKeyword()
      ]);
    }
  })
  .toSource();
};

module.exports.parser = 'tsx';
```

```bash
npx jscodeshift -t exactOptionalPropertyTypes.js /path/to/src
```
