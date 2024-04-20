const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

function createWindow () {
    console.log('__dirname:', __dirname)
    const win = new BrowserWindow({
        width: 1600,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile(path.join(__dirname, 'index.html'))
    win.webContents.openDevTools()
}
