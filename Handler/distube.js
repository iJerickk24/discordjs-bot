const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { MessageEmbed } = require("discord.js")
module.exports = (client, Discord) => {

	client.distube = new DisTube(client, {
		emitNewSongOnly: false,
		leaveOnEmpty: true,
		leaveOnFinish: true,
		leaveOnStop: true,
		savePreviousSongs: true,
		emitAddSongWhenCreatingQueue: false,
		searchSongs: 0,
		nsfw: false,
		emptyCooldown: 25,
		ytdlOptions: {
			highWaterMark: 1024 * 1024 * 64,
			quality: "highestaudio",
			format: "audioonly",
			liveBuffer: 60000,
			dlChunkSize: 1024 * 1024 * 4,
		},
		youtubeDL: false,
		plugins: [
			new SpotifyPlugin({
				parallel: true,
				emitEventsAfterFetching: true,
			}),
			new SoundCloudPlugin(),
		],
	});

	//escuchamos los eventos de DisTube

	client.distube.on("playSong", (queue, song) => {
		queue.textChannel.send({
			embeds: [
				new MessageEmbed()
				.setAuthor({name: `Añadida por ${song.user.tag}`, iconURL: song.user.displayAvatarURL({ dynamic: true})})
					.setTitle(
						`🎶 | Reproduciendo \`${song.name}\` - \`${song.formattedDuration}\``
					)
					.setThumbnail(song.thumbnail)
					.setURL(song.url)
					.setColor('ORANGE')
					.setFooter({
						text: `Developed by Magma Developments`,
						iconURL: 'https://cdn.discordapp.com/icons/936817888210337832/a0e32058700c44b4608aecb171496ab0.png?size=4096',
					}),
			],
		});
	});

	client.distube.on("addList", (queue, playlist) => queue.textChannel.send({embeds: [new MessageEmbed()
		.setColor('GREEN')
		.setDescription(`🎶| Agregado \`${playlist.name}\` lista de reproducción (${playlist.songs.length} canciones) a la cola\n${status(queue)}`)]}))

	client.distube.on("addSong", (queue, song) => {
		queue.textChannel.send({
			embeds: [
				new Discord.MessageEmbed()
				.setAuthor({name: `Añadida por ${song.user.tag}`, iconURL: song.user.displayAvatarURL({ dynamic: true})})
					.setTitle(
						`✅ Añadido \`${song.name}\` - \`${song.formattedDuration}\``
					)
					.setThumbnail(song.thumbnail)
					.setURL(song.url)
					.setColor('ORANGE')
					.setFooter({
						text: `Developed by Magma Developments`,
						iconURL: 'https://cdn.discordapp.com/icons/936817888210337832/a0e32058700c44b4608aecb171496ab0.png?size=4096',
					}),
			],
		});
	});

	client.distube.on("error", (channel, e) => {
        channel.send({embeds: [new MessageEmbed()
        .setColor('RED')
        .setDescription(`⛔ | An error encountered: ${e}`)]})
        console.error(e)
    })

    client.distube.on("empty", channel => channel.send({embeds: [new MessageEmbed().setColor('RED')
    .setDescription(`¡El canal de voz está vacío! Saliendo del canal.`)]}));

	client.distube.on("searchNoResult", (message, query) => message.channel.send({embeds: [new MessageEmbed().setColor('RED')
    .setDescription(`⛔ | No result found for \`${query}\`!`)]}))

	client.distube.on("initQueue", (queue) => {
		queue.autoplay = true;
	});

	client.distube.on("finish", queue => queue.textChannel.send({embeds: [new MessageEmbed()
		.setColor('RED')
		.setDescription(`Cola finalizada, abandono del canal.`)]}
		))

	
};

/*
╔═════════════════════════════════════════════════════╗
║ || - || Desarollado por Magma Developments || - ||  ║
║    ----------| discord.gg/QgTVZN6ra5 |----------    ║
╚═════════════════════════════════════════════════════╝
*/
