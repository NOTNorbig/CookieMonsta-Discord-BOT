
const CookieMonsta = require("../CookieMonstaBOT.js");

const DatabaseImport = require("../database/database.js");
const SpamCmd = require("../events/message.js");
const chalk = require("chalk");

const iDiscordBotsToken = "your DiscordBots.org token here";

const DBL = require("dblapi.js");
const dbl = new DBL(iDiscordBotsToken, CookieMonsta.iDiscordClient);

let AsciiArt = "\n\n\t\t\t\t\tStarting process:\n\n  #####                                   #     #                                   \n #     #  ####   ####  #    # # ######    ##   ##  ####  #    #  ####  #####   ##   \n #       #    # #    # #   #  # #         # # # # #    # ##   # #        #    #  #  \n #       #    # #    # ####   # #####     #  #  # #    # # #  #  ####    #   #    # \n #       #    # #    # #  #   # #         #     # #    # #  # #      #   #   ###### \n #     # #    # #    # #   #  # #         #     # #    # #   ## #    #   #   #    # \n  #####   ####   ####  #    # # ######    #     #  ####  #    #  ####    #   #    # \n                                                                                    \n\n\n";

const AvatarUpdateTime = 5			// BOT Avatar change every 5 minutes

const RandomBotAvatars =
[
	"./BOTImages/BOTAvatar/cookie1.png",
	"./BOTImages/BOTAvatar/cookie2.jpg",
	"./BOTImages/BOTAvatar/cookie3.png",
	"./BOTImages/BOTAvatar/cookie4.png",
	"./BOTImages/BOTAvatar/cookie5.png",
	"./BOTImages/BOTAvatar/cookie6.png"
];

global.bUserHasGift = {};
global.bAlreadyOpeningGift = {};

module.exports = bot =>
{
	console.log(chalk.blue(AsciiArt));

	console.log(chalk.yellowBright(`[+] Log Report [+] Cookie Monsta [BOT] has started, with [${bot.users.size}] users, in [${bot.channels.size}] channels of [${bot.guilds.size}] guilds.`));
	console.log(chalk.yellowBright(`[+] Log Report [+] --> Setting automatic avatar change for [BOT] @` + AvatarUpdateTime + ` minutes interval`));

	//console.log(iDiscordClient.commands);

	bot.user.setStatus("dnd");
	bot.user.setActivity("If you type !help for info.", { type: 'WATCHING' }).catch(() => {});

    iAvatarUpdateInterval = setInterval (function ()
	{
		let iRandomAvatar = RandomBotAvatars[Math.floor(Math.random() * RandomBotAvatars.length)];

		bot.user.setAvatar(iRandomAvatar);
		console.log(chalk.yellowBright(`[+] Log Report [+] --> Automatic avatar changed to: ` + iRandomAvatar));

	}, AvatarUpdateTime * 60000);

    iStatusUpdateInterval = setInterval (function ()
	{
		const ActivityUpdate =
		[
			["If you type !help for info.", 'WATCHING'],
			["On: (" + bot.guilds.size + ") servers.", 'WATCHING'],
			["🍪 ME WANT COOKIES 🍪", 'PLAYING'],
			["If you type !hello to say hi to me", 'LISTENING'],
			["!help | 🍪  Munching cookies...", 'PLAYING'],
			["I wonder where is Elmo", 'PLAYING'],
			["Onion rings are just vegetable donuts.", 'WATCHING'],
			["OMM NOM NOM NOM.", 'LISTENING'],
			["Thinking about cookies... 🍪", 'WATCHING'],
			["#CONTROLMESELF", 'PLAYING'],
			["Soon new things will come to life.", 'LISTENING'],
			["Early bird gets the worm. But cookie taste better than worm.", 'LISTENING'],
			["Sometimes I think, what is friend? 🍪", 'PLAYING'],
			["COOKIES? 👀", 'WATCHING'],
			["Over (" + bot.users.size + ") users.", 'WATCHING'],
			["(" + bot.users.size + ") user requests 👂", 'LISTENING'],
			["Save the EARTH! It's the only planet with cookies! 🍪", 'PLAYING'],
			["If you want to steal me cookies?! 🍪🍪🍪 👀", 'WATCHING'],
			["(Ginger Pubes DUBSTEP) 🔊", 'LISTENING'],
			["Some questionable command requests", 'WATCHING'],
			["!sound list | 🔊", 'LISTENING'],
			["#WITHMESELF", 'PLAYING']
		];

		let StatusArray = ActivityUpdate[Math.floor(Math.random() * ActivityUpdate.length)];

		bot.user.setActivity(StatusArray[0], { type: StatusArray[1] }).catch(() => {});

	}, 1 * 60000);

    DatabaseImport.InitialiseDatabase();

	// --| Assign to everyone gift to 0
	for(user of bot.users)
	{
		if(!user[1].bot)
		{
		   bUserHasGift[user[1].id] = 0;
		   bAlreadyOpeningGift[user[1].id] = false;
	   	}
	}

	// --| DiscordBots.org Stuff here
	// --| Update Discord Bots stats every 30 mins
	setInterval(() =>
	{
		dbl.postStats(bot.guilds.size);

    }, 900000);

	dbl.postStats(bot.guilds.size);
};

// --| Optional DiscordBots.org events here
dbl.on('error', e =>
{
 	console.log(`[+] Log Report [+] --> Whoopsie! DiscordBots.org (DBL) Error: ${e}`);
});

dbl.on('posted', () =>
{
	console.log("[+] Log Report [+] --> DiscordBots.org (DBL) Server Count Updated! :)");
});
