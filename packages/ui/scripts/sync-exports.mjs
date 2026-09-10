import { globSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, extname } from 'node:path';

const NESTED_ENTRIES = {
  'src/preset/index.ts': { name: 'preset', dist: 'preset/index' },
  'src/link-next.ts': { name: 'link/next', dist: 'link/next' },
};

const files = [...globSync('src/*.{ts,tsx}'), ...Object.keys(NESTED_ENTRIES)]
  .filter((file) => !/\.(test|spec)\./.test(file));

const exportsMap = Object.fromEntries(
  files.map((file) => {
    const nested = NESTED_ENTRIES[file];
    const name = nested ? nested.name : basename(file, extname(file));
    const dist = nested ? nested.dist : name;

    return [
      `./${name}`,
      {
        types: `./dist/${dist}.d.ts`,
        import: `./dist/${dist}.js`,
        default: `./dist/${dist}.js`,
      },
    ];
  }),
);

const pkgPath = 'package.json';
const current = readFileSync(pkgPath, 'utf8');
const next = `${JSON.stringify({ ...JSON.parse(current), exports: exportsMap }, null, 2)}\n`;

if (next !== current) {
  writeFileSync(pkgPath, next);
}
