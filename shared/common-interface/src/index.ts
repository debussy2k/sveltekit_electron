import { ProgressInfo } from "electron-updater";

export declare namespace IChannel {
  /**
   * ************************************************************
   * Render Channel
   * ************************************************************
   */
  export interface TestEvent2ChannelPayload {
    key1: string;
  }

  export interface LatestVersionChannelPayload {
    currentVersion?: string;
    latestVersion?: string;
  }

  export interface InfoChannelPayload {
    currentVersion?: string;
    isDev?: boolean;
  }

  export interface CommandResultPayload {
    stdout: string;
    stderr: string;
  }

  export interface DownloadProgressChannelPayload {
    progressObj?: ProgressInfo;
  }

  export interface RendererChannelMap { 
    'latest_version': LatestVersionChannelPayload;
    'info': InfoChannelPayload;
    'command_result': CommandResultPayload;
    'download_progress': DownloadProgressChannelPayload;
    '': {};
  }

  export type RendererChannel = keyof RendererChannelMap;

  /**
   * ************************************************************
   * Main Channel
   * ************************************************************
   */
  export interface TestEvent1ChannelPayload {
    key3: string;
  }

  export type ExecuteUpdateChannelPayload = undefined;

  export type DownloadUpdateChannelPayload = undefined;

  export type CommandExecChannelPayload = {
    command: string;
  };

  export interface MainChannelMap {
    'download_update': DownloadUpdateChannelPayload;
    'execute_update': ExecuteUpdateChannelPayload;
    'command_exec': CommandExecChannelPayload;
    '': {};
  }

  export type MainChannel = keyof MainChannelMap;
}

export const UpdateStatuses = [
  'checking-for-update',
  'update-available',
  'update-not-available',
  'error',
  'download-progress',
  'update-downloaded',
  '',
] as const;

export declare namespace ICommon {
  // ... 
  export type UpdateStatus = typeof UpdateStatuses[number];

  export interface ElectronApi {
    sendToMain: <T extends IChannel.MainChannel>(channel: T, payload: IChannel.MainChannelMap[T]) => void;
    listen: (channel: IChannel.RendererChannel, func: (event: Electron.IpcRendererEvent, ...args: any) => void) => void;
    unlisten: (channel: IChannel.RendererChannel, func: (event: Electron.IpcRendererEvent, ...args: any) => void) => void;
    unlistenAll: (channel: IChannel.RendererChannel) => void;
  }
}