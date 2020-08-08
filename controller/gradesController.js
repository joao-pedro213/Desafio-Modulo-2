import { promises as fs } from 'fs';
import { timeStamp } from 'console';

const { readFile, writeFile } = fs;

async function insertItem(item) {
  const data = JSON.parse(await readFile(global.fileName));

  let newGrade = {};

  newGrade = {
    id: data.nextId++,
    student: item.student,
    subject: item.subject,
    type: item.type,
    value: item.value,
    timestamp: new Date(),
  };

  data.grades.push(newGrade);

  await writeFile(global.fileName, JSON.stringify(data, null, 2));
  return newGrade;
}

async function updateItem(item) {
  const data = JSON.parse(await readFile(global.fileName));

  let newGrade = {};

  const index = data.grades.findIndex((a) => {
    return parseInt(item.id) === a.id;
  });

  if (index === -1) {
    throw new Error(`Não foi encontrada nenhuma grade com o id: ${item.id}.`);
  }

  newGrade = {
    id: item.id,
    student: item.student,
    subject: item.subject,
    type: item.type,
    value: item.value,
    timestamp: new Date(),
  };

  data.grades[index] = newGrade;

  await writeFile(global.fileName, JSON.stringify(data, null, 2));

  return newGrade;
}

async function deleteItem(id) {
  const data = JSON.parse(await readFile(global.fileName));

  let filteredGrades = {};

  const index = data.grades.findIndex((a) => {
    return parseInt(id) === a.id;
  });

  if (index === -1) {
    throw new Error(`Não foi encontrada nenhuma grade com o id: ${id}.`);
  }

  filteredGrades = data.grades.filter((grade) => {
    return grade.id !== parseInt(id);
  });

  data.grades = filteredGrades;

  await writeFile(global.fileName, JSON.stringify(data, null, 2));

  return `A grade de id ${id} foi excluída com sucesso.`;
}

export { insertItem, updateItem, deleteItem };
