### Prerequisites
Make sure you have the following installed:
- Node.js (preferably using nvm)
- npm (comes with Node.js)
- **Git CLI** (don’t use VS Code GUI to commit beacause Husky won't trigger)

### Initial Setup
Run this after cloning the repo. Only for the first time after you clone.
```bash
npm install
npx husky install
git config core.hooksPath .husky
chmod +x .husky/*
```
