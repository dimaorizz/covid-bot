require('dotenv').config();
const telegraf = require('telegraf');

const bot = new telegraf(process.env.BOT_TOKEN);

bot.command('start', async ctx => {
    ctx.reply('<b>Welcome!</b>\nHere you can check stats about COVID-19', { parse_mode: 'HTML' });
});

bot.launch();