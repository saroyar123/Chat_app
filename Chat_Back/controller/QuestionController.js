const question = require("../model/Question");

exports.getAllQuestion = async (req, res) => {
  try {
    const Question = await question.find();
    res.status(200).json({
      success: true,
      Question,
      size: Question.length,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// this regex function will find question that not belong to our particular domains
function areWordsNotPresentInString(words, inputString) {
  // Create a regex pattern that matches any of the words in the array
  const regexPattern = new RegExp(
    words.map((word) => `\\b${word}\\b`).join("|"),
    "i"
  );

  // Test if any of the words in the array are present in the inputString
  return !regexPattern.test(inputString);
}

exports.getFilterQuestion = async (req, res) => {
  try {
    const { domain } = req.params;
    const Question = await question.find();

    if (domain == "others") {
      const domainArray = ["Payment", "Loan", "Account", "Card", "Emi"];
      const ansQuestion = [];
      const notAnsQuestion = [];
      Question.map((value) => {
        if (areWordsNotPresentInString(domainArray, value.messageBody)) {
          if (value.ans == "") notAnsQuestion.push(value);
          else ansQuestion.push(value);
        }
      }).filter((value) => value !== undefined && value !== null);
      return res.status(200).json({
        success: true,
        data: {
          ansQuestion,
          notAnsQuestion,
        },
      });
    }

    const regexPattern = new RegExp(`\\b${domain}\\b`, "gi");

    const ansQuestion = [];
    const notAnsQuestion = [];
    Question.map((value) => {
      if (regexPattern.test(value.messageBody)) {
        if (value.ans === "") notAnsQuestion.push(value);
        else ansQuestion.push(value);
      }
    }).filter((value) => value !== undefined && value !== null);
    res.status(200).json({
      success: true,
      data: {
        notAnsQuestion,
        ansQuestion,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// answer of question

exports.ansQuestion = async (req, res) => {
  try {
    const { answer, id } = req.body;
    const Question = await question.findOne({ _id: id });

    if (!Question) throw new Error("Question not found");

    Question.ans = answer;
    await Question.save();

    res.status(200).json({
      success: true,
      message: "Answer is update",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// function for suggestion question

exports.suggestionQuestion = async (req, res) => {
  try {
    const { askQuestion } = req.body;
    const words = askQuestion.match(/\b\w+\b/g);
    const Question = await question.find();
    const similarQuestion = Question.map((value) => {
      if (!areWordsNotPresentInString(words, value.messageBody))
        return value.messageBody;
    }).filter((value) => value !== undefined && value !== null);

    res.status(200).json({
      success: true,
      similarQuestion,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// new question is ask by user

exports.createQuestion = async (req, res) => {
  try {
    const { userId, askQuestion } = req.body;

    if (!userId || !askQuestion) throw new Error("Give all inputs");

    await question.create({
      userID: userId,
      messageBody: askQuestion,
    });

    res.status(201).json({
      success: true,
      message: "question is added",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// get user questions
exports.getUserQuestion=async(req,res)=>{
    try {
      
        const {userId}=req.body
        const Question=await question.find({userID:userId});
        res.status(200).json({
            success:true,
            Question
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

// active question of every domain
exports.activeQuestions=async(req,res)=>{
  try {
    
    const domainArray = ["payment", "loan", "account", "card", "emi"];
    const Question=await question.find();
    const activeQuestionMap=new Map();

    // find the count of the questions in a domain
     domainArray.map((value)=>{
        let c=0;
        const regexPattern = new RegExp(`\\b${value}\\b`, "gi");
        Question.map((ques)=>{
          if(regexPattern.test(ques.messageBody)&&ques.ans==="")
           c=c+1;
        })
        
       activeQuestionMap.set(value,c);
    })

    // find out the number of question that are 
    let c=0;
    Question.map((value) => {
      if (areWordsNotPresentInString(domainArray, value.messageBody)&&value.ans==="") {
        c=c+1;
      }
    })
    activeQuestionMap.set("others",c);

    const questionMap=[...activeQuestionMap];
    res.status(200).json({
      success:true,
      questionMap
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
  });
  }
}
