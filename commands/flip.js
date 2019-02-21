
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>
{
    var user = message.author;

    var CoinFlip = Math.round(Math.random());
    var CoinImageNumber, CoinTextNumber;

    switch(CoinFlip)
    {
        case 0:
            CoinImageNumber = "https://i.imgur.com/NFsWEaw.png";
            CoinTextNumber = "HEAD ( ͡° ͜ʖ ͡°)";

            break;

        case 1:
            CoinImageNumber = "https://i.imgur.com/zXJ9usj.png";
            CoinTextNumber = "TAIL"

            break;
    }

    const embed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | Coin Flip", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor(14667180)
    .setDescription("You got :point_right:  ***" + CoinTextNumber + "***")
    .setImage(CoinImageNumber)
    .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

    await message.channel.send({embed});
};

module.exports.help =
{
    name: "flip"
};