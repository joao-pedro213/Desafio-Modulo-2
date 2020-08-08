import { promises as fs, write } from 'fs';

const { readFile, writeFile } = fs;

async function insertItem(array) {
  const grades = JSON.parse(await readFile(global.fileName));

  let newGrade = {};

  newGrade = {
    id: grades.nextId++,
    student: array.student,
    subject: array.subject,
    type: array.type,
    value: array.value,
    timestamp: new Date(),
  };

  grades.grades.push(newGrade);

  await writeFile(global.fileName, JSON.stringify(grades, null, 2));
  return newGrade;
}

export { insertItem };
