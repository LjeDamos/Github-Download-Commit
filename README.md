# Github-Download-Commit
A user script that adds Download zip button to commit in commit history

# Installation
* Install [Tampermonkey](https://tampermonkey.net/) extension, it's available for Chrome, Microsoft Edge, Safari, Opera Next, and Firefox.
* Download the script: https://github.com/LjeDamos/Github-Download-Commit/raw/main/Github-Download-Commit.user.js
* An installation prompt will appear. Accept the installation.

# Preview
<img width="1808" height="398" alt="image" src="https://github.com/user-attachments/assets/ea06739d-05a0-47d3-bda9-b2bbcbbbeec0" />

# Script description
1. Targeting Links: The script scans the page for links pointing to a commit's "tree" view (the <> button on GitHub that lets you browse the files of a past commit).
2. Extracting Data: It uses a regular expression to extract the repository owner, repository name, and the 40-character commit hash (SHA) from that link.
3. Injecting the Button: Using the extracted data, it generates a new direct download link (https://github.com/[owner]/[repo]/archive/[sha].zip).
4. Adding Tooltips: It creates a GitHub-native <tool-tip> element so that when you hover over the new button, it seamlessly says "Download ZIP" just like native GitHub UI elements.
5. Handling Dynamic Loading: Because GitHub loads content dynamically without refreshing the page (via AJAX/SPA), the script uses a MutationObserver. This watches the page for changes and automatically adds the ZIP buttons to new commits as you scroll down or navigate to new pages.
