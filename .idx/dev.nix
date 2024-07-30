{ pkgs, ... }: {

  # Which nixpkgs channel to use.
  channel = "stable-24.05";# or "unstable" 
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_22
    pkgs.corepack_22
    pkgs.gnupg
    pkgs.pinentry-curses
    pkgs.coreutils-full
    pkgs.delta
  ];

  # Sets environment variables in the workspace
  env = {};

  # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
  idx.extensions = [
    "aaron-bond.better-comments"
    "formulahendry.code-runner"
    "MS-CEINTL.vscode-language-pack-ko"
    "mikestead.dotenv"
    "dbaeumer.vscode-eslint"
    "manuth.eslint-language-service"
    "mhutchie.git-graph"
    "codezombiech.gitignore"
    "eamodio.gitlens"
    "ms-vscode.vscode-typescript-next"
    "esbenp.prettier-vscode"
    "Tyriar.sort-lines"
    "redhat.vscode-yaml"
    # tailwind
    "bradlc.vscode-tailwindcss"
    # astro
    "astro-build.astro-vscode"
    "donjayamanne.githistory"
    "unifiedjs.vscode-mdx"
  ];

  # Enable previews and customize configuration
  idx.previews = {
    enable = false;
   };
}