const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.MEMBERS] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('presenceUpdate', (oldPresence, newPresence) => {
    const guild = client.guilds.cache.get('サーバーID');
    const member = guild.members.cache.get(newPresence.userID);

    if (newPresence.status === 'offline' && member.roles.cache.size === 1) {
        member.kick('オフラインになりました。').then(() => {
            console.log(`${member.user.tag}は、オフラインになったためKickを執行しました。`);
        }).catch((err) => {
            console.error(`${member.user.tag}は、${err}が原因でKickを執行できませんでした。`);
        });
    }
});

client.login('TOKEN');
