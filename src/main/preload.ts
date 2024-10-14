import {contextBridge, ipcRenderer} from 'electron';
import * as fs from "node:fs";

contextBridge.exposeInMainWorld('electronAPI', {
  send: (message: string, data: string) => ipcRenderer.send('message', message,data),
  receive: (channel, func) => {
    console.log("receive channel:", channel)
    let validChannels = ["isFloatingViewerClosed"];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  }
})
