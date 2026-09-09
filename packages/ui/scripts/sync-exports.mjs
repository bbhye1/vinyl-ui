import { globSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, extname } from 'node:path';

const PRESET = 'src/preset/index.ts';

const files = [...globSync('src/*.{ts,tsx}'), PRESET]
  .filter((file) => !/\.(test|spec)\./.test(file));

const exportsMap = Object.fromEntries(
  files.map((file) => {
    const name = file === PRESET ? 'preset' : basename(file, extname(file));
    const dist = file === PRESET ? 'preset/index' : name;

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
