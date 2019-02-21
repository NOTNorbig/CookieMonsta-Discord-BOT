
const CustomFunctions = require("../functions/funcs.js");

var bAlreadyPlayingTTS = false;

module.exports.run = async (bot, message, szArgs) =>
{
    var user = message.author;

	if(CustomFunctions.isEmpty(szArgs[0]))
	{
		return await message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Type **!tts** ``<your text here>`` :no_entry:");
	}

	if(bAlreadyPlayingTTS === true)
    {
        return await message.reply(" :no_entry: man you're too spicy! I am already translating a **TTS** :loud_sound:  :no_entry:" );
    }

	var ArgumentText = szArgs.join(" ");

	if(ArgumentText.length >= 1024)
	{
		return await message.reply(" :no_entry: please don't exceed **1024** characters in your text! :no_entry:");
	}

	if(message.mentions.members.first())
	{
		return await message.reply(" :no_entry: please don't mention people in your text! :no_entry:");
	}
	
	const voiceChannel = message.member.voiceChannel;

	if(!voiceChannel)
	{
		return await message.reply(" :no_entry: hey man, I can't just play music through your speakers magically. Could you like.. connect to a voice channel? :mute:  :no_entry:");
	}

	if(!voiceChannel.joinable)
	{
		return await message.reply(" :no_entry: I can't join the channel you're in :mute:  :no_entry:" );
	}

	var szTextToSpeech = "http://tts.cyzon.us/tts?text=" + ArgumentText;

	if(voiceChannel)
	{
		await voiceChannel.join().then(async function (connection)
		{
            bAlreadyPlayingTTS = true;
			var iDispatcher = await connection.playArbitraryInput(encodeURI(szTextToSpeech));

			iDispatcher.on("end", end =>
			{
                bAlreadyPlayingTTS = false;
				voiceChannel.leave();
			});

			iDispatcher.on("error", end =>
			{
                bAlreadyPlayingTTS = false;
				voiceChannel.leave();
			});
		})
		.catch(err => console.log(err));

		await message.react("🗣");
	}
};

module.exports.help =
{
    name: "tts"
};