import { app, BrowserWindow } from "electron";
import { initializeWindow } from "../main";

function quitApp(){
  if (process.platform !== "darwin") {
    app.quit();
  }
}

function activateEventHandler(){
  // OS X에서는 독 아이콘이 클릭되고 다른 창이 열려 있지 않을 때 앱에서 창을 다시 생성
  if (BrowserWindow.getAllWindows().length === 0) initializeWindow();
}

/**
 * ******************************************************************************
 * export
 * ******************************************************************************
 */

export {
  quitApp,
  activateEventHandler,
}
