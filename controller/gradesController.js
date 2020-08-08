import { promises as fs } from 'fs';
import { arraySum } from '../libs/operacoes.js';

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

async function searchForSpecificGrade(id) {
  const data = JSON.parse(await readFile(global.fileName));

  let filteredGrade = {};

  const index = data.grades.findIndex((a) => {
    return parseInt(id) === a.id;
  });

  if (index === -1) {
    throw new Error(`Não foi encontrada nenhuma grade com o id: ${id}.`);
  }

  filteredGrade = data.grades.find((grade) => {
    return grade.id === parseInt(id);
  });

  await writeFile(global.fileName, JSON.stringify(data, null, 2));

  return filteredGrade;
}

async function sumStudentGradeValue(student, subject) {
  const data = JSON.parse(await readFile(global.fileName));

  const isStudent = data.grades.some((grade) => {
    return grade.student === student && grade.subject === subject;
  });

  if (!isStudent) {
    throw new Error(
      `Não existe nenhum ${student} cursando está disciplina ou ainda não existem notas lançadas.`
    );
  }

  let studentSubjectActivities = data.grades.filter((grade) => {
    return grade.student === student && grade.subject === subject;
  });

  studentSubjectActivities = studentSubjectActivities.map((activity) => {
    return activity.value;
  });
  // prettier-ignore
  return `A nota do aluno(a) ${student} para a disciplina [${subject}] é: ${arraySum(studentSubjectActivities)}`;
}

export {
  insertItem,
  updateItem,
  deleteItem,
  searchForSpecificGrade,
  sumStudentGradeValue,
};
