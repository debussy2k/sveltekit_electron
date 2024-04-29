import { BrowserWindow, app } from "electron";
import { ExecException, exec } from "node:child_process";

export function isDev(){
  return !app.isPackaged;
}

export function getCurrentBrowserWindow(){
  const windows = BrowserWindow.getAllWindows()
  let focusWindow = windows.find((window) => window.isFocused());
  if (focusWindow) return focusWindow;
  else windows[0];
}

export async function commandExecute(command: string) {
  return await new Promise<{
    error: ExecException | null,
    stdout: string,
    stderr: string,
  }>(function(resolve) {
    exec(command, (error, stdout, stderr) => {
      console.log("STDOUT:", stdout, ", STDERR:", stderr);
      resolve({
        stdout,
        stderr,
        error,
      });
    });
  })
}