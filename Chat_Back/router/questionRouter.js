const { getAllQuestion, getFilterQuestion, ansQuestion, suggestionQuestion, createQuestion } = require("../controller/QuestionController");

const router=require("express").Router();

router.route("/question").get(getAllQuestion).post(ansQuestion)
router.route("/quesFilter/:domain").get(getFilterQuestion)
router.route("/similarQuestion").post(suggestionQuestion)
router.route("/addQuestion").post(createQuestion)

module.exports=router