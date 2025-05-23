import React, { useState } from "react";

import * as Babel from "@babel/standalone";

import CodeEditor from "./components/CodeEditor";
import PresetSelector from "./components/PresetSelector";
import Footer from "./components/Footer";

import toast, { Toaster } from "react-hot-toast";

import { IoCode, IoSettings } from "react-icons/io5";
import { VscDebugStart } from "react-icons/vsc";

import { REACT, ENV, KNOWLEDGE_BASE } from "./constants/Information";

import "./app.css";

function App() {
  let [preset, setPreset] = useState("react");
  let [userInput, setUserInput] = useState(
    "const element = <h1>Hello,world!</h1>"
  );

  function TextOnChange(text) {
    setUserInput((prev) => text);
  }
  function handlePresetChange(value) {
    console.log(typeof value);
    setPreset(value);
  }

  // This function converts the code depending on presets
  function onConvert() {
    let knowledge = KNOWLEDGE_BASE[preset.toUpperCase()];
    try {
      const output = Babel.transform(userInput, {
        presets: [preset],
        filename: "script.ts",
      });
      setUserInput(output.code);
      toast.success(
        <div>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              marginBottom: "4px",
              color: "#1f2937",
            }}
          >
            {knowledge.header}
          </div>
          <div>{knowledge.message}</div>
        </div>,
        {
          duration: 6000,
        }
      );
    } catch (err) {
      console.log(err.message, "erre");
      toast.error(knowledge.error, {
        duration: 8000,
      });
    }
  }

  return (
    <div className="container">
      <div className="box">
        <div className="container-header-container">
          <IoCode size={35} color="#059669" />
          <h1>Webpack and Babel Unpacked</h1>
        </div>
        <span>Transform your modern JavaScript with ease</span>
        <div className="input-box">
          <h2>Code Transformer</h2>
          <CodeEditor text={userInput} onChange={TextOnChange} />
          <div className="button-container">
            <PresetSelector onChange={handlePresetChange} />
            <button onClick={onConvert}>
              <VscDebugStart />
              Convert
            </button>
          </div>
        </div>
        <Toaster />
        <span className="settings">
          <IoSettings style={{ marginRight: 5 }} />
          Configure options from the dropdown
        </span>
      </div>

      <Footer />
    </div>
  );
}

export default App;
