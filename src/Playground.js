import React from 'react'
import { useState, useEffect } from 'react';
import Editor from './Editor'
import { doc, onSnapshot } from "firebase/firestore";
import { firebaseDB } from './App';

const Playground = () => {

  const user = localStorage.getItem("codepenuid");






  const [html, sethtml] = useState("");
  const [css, setcss] = useState("");
  const [javascript, setjavascript] = useState("");
  const [srcDoc, setsrcDoc] = useState("");
  const [h, seth] = useState("");
  const [c, setc] = useState("");
  const [j, setj] = useState("");

  useEffect(() => {

    if (user !== undefined) {
      const unSub = onSnapshot(doc(firebaseDB, "users", user), (doc) => {
        doc.exists() && sethtml(doc.data().html);
        doc.exists() && setcss(doc.data().css);
        doc.exists() && setjavascript(doc.data().js);
        doc.exists() && seth(doc.data().html);
        doc.exists() && setc(doc.data().css);
        doc.exists() && setj(doc.data().js);

      });



      setsrcDoc(`
       <html>
       <body>${h}</body>
       <style>${c}</style>
       <script>${j}</script>
       </html>
       `)

    }

  }, [h, c, j])

  return (
    <>

      <div className='pane top-pane' >

        <Editor language="xml"
          user={user}
          displayName="HTML"
          value={html}
          onChange={sethtml}

        />

        <Editor

          language="css"
          user={user}
          displayName="CSS"
          value={css}
          onChange={setcss}

        />
        <Editor

          language="js"
          user={user}
          displayName="JS"
          value={javascript}
          onChange={setjavascript}

        />

      </div>


      <div className='pane'>

        <iframe
          srcDoc={srcDoc}
          title='output'
          sandbox='allow-scripts'
          width="100%"
          height="100%"

        />

      </div>


    </>
  )
}

export default Playground