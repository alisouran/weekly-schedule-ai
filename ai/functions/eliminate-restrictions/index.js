import arrayOfSchedule from "../tools/array-of-schedule";
import scheduleOfArray from "../tools/schedule-of-array";
import checkRestrictions from "./check-restrictions";
import lessonRestrictions from "./lesson-restrictions";
import profDaysRestrictions from "./prof-days-restrictions";
import profTimeRestrictions from "./prof-time-restrictions";
import semesterTimeRestrictions from "./semester-time-restrictions";
import semestersDayRestrictions from "./semesters-day-restrictions";

const eliminateRestrictions = (file, schedule) => {
  let includes = [];

  const randomProperty = (obj) => {
    if (typeof obj === "object") {
      var keys = Object.keys(obj);
      return keys[(keys.length * Math.random()) << 0];
    } else if (typeof obj === "string") {
      var keys = Object.keys(schedule[obj]);
      return keys[(keys.length * Math.random()) << 0];
    }
  };

  for (let i in file) {
    if (file[i].unit > 2) {
      for (let k = 0; k < 1; k++) {
        let randDay = randomProperty(schedule);
        let randTime = randomProperty(randomProperty(schedule));
        let insertVal = true;
        if (
          schedule[randDay][randTime] === "" &&
          !includes.includes(file[i].lesson)
        ) {
          for (let j in schedule[randDay]) {
            if (
              schedule[randDay][j].lesson === file[i].lesson ||
              randDay === file[i].day
            ) {
              insertVal = false;
            }
          }
          if (insertVal) {
            includes.push(file[i].lesson);
            schedule[randDay][randTime] = {
              lesson: file[i].lesson,
              prof: file[i].prof,
              unit: file[i].unit,
              semester: file[i].semester,
              changeable: true,
            };
          } else {
            k = k - 1;
          }
        } else if (
          schedule[randDay][randTime].changeable &&
          schedule[randDay][randTime].lesson.split(" / ").length < 2 &&
          !includes.includes(file[i]) &&
          !schedule[randDay][randTime].lesson
            .split(" / ")
            .includes(file[i].lesson) &&
          !schedule[randDay][randTime].prof
            .split(" / ")
            .includes(file[i].prof) &&
          !schedule[randDay][randTime].semester
            .split(" / ")
            .includes(file[i].semester)
        ) {
          for (let j in schedule[randDay]) {
            if (schedule[randDay][j].lesson) {
              if (
                schedule[randDay][j].lesson.split(" / ")[0] ===
                  file[i].lesson ||
                schedule[randDay][j].lesson.split(" / ")[1] === file[i].lesson
              ) {
                insertVal = false;
              }
            }
          }
          if (insertVal) {
            includes.push(file[i].lesson);
            schedule[randDay][randTime] = {
              lesson:
                file[i].lesson + " / " + schedule[randDay][randTime].lesson,
              prof: file[i].prof + " / " + schedule[randDay][randTime].prof,
              unit: file[i].unit + " / " + schedule[randDay][randTime].unit,
              semester:
                file[i].semester + " / " + schedule[randDay][randTime].semester,
              changeable: true,
            };
          } else {
            k -= 1;
          }
        } else {
          k -= 1;
        }
      }
    }
  }

  let arraySchedule = arrayOfSchedule(schedule);
  let counter = 10;
  let profCounter = 1;
  let semesterCounter = 1;
  let lessonCounter = 1;
  let profTimeCounter = 1;
  let semesterTimeCounter = 1;
  let count = 1;
  let restrictions = {};
  while (counter !== 0 && count < 100) {
    restrictions = checkRestrictions(arraySchedule);
    console.log("🚀 🚀 🚀 TRY FOR " + count + "th Time 🚀 🚀 🚀");
    semesterCounter = restrictions.semesterCounter;
    console.log("🚀 ~ We have ", semesterCounter, " Semester DAYS limit.");
    profCounter = restrictions.profCounter;
    console.log("🚀 ~ We have ", profCounter, " Prof DAYS limit.");
    lessonCounter = restrictions.lessonCounter;
    console.log("🚀 ~ We have ", lessonCounter, " Lesson in a DAY limit.");
    profTimeCounter = restrictions.profTimeCounter;
    console.log("🚀 ~ We have ", profTimeCounter, " Prof in a TIME limit.");
    semesterTimeCounter = restrictions.semesterTimeCounter;
    console.log(
      "🚀 ~ We have ",
      semesterTimeCounter,
      " Semester in a TIME limit."
    );

    if (profCounter !== 0) {
      arraySchedule = profDaysRestrictions(arraySchedule);
    }
    if (semesterCounter !== 0) {
      arraySchedule = semestersDayRestrictions(arraySchedule);
    }
    if (lessonCounter !== 0) {
      arraySchedule = lessonRestrictions(arraySchedule);
    }
    if (profTimeCounter !== 0) {
      arraySchedule = profTimeRestrictions(arraySchedule);
    }
    if (semesterTimeCounter !== 0) {
      arraySchedule = semesterTimeRestrictions(arraySchedule);
    }
    if (
      profCounter === 0 &&
      semesterCounter === 0 &&
      lessonCounter === 0 &&
      profTimeCounter === 0 &&
      semesterTimeCounter === 0
    ) {
      counter = 0;
      console.log("🚀 🚀 🚀 CRS 🚀 🚀 🚀");
    }
    count += 1;
  }
  // console.log("🚀 ~ IINNNJAAA ~ arraySchedule", arraySchedule);
  schedule = scheduleOfArray(arraySchedule);
  return schedule;
};

export default eliminateRestrictions;
