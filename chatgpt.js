const Discord = require('discord.js');
const client = new Discord.Client();
// npm install openai
const { OpenAI } = require('openai');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

client.on('ready', () => {
  console.log(`${client.user.tag}`);
});

client.on('message', async msg => {
  if (msg.content.startsWith('!ch ')) {
    const input = msg.content.slice(4).trim();
    const response = await openai.complete({
      engine: 'davinci',
      prompt: input,
      maxTokens: 150,
      n: 1,
      stop: ['\n'],
    });
    const answer = response.data.choices[0].text.trim();
    msg.channel.send(answer);
  }
});

client.login('token');
