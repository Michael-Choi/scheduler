export function getAppointmentsForDay(state, day) {
  let dayAppointmentsArray = [];

  let appointmentsDay = state.days.filter(
    appointment => appointment.name === day
  );
  if (appointmentsDay.length === 0) {
    return [];
  }
  // console.log(appointmentsDay);
  let appointmentsArray = appointmentsDay[0].appointments;
  // console.log(appointmentsArray);

  for (let appointmentid of appointmentsArray) {
    dayAppointmentsArray.push(state.appointments[appointmentid]);
  }
  console.log(dayAppointmentsArray);
  return dayAppointmentsArray;
}
export function getInterview(state, interview) {
  return "";
}
