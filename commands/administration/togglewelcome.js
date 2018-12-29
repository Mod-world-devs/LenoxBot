const LenoxCommand = require('../LenoxCommand.js');

module.exports = class togglewelcomeCommand extends LenoxCommand {
	constructor(client) {
		super(client, {
			name: 'togglewelcome',
			group: 'administration',
			memberName: 'togglewelcome',
			description: 'Toggles the welcome message in this channel',
			format: 'togglewelcome',
			aliases: [],
			examples: ['togglewelcome'],
			clientPermissions: ['SEND_MESSAGES'],
			userPermissions: ['ADMINISTRATOR'],
			shortDescription: 'Welcome',
			dashboardsettings: true
		});
	}

	async run(msg) {
		const langSet = msg.client.provider.getGuild(msg.message.guild.id, 'language');
		const lang = require(`../../languages/${langSet}.json`);

		if (msg.client.provider.getGuild(msg.message.guild.id, 'welcome') === 'false') {
			await msg.client.provider.setGuild(msg.message.guild.id, 'welcome', 'true');

			const channelid = msg.channel.id;
			await msg.client.provider.setGuild(msg.message.guild.id, 'welcomechannel', channelid);

			const channelset = lang.togglewelcome_channelset.replace('%channelname', `#**${msg.channel.name}**`);
			msg.channel.send(channelset);
		} else if (msg.client.provider.getGuild(msg.message.guild.id, 'welcome') === 'true') {
			await msg.client.provider.setGuild(msg.message.guild.id, 'welcome', 'false');
			msg.channel.send(lang.togglewelcome_channeldeleted);
		}
	}
};
