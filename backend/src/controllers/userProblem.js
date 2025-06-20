const { getLanguageById, submitBatch, submitToken } = require("../utils/ProblemUtility");
const Problem = require("../models/problem");
const User = require("../models/user");
const Submission = require("../models/submissions");

const createProblem = async (req, res) => {

  const { title, description, difficulty, tags,
    visibleTestCases, hiddenTestCases, startCode,
    referenceSolution, problemCreator
  } = req.body;


  try {

    for (const { language, completeCode } of referenceSolution) {


      // source_code:
      // language_id:
      // stdin: 
      // expectedOutput:

      const languageId = getLanguageById(language);

      // I am creating Batch submission
      const submissions = visibleTestCases.map((testcase) => ({
        source_code: completeCode,
        language_id: languageId,
        stdin: testcase.input,
        expected_output: testcase.output
      }));


      const submitResult = await submitBatch(submissions);
      // console.log(submitResult);

      const resultToken = submitResult.map((value) => value.token);

      // ["db54881d-bcf5-4c7b-a2e3-d33fe7e25de7","ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1","1b35ec3b-5776-48ef-b646-d5522bdeb2cc"]

      const testResult = await submitToken(resultToken);

      //  console.log(testResult);

      for (const test of testResult) {
        if (test.status_id != 3) {
          return res.status(400).send("Error Occured");
        }
      }

    }


    // We can store it in our DB

    const userProblem = await Problem.create({
      ...req.body,
      problemCreator: req.result._id
    });

    res.status(201).send("Problem Saved Successfully");
  }
  catch (err) {
    res.status(400).send("Error: " + err);
  }
}

const updateProblem = async (req, res) => {
  const { id } = req.params;
  const { title, description, difficulty, tags,
    visibleTestCases, hiddenTestCases, startCode,
    referenceSolution, problemCreator
  } = req.body;

  try {

    if(!id){
      return res.status(400).send("invalid id field")
    }

    const DsaPRoblem =  await Problem.findById(id);
    if(!DsaPRoblem){
      return res.status(404).send("Id is not present ")
    }
    
    for (const { language, completeCode } of referenceSolution) {


      // source_code:
      // language_id:
      // stdin: 
      // expectedOutput:

      const languageId = getLanguageById(language);

      // I am creating Batch submission
      const submissions = visibleTestCases.map((testcase) => ({
        source_code: completeCode,
        language_id: languageId,
        stdin: testcase.input,
        expected_output: testcase.output
      }));


      const submitResult = await submitBatch(submissions);
      // console.log(submitResult);

      const resultToken = submitResult.map((value) => value.token);

      // ["db54881d-bcf5-4c7b-a2e3-d33fe7e25de7","ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1","1b35ec3b-5776-48ef-b646-d5522bdeb2cc"]

      const testResult = await submitToken(resultToken);

      //  console.log(testResult);

      for (const test of testResult) {
        if (test.status_id != 3) {
          return res.status(400).send("Error Occured");
        }
      }

    }

    const newProblem = await Problem.findByIdAndUpdate(id, {...req.body},{runValidators:true , new:true})
    res.status(200).send(newProblem)



   



  } catch (error) {
    res.status(404).send("errror occured" + error.message)

  }
}

const deleteProblem = async(req,res)=>{
  const {id} = req.params;

  try {
    if(!id){
      return res.status(400).send("Id is Missing");
    }

    const deletedProblem = await Problem.findByIdAndDelete(id);

    if(!deletedProblem){
      return res.status(404).send("PRoblem is Missing");
    }

    res.status(200).send("succesfully deleted")
  } catch (error) {
    res.status(500).send("Error" + error.message)
    
  }
}

const getProblemById = async(req,res)=>{
  const {id} = req.params;
  try {
    if(!id){
      return res.status(400).send("ID IS MISSING")
    }

    const getProblem = await Problem.findById(id).select('title description difficulty tags visibleTestCase startCode referenceSolution _id');

    if(!getProblem){
      return res.status(404).send("Problem is Missing");

    }

    res.status(200).send(getProblem)
  } catch (error) {
    res.status(404).send("Error" + error.message)
    
  }
}

const getAllProblem = async (req,res)=>{
   
  try {
    

    const getProblem = await Problem.find({}).select("_id title difficulty tags ");

    if(getProblem.length == 0 ){
      return res.status(404).send("Problem is Missing");

    }

    res.status(200).send(getProblem)
  } catch (error) {
    res.status(404).send("Error" + error.message)
    
  }
}

const solvedAllProblembyUser =async(req,res)=>{
  try {

    const userId = req.result._id;
   
    const user = await User.findById(userId).populate({
      path:"problemSolved",
      select:"_id title  difficulty tags "
    });



    res.status(200).send(user.problemSolved);

  } catch (error) {
    res.status(500).send("Internal Server Error" + error.message)
    
  }

}
const submittedProblem = async (req,res)=>{
  try {
    const userId = req.result._id;
    const problemId = req.params.pid;

    const asn = await Submission.find({userId , problemId});

    if(!asn.length==0){
      res.status(200).send("No submissions is present ")
    }

    res.status(200).send(asn)

  } catch (error) {
    res.status(500).send("Internal Server Error" + error.message)
  }

}

module.exports = {createProblem , updateProblem , deleteProblem ,getProblemById , getAllProblem ,solvedAllProblembyUser,submittedProblem};


// const submissions = [
//     {
//       "language_id": 46,
//       "source_code": "echo hello from Bash",
//       stdin:23,
//       expected_output:43,
//     },
//     {
//       "language_id": 123456789,
//       "source_code": "print(\"hello from Python\")"
//     },
//     {
//       "language_id": 72,
//       "source_code": ""
//     }
//   ]