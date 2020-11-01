# excalidraw plugin

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

That react app is the first plugin for excalidraw.
It will be rendered in an iframe inside the excalidraw-app.

Data is exchanged via message passing.

plugin -> core: window.parent.postMessage(...)

core -> plugin: iframe.contentWindow.postMessage(...)

Some protocoll has to be defined. I started with: "createSnapshot" that will create 2dContext imageData from the current scene. (as made in [excalidraw-claymate](https://github.com/dai-shi/excalidraw-claymate/tree/master/src))
