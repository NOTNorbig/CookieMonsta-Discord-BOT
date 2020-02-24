const Discord = require("discord.js");
const Jimp = require("jimp");

module.exports.run = async (bot, message, args) =>
{
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return await message.reply(" :no_entry: not happening! Please mention a valid member of this server! :facepalm:  :no_entry:");
    }

    await message.channel.startTyping();

    let GetUserAvatar = (GuildMember.user.avatarURL === null) ? GuildMember.user.defaultAvatarURL : GuildMember.user.avatarURL;

    let i1 = await Jimp.read(GetUserAvatar);
    let i2 = await Jimp.read("./BOTImages/Wanted/wanted.png");

    await Promise.all([i1, i2]).then(async (images) =>
    {
        await images[0].resize(450, 442).quality(100);
        await images[1].composite(images[0], 140, 354).quality(100).getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
        {
            if(err)
            {
                console.log("\x1b[31m*\x1b[0m Error creating \x1b[33m(Most Wanted)\x1b[0m meme: \x1b[31m" + err + "\x1b[0m");
            }

            await message.channel.send(new Discord.Attachment(buffer, "wanted.png")).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
        });
    });
};

module.exports.help =
{
    name: "wanted"
};