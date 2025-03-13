import { useEffect, useState } from "react";
import style from "./ActionButton.module.css";
import flushSound from "./flush.mp3";
import useSound from "use-sound";
import IconFlushing from "./icon.svg";
import IconCancel from "./icon-cancel.svg";

type ActionButtonProps = {
  actionName: string;
  sound: boolean;
};

export const ActionButton = ({ actionName, sound = false }: ActionButtonProps) => {
  const [isActive, setIsActive] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [buttonText, setButtonText] = useState(actionName);
  const [playFlush, { stop }] = useSound(flushSound);

  const toggleActive = () => {
    if (!isActive && sound) {
      playFlush();
    } else {
      stop();
    }
    setIsActive(!isActive);
    clearHint();
  };
  const clearHint = () => {
    setIsHover(false);
    setButtonText(actionName + " " + (isActive ? "running" : "stopped"));
  };

  useEffect(() => {
    clearHint();
  }, [isActive]);

  const showHint = () => {
    setIsHover(true);
    const hint = isActive ? "stop " : "start ";
    setButtonText(`Click to ${hint} ${actionName.toLowerCase()}`);
  };

  return (
    <button
      className={isActive ? style.active : undefined}
      onClick={toggleActive}
      onMouseEnter={showHint}
      onMouseLeave={clearHint}
    >
      {isHover ? (
        isActive ? (
          <img src={IconCancel.src} alt="Cancel" />
        ) : (
          <img src={IconFlushing.src} alt="Flushing" className={style.icon} />
        )
      ) : (
        <img src={IconFlushing.src} alt="Flushing" className={style.icon} />
      )}
      {buttonText}
    </button>
  );
};
