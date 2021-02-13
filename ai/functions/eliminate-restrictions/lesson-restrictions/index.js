const lessonRestrictions = (arraySchedule) => {
  let weekDays = ["saturday", "sunday", "monday", "tuesday", "wednesday"];
  let restricLesson = {};
  weekDays.map((w) => {
    let lessons = [];
    arraySchedule.map((ar) => {
      if (w === ar.day && ar.lesson !== null) {
        if (lessons.includes(ar.lesson)) {
          restricLesson[w] = ar.lesson;
        } else {
          lessons.push(ar.lesson);
        }
      }
    });
  });

  Object.keys(restricLesson).map((key) => {
    arraySchedule.map((obj) => {
      for (let n = 0; n < 1; n++) {
        const random = Math.floor(Math.random() * weekDays.length);
        if (obj.changeable) {
          if (key !== weekDays[random]) {
            if (obj.lesson === restricLesson[key] && obj.day === key) {
              obj.day = weekDays[random];
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

export default lessonRestrictions;
