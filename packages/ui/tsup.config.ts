import { globSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, extname, resolve } from 'node:path';

import { defineConfig } from 'tsup';

const NESTED_ENTRIES: Record<string, string> = {
  'src/preset/index.ts': 'preset/index',
  'src/link-next.ts': 'link/next',
};

const entryFiles = [...globSync('src/*.{ts,tsx}'), ...Object.keys(NESTED_ENTRIES)]
  .filter((file) => !/\.(test|spec)\./.test(file));

const entry = Object.fromEntries(
  entryFiles.map((file) => {
    if (file in NESTED_ENTRIES) {
      return [NESTED_ENTRIES[file], file];
    }

    const key = basename(file, extname(file));

    return [key, file];
  }),
);

function isClientModule(sourcePath: string): boolean {
  try {
    return /^\s*(['"])use client\1/.test(readFileSync(resolve(sourcePath), 'utf8'));
  } catch {
    return false;
  }
}

type Metafile = {
  outputs: Record<string, { inputs: Record<string, unknown> }>;
};

let capturedMetafile: Metafile | undefined;

export default defineConfig({
  entry,
  format: ['esm'],
  dts: true,
  clean: true,
  minify: false,
  treeshake: true,
  splitting: false,
  external: ['react', 'react-dom', '@ark-ui/react', /^lucide-react(\/.*)?$/, /^next(\/.*)?$/],
  esbuildOptions(options) {
    options.resolveExtensions = ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.css', '.json'];
  },
  esbuildPlugins: [
    {
      name: 'capture-metafile',
      setup(build) {
        build.initialOptions.metafile = true;
        build.onEnd((result) => {
          if (result.metafile) {
            capturedMetafile = result.metafile;
          }
        });
      },
    },
  ],
  onSuccess: async () => {
    if (!capturedMetafile) {
      return;
    }

    for (const [outputPath, output] of Object.entries(capturedMetafile.outputs)) {
      if (!outputPath.endsWith('.js')) {
        continue;
      }

      const isClient = Object.keys(output.inputs).some(isClientModule);
      if (!isClient) {
        continue;
      }

      const code = readFileSync(outputPath, 'utf8');
      if (!code.startsWith('\'use client\'')) {
        writeFileSync(outputPath, `'use client';\n${code}`);
      }
    }
  },
});
