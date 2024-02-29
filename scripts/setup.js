const readline = require('readline/promises');
const crypto = require('crypto');
const fs = require('fs');

const environment = fs.existsSync('.env')
  ? fs.readFileSync('.env', 'utf8')
  : fs.readFileSync('.env.example', 'utf8');

if (!environment) {
  throw new Error(
    'The .env.example file does not exist. Please get it from the repository.',
  );
}

function getRandomApiKey() {
  const apiKey = crypto.randomUUID();
  console.log(
    `Your generated API key is: ${apiKey}. Save it because if you lost it, you will need generate a new one.`,
  );

  return apiKey;
}

function sha512(value) {
  return crypto.createHash('sha512').update(value).digest('hex');
}

console.log('Setting up the .env file...');
(async () => {
  const questions = [
    {
      name: 'SERVER_PORT',
      message: 'Enter the server port (Leave empty to use 3000):',
      defaultValue: () => 3000,
      process: (value) => parseInt(value),
    },
    {
      name: 'API_KEY',
      message: 'Enter your API key (Leave empty to generate a random one):',
      defaultValue: getRandomApiKey,
      process: (value) => sha512(value),
    },
  ];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answers = {};
  for (const question of questions) {
    const answer = await rl
      .question(question.message)
      .then((value) => value || question.defaultValue())
      .then((value) => question.process(value));

    answers[question.name] = answer;
  }

  rl.close();

  const regex = new RegExp(`(?<=\\s)(\\w+)=(.*?)(?=\\s)`, 'g');
  const env = environment.replace(regex, (match, key, value) => {
    if (answers[key]) {
      return `${key}="${answers[key]}"`;
    }

    return `${key}=${value}`;
  });

  fs.writeFileSync('.env', env);
})();
