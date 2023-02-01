const fs = require('fs');
const path = require('path');

const deleteFile = (filename , executableFile , inputsFile) => {
    try {
        fs.unlink(path.join(__dirname , '../' , 'codes' , filename),(err) => {
            console.log(err);
        });
        fs.unlink(path.join(__dirname , '../' , 'codes' , executableFile),(err) => {
            console.log(err);
        });
        fs.unlink(path.join(__dirname , '../' , 'codes' , inputsFile),(err) => {
            console.log(err);
        });  
    } catch (error) {
        console.log(error);
    }
}

module.exports = { deleteFile }