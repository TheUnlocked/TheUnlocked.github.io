
const encodeHTMLEntities = str => str.replace(/[\u00A0-\u9999<>\&\"]/gim, i => '&#'+i.charCodeAt(0)+';')
const getFlagStringFromData = channelData => `<img alt="!!better-mixer-desc-flags!!${encodeHTMLEntities(JSON.stringify(channelData))}" src="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png" />`;

const getChannelFlags = () => {
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

    return getFlagStringFromData(data);
};

const updateChannelCustomizationOutput = () => {
    document.getElementById('ch-desc-printout').innerHTML = encodeHTMLEntities(getChannelFlags());
}

const updateMixerDescription = async (existingWindow) => {
    const authWindow = existingWindow || window.open("", "_blank");

    if (localStorage.getItem('mixerAuthToken')) {
        try {
            const currentUserResponse = await fetch('https://mixer.com/api/v1/users/current', {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('mixerAuthToken')}`
                }
            });
            if (!currentUserResponse.ok) throw currentUserResponse;
            const currentUser = await currentUserResponse.json();
            const oldDesc = currentUser.channel.description;
            const oldFlags = /<img.*?!!better-mixer-desc-flags!!.*?>/g.exec(oldDesc)[0];
            const oldFlagsIndex = oldDesc.indexOf(oldFlags);
            let newDesc;
            if (oldFlagsIndex === -1) {
                newDesc = oldDesc.trimEnd() + '\n\n' + getChannelFlags();
            }
            else {
                const part1 = oldDesc.slice(0, oldFlagsIndex);
                const part2 = oldDesc.slice(oldFlagsIndex + oldFlags.length);
                newDesc = part1 + getChannelFlags() + part2;
            }

            authWindow.location.href = (`https://mixer.com?bettermixer-message=description&bettermixer-auth=${localStorage.getItem('mixerAuthToken')}&bettermixer-message-data=${btoa(newDesc)}`);
            setTimeout(function closedCheck() {
                if (authWindow.closed) {
                    document.getElementById('updated-at').innerText = "Updated at " + new Date();
                }
                else {
                    setTimeout(closedCheck, 100);
                }
            }, 100);
        }
        catch (e) {
            if (e.status === 401) {
                localStorage.removeItem('mixerAuthToken');
                getAuthToken(authWindow);
            }
            else {
                document.getElementById('updated-at').innerText = "Failed to update automatically. Either authorization was denied or something else broke...";
                console.log(e);
                authWindow.close();
            }
        }
    }
    else {
        getAuthToken(authWindow);
    }
}

const getAuthToken = (authWindow) => {
    const dirPath = /.*?(?:\/.*?)*(?=\/)(?:(?!.*\.)\/.+(?!\/$))?/.exec(window.location.href);
    const authUrl = `https://mixer.com/oauth/authorize?client_id=473772fa4fa6d46b0c73f2aca560215cf602d1c2e925e521&response_type=token&redirect_uri=${dirPath}/oauth_redirect.html&scope=channel:update:self`;
    
    authWindow.location.replace(authUrl);

    const oauthReturnCheck = e => {
        try { authWindow.location.hostname; } catch {
            setTimeout(oauthReturnCheck, 100);
            return;
        }
        let sp;
        if (authWindow.location.search == '') {
            sp = new URLSearchParams(authWindow.location.hash.replace('#', '?'))
        }
        else {
            sp = new URLSearchParams(authWindow.location.search);
        }
        const token = sp.get('access_token');
        if (token !== '') {
            localStorage.setItem('mixerAuthToken', token);
            updateMixerDescription(authWindow);
        }
        else {
            document.getElementById('updated-at').innerText = "Failed to update automatically. Either authorization was denied or something else broke...";
        }
    }
    setTimeout(oauthReturnCheck, 100);
}