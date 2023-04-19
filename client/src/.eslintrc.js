module.exports = {
    extends: [
        "airbnb-typescript",
        "airbnb/hooks",
        "plugin:@typescript-eslint/recommended",
        "plugin:/recommended",
        "prettier",
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended"
    ],
    plugin: ["prettier", "react", "@typescript-eslint", "jest"],
    env: {
        browser: true,
        es6: true,
        just: true,
    },
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        'prettier/prettier': 'error',
    }
}