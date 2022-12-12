const { load } = require("cheerio");
const { db } = require("../firebase/firebase");
const sendMessage = require("./sendMessage");

const processData = async () => {
  try {
    const cloudscraper = require("cloudscraper");

    const querySnapshot = await db.collection("observedAnimeList").get();

    for (const document of querySnapshot.docs) {
      let { observedAnimeList } = document.data();

      let messengerIdSnapshot = await db
        .collection("messengerId")
        .doc(document.id)
        .get();

      for (const anime of observedAnimeList) {
        let html = await cloudscraper.get(anime.url);

        const $ = load(html);

        let episodeList = $(".eplister > ul > li > a");

        episodeList.each((i, el) => {
          if (i < episodeList.length - anime.lastSeenEpisode) {
            let title = $(el).find(".epl-title").text();
            let number = episodeList.length - i;
            let url = $(el).attr("href") ?? "";

            anime.episodes = [
              ...anime.episodes,
              {
                title,
                number,
                url,
              },
            ];

            if (!messengerIdSnapshot.empty) {
              let { id } = messengerIdSnapshot.data();
              if (id) {
                sendMessage(id, anime.name, title, number, url);
              }
            }
          }
        });

        anime.lastSeenEpisode = episodeList.length;
      }

      await db.collection("observedAnimeList").doc(document.id).set({
        observedAnimeList,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = processData;
