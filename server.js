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
  console.log('(' + msg.chat.type + ' - ' + msg.chat.title + ') ' + msg.from.username + ': ' + msg.text)
  if( msg.text.match(new RegExp('(shit|n(u|oo)b) bot','i')) ) {
    msg.reply.text('no u', {asReply: true});
    return;
  }

  wrongs = []

  // substring check
  Object.entries(wordList.substring).forEach(
    ([correct, wrong]) => {
      if( msg.text.match(new RegExp(wrong,'i')) ){
        wrongs.push(correct)
      }
    }
  );

  // fullword check
  Object.entries(wordList.fullword).forEach(
    ([correct, wrong]) => {
      if( msg.text.match(new RegExp('([^a-zA-Z]|^)' + wrong + '([^a-zA-Z]|$)','i')) ){
        wrongs.push(correct)
      }
    }
  );

  if( wrongs.length ) {
    const warningMsg = "YA AMPUN! Yang bener itu *" + wrongs.join('*, *') + "*. Buka [KBBI](https://www.kbbi.web.id/" + wrongs[0] + ") sana!";
    msg.reply.text(warningMsg, { asReply: true, parseMode: 'markdown', webPreview: false });
  }

});

bot.start();
