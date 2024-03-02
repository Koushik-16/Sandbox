import React, { useState } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons'
import { doc, updateDoc, getFirestore  } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import { firebaseApp } from "./App"
import { useNavigate } from 'react-router-dom'
import 'firebase/firestore';







const Editor = ({ displayName, language, value, onChange }) => {
  
    const user = localStorage.getItem("codepenuid");
    const firebaseDB = getFirestore(firebaseApp);



    async function handelChange(editor, data, value) {
        // onChange(value);

        if (displayName === "CSS") await updateDoc(doc(firebaseDB, 'users', user), { css: value });

        else if (displayName === "HTML") await updateDoc(doc(firebaseDB, 'users', user), { html: value });

        else if (displayName === "JS") await updateDoc(doc(firebaseDB, 'users', user), { js: value });



    }


    async function ClearArea() {

        if (displayName === "CSS") await updateDoc(doc(firebaseDB, 'users', user), { css: "" });

        else if (displayName === "HTML") await updateDoc(doc(firebaseDB, 'users', user), { html: "" });

        else if (displayName === "JS") await updateDoc(doc(firebaseDB, 'users', user), { js: "" });
        onChange("");
    }




    const [open, setopen] = useState(true);


    return (
        <div className={`editor-container  ${open ? '' : 'colapsed'} `} >


            <div className='editor-title'>{displayName}

                <button style={{ backgroundColor: 'lightblue', borderRadius: '15px', textDecoration: "none", cursor : 'pointer' }} onClick={ClearArea}>Clear</button>
               
      
    
            

                <button

                    type='button'
                    className='expand-colapsed-btn'
                    onClick={() => setopen(prev => !prev)}
                >

                    <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
                </button>

            </div>

            <ControlledEditor
                onBeforeChange={handelChange}
                value={value}
                className='code-mirror-wrapper'
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    theme: 'material',
                    lineNumbers: true


                }}


            />



        </div>
    )
}

export default Editor