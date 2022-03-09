const config = require('../../config.json')
const Discord = require("discord.js");

module.exports = {
  name: "messageCreate",
  async run(client, message) {

    if (message.channel.type === "dm") return;
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
    let [cmdname, ...cmdargs] = message.content
      .slice(config.prefix.length)
      .trim()
      .split(/\s+/);

    const cmd =
      client.commands.get(cmdname) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(cmdname)
      );
    if (!cmd) return;
    if (cmd.status)
      return message.channel.send(
        `${deny} ¡Este comando se encuentra deshabilitado o en mantenimiento!.`
      );

    cmd.run(client, message, args, color, prefix, deny, allow, Discord);
  },
};
