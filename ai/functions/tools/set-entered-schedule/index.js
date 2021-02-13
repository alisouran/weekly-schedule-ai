const setEnteredSchedule = (schedule, userschedule) => {
  Object.keys(schedule).map((key) => {
    let counter = 0;
    for (let counte_i in userschedule) {
      if (key === userschedule[counte_i].day) {
        for (let j = 0; j < 6; j++) {
          if (counter === j) {
            if (userschedule[counte_i].lesson !== null) {
              schedule[userschedule[counte_i].day][
                Object.keys(schedule[userschedule[counte_i].day])[j]
              ] = {
                lesson: userschedule[counte_i].lesson.replaceAll("/", " / "),
                changeable: false,
                prof:
                  userschedule[counte_i].prof !== null
                    ? userschedule[counte_i].prof.replaceAll("/", " / ")
                    : null,
                unit:
                  userschedule[counte_i].unit !== null
                    ? userschedule[counte_i].unit.replaceAll("/", " / ")
                    : null,
                semester:
                  userschedule[counte_i].semester !== null
                    ? userschedule[counte_i].semester.replaceAll("/", " / ")
                    : null,
              };
            }
          }
        }
        counter += 1;
      }
    }
  });
  return schedule;
};

export default setEnteredSchedule;
