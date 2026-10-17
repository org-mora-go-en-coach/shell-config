import { cp, mkdir, readFile } from "node:fs/promises";
const pkg=JSON.parse(await readFile(new URL("../package.json",import.meta.url),"utf8")); const source=new URL("../config.source.json",import.meta.url); const out=new URL("../public/",import.meta.url); const versionOut=new URL(`../public/${pkg.version}/`,import.meta.url); await mkdir(versionOut,{recursive:true}); await cp(source,new URL("config.json",out)); await cp(source,new URL("config.json",versionOut));

