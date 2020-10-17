const KeyGrip = require('keyGrip');
const keys = require('../../config/keys');
const Buffer = require(`safe-Buffer`).Buffer;

module.exports = (user) => {
    const sessionObject = {
        passport: {
            user: user._id.toString()
        }
    };
    const session = Buffer.from(
        JSON.stringify(
            sessionObject)
    ).toString('base64');
    const keyGrip = new KeyGrip([keys.cookieKey]);
    const sig = keyGrip.sign("session=" + session);

    return { session, sig };
}