import * as vscode from "vscode";

export default function toSpecPath(filePath: string, pattern: string): string {
  let [first, ...rest] = filePath.split("/");

  if (isSpec(filePath, pattern) || first === pattern) {
    return filePath;
  } else {
    let middle = rest.slice(0, rest.length - 1);
    let filename = rest[rest.length - 1];
    return [pattern, ...middle, filename.replace(".rb", `_${pattern}.rb`)].join("/");
  }
}

export function isSpec(fileName: string, pattern: string): boolean {
  let editor: vscode.TextEditor = vscode.window.activeTextEditor;
  switch (editor.document.languageId) {
    case "typescript":
      return fileName.indexOf(`.${pattern}.ts`) > -1;
    case "typescriptreact":
      return fileName.indexOf(`.${pattern}.tsx`) > -1;
    case "ruby":
      return fileName.indexOf(`_${pattern}.rb`) > -1;
    default:
      return false;
  }
}

export function isSpecDirectory(fileName: string, pattern: string): boolean {
  let editor: vscode.TextEditor = vscode.window.activeTextEditor;
  switch (editor.document.languageId) {
    case "typescript":
      return fileName.indexOf(pattern) > -1 && fileName.indexOf(`.ts`) === -1;
    case "typescriptreact":
      return fileName.indexOf(pattern) > -1 && fileName.indexOf(".tsx") === -1;
    case "ruby":
      return fileName.indexOf(pattern) > -1 && fileName.indexOf(".rb") === -1;
    default:
      return false;
  }
}
