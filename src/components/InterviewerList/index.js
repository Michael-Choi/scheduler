import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "../InterviewerListItem";

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        avatar={interviewer.avatar}
        name={interviewer.name}
        key={interviewer.id}
        selected={interviewer.id === props.value}
        setInterviewer={event => {
          props.onChange(interviewer.id);
        }}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}
