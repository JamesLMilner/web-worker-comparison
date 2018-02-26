const importGreenlet = new Promise( (resolve, reject) => {
    SystemJS.config({
        map: {
            'greenlet': '../node_modules/greenlet/dist/greenlet.umd.js',
        },
    })
    
    SystemJS.import('greenlet').then((greenlet) => {
        greenlet = greenlet.default;
        resolve(greenlet);
    });
});
