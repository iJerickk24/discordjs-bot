const client = require("../../index"); // make sure this path is correct
const Levels = require("discord-xp");
Levels.setURL(""); //Colocar base de datos

client.on("messageCreate", async (message) => {
  if(message.author.bot || !message.guildId) return;

  const xp = Math.floor(Math.random() * 9) + 1;
  const hasLeveledUp = await Levels.appendXp(message.author.id, message.guildId, xp)
  if(hasLeveledUp) {
    const user = await Levels.fetch(message.author.id, message.guildId);
    message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`)
  }
})