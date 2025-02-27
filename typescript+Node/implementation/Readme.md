`npm init -y`
app.js
`npm install --save-dev typescript @types/node`

typescript => for language
@types/node => for types 

`npm install --save-dev ts-node` => to run typescript directly

these are dev-dependencies =>
means only required while development 
not required in production bcoz 
TypeScript (typescript) is used only for compiling TypeScript to JavaScript, 
but in production, we run compiled JavaScript (dist folder), so TypeScript is not needed.

`npm run build` → Converts TypeScript (.ts) to JavaScript (.js)

## What is tsconfig.json?

It is a configuration file that tells TypeScript how to compile the code.
It defines settings like:
- Which files should be included in compilation.
- Where the output (compiled JavaScript) should be stored.
- Which TypeScript features and strictness levels should be applied.

## Why is tsconfig.json Important?
### Marks the Directory as a TypeScript Project
When tsc (TypeScript compiler) finds a `tsconfig.json`, it assumes all .ts files in that directory belong to the project.
### Specifies Root Files
The "include" or "files" option defines which TypeScript files should be compiled.
### Defines Compiler Options
Controls how TypeScript compiles the project (e.g., ES6 output, strict type checking).