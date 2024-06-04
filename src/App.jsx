"/vite.svg";
import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charsAllowed, setCharsAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbersAllowed) str += "0123456789";
    if (charsAllowed) str += "!@#$%^&*()_+}{[]:><|~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numbersAllowed, charsAllowed, setPassword]);

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,4);
    window.navigator.clipboard.writeText(password);
    // window.navigator.clipboard.writeText(password.substring(0, 4));
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numbersAllowed, charsAllowed, passwordGenerator]);
  return (
    <>
      <div className=" max-w-[1000px] px-4 min-h-[80vh] my-0 mx-auto ">
        <div className="max-w-[1000px] bg-gray-900 p-6 my-3 rounded-xl drop-shadow-2xl  shadow-black">
          <div className="">
            <h1 className="text-white py-2 px-4 mb-5 text-3xl font-semibold">
              Password Generator
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center w-full gap-3 md:gap-0">
              <input
                className="md:w-[50%] w-full py-3 px-2 text-xl font-semibold outline-none  rounded-lg md:rounded-l-lg md:rounded-r-none"
                type="text"
                readOnly
                value={password}
                placeholder="Password"
                ref={passwordRef}
              />
              <button
                onClick={copyPasswordToClipBoard}
                className="py-3 px-3 text-xl font-semibold text-white bg-blue-700 rounded-lg md:rounded-r-lg md:rounded-l-none"
              >
                Copy
              </button>
            </div>
          </div>
          <div className="text-white flex flex-col sm:flex-row justify-center items-center gap-5 my-5 font-bold">
            <input
              className="cursor-pointer"
              type="range"
              min={0}
              max={30}
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="Length">Length {length}</label>
            <input
              className="cursor-pointer"
              type="checkbox"
              id="Numbers"
              onChange={() => {
                setNumbersAllowed((prev) => !prev);
              }}
              defaultChecked={numbersAllowed}
            />
            <label htmlFor="Numbers">Numbers</label>
            <input
              defaultChecked={charsAllowed}
              className="cursor-pointer"
              type="checkbox"
              id="characters"
              onChange={() => {
                setCharsAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characters">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
