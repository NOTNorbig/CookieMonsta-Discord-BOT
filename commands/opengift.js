
const Discord = require("discord.js");
const GetDatabaseData = require("../functions/getuserdata.js");

var iUnwrapTimer = {};

var iRandomCookiesPresent =
[
	"300", "400", "450", "500", "550",
	"600", "650", "750", "800", "850",
	"900", "950", "1000", "1250", "2000"
];

module.exports.run = async (bot, message, args) =>
{
	var user = message.author;

	if(bAlreadyOpeningGift[user.id] === true)
	{
		return await message.delete().catch(() => {});
	}

	if(bUserHasGift[user.id] === 0)
	{
		return await message.reply(" you don't have any gift :gift: to open! It probably expired or you haven't received one yet! :pensive:");
	}

	const embed = new Discord.RichEmbed()
	.setAuthor("Cookie Monsta | Unwrapping your gift...", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
	.setColor("#00BFFF")
	.setDescription("Hang on tight while I'm unwrapping your gift...")
	.setThumbnail("https://i.imgur.com/hNALLLd.png")

	await message.channel.send({embed}).then(async msg =>
	{
		iUnwrapTimer[user.id] = setInterval (async function ()
		{
			var GenerateRandomCookies = parseInt(iRandomCookiesPresent[Math.floor(Math.random() * iRandomCookiesPresent.length)]);

			await GetDatabaseData.CookiesUpdate(message.guild.id, user.id, GenerateRandomCookies);

			const embed = new Discord.RichEmbed()
			.setAuthor("Cookie Monsta | Congratulations!", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
			.setColor("#00BFFF")
			.setDescription("***OMNOMNOMNOM!***\n\n\n" + user + " this gift box :gift: contained **" + GenerateRandomCookies + "** cookies :cookie: !")
			.setThumbnail("https://i.imgur.com/hNALLLd.png")

			await msg.edit({embed});

			bUserHasGift[user.id] = 0;
			bAlreadyOpeningGift[user.id] = false;

			bot.clearInterval(iUnwrapTimer[user.id]);

		}, 5 * 1000);
	});

	bAlreadyOpeningGift[user.id] = true;
};

module.exports.help =
{
    name: "opengift"
};