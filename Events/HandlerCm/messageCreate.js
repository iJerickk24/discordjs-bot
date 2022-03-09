const { MessageEmbed, Message } = require("discord.js");
const client = require("../../index.js")
const BOT = require('../../config.json')

module.exports = {
  name: "messageCreate",
  /**
   * @param {Message} message
   */
  async execute(message) {
  if (message.content.indexOf(BOT.prefix) !== 0) return;
    let prefix = BOT.prefix;
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.guild) return;
    if (!message.member)
      message.member = await message.guild.fetchMember(message);

    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length == 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) {
      if(!message.member.permissions.has(command.userPerms || [])) return message.channel.send(`You dont have \`${command.userPerms || []}\` permission`)
      if(!message.guild.me.permissions.has(command.clientPerms || [])) return message.channel.send(`I dont have \`${command.clientPerms || []}\` permission`)
  }
  
    const embed = new MessageEmbed()
    .setDescription(`¡Oops! - Ha ocurrido un error no he podido encontrar el comando en mi base de datos.\n> Usa \`${prefix}help\` para ver todos los comandos`)
    .setColor('RED');
    if(!command) return message.channel.send({ embeds: [embed]})
    
    if (command) command.run(client, message, args, prefix);
  },
};

/*
╔═════════════════════════════════════════════════════╗
║ || - || Desarollado por Magma Developments || - ||  ║
║    ----------| discord.gg/QgTVZN6ra5 |----------    ║
╚═════════════════════════════════════════════════════╝
*/