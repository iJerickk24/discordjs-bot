const { CommandInteraction, Client, MessageAttachment } = require("discord.js");
const Levels = require("discord-xp");
const canvacord = require('canvacord');

module.exports = {
    name: "rank",
    aliases: ['xp', 'rango'],
    description: "",
    category: "discord-xp",
    run: async(client, message, args, prefix) => {

        let member = message.mentions.members.last() || message.member;
        const users = await Levels.fetch(member.id, message.guildId);
        
        if(!member) {
            try {
              member = await message.guild.members.fetch(args[0])
            } catch {
              member = message.member;
            }
          }
        
        if(!users) return message.reply({content: "The mentioned user has no XP."})

        const neededXp = Levels.xpFor(parseInt(users.level) + 1);

        const rank = new canvacord.Rank()
        .setAvatar(member.displayAvatarURL({format: 'png', size: 512}))
        .setCurrentXP(users.xp) 
        .setRequiredXP(neededXp)
        .setStatus(member.presence.status)
        .setLevel(users.level)
        .setProgressBar("#FFFFFF", "COLOR")
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator);
    
    rank.build()
        .then(data => {
        const attachment = new MessageAttachment(data, "RankCard.png");
        message.reply({files: [attachment]});
    });
    }
}