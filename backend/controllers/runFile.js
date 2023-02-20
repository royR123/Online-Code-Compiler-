const { generateFile } = require('../utils/generateFile')
const { executeFile } = require('../utils/executeFile');
const { deleteFile } = require('../utils/deleteFile');
const runFile = async (req,res) => {
    try {
        // console.log(req);
        // console.log(req.body);
        console.log("inside runfile")
        if(!req.body.code){
            return res.status(400).json('no code here');
        }
        const {filename , inputsFile }= await generateFile(req.body);
        console.log(filename);
        console.log(inputsFile);
        const executableFile = filename.split('.')[0] + '.out';
        console.log(executableFile);
        executeFile(filename , executableFile , inputsFile).then((data) => {
            console.log("successfull");
            res.status(200).json(data);
            deleteFile(filename , executableFile , inputsFile);    
        }).catch((error) => {
            console.log("some error happened");
            console.log(error);
            res.status(200).json(error.toString());
            deleteFile(filename , executableFile , inputsFile);   
            console.log('error response is sent')
        })
        // res.json(outputData);
        // for(let i = 0 ; i < 100 ; i++){

        // }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

module.exports =  runFile ;