import Store from 'electron-store';

const BrowserWindowConfigStore = new Store<Electron.BrowserWindowConstructorOptions>();

export {
  BrowserWindowConfigStore,
}