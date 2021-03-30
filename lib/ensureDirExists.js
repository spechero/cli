const { existsSync, mkdirSync } = require('fs');

function ensureDirExists(dir) {
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }
    return dir;
}
exports.ensureDirExists = ensureDirExists;
