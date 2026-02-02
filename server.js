var express = require("express");
var server = express();

server.use(express.static(__dirname + "/server"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

var DB = require("nedb-promises");
var even_cardDB = DB.create(__dirname + "/even_card.db");
var videosDB = DB.create(__dirname + "/videos.db");

even_cardDB.count({}).then(count => {
  if (count === 0) {
    even_cardDB.insert([
    
      {
        pic: "/img/about/peiryn.png",
        title: "北部日系近代藝術聯合成發",
        text: "2025/07/20 @台北城市科技大學大成館",
        eventDate: "2025-07-20",
      },

      {
        pic: "/img/about/os3.png",
        title: "作品 IGNITE 參加 OS3 線上賽",
        text: "2025/10/11 Bilibili",
        eventDate: "2025-10-11",
      },

      {
        pic: "/img/about/chumiao1.png",
        title: "竹苗聯合成發",
        text: "2025/11/09 @竹北高中",
        eventDate: "2025-11-09",
      },
       
      {
        pic: "/img/about/artsya.png",
        title: "7人形象照公開",
        text: "2025/11/26 Instagram",
        eventDate: "2025-11-26",
      },

      {
        pic: "/img/about/ele.png",
        title: "Elementary Stream - fox capture plan",
        text: "2025/11/29 YouTube",
        eventDate: "2025-11-29",
      },

      {
        pic: "/img/about/peiryn3.png",
        title: "光踊祭",
        text: "2026/02/01 @台北流行音樂中心 Live house D",
        eventDate: "2026-02-01",
      },

    ]);

  }
});



videosDB.count({}).then(count => {
  if (count === 0) {
    videosDB.insert([
      {
        id: "Yq_Vi9ncg2c",
        title: "最新作品"

      },
      {
        id: "eXLXoX-BiL4",
        title: "現場演出"
      }
    ]);
  }
});

/* 從資料庫even_card挖資料粗來 */
server.get("/even_card", async (req, res) => {
  const data = await even_cardDB.find({});

  data.sort((a, b) => {
    
    if (!a.eventDate) return 1;
    if (!b.eventDate) return -1;

    
    return new Date(b.eventDate) - new Date(a.eventDate);
  });

  res.json(data);
});

/* 把送admin進來東西ki進資料庫evencard */
server.post("/even_card", async (req, res) => {
  const newData = await even_cardDB.insert(req.body);
  res.json(newData);
});

/* 刪除evencard資料 */
server.delete("/even_card/:id", async (req, res) => {
  await even_cardDB.remove({ _id: req.params.id });
  res.json({ success: true });
});

/* index 用的 */
server.get("/videos", async (req, res) => {
  const data = await videosDB.find({})
  .sort({createdAT: -1});
  res.json(data);
});

server.post("/videos", async (req, res) => {
  const newData = await videosDB.insert(req.body);
  res.json(newData);
});

server.delete("/videos/:id", async (req, res) => {
  await videosDB.remove({ _id: req.params.id });
  res.json({ success: true });
});

server.listen(80, () => {
  console.log("Server running on http://localhost");
});
