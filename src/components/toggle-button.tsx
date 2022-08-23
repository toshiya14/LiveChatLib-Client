import { ReactElement, useCallback, useEffect, useState } from "react";
import cls from "classnames";
import "./toggle-button.scss";

export type ToggleButtonProps = {
  state: [number, React.Dispatch<React.SetStateAction<number>>];
  displays: ReactElement[];
  gap?: string;
  onIndexChanged?: (e: number) => void;
};

export function ToggleButton(props: ToggleButtonProps) {
  const [activedIndex, _setActivedIndex] = props.state;

  function setActivedIndex(index: number) {
    _setActivedIndex(index);
    props.onIndexChanged?.apply(undefined, [index]);
  }

  return (
    <div className="uicomp toggle-button">
      <ul className="toggle-button-list">
        {props.displays.map((d, i) => (
          <li
            key={i}
            className={cls({ "toggle-button-item": true, active: i === activedIndex })}
            onClick={(e) => {
              setActivedIndex(i);
            }}
            style={{
              paddingLeft: props.gap || "5px",
              paddingRight: props.gap || "5px"
            }}>
            {d}
          </li>
        ))}
      </ul>
    </div>
  );
}
