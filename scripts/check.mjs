import { readFile } from "node:fs/promises";
const pkg = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);
const config = JSON.parse(
  await readFile(new URL("../config.source.json", import.meta.url), "utf8"),
);
if (config.version !== pkg.version)
  throw new Error("Config version must equal package version");
for (const [name, remote] of Object.entries(config.remotes)) {
  const url = new URL(remote.entry);
  const versionedPath = url.pathname.includes(
    `/${remote.version}/remoteEntry.js`,
  );
  const versionedQuery =
    url.pathname.endsWith("/remoteEntry.js") &&
    url.searchParams.get("version") === remote.version;
  if (!versionedPath && !versionedQuery)
    throw new Error(`${name} entry does not match its version`);
}
const expected = {
  mfe: ["mfe-layout", "mfe-lesson", "mfe-user"],
  api: ["api-lesson", "api-user"],
};
for (const environment of ["dev", "prod"]) {
  const map = JSON.parse(
    await readFile(
      new URL(`../importmap/${environment}.json`, import.meta.url),
      "utf8",
    ),
  );
  if (Object.keys(map).sort().join(",") !== "api,mfe")
    throw new Error(`${environment} import map may only contain mfe and api`);
  for (const [group, names] of Object.entries(expected)) {
    if (
      Object.keys(map[group] ?? {})
        .sort()
        .join(",") !== [...names].sort().join(",")
    )
      throw new Error(`${environment} ${group} versions are incomplete`);
    for (const version of Object.values(map[group]))
      if (!/^\d+\.\d+\.\d+$/.test(version))
        throw new Error(`${environment} contains an invalid version`);
  }
}
console.log("shell-config is valid");
