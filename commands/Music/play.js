module.exports = {
    name: "play",
    description: "Sirve para reproducir una canción",
    aliases: ["reproducir"],
    category: "musica",
    run: async (client, message, args, color, prefix, deny, allow, Discord) => {
                //comprobaciones previas
                if(!args.length) return message.reply(`❌ **Tienes que especificar el nombre de una canción!**`);
                if(!message.member.voice?.channel) return message.reply(`❌ **Tienes que estar en un canal de voz para ejecutar este comando!**`);
                if(message.guild.me.voice?.channel && message.member.voice?.channel.id != message.guild.me.voice?.channel.id) return message.reply(`❌ **Tienes que estar en el mismo canal de voz __QUE YO__ para ejecutar este comando!**`);
                client.distube.play(message.member.voice?.channel, args.join(" "), {
                    member: message.member,
                    textChannel: message.channel,
                    message
                });
                message.reply(`🔎 **Buscando \`${args.join(" ")}\`...**`);
    }
}

/*
╔═════════════════════════════════════════════════════╗
║ || - || Desarollado por Magma Developments || - ||  ║
║    ----------| discord.gg/QgTVZN6ra5 |----------    ║
╚═════════════════════════════════════════════════════╝
*/