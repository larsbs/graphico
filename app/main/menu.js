const { Menu, shell } = require('electron');


const menuTemplate = (app, mainWindow, shell) => [
  {
    label: 'Yagw',
    submenu: [
      {
        label: 'About Yagw',
        selector: 'orderFrontStandardAboutPanel:',
      },
      { type: 'separator' },
      {
        label: 'Hide GraphiQL',
        accelerator: 'Command+H',
        selector: 'hide:'
      },
      {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:'
      },
      {
        label: 'Show All',
        selector: 'unhideAllApplications:'
      },
      { type: 'separator' },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: () => app.quit(),
      },
    ],
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'Command+Z',
        selector: 'undo:',
      },
      {
        label: 'Redo',
        accelerator: 'Shift+Command+Z',
        selector: 'redo:',
      },
      { type: 'separator' },
      {
        label: 'Cut',
        accelerator: 'Command+X',
        selector: 'cut:',
      },
      {
        label: 'Copy',
        accelerator: 'Command+C',
        selector: 'copy:',
      },
      {
        label: 'Paste',
        accelerator: 'Command+V',
        selector: 'paste:',
      },
      {
        label: 'Select All',
        accelerator: 'Command+A',
        selector: 'selectAll:',
      },
    ],
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click: () => mainWindow.setFullScreen( ! mainWindow.isFullScreen()),
      },
      { type: 'separator' },
      {
        label: 'Reload',
        accelerator: 'Command+R',
        click: () => {
          if (mainWindow.restart) {
            mainWindow.restart();
          }
          else if (mainWindow.reload) {
            mainWindow.reload();
          }
        },
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click: () => mainWindow.toggleDevTools(),
      },
      { type: 'separator' },
      {
        role: 'zoomin',
      },
      {
        role: 'zoomout',
      },
      {
        role: 'resetzoom',
      },
    ],
  },
  {
    label: 'Window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:',
      },
    ],
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Learn GraphQL',
        click: () => shell.openExternal('http://graphql.org/learn/'),
      },
      {
        label: 'Documentation',
        click: () => shell.openExternal('https://github.com/graphql/graphiql#graphiql'),
      },
      {
        label: 'Community Resources',
        click: () => shell.openExternal('http://graphql.org/community/'),
      },
    ],
  },
];


module.exports = function createMenu(app, mainWindow) {
  return Menu.buildFromTemplate(menuTemplate(app, mainWindow));
};
