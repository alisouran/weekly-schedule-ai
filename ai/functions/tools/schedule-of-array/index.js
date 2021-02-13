const scheduleOfArray = (array) => {
  //   console.log("🚀 ~ file: index.js ~ line 2 ~ scheduleOfArray ~ array", array);
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
  let dayTimes = [
    "8-9:30",
    "9:30-11",
    "11-12:30",
    "12:30-14",
    "14-15:30",
    "15:30-17",
  ];
  let weekDays = ["saturday", "sunday", "monday", "tuesday", "wednesday"];

  weekDays.map((w) => {
    dayTimes.map((t) => {
      array.map((obj) => {
        if (w === obj.day && t === obj.time && obj.lesson !== null) {
          schedule[w] = {
            ...schedule[w],
            [t]:
              schedule[w][t] === ""
                ? obj.prof !== "null"
                  ? obj.lesson + ` (${obj.prof})` + ` (${obj.semester})`
                  : obj.lesson
                : obj.prof !== "null"
                ? schedule[w][t] +
                  " / " +
                  obj.lesson +
                  ` (${obj.prof})` +
                  ` (${obj.semester})`
                : schedule[w][t] + " / " + obj.lesson,
          };
        }
      });
    });
  });

  return schedule;
};

export default scheduleOfArray;
