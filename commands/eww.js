
const Discord = require("discord.js");

const gm = require("gm").subClass({ imageMagick: true });
const Jimp = require("jimp");

module.exports.run = async (bot, message, args) =>
{
	var user = message.author;
	let GuildMember = message.mentions.members.first();

	if(!GuildMember)
	{
		return await message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
	}

	if(GuildMember.user === user)
	{
		return await message.reply("eww, but... why? :facepalm:");
	}

	message.channel.startTyping();

	var EwwImagePath = "./BOTImages/DankEww";
	var EwwImage = "ewww.png";

	var FontSize = (GuildMember.user.username.length >= 20) ? 14 : 20;

	await gm(EwwImagePath + "/" + EwwImage)
	.font("Helvetica.ttf", FontSize)
	.fill("#111111")
	//.stroke("#800000")
	.draw(["rotate -55 text -430, 480 '" + GuildMember.user.username.trim() + "'"])
	.toBuffer(EwwImage, async function (err, buffer)
	{
		if(err)
		{
			return console.log("[+] Log Report [+] ---> Whoops! There is your error: " + err).then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
		}

		await message.channel.send(new Discord.Attachment(buffer, EwwImage)).then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
	});
};

module.exports.help =
{
    name: "eww"
};