const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const containerName = 'coderun-container';
const imageName = 'coderun-image';
// const { stdout } = require('process');
const executeFile = async (filename , executableFile , inputsFile) => {
    return new Promise((resolve , reject) => {
        // console.log(__dirname);
        const pathname = path.join(__dirname, '../' , 'codes');
        let output ;
        console.log(pathname);
        // const inputsFile = 'inputs.txt'
        const command = `cd ${pathname} && g++ -o ${executableFile} ${filename}   && .\\${executableFile} < ${inputsFile}`;
        // const runContainer = `docker run -it -d -m 50M --name ${containerName} -v `
        exec(`${command}` , (error , stdout , stderr) => {
            if(error){
                console.log('in erro');
                // console.log(error);
                reject(error);
                return;
            }else if(stderr){
                // console.log(stderr);
                console.log('in stderr');
                resolve(stderr);
                return;
            }else{
                resolve(stdout);
                return;
            }
            
        })

    })
}

module.exports = {executeFile};