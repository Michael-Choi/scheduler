import React from "react";
import "./styles.scss";
import Show from "./Show";
import Header from "./Header";
import Empty from "./Empty";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  async function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    await props.bookInterview(props.id, interview);
    setTimeout(() => transition(SHOW), 300);
  }

  async function delInterview(name, interviewer) {
    transition(DELETING);
    const interview = {
      student: name,
      interviewer
    };
    await props.deleteInterview(props.id, interview);
    setTimeout(() => transition(EMPTY), 300);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          onCancel={() => back()}
          interviewers={props.interviewers}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={() => back()}
          onConfirm={delInterview}
        />
      )}
    </article>
  );
}
