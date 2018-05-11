const TeleBot = require('./lib/telebot.js');
const bot = new TeleBot({
  token: '542872609:AAExPeniw6xESTMptH-feb0mynw0dKIar00',
  polling: {
    interval: 500, // Optional. How often check updates (in ms).
  },
});

const wordList = require('read-yaml').sync('wordlist.yml');

console.log(wordList)

function replyMessage(replyTo, message, parseMode = 'markdown'){
  console.log('replying to ' + replyTo.from.username + ': ' + message)
  replyTo.reply.text(message, {asReply: true, parseMode: parseMode, webPreview: false})
}

bot.on(['text', 'forward'], (msg) => {
  console.log('(' + msg.chat.type + ' - ' + msg.chat.title + ') ' + msg.from.username + ': ' + msg.text)

  var wrongs = []

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
    replyMessage(msg, "YA AMPUN! Yang bener itu *" + wrongs.join('*, *') + "*. Buka [KBBI](https://www.kbbi.web.id/" + wrongs[0] + ") sana!");
    return;
  }

  // sentient bot
  if( msg.text.match(new RegExp('(s+h+i+t+|n+(u+|o+)b+) bot', 'i')) ) {
    replyMessage(msg, 'no u');
    return;
  }
  if( msg.text.match(new RegExp('zelda.*kan.*cewe', 'i')) ) {
    replyMessage(msg, 'oh gitu ya');
    return;
  }


  // dad bot
  if( dadText = msg.text.match(new RegExp('(?:\\n|^)i\'? ?a?m\\s(.*)(?:\\n|$)','i')) ){
    replyMessage(msg, 'hi ' + dadText[1] + ', I\'m Zelda!');
    return;
  }
});


// emojis
Object.entries(wordList.emojis).forEach(
  ([keyword, emoji]) => {
    bot.on('/' + keyword, (msg) => {
      replyMessage(msg, emoji, 'html');
    })
  }
)

bot.start();
