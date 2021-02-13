import arrayRemove from "../tools/array-remove";

const randomSelection = (file, schedule) => {
  let randArr = [];
  let randVal;
  for (let i in file) {
    randArr.push(parseInt(i));
  }
  let condition = true;
  const randomProperty = (obj) => {
    if (typeof obj === "object") {
      var keys = Object.keys(obj);
      return keys[(keys.length * Math.random()) << 0];
    } else if (typeof obj === "string") {
      var keys = Object.keys(schedule[obj]);
      return keys[(keys.length * Math.random()) << 0];
    }
  };

  while (condition) {
    randVal = parseInt(randomProperty(file));
    let randDay = randomProperty(schedule);
    let randTime = randomProperty(randomProperty(schedule));
    if (randArr.length === 0) {
      condition = false;
    } else {
      if (randArr.includes(randVal)) {
        if (schedule[randDay][randTime] === "") {
          schedule[randDay][randTime] = {
            lesson: file[randVal].lesson,
            prof: file[randVal].prof,
            unit: file[randVal].unit,
            semester: file[randVal].semester,
            changeable: true,
          };
          randArr = arrayRemove(randArr, randVal);
        }
      }
    }
  }
  return schedule;
};

export default randomSelection;
