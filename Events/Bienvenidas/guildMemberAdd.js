const Discord = require("discord.js");
const { createCanvas, loadImage } = require("canvas");

module.exports = {
  name: "guildMemberAdd",
  /**
   *
   * @param {GuildMember} member
   */
  async execute(member) {

    let channel = member.guild.channels.cache.get(""); // Colocar id del canal de canal
    if (!channel) return;
    const canvas = createCanvas(800, 360);
    const ctx = canvas.getContext("2d");
    const background = await loadImage(
        "" //Colocar URL de la Imagen
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.font = "77px Arial";
    ctx.fillStyle = "#fafafa";
    ctx.fillText(`¡Bienvenido!`, 175, 300);
    ctx.font = "50px Arial";
    ctx.fillStyle = "#fafafa";
    ctx.fillText(`${member.user.tag}`, 205, 345);
    ctx.closePath();

    const y = 60,
        radio = 80,
        x = canvas.width / 2 - radio;
    ctx.beginPath();
    ctx.arc(x + radio, y + radio, radio + 5, 0, Math.PI * 2, true);
    ctx.fillStyle = "#fafafa";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.save();
    ctx.beginPath();
    ctx.arc(x + radio, y + radio, radio, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const imagen = await loadImage(
        member.user.displayAvatarURL({ dynamic: false, size: 256, format: "png" })
    );
    ctx.drawImage(imagen, x, y, radio * 2, radio * 2);

    const attach = new MessageAttachment(canvas.toBuffer(), "bienvenida.png");
    member.roles.add("");
    channel.send({
      content: `¡Bienvenido ${member.user}! \n\n> Eres el Usuario #${member.guild.memberCount}`,
      files: [attach],
    });
  },
};
