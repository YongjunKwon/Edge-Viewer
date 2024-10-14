import { app, BrowserWindow, ipcMain, session } from 'electron';
import { join } from 'path';
import * as electron from 'electron';
let mainWindow;
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
  });

  mainWindow.on('closed', () => {
    mainWindow.destroy();
    floatingWindow.destroy();
  });

  // mainWindow.maximize();

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'));
  }
}

let floatingWindow;
function toggleFloatingViewer(isActive) {
  if (isActive && !floatingWindow) {
    floatingWindow = new BrowserWindow({
      title: 'Floating Viewer',
      width: 400,
      height: 320,
      webPreferences: {
        webSecurity: false,
        nodeIntegration: true,
        contextIsolation: true,
        preload: join(__dirname, 'preload.js'),
      },
      show: false,
      // parent: mainWindow,
    });

    const rendererPort = process.argv[2];
    const modalPath =
      process.env.NODE_ENV === 'development'
        ? `http://localhost:${rendererPort}/#/floatingViewer`
        : `file://${__dirname}/index.html#floatingViewer`;

    floatingWindow.on('ready-to-show', () => {
      floatingWindow.show();
    });

    floatingWindow.on('close', (event, arg) => {
      mainWindow.webContents.send('isFloatingViewerClosed');
      // floatingWindow.webContents.send('fromMain', 'message test');
      floatingWindow.destroy();
    });

    floatingWindow.loadURL(modalPath);
  } else {
    if (floatingWindow) {
      floatingWindow.destroy();
      floatingWindow = undefined;
    }
  }
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
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('message', (event, message, data) => {
  switch (message) {
    case 'toggleFloatingViewer':
      toggleFloatingViewer(data);
  }
});
