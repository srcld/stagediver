const shelljs = require('shelljs'),
    {log} = console;

const libary = {
    run: (cmd = '') => {
        const execObj = shelljs.exec(cmd);
        return execObj.code === 0;
    }
}

const neededPackages = ['wget', 'tar'];

const checkSystem = function () {
    console.log('----------------')
    log('SYSTEM CHECK')
    return neededPackages.map((p) => {
        log('CHECKING FOR ' + p);
        return libary.run('which ' + p);
    }).filter((i) => i === false).length === 0;
}

const createStage = function (stageFolderName = 'stage') {
    libary.run('rm -rf ' + stageFolderName);
    libary.run('mkdir ' + stageFolderName);
    // TODO system check - windows or linux
    libary.run('cd ' + stageFolderName + ' && mkdir installer');
    recipe.system.map((remoteFileUrl) => {
        libary.run('cd ' + stageFolderName + ' && cd installer && wget ' + remoteFileUrl);
    })
}

const recipe = {
    system: [],
    modules: ['']
}

const canRun = checkSystem();
if (canRun) {
    console.log('SYSTEM CHECK: OK')
    console.log('----------------')
    console.log('INSTALL')
    createStage('devStage');
}