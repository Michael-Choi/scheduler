import { useReducer, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const UPDATE_SPOTS_REMAINING = "UPDATE_SPOTS_REMAINING";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.day };

      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers
        };

      case SET_INTERVIEW:
        const appointment = {
          ...state.appointments[action.id],
          interview: action.interview && { ...action.interview }
        };
        const appointments = {
          ...state.appointments,
          [action.id]: appointment
        };
        return {
          ...state,
          appointments
        };

      case UPDATE_SPOTS_REMAINING:
        let dayid = 0;
        if (action.id < 6) {
          dayid = 0;
        } else if (action.id < 11) {
          dayid = 1;
        } else if (action.id < 16) {
          dayid = 2;
        } else if (action.id < 21) {
          dayid = 3;
        } else if (action.id < 26) {
          dayid = 4;
        }

        let newdays = state.days.map((item, index) => {
          if (index !== dayid) {
            return item;
          }
          return {
            ...item,
            spots: state.days[dayid].spots + action.val
          };
        });
        return { ...state, days: newdays };
      default:
        throw new Error("Tried to use unsupported action type " + action.type);
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then(all =>
        dispatch({
          type: SET_APPLICATION_DATA,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        })
      )
      .catch(err => console.log("err"));
  }, []);

  const setDay = day => dispatch({ type: SET_DAY, day });

  function bookInterview(id, interview) {
    if (!state.appointments[id].interview) {
      updateDays(id, -1);
    }
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(dispatch({ type: SET_INTERVIEW, id, interview }));
  }

  function deleteInterview(id, interview) {
    return axios
      .delete(`/api/appointments/${id}`)
      .then(dispatch({ type: SET_INTERVIEW, id, interview: null }))
      .then(updateDays(id, 1));
  }

  function updateDays(id, val) {
    console.log("logging state.days ", state.days);
    dispatch({
      type: UPDATE_SPOTS_REMAINING,
      id,
      val
    });
    console.log("consolelog state.days after change", state.days);
  }

  return { state, setDay, bookInterview, deleteInterview };
};

export default useApplicationData;
