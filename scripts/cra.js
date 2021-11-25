const path = require("path");
const fs = require("fs-extra");

const maps = {
  "src/components": "src/components",
  "src/locale": "src/locale",
  "src/mock": "src/mock",
  "src/pages": {
    dest: "src/pages",
    filter: (src) => {
      const ignores = [
        path.resolve(
          __dirname,
          "../packages/arco-design-pro-next/src/pages/index.tsx"
        ),
        path.resolve(
          __dirname,
          "../packages/arco-design-pro-next/src/pages/_app.tsx"
        ),
        path.resolve(
          __dirname,
          "../packages/arco-design-pro-next/src/pages/layout.tsx"
        ),
      ];
      return ignores.indexOf(src) === -1;
    },
  },
  "src/public/assets": "src/assets",
  "src/store": "src/store",
  "src/style": "src/style",
  "src/utils": "src/utils",
  "src/settings.json": "src/settings.json",
  "src/routes.ts": "src/routes.ts",
  "src/declaration.d.ts": "src/declaration.d.ts",
  "src/context.ts": "src/context.ts",
  ".eslintrc": ".eslintrc",
  ".eslintignore": ".eslintignore",
  ".stylelintrc": ".stylelintrc",
  ".stylelintignore": ".stylelintignore",
  ".prettierrc": ".prettierrc",
  ".gitignore": ".gitignore",
};

fs.copySync(
  path.resolve(__dirname, "../packages/arco-design-pro-cra"),
  path.resolve(__dirname, "../arco-design-pro-cra"),
  {
    filter: (src) => {
      const ignores = [
        path.resolve(__dirname, "../packages/arco-design-pro-cra/yarn.lock"),
      ];
      return ignores.indexOf(src) === -1 && src.indexOf("node_modules") === -1;
    },
  }
);

Object.keys(maps).forEach((src) => {
  if (typeof maps[src] === "string") {
    fs.copySync(
      path.resolve(__dirname, "../packages/arco-design-pro-next", src),
      path.resolve(__dirname, "../arco-design-pro-cra", maps[src])
    );
  }
  if (typeof maps[src] === "object") {
    fs.copySync(
      path.resolve(__dirname, "../packages/arco-design-pro-next", src),
      path.resolve(__dirname, "../arco-design-pro-cra", maps[src].dest),
      { filter: maps[src].filter }
    );
  }
});