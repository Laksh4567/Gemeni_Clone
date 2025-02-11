import { createContext, useState } from "react";
import run from "../Config/gemeni";
export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recent, setRecent] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResult((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };
  const onSent = async (prompt) => {
    setResult("");
    setLoading(true);
    setShowResult(true);

    let response;

    if (prompt != undefined) {
      response = await run(prompt);
      setRecent(prompt);
    } else {
      setPrevPrompt((prev) => [...prev, input]);
      setRecent(input);
      response = await run(input);
    }

    let responseArray = response.split("**");
    let newResponse = "";

    for (let i = 0; i < responseArray.length; i++) {
      if (i % 2 === 0) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b><strong>" + responseArray[i] + "</strong></b>";
      }
    }

    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    //setResult(newResponse2);

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecent,
    recent,
    showResult,
    loading,
    input,
    setInput,
    result,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
