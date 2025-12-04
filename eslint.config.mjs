import reearth from "eslint-config-reearth";

export default [
  ...reearth("react-align", { reactRecommended: false }),
  {
    ignores: ["dist/", "node_modules/"],
  },
];
