
const Discord = require("discord.js");
const getJSON = require("get-json");

const szAPIKey = "Your NASA Api Key here";

module.exports.run = async (bot, message, args) =>
{
	var user = message.author;

	var szRandomEarthEmoji = [":earth_africa:", ":earth_americas:", ":earth_asia:"];
	var szRandomEarthObjects = [":comet:", ":eight_pointed_black_star:", ":black_circle:", ":sparkler:", ":space_invader:"];

    message.channel.startTyping();

	await getJSON("https://api.nasa.gov/neo/rest/v1/feed/today?detailed=false&api_key=" + szAPIKey, async function(error, response)
	{
		if(error)
		{
			return await message.channel.send(":no_entry: Sorry, something went wrong while fetching NASA API... :no_entry:").then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
		}

		var iCountObjects = JSON.stringify(response.element_count).replace(/"/g, '');

		const embed = new Discord.RichEmbed()
		.setAuthor("Cookie Monsta | NASA Near Earth Object", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
		.setColor("#D2691E")
		.setDescription("There are **" + parseInt(iCountObjects) + "** near-earth " + szRandomEarthEmoji[Math.floor(Math.random() * szRandomEarthEmoji.length)] + " objects " + szRandomEarthObjects[Math.floor(Math.random() * szRandomEarthObjects.length)] + " circulating around the globe right now!")
		.setThumbnail("https://i.imgur.com/lprxAaW.png")
		.setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
		.setTimestamp()

		await message.channel.send({embed}).then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
	});
};

module.exports.help =
{
	name: "nearearth"
};