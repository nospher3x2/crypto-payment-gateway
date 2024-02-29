const readline = require('readline/promises');
const crypto = require('crypto');
const fs = require('fs');

async function sha512(value) {
  return crypto.createHash('sha512').update(value).digest('hex');
}

if (!fs.existsSync('.env.example')) {
  console.log(
    'The .env.example file does not exist. Please get it from the repository.',
  );
  process.exit(0);
}
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function question(question, defaultValue) {
  return rl
    .question(question)
    .then((value) => value.trim())
    .then((value) => value || defaultValue);
}

console.log('Setting up the .env file...');
(async () => {
  const serverPort = await question(
    'Enter the server port, default is 3000: ',
    3000,
  );

  const apiKey = await question(
    'Enter your API key: (Leave empty to generate a random one):',
    crypto.randomUUID(),
  );

  rl.close();

  const hashedApiKey = await sha512(apiKey);
  console.log(
    `Your API key is: ${apiKey}. If you lose it, you will need generate a new one.`,
  );

  const envExample = fs.readFileSync('.env.example', 'utf8');
  fs.writeFileSync(
    '.env',
    envExample
      .replace('SERVER_PORT=3000', `SERVER_PORT=${serverPort}`)
      .replace('API_KEY=API_KEY', `API_KEY=${hashedApiKey}`),
  );
})();
