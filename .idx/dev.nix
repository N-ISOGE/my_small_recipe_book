{ pkgs, ... }: {

  # Which nixpkgs channel to use.
  channel = "stable-23.05"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_18
  ];

  # Sets environment variables in the workspace
  env = {};

  # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
  idx.extensions = [
    "aaron-bond.better-comments"
    "formulahendry.code-runner"
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
  ];

  # Enable previews and customize configuration
  idx.previews = { };
}