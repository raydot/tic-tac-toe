# CLI Tic-Tac-Toe

Just what it says.

I decided to try to do this with the CLI just to factor out the UI issues, based on this video on creating Node CLI tools: https://www.youtube.com/watch?v=_oHByo8tiEY

## Original package.json

Some libraries removed for the CLI.

```json
{
  "name": "cli-ttt",
  "version": "1.0.1",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "jest"
  },
  "keywords": [],
  "author": "Davey Struts",
  "license": "Unlicense",
  "description": "Command line tic-tac-toe game using minimax.",
  "bin": "./index.js",
  "dependencies": {
    "chalk": "^5.3.0",
    "chalk-animation": "^2.0.3",
    "figlet": "^1.8.0",
    "gradient-string": "^3.0.0",
    "inquirer": "^12.0.0",
    "nanospinner": "^1.1.0"
  },
  "devDependencies": {
    "@babel/core": "^7.25.8",
    "@babel/preset-env": "^7.25.8",
    "babel-jest": "^29.7.0",
    "jest": "^29.7.0"
  }
}
```
