const fs = require('fs').promises;
const path = require('path');
const { v4 : uuidv4 } = require('uuid')

const generateFile = async ({code , language , inputs }) => {
    console.log('inside generate file');
    try {
        let filename = uuidv4();
        if(language === 'C++'){
            filename += '.cpp';
        }else{
            filename += '.py';
        }
        const inputsFile = filename.split('.')[0] + '.txt';
        // console.log(__dirname);
        await fs.writeFile(path.join(__dirname , '../' , 'codes',filename) , code);

        await fs.writeFile(path.join(__dirname , '../' , 'codes' , inputsFile) , inputs);
        return {filename , inputsFile };
        
        // console.log(data);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { generateFile }