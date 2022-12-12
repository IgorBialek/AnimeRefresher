const { default: axios } = require("axios");

const sendMessage = async (messengerId, anime, episode, episodeNumber, url) => {
  let request_body = {
    recipient: {
      id: messengerId,
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: `New episode #${episodeNumber} ${episode} of ${anime} just came out!`,
          buttons: [
            {
              type: "web_url",
              url: "https://newanime.vercel.app",
              title: "Open app",
              webview_height_ratio: "full",
            },
            {
              type: "web_url",
              url: url,
              title: "Watch now!",
              webview_height_ratio: "full",
            },
          ],
        },
      },
    },
  };

  try {
    await axios.request({
      url: "https://graph.facebook.com/v2.6/me/messages",
      method: "post",
      params: { access_token: process.env.MESSENGER_TOKEN },
      data: request_body,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = sendMessage;
