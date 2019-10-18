const Discord = require("discord.js");

module.exports = async (bot, guild) =>
{
	/*
	if(guild.deleted === true)
	{
		let channel = getDefaultChannel(guild);

		if(channel && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
		{
			const embed = new Discord.RichEmbed()
			.setAuthor("Cookie Monsta | Thank you for trying!", (iDiscordClient.user.avatarURL === null) ? iDiscordClient.user.defaultAvatarURL : iDiscordClient.user.avatarURL)
			.setColor(2003199)
			.setDescription("Thank you for trying my **Cookie Monsta** bot.\nI'm sorry that you weren't happy with my bot :disappointed_relieved:\n\nHe told me to drop a cookie :cookie: here for you.")
			.setThumbnail((iDiscordClient.user.avatarURL === null) ? iDiscordClient.user.defaultAvatarURL : iDiscordClient.user.avatarURL)

			channel.send({embed}).then(function (message)
			{
				message.react("🍪");
				message.react(":cookiemonsta:634866060465537034);
			});
		}
	}
	*/

    const DiscordRichEmbed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | Left the guild: (" +  guild.name + ")", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor(14423100)
    .setThumbnail((guild.iconURL === null) ? guild.owner.user.defaultAvatarURL : guild.iconURL)
    .setDescription(":speaking_head::loudspeaker: I have left the guild: **(" + guild.name + ")**")
    .setFooter("Now in #" + bot.guilds.size + " guilds!")
    .setTimestamp()

    await bot.channels.get("634842132808597505").send({ embed: DiscordRichEmbed });
};