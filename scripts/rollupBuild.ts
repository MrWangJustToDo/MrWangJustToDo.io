import { rollupBuild } from "project-tool/rollup";

const start = async () => {
  await rollupBuild({ packageName: "chakra", packageScope: "packages" });
  await rollupBuild({ packageName: "graphql", packageScope: "packages" });
  process.exit(0);
};

start();
