const express = require("express");
const router = express.Router();
const ctrl = require("./user.ctrl");

// 라우팅 설정
router.get("/signup", ctrl.showSignupPage); //회원가입 페이지 보여주기
router.post("/signup", ctrl.signup); //회원가임
router.get("/login", ctrl.showLoginPage);
router.post("/login", ctrl.login);
router.get("/logout", ctrl.logout)
router.get("/info", ctrl.getUserInfoByToken);
module.exports = router;
