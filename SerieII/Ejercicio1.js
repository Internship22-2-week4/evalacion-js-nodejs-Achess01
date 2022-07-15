function fixFiles(files) {
  const filesCount = {};
  const fixedList = [];
  // filesCout = { nombre_archivo: cantidad}
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    let currentFile = filesCount[file];
    if (currentFile) {
      const newName = `${file}(${currentFile})`;
      if (files.includes(newName)) {
        /* 
        Si el nuevo nombre ya existe se mueve al final del arreglo
         */
        files.splice(i, 1);
        files.push(newName);
        i--;
        continue;
      }
      fixedList.push(newName);
      filesCount[file]++;
    } else {
      filesCount[file] = 1;
      fixedList.push(file);
    }
  }
  return fixedList;
}

files = ["photo", "postcard", "photo", "photo", "video"];
// console.log(fixFiles(files)); // ['photo', 'postcard', 'photo(1)', 'photo(2)', 'video']

files2 = ["file", "file", "file", "game", "game"];
// console.log(fixFiles(files2)) // ['file', 'file(1)', 'file(2)', 'game', 'game(1)']

// ojo que los elfos ya tenían archivos con (1)... ¡y pueden estar repetidos!
files3 = ["file", "file(1)", "icon", "icon(1)", "icon(1)"];
console.log("Original");
console.log(files3);
console.log("Arreglado");
console.log(fixFiles(files3)); // ['file', 'file(1)', 'icon', 'icon(1)', 'icon(1)(1)']
