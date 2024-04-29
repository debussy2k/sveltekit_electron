import { BrowserWindow, app } from "electron";
import serve from 'electron-serve'
import { activateEventHandler, quitApp } from "./app-event-handlers";
import { getWindowOptions, preventMultipleInstance } from "./utils/settings";
import { BrowserWindowConfigStore } from "./utils/store";
import AppUpdater from "./auto-update";
import dotenv from 'dotenv';
dotenv.config();

const serveURL = serve({ directory: __dirname + '/renderer' });
const port = 5173;
const dev = !app.isPackaged;

// 개발 환경일땐, Local Sveltekit 서버를 로드합니다. ( 해당 서버가 실행될때까지 재시도 합니다. )
function loadVite(window: BrowserWindow, port: number) {
	window.loadURL(`http://localhost:${port}`).catch((e) => {
		console.log('Error loading URL, retrying', e);
		setTimeout(() => {
			loadVite(window, port);
		}, 200);
	});
}

function loadRenderer(window: BrowserWindow){
  if (dev) {
    loadVite(window, port);
    // 개발환경에서 실행시 자동으로 개발자 도구를 활성화
    window.webContents.openDevTools();
  } else serveURL(window);
}

function registStoreWindowBounds(window: BrowserWindow){

  window.on('resize', () => {
    let { width, height } = window.getBounds();
    BrowserWindowConfigStore.set('windowBounds', { width, height, x: window.getPosition()[0], y: window.getPosition()[1] });
  });

  window.on('move', () => {
    BrowserWindowConfigStore.set('windowBounds', { width: window.getBounds().width, height: window.getBounds().height, x: window.getPosition()[0], y: window.getPosition()[1] });
  });
}

function createWindow() {

  const options = getWindowOptions();
  const window = new BrowserWindow(options);
  return window;
}

function initializeWindow(){
  const window = createWindow();
  loadRenderer(window);

  // 자동 업데이트 체크
  new AppUpdater();
  
  /**
   * 옵션 함수들
   */

  // 이전에 사용된 창의 크기와 위치를 기억하고 재활용하려 하는경우 활성화
  registStoreWindowBounds(window);

  // 싱글 프로세스로 실행되도록 하는 함수
  preventMultipleInstance(window);
}

app.on('ready', initializeWindow);
app.on("activate", activateEventHandler);
app.on("window-all-closed", quitApp );

export {
  initializeWindow
}