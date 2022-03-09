const { Client, Collection } = require("discord.js");
const config = require("./config.json");
const client = new Client({ intents: 32767 });
const fs = require("fs");
const path = require("path");
require('colors')

const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");

client.commands = new Collection();
client.categories = fs.readdirSync("./commands");
client.aliases = new Collection();

["command", "events", 'distube'].forEach((handler) => {
	require(`./Handler/${handler}`)(client, PG, Ascii);
});

client.login(config.token).catch(() => console.log(`-[X]- NO HAS ESPECIFICADO UN TOKEN VALIDO -[X]-`.red));

module.exports = client;

/*
╔═════════════════════════════════════════════════════╗
║ || - || Desarollado por Magma Developments || - ||  ║
║    ----------| discord.gg/QgTVZN6ra5 |----------    ║
╚═════════════════════════════════════════════════════╝
*/