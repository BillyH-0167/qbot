import { robloxClient } from '../main';
import { config } from '../config';
import { BloxlinkResponse } from '../structures/types';
import axios from 'axios';
let requestCount = 0;

const getLinkedRobloxUser = async (discordId: string, guildId?: string) => {
    if(requestCount >= 60) return null;
    requestCount += 1;
    let robloxStatus: BloxlinkResponse;
    if(guildId) {
        robloxStatus = (await axios.get(`https://v3.blox.link/developer/discord/${discordId}`,{
headers: {
"api-key": config.BloxlinkAPIKey
}
})).data;
    } else {
        robloxStatus = (await axios.get(`https://v3.blox.link/developer/discord/${discordId}`,{
headers: {
"api-key": config.BloxlinkAPIKey
}
})).data;
}
    if(robloxStatus.success !== true) return null;
    const robloxUser = await robloxClient.getUser(robloxStatus.user.primaryAccount);
    return robloxUser;
}

const refreshRateLimits = () => {
    requestCount = 0;
    setTimeout(refreshRateLimits, 60000);
}
setTimeout(refreshRateLimits, 60000);

export { getLinkedRobloxUser };
