const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const { v4 : uuidv4 } = require('uuid');
// const { stdout, stderr } = require('process');
const id = uuidv4()
const containerName = id + 'coderun-container';
const imageName = 'code-runner';
// const { stdout } = require('process');
const pathToCodes = path.join(__dirname , '../' , 'codes');
const killContainer = (container) => {
    console.log('inside killing contianer');
    exec(`docker rm ${container} -f`,(error , stdout , stderr) => {
        if(error){
            console.log('can not able to delete container');
            console.log(error);
        }else  if(stderr){
            console.log('can not able to delete container');
            console.log(error);
        }else{
            console.log("successfull in deleting the container");

        }
    });
    console.log('exit from killcontainer fucniton');
}
const executeFile = async (filename , executableFile , inputsFile) => {
    return new Promise((resolve , reject) => {
        // console.log(__dirname);
        console.log("inside executefile");
        const pathname = path.join(__dirname , '../' ,'codes');
        let output ;
        console.log(pathname);
        // const inputsFile = 'inputs.txt'

        // docker container
        // const command = `'g++ -o ${executableFile} ${filename} && ./${executableFile} < ${inputsFile}'`;
        const command = `'g++ -o ${executableFile} ${filename}  && ./${executableFile} < ${inputsFile}'`;
        console.log(`the command os ${command}`);
        const runContainer = `docker run -it -d -m 50M --name ${containerName} -v user-codes:/app ${imageName}`;
        const runCode = `docker exec ${containerName} bash -c ${command}`
        exec(`${runContainer}` , (error , stdout , stderr) =>{
            if(error){
                console.log("inside error");
                console.log(error)
                killContainer(containerName);
                reject(error);
                return;
            }else{
                exec(`${runCode}`,(error,stdout,stderr) => {
                    if(error){
                        reject(error);
                        killContainer(containerName);
                        return;
                    }else if(stderr){
                        resolve(stderr);
                        killContainer(containerName);
                        return;
                    }else{
                        resolve(stdout);
                        killContainer(containerName);
                        return;                      
                    }
                })
            }

        })
        




        // without sandboxing the environment using docker container
        // const command = `cd ${pathname} && g++ -o ${executableFile} ${filename}   && ./${executableFile} < ${inputsFile}`;
        // console.log(`the command os ${command}`);
        // const runContainer = `docker run -d -m 50M --name ${containerName} -v ${pathToCodes}:/app/codes  ${imageName}`;
        // const runCode = `docker exec ${containerName}`
        // exec(`${command}` , (error , stdout , stderr) => { 
        //     if(error){
        //         console.log('in erro');
        //         console.log(error);
        //         reject(error);
        //         return;
        //     }else if(stderr){
        //         console.log(stderr);
        //         console.log('in stderr');
        //         resolve(stderr);
        //         return;
        //     }else{
        //         resolve(stdout);
        //         return;
        //     }
            
        // })

    })
}

module.exports = {executeFile};