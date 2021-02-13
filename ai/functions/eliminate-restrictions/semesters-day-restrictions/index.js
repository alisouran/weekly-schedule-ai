const semestersDayRestrictions = (arraySchedule) => {
  let semesters = [];
  let problemSemesters = [];
  arraySchedule.map((f) => {
    if (
      (!semesters.includes(f.semester) && f.semester !== null) ||
      f.semester !== "null"
    ) {
      semesters.push(f.semester);
    }
  });
  semesters = semesters.sort();
  let counter = 0;
  for (let i in semesters) {
    let semesterDays = [];
    arraySchedule.map((n) => {
      if (n.semester === semesters[i]) {
        if (!semesterDays.includes(n.day)) {
          semesterDays.push(n.day);
        }
      }
    });
    if (semesterDays.length > 4) {
      counter = counter + 1;
      problemSemesters.push(semesters[i]);
    }
  }
  let days = {};
  let currentDate;
  problemSemesters.map((a) => {
    let cnt = 1;
    arraySchedule.map((b) => {
      if (b.semester === a) {
        if (currentDate !== b.day) {
          currentDate = b.day;
          cnt = 1;
          days[b.semester] = { ...days[b.semester], [b.day]: cnt };
        } else {
          cnt += 1;
          days[b.semester] = { ...days[b.semester], [b.day]: cnt };
        }
      }
    });
  });
  for (let i = 0; i < 4; i++) {
    Object.keys(days).map((key) => {
      let lowest = 100;
      let removableKey;
      Object.keys(days[key]).map((l) => {
        if (days[key][l] < lowest) {
          lowest = days[key][l];
          removableKey = l;
        }
      });
      delete days[key][removableKey];
    });
  }
  let weekDays = ["saturday", "sunday", "monday", "tuesday", "wednesday"];

  Object.keys(days).map((key) => {
    arraySchedule.map((obj) => {
      if (obj.semester === key && obj.day === Object.keys(days[key])[0]) {
        for (let n = 0; n < 1; n++) {
          const random = Math.floor(Math.random() * weekDays.length);
          //   console.log(obj);
          if (obj.changeable) {
            if (weekDays[random] !== obj.day) {
              obj.day = weekDays[random];
            } else {
              n -= 1;
            }
          } else {
            n -= 1;
          }
        }
      }
    });
  });

  //   console.log("🚀 semestersDayRestrictions ~ arraySchedule", arraySchedule);


  return arraySchedule ;
};

export default semestersDayRestrictions;
