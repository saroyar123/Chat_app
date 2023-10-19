const { getAllQuestion, getFilterQuestion, ansQuestion, suggestionQuestion, createQuestion, getUserQuestion, activeQuestions } = require("../controller/QuestionController");

const router=require("express").Router();

router.route("/question").get(getAllQuestion).post(ansQuestion)
router.route("/quesFilter/:domain").get(getFilterQuestion)
router.route("/similarQuestion").post(suggestionQuestion)
router.route("/addQuestion").post(createQuestion)
router.route("/getAns").post(getUserQuestion)
router.route("/activeQues").get(activeQuestions)

module.exports=router