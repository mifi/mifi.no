# JavaScript

## Eslint

I have my own eslint config [eslint-config-mifi](https://github.com/mifi/eslint-config-mifi) that I use on most of my projects.

Cool plugins/rules to consider:
- [eslint-plugin-depend](https://github.com/es-tooling/eslint-plugin-depend)
- [eslint-plugin-you-dont-need-lodash-underscore](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore)

## Codemods

### Fix `exactOptionalPropertyTypes` in a project

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