import React from "react";
import "./DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  let dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  function formatSpots(props) {
    if (props.spots === 0) {
      return `No spots remaining`;
    } else if (props.spots === 1) {
      return `1 spot remaining`;
    } else {
      return `${props.spots} spots remaining`;
    }
  }

  return (
    <li
      data-testid="day"
      className={dayClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}
