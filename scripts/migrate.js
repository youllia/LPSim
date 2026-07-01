// scripts/migrate.js
// Wandelt 12 lpic*.json Dateien in eine zentrale db.json für JSON-Server.

const fs = require('fs');
const path = require('path');

//  1. Konfiguration 
const sourceDir = 'data/raw';

const topics = [
  { id: 1, name: 'LPIC-1 101 (Linux Fundamentals)' },
  { id: 2, name: 'LPIC-1 102 (Administration)' }
];

// 2. Quelldateien finden 
const files = fs.readdirSync(sourceDir)
  .filter(filename => filename.startsWith('lpic') && filename.endsWith('.json'))
  .sort();

console.log(`Gefunden: ${files.length} Dateien`);

//  3. Kataloge und Fragen aufbauen 
const catalogs = [];
const questions = [];
let nextQuestionId = 1;

for (let i = 0; i < files.length; i++) {
  const filename = files[i];
  const catalogId = i + 1;

  // "lpic101a.json"  →  exam = "101", part = "a"
  const exam = filename.substring(4, 7);
  const part = filename.substring(7, 8);
  const topicId = exam === '101' ? 1 : 2;

  // Datei einlesen + parsen
  const fullPath = path.join(sourceDir, filename);
  const rawQuestions = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));

  // Katalog-Eintrag
  catalogs.push({
    id: catalogId,
    topicId: topicId,
    name: `LPIC-${exam} — Teil ${part.toUpperCase()}`,
    questionCount: rawQuestions.length
  });

  // Jede Frage erweitern um catalogId und globale id
  for (const q of rawQuestions) {
    questions.push({
      id: nextQuestionId,
      catalogId: catalogId,
      type: q.type,
      questionText: q.questionText,
      answers: q.answers,
      hint: q.hint || ''
    });
    nextQuestionId++;
  }
}

//  4. Statistik 
console.log(`Themen:    ${topics.length}`);
console.log(`Kataloge:  ${catalogs.length}`);
console.log(`Fragen:    ${questions.length}`);


//  5. db.json schreiben 
const db = {
  topics: topics,
  catalogs: catalogs,
  questions: questions,
};

fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
console.log('db.json wurde erstellt.');
