
const Discord = require("discord.js");

const GetDatabaseData = require("../functions/getuserdata.js");
const EmojiConvert = require("../functions/emojiconvert.js");

var UserAlreadyRolling = {};
var iRollTheDiceInterval = {};

module.exports.run = async (bot, message, args) =>
{
	var GuildGetID = message.guild.id;
    var user = message.author;

	if(UserAlreadyRolling[user.id] === true)
	{
		return await message.reply(":no_entry: You are already **Rolling the dice** :game_die:, please wait until is finished! :no_entry:");
	}

	var RandomDice = Math.floor(( Math.random() * 6 ) + 1);
	var RandomNewNumber = Math.floor(( Math.random() * 6 ) + 1);

	UserAlreadyRolling[user.id] = true;

	await message.channel.send( `:game_die::game_die: :regional_indicator_r::regional_indicator_o::regional_indicator_l::regional_indicator_l:  :regional_indicator_t::regional_indicator_h::regional_indicator_e:  :regional_indicator_d::regional_indicator_i::regional_indicator_c::regional_indicator_e: :game_die::game_die:\n\n\n\n` + `													` + EmojiConvert.NumberToDiscordEmoji(RandomNewNumber) + `		\n\n\n` + `:fingers_crossed:  ***Is ${user} lucky enough to roll the dice to this number?***  :fingers_crossed:`);

	iRollTheDiceInterval[user.id] = setInterval (async function ()
	{
		if( RandomDice === RandomNewNumber )
		{
			await message.channel.send( `:four_leaf_clover: ${user} has rolled the dice and it won! **40** cookies :cookie: awarded! :four_leaf_clover:`);
			await GetDatabaseData.CookiesUpdate(GuildGetID, user.id, 40);
		}

		else
		{
			await message.channel.send( `:game_die:  ${user} has rolled the dice and it lost! He got number:  ` + EmojiConvert.NumberToDiscordEmoji(RandomDice) + "  :triumph: :triumph:");
		}

		UserAlreadyRolling[user.id] = false;
		bot.clearInterval(iRollTheDiceInterval[user.id]);

	}, 3000);
};

module.exports.help =
{
    name: "roll"
};