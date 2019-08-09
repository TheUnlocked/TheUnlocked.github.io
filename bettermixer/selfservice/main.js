
const encodeHTMLEntities = str => str.replace(/[\u00A0-\u9999<>\&\"]/gim, i => '&#'+i.charCodeAt(0)+';')
const getFlagStringFromData = channelData => `<img alt="!!better-mixer-desc-flags!!${encodeHTMLEntities(JSON.stringify(channelData))}" src="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png" />`;

const updateChannelCustomizationOutput = () => {
    const twitchUsername = document.getElementById('ch-twitch-username').value;
    const ffzSync = document.getElementById('ch-ffz-sync').checked;
    const bttvSync = document.getElementById('ch-bttv-sync').checked;
    // const twitchGlobals = document.getElementById('ch-twitch-globals').checked;
    const ffzGlobals = document.getElementById('ch-ffz-globals').checked;
    const bttvGlobals = document.getElementById('ch-bttv-globals').checked;

    const data = {};
    data.twitch = {};
    data.ffz = {};
    data.bttv = {};

    if (twitchUsername !== ""){
        data.twitch.name = twitchUsername.toLowerCase();
        data.ffz.sync = ffzSync;
        data.bttv.sync = bttvSync;
    }
    // data.twitch.globals = twitchGlobals;
    data.bttv.globals = bttvGlobals;
    data.ffz.globals = ffzGlobals;

    document.getElementById('ch-desc-printout').innerHTML = encodeHTMLEntities(getFlagStringFromData(data));
}