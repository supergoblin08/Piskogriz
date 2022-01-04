const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const Firebase = require('firebase-admin');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"], ws: { properties: { $browser: "Discord iOS" }} })
const commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('готов');
	client.user.setActivity('бебру на ' + client.guilds.cache.size + " серверах | .man [комманда]" , {
		 type: 'PLAYING',
		 url: 'https://www.youtube.com/watch?v=4Cp6mN1ldeE'
	});
});

client.on('messageCreate', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	if (message.author.id == "782570421303771166") {
		if (message.attachments.size > 0) {
			message.delete()
		}
		return;
	}

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!commands.has(command)) return;

	try {
		commands.get(command).execute(message, args, commands);
	} catch (error) {
        const crutch = ['``',error,'``']

		console.error(error);
		message.reply(crutch.join("`"));
	}
});

client.on("guildCreate", guild => {
    const channel = guild.channels.cache.filter(c => c.type === 'text').find(x => x.position === 0);
	channel.send("Я тут не работаю блять")
});


client.login(token);