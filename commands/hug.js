
const Discord = require("discord.js");
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
		return await message.reply(`are you that lonely? :sob: Come here bro :hugging:`);
	}

	message.channel.startTyping();

	var GetUserAvatar = (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL;
	var GetTargetAvatar = (GuildMember.user.avatarURL === null) ? GuildMember.user.defaultAvatarURL : GuildMember.user.avatarURL;

	var i1 = Jimp.read(GetTargetAvatar);
	var i2 = Jimp.read(GetUserAvatar);
	var i3 = Jimp.read("./BOTImages/Hugs/hugpat.png");

	Promise.all([i1, i2, i3]).then(async images =>
	{
		await images[0].resize(120, Jimp.AUTO).quality(100).rotate(-330);
		await images[1].resize(120, Jimp.AUTO).quality(100).rotate(65).flip(true, false);

		await images[2].composite(images[0], 33, 19).composite(images[1], 132, 117).quality(100).dither565().getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
		{
			if(err)
			{
				return console.log("[+] Log Report [+] ---> Whoops! There is your error: " + err).then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
			}

			await message.channel.send("<:sadpepe:415491352193794060> Hello darkness my old friend... <:sadpepe:415491352193794060> \n\n**" + user.username + "** sends a hug to **" + GuildMember.user.username + "**!", { files: [buffer] }).then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
		});
	});
};

module.exports.help =
{
    name: "hug"
};