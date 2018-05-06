const TeleBot = require('./lib/telebot.js');
const bot = new TeleBot('542872609:AAExPeniw6xESTMptH-feb0mynw0dKIar00');

bot.on(['/start', '/hello'], (msg) => msg.reply.text('Selamat datang! Silakan dicoba!'));
bot.on('text', (msg) => {
  const regex = /silahkan/;
  const warning = regex.test(msg.text);
  if (warning) {
    const warningMsg = "YA AMPUN! Yang bener itu 'silakan' buka KBBI sana!";
    msg.reply.text(warningMsg);
  }
});
bot.start();
