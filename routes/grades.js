import express from 'express';
import {
  insertItem,
  updateItem,
  deleteItem,
  searchForSpecificGrade,
  sumStudentGradeValue,
  subjectActivitiesAvg,
} from '../controller/gradesController.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('grades route is working.');
});

router.post('/', async (req, res, next) => {
  try {
    // prettier-ignore
    if (!req.body.student || !req.body.subject || !req.body.type || req.body.value == null) {
    throw new Error('Os campos student, subject, type e value são obrigatórios!');
  }

    res.send(await insertItem(req.body));
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    // prettier-ignore
    if (req.body.id == null || !req.body.student || !req.body.subject || !req.body.type || req.body.value == null) {
          throw new Error('Os campos id, student, subject, type e value são obrigatórios!');
        }

    res.send(await updateItem(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    res.send(await deleteItem(req.params.id));
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    res.send(await searchForSpecificGrade(req.params.id));
  } catch (err) {
    next(err);
  }
});

router.get('/studentGrade/total', async (req, res, next) => {
  try {
    if (!req.body.student || !req.body.subject) {
      throw new Error('Informe o nome do aluno e a grade que deseja buscar.');
    }

    res.send(await sumStudentGradeValue(req.body.student, req.body.subject));
  } catch (err) {
    next(err);
  }
});

router.get('/subjectActivitiesAvg/:subject/:type', async (req, res, next) => {
  try {
    res.send(await subjectActivitiesAvg(req.params.subject, req.params.type));
  } catch (err) {
    next(err);
  }
});

router.use((err, _req, res, _next) => {
  res.status(400).send({ error: err.message });
});

export default router;
