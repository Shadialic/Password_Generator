import React, { useState } from "react";
import "./Home.css";
import bg from "../../assets/bgimage.svg";
import restart from "../../assets/restart.png";
import copy from "../../assets/copy.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { genaratePassword } from "../../Api/api";



const getPasswordStrength = (length) => {
  if (length < 10) {
    return { label: "Very Weak", bgClass: "bg-red-600" }; 
  } else if (length < 12) {
    return { label: "Weak", bgClass: "bg-red-300" }; 
  } else if (length < 16) {
    return { label: "Good", bgClass: "bg-green-300" }; 
  } else {
    return { label: "Very Good", bgClass: "bg-green-600" }; 
  }
};


function Home() {
  const [password, setPassword] = useState("12345678");
  const [lower, setLower] = useState(true);
  const [upper, setUpper] = useState(true);
  const [number, setNumber] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [passwordLength, setPasswordLength] = useState(8);

  const handlePassword = async (e) => {
    e.preventDefault();

    try {
      if (!lower && !upper && !number && !symbols) {
        toast.error("Please add input!");
      } else {
        setLoading((curr) => !curr);
        const response = await genaratePassword({
          lower,
          upper,
          number,
          symbols,
          passwordLength,
        });

        if (response.data.genarate) {
          setTimeout(() => {
            setLoading((curr) => !curr);
          }, 500);
          setPassword(response.data.password);
        } else {
          setLoading((curr) => !curr);
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
 
  const { label, bgClass } = getPasswordStrength(passwordLength);

  return (
    <>
      <div className="bg-[#fff] ">
        <div className="mt-5 text-5xl font-prompt-semibold leading-[2.15] sm:text-5xl text-center ">
          <h1 className="bg-gradient-to-r from-[#37254e] via-[#28202d] to-[#483e52] bg-clip-text text-transparent ">
            Random Password Generator
          </h1>
        </div>
        <p className="text-center mt-8 font-prompt">
          Create strong and secure passwords to keep your account safe online.
        </p>
        <div className="flex flex-row items-start">
          <img src={bg} className="w-[44%] p-8" alt="" />

          <div className="flex flex-col w-[40%] ">
            <div className="flex w-ful h-14 border-2 rounded-full shadow-md shadow-gray-100 mt-8  items-center">
              <input
                type="text"
                value={password}
                className="flex text-center outline-none w-[70%] border-3"
              />
              <label htmlFor="" className={`p-2 rounded-xl ${bgClass}`}>
              {label}
              </label>
              <img
                className="w-8 ml-4 cursor-pointer"
                onClick={handlePassword}
                src={restart}
                alt=""
              />
            </div>

            <div className="flex flex-col mt-10">
              <h1 className="text-xl ml-4">
                Passsword <br /> Length: {passwordLength}
              </h1>
              <div className="flex-1 ml-4">
                <input
                  type="range"
                  min={8}
                  max={40}
                  defaultValue={passwordLength}
                  onChange={(e) => setPasswordLength(e.currentTarget.value)}
                  className="w-full"
                />
              </div>
              <div className="mt-10 flex flex-row gap-10">
                <h1 className="text-xl ml-4">
                  Characters <br />
                  used:
                </h1>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={upper}
                    onClick={() => setUpper(!upper)}
                    className="w-6"
                  />
                  <label
                    htmlFor=""
                    className="text-xl font-prompt-semibold mt-3 "
                  >
                    ABC
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={lower}
                    onClick={() => setLower(!lower)}
                    className="w-6"
                  />
                  <label
                    htmlFor=""
                    className="text-xl font-prompt-semibold mt-3 "
                  >
                    abc
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={number}
                    onClick={() => setNumber(!number)}
                    className="w-6"
                  />
                  <label
                    htmlFor=""
                    className="text-xl font-prompt-semibold mt-3 "
                  >
                    123
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={symbols}
                    onClick={() => setSymbols(!symbols)}
                    className="w-6"
                  />
                  <label
                    htmlFor=""
                    className="text-xl font-prompt-semibold mt-3 "
                  >
                    #$&
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-5 bg-[#2944c7] text-white w-[40%] rounded-full ml-3 h-10 hover:bg-[#1d36a7] hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out">
              <button
                onClick={handlePassword}
                className="flex justify-center items-center"
              >
                Generate password
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <CopyToClipboard text={password} onCopy={handleCopy}>
              <div className="flex justify-center items-center w-12 h-12 text-white font-prompt bg-[#36ac30] ml-4 rounded-full mt-9 hover:bg-[#44a53f] cursor-pointer transition duration-200 ease-in-out">
                <img src={copy} className="w-8 h-8" alt="Copy" />
              </div>
            </CopyToClipboard>
            {copied && (
              <span className="text-sm text-green-500 mt-2">Copied!</span> // This message appears when text is copied
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
