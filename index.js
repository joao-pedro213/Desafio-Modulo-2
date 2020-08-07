import express from 'express';
import { promises as fs } from 'fs';
import gradesRouter from './routes/grades.js';

const { readFile } = fs;

global.fileName = 'grades.json';

const app = express();
app.use(express.json());
app.use('/grades', gradesRouter);

app.listen(8001, async () => {
  try {
    await readFile(global.fileName);
    console.log('Server is running.');
  } catch (err) {
    console.log(err);
  }
});
