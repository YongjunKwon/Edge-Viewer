import { app, BrowserWindow, ipcMain, session } from 'electron';
import { join } from 'path';
import Config from 'electron-config';
import * as fs from 'node:fs';

let mainWindow;
let floatingWindow;

const config = new Config();

const rendererPort = process.argv[2];

function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'Edge Viewer',
    width: 1200,
    height: 800,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
    },
    show: false,
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    if (mainWindow) {
      mainWindow.destroy();
      mainWindow = undefined;
    }
    if (floatingWindow) {
      floatingWindow.close();
    }
  });

  // mainWindow.maximize();

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  } else {
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'));
  }
}

function toggleFloatingViewer(isActive) {
  if (isActive && !floatingWindow) {
    let opts = {
      title: 'Floating Viewer',
      width: 325,
      height: 220,
      minWidth: 325,
      minHeight: 220,
      frame: false,
      autoHideMenuBar: true,
      resizable: true,
      transparent: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: join(__dirname, 'preload.js'),
      },
      show: false,
    };
    Object.assign(opts, config.get('winBounds'));

    floatingWindow = new BrowserWindow(opts);

    floatingWindow.on('ready-to-show', () => {
      floatingWindow.show();
      if (config.get('alwaysOnTop')) {
        floatingWindow.setAlwaysOnTop(true, 'screen');
      }
      ipcMain.removeHandler('alwaysOnTop');
      ipcMain.handleOnce('alwaysOnTop', () => {
        return config.get('alwaysOnTop');
      });
    });

    floatingWindow.on('close', (event, arg) => {
      if (mainWindow) mainWindow.webContents.send('isFloatingViewerClosed');
      config.set('winBounds', floatingWindow.getBounds());
    });

    if (process.env.NODE_ENV === 'development') {
      floatingWindow.loadURL(
        `http://localhost:${rendererPort}/#/floatingViewer`,
      );
    } else {
      floatingWindow.loadURL(
        // 'file://' +
        //   join(app.getAppPath(), 'renderer', 'index.html') +
        //   '#' +
        //   'floatingViewer',
        `file://${join(
          app.getAppPath(),
          'renderer',
          'index.html',
        )}#floatingViewer`,
      );
    }
  } else {
    if (floatingWindow) {
      config.set('winBounds', floatingWindow.getBounds());
      floatingWindow.destroy();
      floatingWindow = undefined;
    }
  }
}

function toggleAlwaysOnTop(isActive) {
  if (isActive) {
    floatingWindow.setAlwaysOnTop(true, 'screen');
  } else {
    floatingWindow.setAlwaysOnTop(false, 'screen');
  }
  config.set('alwaysOnTop', isActive);
}

function closeFloatingViewer() {
  floatingWindow.close();
}

app.whenReady().then(() => {
  createWindow();
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ["script-src 'self'"],
      },
    });
  });

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', function () {
  console.log('window-all-closed');
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('message', (event, type, data) => {
  switch (type) {
    case 'toggleFloatingViewer':
      toggleFloatingViewer(data);
      break;
    case 'toggleAlwaysOnTop':
      toggleAlwaysOnTop(data);
      break;
    case 'closeFloatingViewer':
      closeFloatingViewer();
      break;
  }
});
