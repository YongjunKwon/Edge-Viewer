import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  send: (type: string, data: string) => ipcRenderer.send('message', type,data),
  receive: (channel, func) => {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
})

contextBridge.exposeInMainWorld("app", {
  invoke: ipcRenderer.invoke,
});
