const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const Datastore = require('nedb');
global.addressesDB = new Datastore({ filename: 'database/addresses', autoload: true, timestampData: true });


let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });
    mainWindow.maximize();
    if (isDev) {
        mainWindow.loadURL('http://localhost:3000');
    } else {
        mainWindow.loadURL(path.join('file://', __dirname, '/build/index.html'));
    }
}

let shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
    }
});

if (shouldQuit) {
    app.quit();
    return;
}

// Execution starts from here
app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
