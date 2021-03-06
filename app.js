const Discord = require('discord.js');
const config = require('./config.json');
const Mock = require('./meme/mock');
const GeneratorMeme = require('./GenerateMeme');
const GeneratorVideo = require('./GenerateVideo');
const { sleep, downloadImage } = require('./utility/helper');

const client = new Discord.Client();
const generatorMeme = new GeneratorMeme();

const prefix = config.prefix;

client.on('ready', () => {
  console.log(`471 is serving! 🚀`);
});

client.on('message', async message => {
  if (message.author.bot) return;

  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const texts = commandBody.split(' ');
  const command = texts[1].toLowerCase();

  if (command === 'mock') {
    const text = texts.slice(2).join(' ');
    const mockText = new Mock(text);
    const imagePath = await generatorMeme.generateMeme(
      'mocthistweet',
      mockText.mockText()
    );
    message.reply({ files: [imagePath] });
  }

  if (command === 'tubir') {
    const text = texts.slice(2).join(' ');
    const imagePath = await generatorMeme.generateMeme('tubirfess', text);
    message.reply({ files: [imagePath] });
  }

  if (command === 'fwb') {
    const text = texts.slice(2).join(' ');
    const imagePath = await generatorMeme.generateMeme('fwbase', text);
    message.reply({ files: [imagePath] });
  }

  if (command === 'coeg') {
    const n = Math.floor(Math.random() * 3);
    const replies = ['bjirrr', 'lorttt', 'jahhh'];
    message.reply(replies[n]);
  }

  if (command === 'ketawa') {
    let url = null;

    if (message.attachments.size > 0) {
      message.attachments.map(attachment => {
        url = attachment.url;
      });
    } else {
      url = texts[texts.length - 1];
    }

    await downloadImage(url);
    const generatorImage = new GeneratorVideo(
      './audio/laugh.mp3',
      './img/imgAudio.png'
    );
    generatorImage.generateVideo(message);
  }
});

client.login(config.BOT_TOKEN);
