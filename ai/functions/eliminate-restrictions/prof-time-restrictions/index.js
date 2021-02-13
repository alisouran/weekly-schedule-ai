const profTimeRestrictions = (arraySchedule) => {
  let weekDays = ["saturday", "sunday", "monday", "tuesday", "wednesday"];
  let dayTimes = [
    "8-9:30",
    "9:30-11",
    "11-12:30",
    "12:30-14",
    "14-15:30",
    "15:30-17",
  ];
  let restricProfTime = {};
  weekDays.map((w) => {
    dayTimes.map((t) => {
      let profs = [];
      arraySchedule.map((ar) => {
        if (
          w === ar.day &&
          t === ar.time &&
          ar.prof !== null &&
          ar.prof !== "null"
        ) {
          if (profs.includes(ar.prof)) {
            restricProfTime[t] = ar.prof;
          } else {
            profs.push(ar.prof);
          }
        }
      });
    });
  });

  Object.keys(restricProfTime).map((key) => {
    arraySchedule.map((obj) => {
      for (let n = 0; n < 1; n++) {
        const random = Math.floor(Math.random() * dayTimes.length);
        if (obj.changeable) {
          if (key !== dayTimes[random]) {
            if (obj.prof === restricProfTime[key] && obj.time === key) {
              obj.time = dayTimes[random];
              break;
            }
          } else {
            n -= 1;
          }
        }
      }
    });
  });

  return arraySchedule;
};

export default profTimeRestrictions;
