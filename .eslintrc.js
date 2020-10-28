module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'semi': ['error', 'always'],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "no-extra-semi": "off",
    "@typescript-eslint/no-extra-semi": ["error"],
    "quotes": "off",
    "@typescript-eslint/quotes": ["error", "single"],
    '@typescript-eslint/class-literal-property-style': ["error", "fields"],
    '@typescript-eslint/await-thenable': ["error"],
    // "no-duplicate-imports": "off",
    // "@typescript-eslint/no-duplicate-imports": ["error"],
    "no-dupe-class-members": "off",
    "@typescript-eslint/no-dupe-class-members": ["error"],
    "@typescript-eslint/naming-convention": [
      "error",
      { "selector": "variableLike", "format": ["camelCase", "UPPER_CASE"] },
      {
        "selector": "memberLike",
        "modifiers": ["private"],
        "format": ["camelCase"],
        "leadingUnderscore": "require"
      },
      {
        "selector": "variable",
        "types": ["boolean"],
        "format": ["PascalCase"],
        "prefix": ["is", "should", "has", "can", "did", "will"]
      },
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "custom": {
          "regex": "^I[A-Z]",
          "match": true
        }
      }
    ]
  },
};
