import path from 'path';
import url from 'url';
import { app, BrowserWindow } from 'electron';


let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 800,
    // titleBarStyle: 'hiddenInset',
    // frame: false,
  });

  mainWindow.loadURL(url.format({
    protocol: process.env.NODE_ENV === 'development' ? 'http:' : 'file:',
    pathname: process.env.NODE_ENV === 'development' ? `localhost:${process.env.WEBPACK_PORT}` : path.resolve(__dirname, '../dist/index.html'),
    slashes: true,
  }));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}


app.on('ready', createWindow);


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
