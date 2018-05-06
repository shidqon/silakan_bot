const TeleBot = require('./lib/telebot.js');
const bot = new TeleBot({
  token: '542872609:AAExPeniw6xESTMptH-feb0mynw0dKIar00',
  polling: {
    interval: 500, // Optional. How often check updates (in ms).
  },
});

const wordList = require('read-yaml').sync('wordlist.yml');

console.log(wordList)

bot.on('text', (msg) => {
  console.log(msg.from.username + ': ' + msg.text)

  wrongs = []

  Object.entries(wordList.substring).forEach(
    ([wrong, correct]) => {
      if( msg.text.match(new RegExp(wrong,'i')) ){
        wrongs.push(correct)
      }
    }
  );

  if( wrongs.length ) {
    const warningMsg = "YA AMPUN! Yang bener itu " + wrongs.join(', ') + ". Buka KBBI sana!";
    msg.reply.text(warningMsg, { asReply: true });
  }
});

bot.start();
