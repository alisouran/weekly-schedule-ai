const removeDuplicateLessons = (file, userschedule) => {
  for (let counter_i in file) {
    for (let counter_j in userschedule) {
      if (userschedule[counter_j].lesson !== null) {
        userschedule[counter_j].lesson
          .replaceAll(" / ", "/")
          .split("/")
          .map((us_counter) => {
            if (file[counter_i]) {
              if (us_counter === file[counter_i].lesson) {
                delete file[counter_i];
                return 0;
              }
            }
          });
      }
    }
  }
  return file;
};

export default removeDuplicateLessons;
