import {
  ExtensionContext,
  LanguageStatusItem,
  commands,
  languages,
  window,
  DocumentSelector,
} from "vscode";

import Logger from "./logger";

import { getCurrentTimestamp } from "./time";

const outputChannel = window.createOutputChannel("VICE Settings");
const languageSelector: DocumentSelector = { language: "vice-hotkeys" };

const log: Logger = {
  debug: function (...args) {
    this.log("DEBUG", ...args);
  },
  error: function (...args) {
    this.log("ERROR", ...args);
  },
  info: function (...args) {
    this.log("INFO", ...args);
  },
  log: function (level: string, ...args: any[]) {
    const timestamp = getCurrentTimestamp();
    outputChannel.appendLine(`${timestamp} [${level}] ${args.join(" ")}`);
  },
};

const statusItem: LanguageStatusItem = languages.createLanguageStatusItem(
  "vice-hotkeys.status.item",
  languageSelector
);

export function activate(context: ExtensionContext) {
  commands.registerCommand("vice-settings.action.showLog", () => {
    outputChannel.show();
  });
  statusItem.command = {
    command: "vice-settings.action.showLog",
    title: "Show extension log",
  };

  return {};
}

export function deactivate() {}
