import { useState } from 'react';
import axios from '../utils/axios';
import './Editor.css'
import MiniLoading from './MiniLoading';
import Output from './Output';

const Editor = () => {
    const [code,setCode] = useState("#include<iostream>\nusing namespace std;\nint main(){\n    cout << \"HELO \" <<endl\;\n    return 0\;\n}");
    const [language,setLanguage] = useState('C++');
    const [output , setOutput] = useState(null);
    const [codeProcessing , setCodeProcessing] = useState(false);
    const [inputs , setInputs] = useState('');
    const handleRun = async () => {
        console.log(language);
        setCodeProcessing(true);
        let response;
        try {
            response = await axios.post('/run',{
                language,
                code,
                inputs
            })
            console.log(response.status);
            // setOutput(() => response.data);
        } catch (error) {
            console.log(error);
            // setOutput(() => response.data);
        }
        setCodeProcessing(false);
        setOutput(() => response.data);
    }
    return (
        <div className='cont'>
            <div className='wrapper1'>
                <textarea id='text-area-code' rows='30' cols='50' value={code} onChange={(e) => {setCode(() => e.target.value); 
                console.log(code)}} >
                </textarea>
                <textarea id='text-area-inputs' rows='30' cols='20' onChange={(e) => {setInputs(() => e.target.value); 
                console.log(inputs)}} placeholder = 'Enter the inputs'>
                </textarea>
            </div>
            <div id='btns' >
                <select id='select-menu' onChange = {(e) => {
                    setLanguage(() => e.target.value)
                }
                }  >
                    <option value='C++' >C++</option>
                    <option value='Python' >Python</option>
                    <option value='JavaScript' >JavaScript</option>
                </select>
                <button id='btn-for-run' onClick={handleRun}>Run</button>
            </div>
            { codeProcessing ? <MiniLoading/> : <Output data = {output} /> }
        </div>
    )
}
export default Editor;