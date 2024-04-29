import { dialog } from 'electron';
import { UpdateInfo, autoUpdater } from 'electron-updater';
import { Communicator } from '../utils/communicator';
import log from 'electron-log';
import { getCurrentBrowserWindow } from '../utils/common';

let updateInfo: UpdateInfo | undefined;

autoUpdater.on('checking-for-update', () => {
  console.log(`[autoUpdater] : checking-for-update`);
});

// 업데이트 가능하면 자동으로 다운로드 진행
autoUpdater.on('update-available', (info) => {
  console.log(`[autoUpdater] : update-available`, JSON.stringify(info));
  updateInfo = info;
});

autoUpdater.on('update-not-available', (info) => {
  console.log(`[autoUpdater] : update-not-available`, JSON.stringify(info));
});

autoUpdater.on('error', (err) => {
  console.error(`[autoUpdater] : error`, err);
  dialog.showMessageBox({
    type: 'info',
    buttons: ['Ok'],
    title: '에러 발생',
    message: '업데이트 도중 에러가 발생하였습니다',
    detail: JSON.stringify(err),
  });
});

autoUpdater.on('download-progress', (progressObj) => {
  console.log(`[autoUpdater] : download-progress`, JSON.stringify(progressObj));
  const targetWindow = getCurrentBrowserWindow();
  Communicator.sendToRenderer(targetWindow.webContents, 'download_progress', {
    progressObj,
  });
});

/**
 * ******************************************************************************
 * listen
 * ******************************************************************************
 */
Communicator.listen('execute_update', (event, payload) => {
  console.log(`[mainManager] execute_update`);
  autoUpdater.quitAndInstall();
});

/**
 * ******************************************************************************
 * export
 * ******************************************************************************
 */
export default class AppUpdater {
  constructor() {
    log.transports.file.level = "debug"
    autoUpdater.logger = log
    autoUpdater.checkForUpdatesAndNotify()
  }
}