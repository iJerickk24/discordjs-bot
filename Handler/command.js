const { readdirSync } = require("fs");
const ascii = require("ascii-table");
let table = new ascii("Commands");
table.setHeading("Comandos", " Cargados");

module.exports = (client) => {
	readdirSync("./commands/").forEach((dir) => {
		const commands = readdirSync(`./commands/${dir}`).filter((file) =>
			file.endsWith(".js")
		);
		for (const file of commands) {
			let pull = require(`../commands/${dir}/${file}`);
			if (pull.name) {
				client.commands.set(pull.name, pull);
				table.addRow(file, "Cargado");
			} else {
				table.addRow(file, "Fallo");
				continue;
			}
			if (pull.aliases && Array.isArray(pull.aliases))
				pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
		}
	});
	console.log(table.toString());
};

/*
╔═════════════════════════════════════════════════════╗
║ || - || Desarollado por Magma Developments || - ||  ║
║    ----------| discord.gg/QgTVZN6ra5 |----------    ║
╚═════════════════════════════════════════════════════╝
*/