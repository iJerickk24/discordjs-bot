const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const Levels = require("discord-xp");

module.exports = {
    name: "leaderboard",
    aliases: ['tabla-de-posiciones', 'top', 'posiciones-xp'],
    description: "",
    category: "",
    run: async(client, message, args, prefix) => {
        const LeaderBoard = await Levels.fetchLeaderboard(message.guild.id, 10); // obtiene los 10 mejores miembros de un gremio y los coloca en la tabla de clasificación

        if (LeaderBoard.length < 1) return interaction.reply("There aren't any users in the leaderboard.");

        const leaderboard = await Levels.computeLeaderboard(client, LeaderBoard, true);
        const lb = leaderboard.map(e => "```" + `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}` + "```"); 

        const response = new MessageEmbed()
        .setTitle("**LEADERBOARD**")
        .setDescription(`${lb.join("\n\n")}`)
        .setColor('ORANGE')

        message.reply({embeds: [response]})
    }
}