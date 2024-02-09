// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	vscode.window.showInformationMessage('Welcome to Pretty JSON plugin !');

	let disposable = vscode.commands.registerCommand('pretty-json-vscode.PrettyJSON', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.document.getText(editor.selection);
            try {
                const formattedJson = JSON.stringify(JSON.parse(selection), null, 4);
                editor.edit(editBuilder => {
                    editBuilder.replace(editor.selection, formattedJson);
                });
            } catch (error) {
                vscode.window.showErrorMessage('Invalid JSON data');
            }
        }
    });

    let disposableUnformat = vscode.commands.registerCommand('pretty-json-vscode.IndentedJSON', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.document.getText(editor.selection);
            try {
                const unformattedJson = JSON.stringify(JSON.parse(selection));
                editor.edit(editBuilder => {
                    editBuilder.replace(editor.selection, unformattedJson);
                });
            } catch (error) {
                vscode.window.showErrorMessage('Invalid JSON data');
            }
        }
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(disposableUnformat);

	    // 注册快捷键
		context.subscriptions.push(vscode.commands.registerCommand('pretty-json-vscode.formatJsonShortcut', () => {
			vscode.commands.executeCommand('pretty-json-vscode.PrettyJSON');
		}));
	
		context.subscriptions.push(vscode.commands.registerCommand('pretty-json-vscode.unformatJsonShortcut', () => {
			vscode.commands.executeCommand('pretty-json-vscode.IndentedJSON');
		}));
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
