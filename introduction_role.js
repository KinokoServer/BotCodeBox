const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const channelID = '自己紹介のチャンネルID';
const roleID = '付与したい役職ID';
const announceID = '役職付与したログを発信するID'

client.on('ready', () => {
  console.log(`Login Bot: ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.channel.id !== channelID) return; // 指定されたチャンネル以外のメッセージは無視する

  /*
  名前：
  趣味：
  一言：
  というテンプレートを使うことにより、役職付与するようにする。
  */
  const regex = /^名前：(.+)\n趣味：(.+)\n一言：(.+)$/s;
  const matches = message.content.match(regex);

  if (!matches) return; // メッセージが指定されたフォーマットに一致しない場合は無視する

  const [_, name, hobby, comment] = matches;

  const member = message.member;
  await member.roles.add(roleID); // メッセージを送信したユーザーに指定された役職を付与する

  client.channels.cache.get(announceID).send(`${name}さん(${member.user.tag})に認証ロールを付与しました。`); // 役職付与したログメッセージ
});

client.login('TOKEN'); // TOKENを設定する