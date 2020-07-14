const mongoose = require("mongoose");

//스키마 생성
const RankingSchema = new mongoose.Schema({
  email: {
    type:String,
    required: true,
    trim: true,
    maxlength: 50,
},
  name:{
    type:String,
    required:true,
    trim:true,
    maxlength:50,
  },
  dailytime: {
    type: Number,
    required: true,
    trim: true,
    default: 0,
  },
  weeklytime: {
    type: Number,
    required: true,
    trim: true,
    default: 0,
  },
  time: {
    type: Number,
    required: true,
    trim: true,
    default: 0,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

//스키마를 통해 모델 객체 생성
//mongoose.model("모델명", 스키마) ->모델명s
//mongoose.model("모델명", 스키마,"컬렉션명")
module.exports = mongoose.model("ranking", RankingSchema);
