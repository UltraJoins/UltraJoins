const { createCanvas, loadImage, registerFont } = require("canvas");

const genLeaderboardCard = async (client, usersData) => {
  const backgroundImage = await loadImage("https://media.discordapp.net/attachments/1044708545540665445/1203384343523762196/IMG_0551.png?ex=65d0e601&is=65be7101&hm=55693fdc870f0aa182c323be8cbab2870c3538b0621bcc3bb042ff3ddcd8f031&");

  const canvas = createCanvas(backgroundImage.width, backgroundImage.height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  for (let i = 0; i < usersData.length; i++) {
    const user = await client.users.fetch(usersData[i].userId);
    const userTag = user ? user.tag : "Unknown User";

    const yPos = 60 + (i + 1) * 100;

    ctx.fillStyle = "#FFF";
    ctx.font = "20px Arial";
    ctx.fillText(`${userTag}`, 220, yPos);

    ctx.fillStyle = "#FFF";
    ctx.font = "30px Arial";
    ctx.fillText(`${usersData[i].coins}`, 510, yPos);
  }

  return canvas.toBuffer();
};

module.exports = { genLeaderboardCard };