import axios from '@/services/axios-config'

export const updateAppointment = (appointmentId, params) => axios.put(`/api/v1/appointment/${appointmentId}`, params)

export const getAvailableSlots = (params = {}) => {
  /*
  //  Prior to the launch of setmore, we will fake a response
  return new Promise(resolve => {
    const { dates } = params;

    //  Generates a 9am - 9pm set of timeslots
    const timeslots = {};
    const availableDates = dates.split(",");

    for (const date of availableDates) {
      //  A dummy staff id is needed by the api until we move to setmore
      const dummyStaffId = [1];

      let dateDayjs = dayjs(date, "YYYY-MM-DD")
        .set("hour", 9)
        .set("minute", 0);

      //  Iteratively generates a timeslot for every 15 minutes
      //  UNTIL 9pm exclusive
      while (dateDayjs.format("H") < 21) {
        timeslots[dateDayjs.format("YYYY-MM-DDTHH:mm:00Z")] = dummyStaffId;
        dateDayjs = dateDayjs.add(15, "minutes");
      }
    }

    const response = {
      data: {
        statusCode: 200,
        error: false,
        errorCode: 0,
        userMessage: "Success",
        devMessage: {},
        response: timeslots
      }
    };

    resolve(response);
  });
  */
  return axios.get(`/api/v1/appointment/slots`, { params })
}
