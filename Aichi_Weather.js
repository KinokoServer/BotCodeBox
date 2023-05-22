const { Client, Intents, MessageEmbed } = require('discord.js');
const axios = require('axios');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const API_KEY = 'YOUR_API_KEY'; // OpenWeatherMapAPIが必要です！

client.once('ready', () => {
  console.log('Bot is ready!'); // Botが起動した確認
});

client.on('messageCreate', async (message) => {
  if (message.content.toLowerCase() === 'a!weather') {
    try {
      const weatherData = await getWeatherData();
      const embed = createWeatherEmbed(weatherData);
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('エラーの内容 : ', error); // エラーが見つかった時にコンソールに表示する。
      message.channel.send('データの取得中にエラーが発生しました。');
    }
  }
});

async function getWeatherData() {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=Aichi&appid=${API_KEY}&units=metric`
  );
  return response.data;
}

function createWeatherEmbed(data) {
  const embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('愛知県の天気情報')
    .addField('天候', data.weather[0].description)
    .addField('気温', `${data.main.temp} °C`)
    .addField('湿度', `${data.main.humidity}%`)
    .addField('風速', `${data.wind.speed} m/s`)
    .setTimestamp();

  return embed;
}

client.login('TOKEN');
