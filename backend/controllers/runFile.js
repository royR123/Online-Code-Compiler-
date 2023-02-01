const { generateFile } = require('../utils/generateFile')
const { executeFile } = require('../utils/executeFile');
const { deleteFile } = require('../utils/deleteFile');
const runFile = async (req,res) => {
    try {
        // console.log(req);
        // console.log(req.body);
        if(!req.body.code){
            return res.status(400).json('no code here');
        }
        const {filename , inputsFile }= await generateFile(req.body);
        console.log(filename);
        const executableFile = filename.split('.')[0] + '.exe';
        executeFile(filename , executableFile , inputsFile).then((data) => {
            res.status(200).json(data);
            deleteFile(filename , executableFile , inputsFile);    
        }).catch((error) => {
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