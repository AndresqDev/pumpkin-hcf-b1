#!/usr/bin/env node
/**
 * Precalienta el spawn antes de lanzar los 100 bots.
 *
 * Un solo cliente 1.8.9 entra por Velocity, genera/carga los chunks alrededor
 * del spawn y se queda unos segundos. Sin esto, los primeros bots de cada
 * shard compiten por generar el mundo y algunos terminan en timeout.
 */
'use strict';

const mineflayer = require('mineflayer');

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const host = arg('host', '127.0.0.1');
const port = Number(arg('port', '25565'));
const seconds = Number(arg('seconds', '45'));
const username = arg('user', 'Warmup');

const bot = mineflayer.createBot({
  host,
  port,
  username,
  version: '1.8.9',
  auth: 'offline',
  checkTimeoutInterval: 60000,
  hideErrors: true,
});

let done = false;
function finish(reason) {
  if (done) return;
  done = true;
  try { bot.quit('prewarm done'); } catch (_) {}
  console.log(`PREWARM_DONE reason=${reason} username=${username}`);
  setTimeout(() => process.exit(0), 500);
}

bot.once('spawn', () => {
  console.log(`PREWARM_SPAWN ${username} -> ${host}:${port}`);
  setTimeout(() => finish('timer'), seconds * 1000);
});
bot.on('kicked', (reason) => {
  console.log(`PREWARM_KICKED ${JSON.stringify(reason)}`);
  finish('kicked');
});
bot.on('error', (error) => {
  console.log(`PREWARM_ERROR ${error && error.message ? error.message : error}`);
});
setTimeout(() => finish('timeout'), (seconds + 20) * 1000);
