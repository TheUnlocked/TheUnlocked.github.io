
const encodeHTMLEntities = str => str.replace(/[\u00A0-\u9999<>\&\"]/gim, i => '&#'+i.charCodeAt(0)+';')
const getFlagStringFromData = channelData => `<img alt="!!better-mixer-desc-flags!!${encodeHTMLEntities(JSON.stringify(channelData))}" src="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png" />`;

const updateChannelCustomizationOutput = () => {
    const twitchUsername = document.getElementById('ch-twitch-username').value;
    const ffzSync = document.getElementById('ch-ffz-sync').checked;
    const bttvSync = document.getElementById('ch-bttv-sync').checked;

    const data = {};

    if (twitchUsername !== ""){
        data.twitch = {};
        data.twitch.name = twitchUsername.toLowerCase();

        data.ffz = {};
        data.ffz.sync = ffzSync;

        data.bttv = {};
        data.bttv.sync = bttvSync;
    }

    document.getElementById('ch-desc-printout').innerHTML = encodeHTMLEntities(getFlagStringFromData(data));
}