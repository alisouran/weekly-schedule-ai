const arrayOfSchedule = (schedule) => {
  let arraySchedule = [];
  for (let i in schedule) {
    for (let j in schedule[i]) {
      if (
        schedule[i][j].lesson !== undefined &&
        schedule[i][j].lesson.split(" / ").length > 1
      ) {
        for (let k = 0; k < schedule[i][j].lesson.split(" / ").length; k++) {
          arraySchedule.push({
            day: i,
            lesson: schedule[i][j].lesson.split(" / ")[k],
            prof: schedule[i][j].prof.split(" / ")[k],
            unit: schedule[i][j].unit.split(" / ")[k],
            semester: schedule[i][j].semester.split(" / ")[k],
            time: j,
            changeable: schedule[i][j].changeable,
          });
        }
      } else {
        arraySchedule.push({
          day: i,
          lesson:
            schedule[i][j].lesson !== undefined ? schedule[i][j].lesson : null,
          prof: schedule[i][j].prof !== undefined ? schedule[i][j].prof : null,
          unit: schedule[i][j].unit !== undefined ? schedule[i][j].unit : null,
          semester:
            schedule[i][j].semester !== undefined
              ? schedule[i][j].semester
              : null,
          time: j,
          changeable:
            schedule[i][j].changeable !== undefined
              ? schedule[i][j].changeable
              : null,
        });
      }
    }
  }
  return arraySchedule;
};

export default arrayOfSchedule;
