# Lessonfactory

Led the design and development of Lesson Factory: a custom lesson management system for creating, deploying and delivering training content. Coordinated planning, design and development while contributing across Angular interfaces, Node/Express APIs and data integration.

[Live demo](https://alertdriving.vercel.app/)

## Local development

Run these commands from the repository root:

```sh
npm install
npm start
```

Available scripts:

- `npm run build`: `NODE_OPTIONS=--openssl-legacy-provider ng build`.
- `npm run test`: `ng test`.
- `npm run lint`: `ng lint`.

## Public demo

The Vercel deployment opens the bundled `?local=demo` sample by default. It contains three text-only lesson pages. Original lesson media and backend services are not included in this demo. The legacy Angular build uses Node 22, Dart Sass through the existing loader and the OpenSSL compatibility option in the build script.
