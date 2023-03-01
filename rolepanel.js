const Discord = require('discord.js');

// この例では、2つの役職ロールを使用します
const roles = {
  blue: '青色ロールのID',
  red: '赤色ロールのID'
};

// Embedを作成する関数
function createEmbed() {
  const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('役職選択')
    .setDescription('以下のリアクションをクリックして、自分に役職を付与してください。\n\n'
      + `${'🔵'} : 青色ロールを追加\n`
      + `${'🔴'} : 赤色ロールを追加\n`);

  return embed;
}

// Discordクライアントを作成
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  // メッセージが送信されたチャンネルがDMチャンネルである場合、リアクションを付けるEmbedを送信する
  if (message.channel.type === 'dm') {
    const embed = createEmbed();
    message.author.send(embed)
      .then(sentEmbed => {
        // Embedに2つのリアクションを追加
        sentEmbed.react('🔵');
        sentEmbed.react('🔴');
      })
      .catch(error => {
        console.error(`Could not send embed to ${message.author.tag}. Error: ${error}`);
      });
  }
});

// リアクションが追加された場合の処理
client.on('messageReactionAdd', (reaction, user) => {
  // リアクションを付けたのがBotの場合、何もしない
  if (user.bot) {
    return;
  }

  // 追加されたリアクションが指定したリアクションの場合、対応する役職ロールをユーザーに付与する
  if (reaction.emoji.name === '🔵') {
    const role = reaction.message.guild.roles.cache.get(roles.blue);
    if (role) {
      reaction.message.guild.member(user).roles.add(role);
    }
  } else if (reaction.emoji.name === '🔴') {
    const role = reaction.message.guild.roles.cache.get(roles.red);
    if (role) {
      reaction.message.guild.member(user).roles.add(role);
    }
  }
});

client.token("token");
