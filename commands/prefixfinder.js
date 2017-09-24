const Discord = require('discord.js');
exports.run = (client, msg, args) => {
	const guild = client.guilds.get('352896116812939264').roles.find('name', 'Staff').id;
	if (!msg.member.roles.get(guild) || msg.author.id !== '238590234135101440') return msg.reply('You dont have permissions to execute this command!').then(m => m.delete(10000));

	const content = args.slice().join(" ");
	if (!content) return msg.reply('You have to enter a guildid!');

	if (isNaN(content)) return msg.channel.send('It must be a GuildID');
	const tableload = client.guildconfs.get(content);

	if (!tableload) return msg.channel.send('Could not find this guild in the database!');

	const guildload = client.guilds.get(content);
	const embed = new Discord.RichEmbed()
	.setColor('#FF7F24')
	.setThumbnail(guildload.iconURL)
	.addField('Serverowner:', `${guildload.owner.user.tag} (${guildload.owner.id})`)
	.addField('Prefix:', tableload.prefix)
	.setAuthor(`${guildload.name} (${guildload.id})`);
	msg.channel.send({ embed });
};


exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: []
};
exports.help = {
	name: 'prefixfinder',
	description: 'Command for the LenoxBot Staff to find out a prefix of a guild',
	usage: 'prefixfinder {guildid}',
	example: 'prefixfinder 352896116812939264',
	category: 'botowner'
};
