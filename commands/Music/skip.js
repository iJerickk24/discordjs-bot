module.exports = {
    name: "skip",
    description: "Sirve para saltar una canción",
    aliases: ["saltar"],
    category: "musica",
    run: async (client, message, args, color, prefix, deny, allow, Discord) => {
                //comprobaciones previas
                const queue = client.distube.getQueue(message);
                if(!queue) return message.reply(`❌ **No hay ninguna canción reproduciéndose!**`);
                if(!message.member.voice?.channel) return message.reply(`❌ **Tienes que estar en un canal de voz para ejecutar este comando!**`);
                if(message.guild.me.voice?.channel && message.member.voice?.channel.id != message.guild.me.voice?.channel.id) return message.reply(`❌ **Tienes que estar en el mismo canal de voz __QUE YO__ para ejecutar este comando!**`);
                client.distube.skip(message);
                message.reply(`⏭ **Saltando a la siguiente canción!**`)
    }
}

/*
╔═════════════════════════════════════════════════════╗
║ || - || Desarollado por Magma Developments || - ||  ║
║    ----------| discord.gg/QgTVZN6ra5 |----------    ║
╚═════════════════════════════════════════════════════╝
*/