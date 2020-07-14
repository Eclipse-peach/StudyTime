const RankingModel = require("../../models/ranking");
const mongoose = require("mongoose");
const { findById, remove } = require("../../models/ranking");
const Agenda = require("agenda");
var { fncRegular } = require("../../fncRegular");

//const agenda = new Agenda({db: {address: 'localhost:27017/test', collection: 'rankings'}, processEvery:'1 minute'});

//async Agenda (비동기 스케줄링)
/*
agenda.define('delete daily data', function(job,done) {
  var d = new Date();
  console.log('Daily remove at' +d);
  resetdaily();
  done();
});
agenda.define('delete weekly data', function(job,done){
  var d = new Date();
  console.log('Weekly remove at' +d);
  resetweekly();
  done();
});
agenda.define('print to console', function (job,done) {
  var d = new Date();
  console.log('Job just fired at'+d);
  done();
});

agenda.on('ready', function () {
  agenda.every('5 seconds', 'print to console');
  agenda.every('1 day', 'delete daily data');
  agenda.every('1 week', 'delete weekly data')
  agenda.start();
});

function graceful() {
  agenda.stop(function () {
    process.exit(0);
  });
}

process.on('SIGTERM', graceful);
process.on('SIGINT', graceful);
*/

//thanks to 화균 (비동기 스케줄링)
fncRegular(
  "specific",
  0,
  {
    optionSetter: "HH",
    optionValue: 2,
  },
  function () {
    var d = new Date();
    console.log("resetdaily worked at " + d);
    resetdaily();
  }
);

// timeValue: YYYYMMDDHHMMSS
fncRegular("onetime", null, "20200715020001", function () {
  var d = new Date();
  console.log("resetweekly worked at " + d);
  resetweekly();
  fncRegular("periodic", 0, "604800000", function () {
    var d = new Date();
    console.log("resetweekly worked at " + d);
    resetweekly();
  });
});

/*
fncRegular("onetime",null,"20200713205430",
function () {
  fncRegular("periodic",0,"1000",
  function (){
    var d = new Date();
    console.log("this is test about function"+d);
  });
}
);
*/
//id 유효성 체크
const checkId = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).end();
  }
  next();
};

const resetdaily = (req, res) => {
  RankingModel.updateMany(
    {},
    { $set: { dailytime: 0 } },
    { upsert: true },
    (err, result) => {
      if (!err) {
        console.log("프로젝트의 90%가 끝났어용");
      } else {
        console.log(err);
      }
    }
  );
};
const resetweekly = (req, res) => {
  RankingModel.updateMany(
    {},
    { $set: { weeklytime: 0 } },
    { upsert: true },
    (err, result) => {
      if (!err) {
        console.log("프로젝트의 90%가 끝났어용");
      } else {
        console.log(err);
      }
    }
  );
};

const view = (req, res) => {
  // const type = (Object.keys(req.body).length == 0) ? 3 : req.body.type;
  const type = req.query.type;
  console.log(type + "이게 타입일텐데,,");
  const limit = parseInt(req.query.limit || 10);
  if (Number.isNaN(limit)) return res.status(400).end();
  //db에서 Name과 Time만 추출, result array에 push..
  if (type == 1) {
    console.log("1");
    RankingModel.find({}, { _id: 0, name: 1, dailytime: 1 }, (err, result) => {
      if (err) {
        console.log("에러 발생");
        return res.status(500).end();
      } else {
        console.log(result + "이게 맞아");
        //res.status(200).render("ranking", { result });
        res.status(200).render("ranking", { result, type });
      }
    })
      .limit(limit)
      .sort({ dailytime: -1 });
  } else if (type == 2) {
    console.log("2");
    RankingModel.find({}, { _id: 0, name: 1, weeklytime: 1 }, (err, result) => {
      if (err) {
        console.log("에러 발생");
        return res.status(500).end();
      } else {
        console.log(result + "이게 맞아");
        //res.status(200).render("ranking", { result });
        res.status(200).render("ranking", { result, type });
      }
    })
      .limit(limit)
      .sort({ weeklytime: -1 });
  } else if (type == 3 || type == null) {
    console.log("3");
    RankingModel.find({}, { _id: 0, name: 1, time: 1 }, (err, result) => {
      if (err) {
        console.log("에러 발생");
        return res.status(500).end();
      } else {
        console.log(result + "이게 맞아");
        //res.status(200).render("ranking", { result });
        res.status(200).render("ranking", { result, type });
      }
    })
      .limit(limit)
      .sort({ time: -1 });
  }
};
module.exports = {
  view,
  resetdaily,
  resetweekly,
};
