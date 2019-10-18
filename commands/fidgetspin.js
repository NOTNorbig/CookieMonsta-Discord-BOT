const Discord = require("discord.js");
const GetDatabaseData = require("../functions/getuserdata.js");

let UserAlreadySpinningFidget = {};
let iSpinnerTimer = {};

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    if(UserAlreadySpinningFidget[user.id] === true)
    {
        return await message.reply(":no_entry: you are already spinning a **Fidget Spinner**! Wait until it stops :alarm_clock: !  :no_entry:");
    }

    let szEmbedColor = "#" + (Math.random() * 0xFFFFFF << 0).toString(16);

    const DiscordRichEmbed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | Fidget Spinner", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor(szEmbedColor)
    .setDescription(user + " is spinning a fidget spinner... :ok_hand::joy:")
    .setThumbnail("https://i.imgur.com/4r5GF8R.gif")
    .setFooter("Spinner started for: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
    .setTimestamp()

    let SpinningMessage = await message.channel.send({ embed: DiscordRichEmbed });

    let iSpinTimeout = (Math.random() * (60 - 5 + 1)) + 5;

    UserAlreadySpinningFidget[user.id] = true;

    iSpinnerTimer[user.id] = setInterval (async function ()
    {
        if(iSpinTimeout.toFixed(0) >= 40)
        {
            const DiscordRichEmbed1 = new Discord.RichEmbed()
            .setAuthor("Cookie Monsta | Fidget Spinner", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
            .setColor(szEmbedColor)
            .setDescription(`${user} spinned the fidget spinner for **${iSpinTimeout.toFixed(2)}** seconds!  :stopwatch:\n\nAs a reward, it got **400** cookies :cookie: !`)
            .setThumbnail("https://i.imgur.com/1DmYV7k.jpg")
            .setFooter("Spinner ended for: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
            .setTimestamp()

            await SpinningMessage.edit({ embed: DiscordRichEmbed1 });
            await GetDatabaseData.CookiesUpdate(message.guild.id, user.id, 400);
        }

        else
        {
            const DiscordRichEmbed2 = new Discord.RichEmbed()
            .setAuthor("Cookie Monsta | Fidget Spinner", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
            .setColor(szEmbedColor)
            .setDescription(`${user} spinned the fidget spinner for **${iSpinTimeout.toFixed(2)}** seconds!  :stopwatch:`)
            .setThumbnail("https://i.imgur.com/1DmYV7k.jpg")
            .setFooter("Spinner ended for: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
            .setTimestamp()
            await SpinningMessage.edit({ embed: DiscordRichEmbed2 });
        }

        UserAlreadySpinningFidget[user.id] = false;
        bot.clearInterval(iSpinnerTimer[user.id]);

    }, iSpinTimeout * 1000);
};

module.exports.help =
{
    name: "fidgetspin"
};