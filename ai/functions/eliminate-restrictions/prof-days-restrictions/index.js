import arrayMove from "../../tools/array-move";

const profDaysRestrictions = (arraySchedule) => {
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

  profs.map((prof) => {
    if (profs2.length >= profs1.length) {
      arraySchedule.map((sc, i) => {
        if (sc.prof === prof && sc.day === "wednesday") {
          for (let m = 0; m < 1; m++) {
            let randomIndex = Math.floor(Math.random() * arraySchedule.length);

            if (
              arraySchedule[randomIndex].day !== "wednesday" &&
              arraySchedule[i].time !== arraySchedule[randomIndex].time
            ) {
              arraySchedule[i].day = arraySchedule[randomIndex].day;
              let insert = true;
              for (let n = 0; n < arraySchedule.length; n++) {
                if (
                  arraySchedule[i].lesson === arraySchedule[randomIndex].lesson
                ) {
                  insert = false;
                }
              }
              if (insert) {
                arraySchedule = arrayMove(arraySchedule, i, randomIndex);
              } else {
                arraySchedule[i].day = "wednesday";
                m -= 1;
              }
            } else {
              m -= 1;
            }
          }
        }
      });
    } else {
      arraySchedule.map((sc, i) => {
        if (sc.prof === prof && sc.day === "saturday") {
          for (let m = 0; m < 1; m++) {
            let randomIndex = Math.floor(Math.random() * arraySchedule.length);
            if (
              arraySchedule[randomIndex].day !== "saturday" &&
              arraySchedule[i].time !== arraySchedule[randomIndex].time
            ) {
              arraySchedule[i].day = arraySchedule[randomIndex].day;
              let insert = true;
              for (let n = 0; n < arraySchedule.length; n++) {
                if (
                  arraySchedule[i].lesson ===
                    arraySchedule[randomIndex].lesson &&
                  arraySchedule[i].day === arraySchedule[randomIndex].day
                ) {
                  insert = false;
                }
              }
              if (insert) {
                arraySchedule = arrayMove(arraySchedule, i, randomIndex);
              } else {
                arraySchedule[i].day = "saturday";
                m -= 1;
              }
            } else {
              m -= 1;
            }
          }
        }
      });
    }
  });

  return arraySchedule;
};

export default profDaysRestrictions;
