import { promises as fs } from 'fs';
import { arraySum, arrayAvg } from '../libs/operacoes.js';

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

  let studentSubjectActivities = [];
  let studentSubjectActivitiesValue = [];

  const isStudent = data.grades.some((grade) => {
    return grade.student === student && grade.subject === subject;
  });

  if (!isStudent) {
    throw new Error(
      `Não existe nenhum ${student} cursando está disciplina ou ainda não existem notas lançadas.`
    );
  }

  studentSubjectActivities = data.grades.filter((grade) => {
    return grade.student === student && grade.subject === subject;
  });

  studentSubjectActivitiesValue = studentSubjectActivities.map((activity) => {
    return activity.value;
  });
  // prettier-ignore
  return `A nota do aluno(a) ${student} para a disciplina [${subject}] é: ${arraySum(studentSubjectActivitiesValue)}`;
}

async function subjectActivitiesAvg(subject, type) {
  const data = JSON.parse(await readFile(global.fileName));

  let filteredSubjectActivities = [];

  const isSubject = data.grades.some((grade) => {
    return grade.subject === subject;
  });

  const isSubjectType = data.grades.some((grade) => {
    return grade.subject === subject && grade.type === type;
  });

  // prettier-ignore
  if (!isSubject) {
    throw new Error(`A disciplina ${subject} não existe.`)
  } else if (!!isSubject && !isSubjectType) {
    throw new Error(`Não existe nenhuma atividade categorizada como ${type} para a disciplina ${subject}.`)
  }

  filteredSubjectActivities = data.grades
    .filter((grade) => {
      return grade.subject === subject && grade.type === type;
    })
    .map((grade) => {
      return grade.value;
    });

  // prettier-ignore
  return `A média das notas da atividade de categoria '${type}' para a disciplina [${subject}] é: ${arrayAvg(filteredSubjectActivities)}`;
}

async function topThreeGrades(subject, type) {
  const data = JSON.parse(await readFile(global.fileName));

  let filteredSubjectActivities = [];
  let sortedSubjectActivities = [];
  let result = [];

  const isSubject = data.grades.some((grade) => {
    return grade.subject === subject;
  });

  const isSubjectType = data.grades.some((grade) => {
    return grade.subject === subject && grade.type === type;
  });

  // prettier-ignore
  if (!isSubject) {
    throw new Error(`A disciplina ${subject} não existe.`)
  } else if (!!isSubject && !isSubjectType) {
    throw new Error(`Não existe nenhuma atividade categorizada como ${type} para a disciplina ${subject}.`)
  }

  filteredSubjectActivities = data.grades.filter((grade) => {
    return grade.subject === subject && grade.type === type;
  });

  sortedSubjectActivities = filteredSubjectActivities.sort(
    (a, b) => b.value - a.value
  );

  result = sortedSubjectActivities.slice(0, 3);

  return result;
}

export {
  insertItem,
  updateItem,
  deleteItem,
  searchForSpecificGrade,
  sumStudentGradeValue,
  subjectActivitiesAvg,
  topThreeGrades,
};
