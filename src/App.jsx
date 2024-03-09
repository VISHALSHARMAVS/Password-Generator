// import { Select } from "@mui/material";
import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [lenth, setLength] = useState(0);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ASDFGHJKLZXCVBNMQWERTYUIOPasdfghjklmnbvcxzqwertyuiop";
    if (numAllowed) {
      str += "1234567890";
    }
    if (charAllowed) {
      str += "!@#$%^&*()?";
    }

    for (let i = 1; i <=lenth; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
console.log(numAllowed);
    setPassword(pass);
  }, [ lenth, numAllowed, charAllowed, setPassword]);

  const copyToClipboard = useCallback(()=>{

    passwordRef.current?.select();

    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator();
  },[lenth,numAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-4xl text-center text-white">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />

          <button   onClick={copyToClipboard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
         
           >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2 ">
          <div className="flex items-center gap-x-1 ">
            <input
              type="range"
              min={6}
              max={100}
              value={lenth}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="">Length : {lenth}</label>
          </div>
          <div className="flex items-center gap-x-1 ">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => {
                setNumAllowed((prev) => {
                  return !prev
                });
              }}
            />
            <label htmlFor="">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1 ">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev
                );
              }}
            />
            <label htmlFor="">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
