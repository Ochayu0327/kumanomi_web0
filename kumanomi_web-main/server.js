var express = require("express");
var server = express();

server.use(express.static(__dirname + "/server"));
server.use(express.json());

// 正確引入 nedb-promises
var DB = require("nedb-promises");
var even_cardDB = DB.create(__dirname + "/even_card.db");
var videosDB = DB.create(__dirname + "/videos.db");

// 初始化資料(只在資料庫為空時執行
even_cardDB.count({}).then(count => {
  if (count === 0) {
    // even_cardDB.insert([
    //   {
    //     pic: "/img/about/comingsoon.png",
    //     title: "光踊祭",
    //     text: "2026/02/01 @台北流行音樂中心 Live house D",
    //   },
    //   {
    //     pic: "/img/about/ele.png",
    //     title: "Elementary Stream - fox capture plan",
    //     text: "2025/11/29 YouTube"
    //   },
    //   {
    //     pic: "/img/about/artsya.png",
    //     title: "7人形象照公開",
    //     text: "2025/11/26 Instagram"
    //   },
    //   {
    //     pic: "/img/about/chumiao1.png",
    //     title: "竹苗聯合成發",
    //     text: "2025/11/09 @竹北高中"
    //   },
    //   {
    //     pic: "/img/about/os3.png",
    //     title: "作品 IGNITE 參加 OS3 線上賽",
    //     text: "2025/10/11 Bilibili"
    //   },
    //   {
    //     pic: "/img/about/peiryn.png",
    //     title: "北部日系近代藝術聯合成發",
    //     text: "2025/07/20 @台北城市科技大學大成館"
    //   }
    // ]);
  }
});

videosDB.count({}).then(count => {
  if (count === 0) {
    // videosDB.insert([
    //   {
    //     id: "Yq_Vi9ncg2c",
    //     title: "最新作品"
    //   },
    //   {
    //     id: "eXLXoX-BiL4",
    //     title: "現場演出"
    //   }
    // ]);
  }
});

/* about 用的 */
server.get("/even_card", async (req, res) => {
  const data = await even_cardDB.find({});
  res.json(data);
});

server.post("/even_card", async (req, res) => {
  const newData = await even_cardDB.insert(req.body);
  res.json(newData);
});

server.delete("/even_card/:index", async (req, res) => {
  const allData = await even_cardDB.find({});
  const toDelete = allData[req.params.index];
  if (toDelete) {
    await even_cardDB.remove({ _id: toDelete._id });
  }
  res.json({ success: true });
});

/* index 用的 */
server.get("/videos", async (req, res) => {
  const data = await videosDB.find({});
  res.json(data);
});

server.post("/videos", async (req, res) => {
  const newData = await videosDB.insert(req.body);
  res.json(newData);
});

server.delete("/videos/:id", async (req, res) => {
  await videosDB.remove({ id: req.params.id });
  res.json({ success: true });
});

server.listen(80, () => {
  console.log("Server running on http://localhost");
});
