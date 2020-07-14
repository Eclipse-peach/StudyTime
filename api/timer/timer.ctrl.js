const RankingModel = require("../../models/ranking");
const mongoose = require("mongoose");
const { findById } = require("../../models/ranking");
const schedule = require('node-schedule');

//id 유효성 체크
const checkId = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).end();
  }

  next();
};
const showpage = (req, res) => {
  //req에서 오는 값들이 뭐지?
  //사용자의 id로 조회를 해야하는데,,,
  //사용자의 id는 혹시몰라서 userModel 말고도 rankingModel에도 추가해놓음,,
  const id = req.params.id;
  RankingModel.findById(id, (err, result) => {
    if (err) return res.status(500).end();
    if (!result) console.log("첫 시작을 해주세요! :)");
    //res.json(result);
    res.render("timer/detail", { result }); //경로, 데이터는 중괄호로
  });
};
const update = (req, res) => {
  const id = req.params.id;

  // 1. 유효한 id인지 체크
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).end();
  }

  const { time } = req.body; //먼저 값을 뽑아오기
  // 2. id에 해당되는 document에 data update
  RankingModel.findByIdAndUpdate(
    id,
    { time, inserttime },
    { new: true }, //option 주기 (update 한 데이터 바로 보여주기)
    (err, result) => {
      if (err) return res.status(500).send("수정시 오류가 발생했습니다.");
      if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
      res.json(result);
    }
  );
};

const saveTimetoDB = (req, res) => {
  const email = req.query.email;
  const time = req.body.time;
  const name = req.body.name;

  const weeklytime = time;
  const dailytime = time;
  // console.log(email + "찍힘");
  // console.log(time + "찍힘");
  if (!email || !time) return res.status(400).end();
  console.log(email);
  console.log(time);
  console.log(name);
  console.log(weeklytime + "위클리타임");
  RankingModel.findOne({ email: email }, (err, result) => {
    if (!err) {
      console.log(result + "히히");
     

      if (result === null) {
        // create new data
        console.log("New Member Arrival!");
        RankingModel.create({ email, name, time, weeklytime, dailytime}, (err, result) => {
          if (!err) {
            console.log(result);
            res.status(201).send({ result: result }).end();
          } else {
            console.log(err.message);
            res.status(500).send().end();
          }
        });
      } else {
        const addtime = result.time + time;
        const adddailytime = result.dailytime + time;
        const addweeklytime = result.weeklytime + time;
        console.log(result.time + "시간이에용");
        console.log("추가되는 시간:" + addtime);
        console.log("존재하는 값 확인완료!");
        // findOneAndUpdate
        RankingModel.findOneAndUpdate(
          { email: email },
          { $set: { time: addtime, dailytime : adddailytime, weeklytime : addweeklytime} },
          { upsert: true },
          (err, result) => {
            if (!err) {
              console.log("프로젝트의 90%가 끝났어용");
            } else {
              console.log(err);
            }
          }
        );
        res.end();
      }
    } else {
      console.log(err);
      res.status(500).send("무슨 오류인진 모르겠는데 일단 오류발생!");
    }
  });
  //res.send();

  /*
  MusicModel.create({ singer, title }, (err, result) => {
    if (err) res.status(500).end();
    res.status(201).json(result);
  });
*/
};


module.exports = {
  showpage,
  update,
  saveTimetoDB,
};
