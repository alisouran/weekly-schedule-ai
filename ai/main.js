import eliminateRestrictions from "./functions/eliminate-restrictions";
import randomSelection from "./functions/random-selection";
import removeDuplicateLessons from "./functions/tools/remove-duplicate-lesson";
import setEnteredSchedule from "./functions/tools/set-entered-schedule";

let schedule = {
  saturday: {
    "8-9:30": "",
    "9:30-11": "",
    "11-12:30": "",
    "12:30-14": "",
    "14-15:30": "",
    "15:30-17": "",
  },
  sunday: {
    "8-9:30": "",
    "9:30-11": "",
    "11-12:30": "",
    "12:30-14": "",
    "14-15:30": "",
    "15:30-17": "",
  },
  monday: {
    "8-9:30": "",
    "9:30-11": "",
    "11-12:30": "",
    "12:30-14": "",
    "14-15:30": "",
    "15:30-17": "",
  },
  tuesday: {
    "8-9:30": "",
    "9:30-11": "",
    "11-12:30": "",
    "12:30-14": "",
    "14-15:30": "",
    "15:30-17": "",
  },
  wednesday: {
    "8-9:30": "",
    "9:30-11": "",
    "11-12:30": "",
    "12:30-14": "",
    "14-15:30": "",
    "15:30-17": "",
  },
};
const main = (file, userschedule) => {
  file = removeDuplicateLessons(file, userschedule);
  schedule = setEnteredSchedule(schedule, userschedule);
  schedule = randomSelection(file, schedule);
  schedule = eliminateRestrictions(file, schedule);
  console.log("🚀 ~ file: main.js ~ line 53 ~ main ~ schedule", schedule);
  return schedule;
};

export default main;
