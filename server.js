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
  function replyMessage(message){
    console.log('replying to ' + msg.from.username + ': ' + message)
    msg.reply.text(message, {asReply: true, parseMode: 'markdown', webPreview: false})
  }

  console.log('(' + msg.chat.type + ' - ' + msg.chat.title + ') ' + msg.from.username + ': ' + msg.text)

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
    replyMessage("YA AMPUN! Yang bener itu *" + wrongs.join('*, *') + "*. Buka [KBBI](https://www.kbbi.web.id/" + wrongs[0] + ") sana!");
    return;
  }

  // sentient bot
  if( msg.text.match(new RegExp('(shit|n(u|oo)b) bot','i')) ) {
    replyMessage('no u');
    return;
  }

  // dad bot
  if( dadText = msg.text.match(new RegExp('(?:\\n|^)i\'? ?a?m\\s(.*)(?:\\n|$)'),'i') ){
    replyMessage('hi ' + dadText[1] + ', I\'m Zelda!');
    return;
  }

});

bot.start();
