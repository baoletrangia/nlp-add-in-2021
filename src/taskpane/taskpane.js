/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office, Word */

/* import {
  totalWordCount, differentWord, numberofParagraphs,
  numberofSentence, wordPerSentence, longWords,
  wordFrequency, numberOfCharacterAll, numberOfCharacter,
  charactersPerWord, keyWord, syllables,
  syllablesPerWord, differentWordCommon, totalWordCountWithoutCommon, totalPuncMarks, sentencePerParagraph
} from '../utils/english-analyze'; */
import Worker from 'worker-loader!../worker/worker'

let worker;
Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("run").onclick = run;
    worker = new Worker();
  }
});

function runWorker(data, dom) {
  worker.postMessage(JSON.stringify(data));
  worker.onmessage = e => {
    const { resLettersCount, resCharsCount, resSyllablesCount, resPuncMarksCount, resWordsCount, resUniqueWordsCount, resSentsCount, resParsCount } = e.data;
    dom.getElementById('letters').innerText = resLettersCount;
    dom.getElementById('chars').innerText = resCharsCount;
    dom.getElementById('words').innerText = resWordsCount;
    dom.getElementById('unique').innerText = resUniqueWordsCount;
    dom.getElementById('sentences').innerText = resSentsCount;
    dom.getElementById('paragraphs').innerText = resParsCount;
    dom.getElementById('punc').innerText = resPuncMarksCount;
    dom.getElementById('sen-per-para').innerText = resSentsCount / resParsCount;
    dom.getElementById('word-per-para').innerText = resWordsCount / resSentsCount;
    dom.getElementById('letter-per-word').innerText = resLettersCount / resWordsCount;
    dom.getElementById('syllables').innerText = resSyllablesCount;
    dom.getElementById('syllables-per-word').innerText = resSyllablesCount / resWordsCount;
  };
}

export async function run() {
  return Word.run(async context => {
    const docBody = context.document.body;
    console.log(docBody);
    context.load(docBody, ['text', 'paragraphs']);

    return context.sync().then(() => {
      const paragraphs = docBody.paragraphs.items;
      const text = docBody.text;
  
      runWorker({paragraphs, text}, document);

      return context.sync();
    });
  });
}