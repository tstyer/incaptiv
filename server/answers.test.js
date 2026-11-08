import {test} from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {answer} from './answers.js';
const data=JSON.parse(await readFile(new URL('./data.json',import.meta.url)));
test('loss question identifies negative-profit zone',()=>assert.match(answer('Which zone is losing money?',data),/Gallery lounge/));
test('event ranking calculates ROI from costs',()=>assert.match(answer('Which event has the best return?',data),/Late Sessions: 116%/));
test('unknown questions do not claim live AI',()=>assert.match(answer('weather?',data),/No live AI/));
