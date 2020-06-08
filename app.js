require('dotenv').config();
const telegraf = require('telegraf');
const fetch = require('node-fetch');

const bot = new telegraf(process.env.BOT_TOKEN);

bot.command('start', async ctx => {
    await ctx.reply('<b>Welcome!</b>\nHere you can check stats about COVID-19', { parse_mode: 'HTML' });
});

bot.command('world', async ctx => {
    let worldStats = await fetch(`https://api.thevirustracker.com/free-api?global=stats`);
    worldStats = await worldStats.json();
    worldStats = worldStats.results[0];

    const message = 
    `<b>Статистика по миру</b>\n
<b>Всего случаев заражения COVID:</b> <i>${worldStats.total_cases.toLocaleString()}</i>
<b>Выздоровело:</b> <i>${worldStats.total_recovered.toLocaleString()}</i>
<b>Болеют:</b> <i>${worldStats.total_unresolved.toLocaleString()}</i>
<b>Умерло:</b> <i>${worldStats.total_deaths.toLocaleString()}</i>
<b>Новых случаев сегодня:</b> <i>${worldStats.total_new_cases_today.toLocaleString()}</i>
<b>Смертей сегодня:</b> <i>${worldStats.total_new_deaths_today.toLocaleString()}</i>`;

    console.log(worldStats);
    await ctx.reply(message, { parse_mode: 'HTML'});
})

bot.launch();