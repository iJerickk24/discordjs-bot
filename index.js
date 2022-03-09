const { Client, Collection } = require("discord.js");
const config = require("./config.json");
const client = new Client({ intents: 32767 });
const fs = require("fs");
const path = require("path");

const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");

client.commands = new Collection();
client.events = new Collection();
client.categories = fs.readdirSync("./commands");

["command", "events"].forEach((handler) => {
	require(`./structures/${handler}`)(client, PG, Ascii);
});

client.login(config.token);

module.exports = client;

/*
╔═════════════════════════════════════════════════════╗
║ || - || Desarollado por Magma Developments || - ||  ║
║    ----------| discord.gg/QgTVZN6ra5 |----------    ║
╚═════════════════════════════════════════════════════╝
*/