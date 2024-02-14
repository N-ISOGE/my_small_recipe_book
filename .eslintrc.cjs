/** @type {import("@types/eslint").Linter.Config} */
module.exports = {
    env: {
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:typescript-sort-keys/recommended",
        "plugin:perfectionist/recommended-natural",
        "plugin:astro/recommended",
        "plugin:astro/jsx-a11y-recommended",
        "plugin:regexp/recommended",
    ],
    ignorePatterns: ["node_modules", "dist"],
    overrides: [
        {
            extends: ["plugin:@typescript-eslint/strict", "plugin:@typescript-eslint/stylistic"],
            files: ["*.astro"],
            parser: "astro-eslint-parser",
            parserOptions: {
                extraFileExtensions: [".astro"],
                parser: "@typescript-eslint/parser",
            },
            rules: {
                "astro/jsx-a11y/no-redundant-roles": [
                    "error",
                    {
                        ol: ["list"],
                        ul: ["list"],
                    },
                ],
            },
        },
        {
            extends: [
                "plugin:@typescript-eslint/strict-type-checked",
                "plugin:@typescript-eslint/stylistic-type-checked",
            ],
            files: ["*.ts", "*.tsx"],
            rules: {
                "deprecation/deprecation": "error",
            },
        },
    ],
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint",
        "astro",
        "deprecation",
        "perfectionist",
        "regexp",
        "typescript-sort-keys",
    ],
    root: true,
    rules: {
        "@typescript-eslint/no-unused-vars": [
            "warn",
            { ignoreRestSiblings: true, varsIgnorePattern: "Props" },
        ],
        "@typescript-eslint/no-var-requires": "warn",
    },
};
