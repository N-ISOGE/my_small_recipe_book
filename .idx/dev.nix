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
    # git
    "donjayamanne.githistory"
    "mhutchie.git-graph"
    "codezombiech.gitignore"
    "eamodio.gitlens"
    "arturock.gitstash"
    "waderyan.gitblame"
    # md, mdx
    "unifiedjs.vscode-mdx"    
    "jebbs.markdown-extended"
    "foam.foam-vscode"
    # tailwind
    "bradlc.vscode-tailwindcss"
    # astro
    "astro-build.astro-vscode"
    # etc
    "aaron-bond.better-comments"
    "formulahendry.code-runner"
    "MS-CEINTL.vscode-language-pack-ko"
    "mikestead.dotenv"
    "biomejs.biome"
    # "dbaeumer.vscode-eslint"
    # "manuth.eslint-language-service"
    "ms-vscode.vscode-typescript-next"
    "Tyriar.sort-lines"
    "redhat.vscode-yaml"
    "esbenp.prettier-vscode"
    "YoavBls.pretty-ts-errors"
  ];

  # Enable previews and customize configuration
  idx.previews = {
    enable = false;
   };
}