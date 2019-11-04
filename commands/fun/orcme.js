const Discord = require("discord.js");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, args) =>
{
    let OrcNameGenerated = "";
    let RandomOrcNameArray = [];

    RandomOrcNameArray[0] = CustomFunctions.GenerateOrcName();
    RandomOrcNameArray[1] = CustomFunctions.GenerateOrcName();
    RandomOrcNameArray[2] = CustomFunctions.GenerateOrcName();

    const ChanceToHave3Names = Math.floor((Math.random() * 3) + 1);
    
    if(ChanceToHave3Names === 3)
    {
        OrcNameGenerated = "<:orc:635178458720239617> **" + RandomOrcNameArray[0] + " " + RandomOrcNameArray[1] + " " + RandomOrcNameArray[2] + "** <:orc:635178458720239617>";
    }

    else
    {
        OrcNameGenerated = "<:orc:635178458720239617> **" + RandomOrcNameArray[0] + " " + RandomOrcNameArray[1] + "** <:orc:635178458720239617>";
    }

    const user = message.author;

    const DiscordRichEmbed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | Your Orc Name Is", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor(2263842)
    .setDescription(OrcNameGenerated)
    .setThumbnail("https://i.imgur.com/nygjC55.png")
    .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

    await message.channel.send({ embed: DiscordRichEmbed })
};

module.exports.help =
{
    name: "orcme"
};