const checkRestrictions = (arraySchedule) => {
  let profCounter = 0;
  let profs1 = [];
  let profs2 = [];
  let profs = [];
  arraySchedule.map((a) => {
    if (a.day === "saturday" && a.prof !== "null" && a.prof !== null) {
      profs1.push(a.prof);
    }
    if (a.day === "wednesday" && a.prof !== "null" && a.prof !== null) {
      profs2.push(a.prof);
    }
  });
  profs1.map((c) => {
    if (profs2.includes(c) && !profs.includes(c)) {
      profs.push(c);
    }
  });

  if (profs.length !== 0) {
    profCounter = 1;
  } else {
    profCounter = 0;
  }

  let semesters = [];
  arraySchedule.map((f) => {
    if (!semesters.includes(f.semester) && f.semester !== null) {
      semesters.push(f.semester);
    }
  });
  semesters = semesters.sort();
  let semesterCounter = 0;
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
      semesterCounter = semesterCounter + 1;
    }
  }

  let lessonCounter = 0;
  let weekDays = ["saturday", "sunday", "monday", "tuesday", "wednesday"];
  weekDays.map((w) => {
    let lessons = [];
    arraySchedule.map((ar) => {
      if (w === ar.day && ar.lesson !== null) {
        if (lessons.includes(ar.lesson)) {
          lessonCounter += 1;
        } else {
          lessons.push(ar.lesson);
        }
      }
    });
  });

  let profTimeCounter = 0;
  let dayTimes = [
    "8-9:30",
    "9:30-11",
    "11-12:30",
    "12:30-14",
    "14-15:30",
    "15:30-17",
  ];

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
            profTimeCounter += 1;
          } else {
            profs.push(ar.prof);
          }
        }
      });
    });
  });

  let semesterTimeCounter = 0;

  weekDays.map((w) => {
    dayTimes.map((t) => {
      let semesters = [];
      arraySchedule.map((ar) => {
        if (
          w === ar.day &&
          t === ar.time &&
          ar.semester !== null &&
          ar.semester !== "null"
        ) {
          if (semesters.includes(ar.semester)) {
            semesterTimeCounter += 1;
          } else {
            semesters.push(ar.semester);
          }
        }
      });
    });
  });

  return { profCounter, semesterCounter, lessonCounter, profTimeCounter, semesterTimeCounter };
};

export default checkRestrictions;
