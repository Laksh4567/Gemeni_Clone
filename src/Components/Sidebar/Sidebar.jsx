import { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";

const Sidebar = () => {
  const [clicked, setclicked] = useState(false);
  const { onSent, prevPrompt, setRecent, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecent(prompt);
    await onSent(prompt);
  };

  return (
    <div className=" sidebar">
      <div className="top">
        <div className="dd">
          <img
            onClick={() => setclicked((prev) => !prev)}
            className="menu"
            src={assets.menu_icon}
            alt=""
          />
        </div>

        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {clicked ? <p>New Chat</p> : null}
        </div>

        {clicked ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.map((item, index) => {
              return (
                <div onClick={() => loadPrompt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0, 18)} ...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {clicked ? <p>Help</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {clicked ? <p>Activity</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {clicked ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
