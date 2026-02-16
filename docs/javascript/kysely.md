---
tags: [typescript, scripts, coding]
---
# Kysely

[Kysely](https://kysely.dev/) is a TypeScript SQL query builder that infers query result types based on the query and the database schema types.

## Shortcomings

When using `jsonArrayFrom`/`jsonObjectFrom`, it is very hard to infer which types the database server will use when JSONifying the rows. This means that the TypeScript implementation for these function is really hard to get right. See [#1680](https://github.com/kysely-org/kysely/issues/1680) and [#1412](https://github.com/kysely-org/kysely/issues/1412). The database server's runtime JSON-ify process is not always desired behavior either. For example if a column is stored in `DECIMAL`, (e.g. monetary values which need to be accurate), MySQL ([mysql2](https://www.npmjs.com/package/mysql2)) will return these as strings for accuracy, however MySQL's `json_object` (used by `jsonObjectFrom`) will convert them to floating point `number`, which can cause loss of precision and rounding errors. We Therefore I recommend to **always cast such columns as string** when selecting, e.g.:
```ts
.selectFrom('table').select(({ cast }) => [
  cast<string>('price', 'char').as('price')
])
```
This will make sure that the returned value is always `string` (in TypeScript and at runtime) when selected, but you can still store the value as a DECIMAL, to have the benefits of this column type.
