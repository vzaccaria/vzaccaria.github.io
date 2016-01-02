import debug from 'debug';

function getDebug(name) {
    return debug(`app:${name}`);
}

window.$mine = {
    enableDebug: () => {
        debug.enable('app:*');
    },

    disableDebug: () => {
        debug.disable('app:*');
    }
}

module.exports = getDebug
