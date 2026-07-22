# Netlify dependency-install fix

This package fixes the failed deploy visible in the Netlify log:

- the previous `package-lock.json` contained 137 tarball URLs pointing to an internal OpenAI build mirror;
- Netlify cannot fetch that private registry;
- all lockfile URLs now point to `https://registry.npmjs.org/`;
- `.npmrc` explicitly selects the public npm registry;
- the custom `.next` publish directory was removed so Netlify can use its automatic OpenNext adapter.

## Netlify settings

- Build command: `npm run build`
- Publish directory: leave blank / automatic
- Node.js: 22
- Deploy with **Clear cache and deploy site**

Do not reuse the previous v2 archive.
