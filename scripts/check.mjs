import { readFile } from "node:fs/promises";
const pkg=JSON.parse(await readFile(new URL("../package.json",import.meta.url),"utf8")); const config=JSON.parse(await readFile(new URL("../config.source.json",import.meta.url),"utf8")); if(config.version!==pkg.version) throw new Error("Config version must equal package version"); for(const [name,remote] of Object.entries(config.remotes)){if(!remote.entry.includes(`/${remote.version}/remoteEntry.js`)) throw new Error(`${name} entry does not match its version`)} console.log("shell-config is valid");

