const { SlashCommandBuilder, ChannelType, SlashCommandChannelOption } = require('discord.js');
const RequiredBaseCommandOption = require('./RequiredBaseCommandOption');
const channelsType = {
	text: ChannelType.GuildText,
	voice: ChannelType.GuildVoice,
	category: ChannelType.GuildCategory,
	news: ChannelType.GuildAnnouncement,
	announcementThread: ChannelType.AnnouncementThread,
	publicThread: ChannelType.PublicThread,
	privateThread: ChannelType.PrivateThread,
	stage: ChannelType.GuildStageVoice,
	forum: ChannelType.GuildForum,
	media: ChannelType.GuildMedia

};

class ChannelCommandOption extends RequiredBaseCommandOption {

	/**
	 *
	 * @param {Command} main The main command structure
	 */
	constructor(main) {
		super(main, 'channel');

		/**
		 * @type {('text'|'voice'|'category'|'news'|'announcementThread'|'publicThread'|'privateThread'|'stage'|'forum'|'media')[]}
		 */
		this.channelTypes = [];
	}

	/**
	 * @param {...('text'|'voice'|'category'|'news'|'announcementThread'|'publicThread'|'privateThread'|'stage'|'forum'|'media')[]} channelTypes The channel types to allow
	 * @returns {this}
	 */
	setChannelTypes(...channelTypes) {
		this.channelTypes = channelTypes;
		return this;
	}

	/**
	 * This command generates slash command option data
	 * @param {SlashCommandBuilder} cmd the command to generate the slash command option data for
	 */
	generateSlashCommandOption(cmd) {
		const option = new SlashCommandChannelOption()
			.setName(this.name)
			.setDescription(this.description)
			.setRequired(this.required);

		if (this.channelTypes.length) {
			option.addChannelTypes(this.channelTypes.map(type => channelsType[type]));
		}

		cmd.addChannelOption(option);
	}

}


module.exports = ChannelCommandOption;
