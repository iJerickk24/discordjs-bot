module.exports = {
    name: "stop",
    description: "Sirve para desconectar al bot de la sala de voz",
    aliases: ["desconectar", "leavevc", "leave", "disconnect"],
    category: "musica",
    run: async (client, message, args, color, prefix, deny, allow, Discord) => {
                //comprobaciones previas
                const queue = client.distube.getQueue(message);
                if(!queue) return message.reply(`❌ **No hay ninguna canción reproduciéndose!**`);
                if(!message.member.voice?.channel) return message.reply(`❌ **Tienes que estar en un canal de voz para ejecutar este comando!**`);
                if(message.guild.me.voice?.channel && message.member.voice?.channel.id != message.guild.me.voice?.channel.id) return message.reply(`❌ **Tienes que estar en el mismo canal de voz __QUE YO__ para ejecutar este comando!**`);
                client.distube.stop(message);
                message.reply(`🏃‍♂️ **Desconectado!**`)
    }
}

/*
╔═════════════════════════════════════════════════════╗
║ || - || Desarollado por Magma Developments || - ||  ║
║    ----------| discord.gg/QgTVZN6ra5 |----------    ║
╚═════════════════════════════════════════════════════╝
*/