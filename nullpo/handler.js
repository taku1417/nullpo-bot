const { REST, Routes } = require('discord.js');
const config = require('config');
const clientId = '978923316557537280';
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandsPath = path.join(__dirname, 'SlashCommand');
const commandFiles = fs.readdirSync('./SlashCommand/').filter(file => file.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const command = require(`./SlashCommand/${file}`);
	commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
if(process.env.NODE_ENV === 'heroku'){
	const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
} else {
	const rest = new REST({ version: '10' }).setToken(config.get('DISCORD_TOKEN'));
}


// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();