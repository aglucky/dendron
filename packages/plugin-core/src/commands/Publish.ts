import {
  PublishNotesCommand,
  PublishNotesCommandOpts,
} from "@dendronhq/dendron-cli";
import _ from "lodash";
import { window } from "vscode";
import { VSCodeUtils } from "../utils";
import { DendronWorkspace } from "../workspace";
import { BasicCommand } from "./base";

type CommandOpts = Partial<PublishNotesCommandOpts>;

type CommandOutput = void;

export class PublishCommand extends BasicCommand<CommandOpts, CommandOutput> {
  async gatherInputs(): Promise<any> {
    return {};
  }
  async execute(opts?: CommandOpts) {
    const maybeTextEditor = VSCodeUtils.getActiveTextEditor();
    if (_.isUndefined(maybeTextEditor)) {
      window.showErrorMessage("no active document found");
      return;
    }
    const cmd = new PublishNotesCommand();
    const wsRoot = DendronWorkspace.rootDir() as string;
    const ws = DendronWorkspace.instance();
    const vault = ws.engine.props.root;
    await cmd.eval({ wsRoot, vault, ...opts });
    this.showResponse();
  }

  async showResponse() {
    window.showInformationMessage("publish completed");
  }
}
