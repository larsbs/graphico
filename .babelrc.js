module.exports = {
  "presets": [
    "@babel/preset-react",
    ["@babel/preset-env", {
      "modules": false,
    }],
  ],
  "plugins": [
    "react-hot-loader/babel",

    // Stage 1
    "@babel/plugin-proposal-export-default-from",
    ["@babel/plugin-proposal-optional-chaining", {
      "loose": false,
    }],
    ["@babel/plugin-proposal-pipeline-operator", {
      "proposal": "minimal",
    }],
    ["@babel/plugin-proposal-nullish-coalescing-operator", {
      "loose": false,
    }],
    "@babel/plugin-proposal-do-expressions",
    "@babel/plugin-proposal-logical-assignment-operators",

    // Stage 2
    ["@babel/plugin-proposal-decorators", {
      "legacy": true,
    }],
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions",

    // Stage 3
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    ["@babel/plugin-proposal-class-properties", {
      "loose": false,
    }],
    "@babel/plugin-proposal-json-strings",
  ],
};
