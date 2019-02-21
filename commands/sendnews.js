
const Discord = require("discord.js");

const CustomFunctions = require("../functions/funcs.js");
const GetChannelDefault = require("../functions/defaultchannel.js");

var RandomEmojiNews =
[
	":smiley:", ":yum:", ":sweat_smile:", ":upside_down:", ":blush:", ":slight_smile:", ":smirk:", ":boy:", ":v:", ":ok_hand:", ":call_me:"
];

module.exports.run = async (bot, message, szArgs) =>
{
	var user = message.author;

	if(user.id !== "266677298051153920")
	{
		return await message.reply(" :no_entry_sign: you're not the Dev pleb :facepalm:  :no_entry_sign:");
	}

	if(CustomFunctions.isEmpty(szArgs[0]))
	{
		return await message.reply(" :no_entry: you need to enter a message in order to send it! :no_entry:");
	}

	var NewsTextFromDev = szArgs.join(" ");
	var guildList = bot.guilds.array();

	try
	{
		guildList.forEach(guild =>
		{
			let channel = GetChannelDefault.getDefaultChannel(guild);

			if(channel && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
			{
				const embed = new Discord.RichEmbed()
				.setAuthor("Cookie Monsta | Announcement Board!", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
				.setColor(16777215)
				.setDescription(":label: **From:** " + user.tag + "\n\n\n:desktop: **To:** All guilds." + "\n\n\n\n" + ":newspaper: **Message:** " + NewsTextFromDev + " " + RandomEmojiNews[Math.floor(Math.random() * RandomEmojiNews.length)] + "\n")
				.setThumbnail("https://i.imgur.com/Lfm6maV.jpg")
				.setTimestamp()
				.setFooter("This message has been sent to every guild!")

				channel.send({embed});
			}
		});
	}

	catch(err)
	{
		console.log("Could not send message to: " + guild.name);
	}
};

module.exports.help =
{
    name: "sendnews"
};