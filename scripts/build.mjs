import * as esbuild from 'esbuild';

const [entryPoint, outFile] = process.argv.slice(2);

if (!entryPoint || !outFile) {
  console.error('Usage: node scripts/build.mjs <entryPoint> <outFile>');
  process.exit(1);
}

const buildOptions = {
  entryPoints: [entryPoint],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: outFile,
  // Add any other common esbuild options here
};

esbuild
  .build(buildOptions)
  .then(() => console.log(`Build successful: ${entryPoint} -> ${outFile}`))
  .catch((error) => {
    console.error('Build failed:', error);
    process.exit(1);
  });
