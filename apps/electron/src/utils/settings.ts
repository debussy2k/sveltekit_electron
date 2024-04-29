import { app, screen } from "electron";
import path from 'path';
import { BrowserWindowConfigStore } from "./store";
import { isDev } from '../utils/common';

console.log(__dirname)

const defaultBrowserWindowOptions: Electron.BrowserWindowConstructorOptions = {
  height: 600,
  width: 800,
  webPreferences: {
    preload: path.join(__dirname, "..", "/preload/index.js"),
    devTools: isDev(),
  },
};

function useFullScreenWindow(options: Electron.BrowserWindowConstructorOptions): Electron.BrowserWindowConstructorOptions{
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  options.width = width;
  options.height = height;
  return options;
}

// 이전 Store에 저장된 내역이 없으면 설정된 기본값을 사용합니다.
function resumeWindowSizeAndPosition(window: Electron.BrowserWindowConstructorOptions): Electron.BrowserWindowConstructorOptions{

  let { width, height, x, y } = BrowserWindowConfigStore.get('windowBounds', defaultBrowserWindowOptions);

  if (!width || !height || !x || !y) return window;
  else return { ...window, width, height, x, y };
}

function preventMultipleInstance(window: Electron.BrowserWindow){
  
  // 이 메소드는 앱의 두 번째 인스턴스인지 여부를 확인합니다.
  const gotTheLock = app.requestSingleInstanceLock();

  if (!gotTheLock) {
    // 두 번째 인스턴스가 시작되면 앱을 종료합니다.
    app.quit();
  } else {
    app.on('second-instance', () => {
      // 사용자가 두 번째 인스턴스를 실행하려고 할 때,
      // 여기에서 기존 윈도우를 포커스하거나 복원할 수 있습니다.
      if (window) {
        if (window.isMinimized()) window.restore();
        window.focus();
      }
    });
  }
}

function getWindowOptions():Electron.BrowserWindowConstructorOptions{

  // Default Options
  let options = { ...defaultBrowserWindowOptions };

  // 현재 화면 크기의 창으로 생성할지 여부
  options = useFullScreenWindow(options);

  // 이전에 사용된 창의 크기와 위치를 사용할지 여부
  options = resumeWindowSizeAndPosition(options);

  return options;
}

/**
 * ******************************************************************************
 * export
 * ******************************************************************************
 */

export {
  defaultBrowserWindowOptions,
  getWindowOptions,
  preventMultipleInstance,
}