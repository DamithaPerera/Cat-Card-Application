const { promisify } = require('util');
const { join } = require('path');
const args = require('minimist')(process.argv.slice(2));
const { fetchRandomCatWithSaying } = require('./catApi');
const { isValid } = require('./util');

const writeFile = promisify(require('fs').writeFile);
const blend = promisify(require('@mapbox/blend'));

const init = async () => {
  const {
    greeting = 'Hello',
    who = 'You',
    width = 400,
    height = 500,
    color = 'Pink',
    size = 100,
  } = args;

  const userInput = {
    greeting, who, width, height, color, size,
  };
  console.log('userInput:', userInput);

  if (!isValid(userInput)) {
    return;
  }

  const params = {
    width,
    height,
    color,
    s: size,
  };

  try {
    const [image1, image2] = await Promise.all([
      fetchRandomCatWithSaying(greeting, params),
      fetchRandomCatWithSaying(who, params),
    ]);
    if (!image1 || !image2) {
      console.log('One or more images could not be fetched');
      return;
    }

    const blendParams = [
      { buffer: Buffer.from(image1), x: 0, y: 0 },
      { buffer: Buffer.from(image2), x: width, y: 0 },
    ];
    const blendConfig = {
      width: width * 2,
      height,
      format: 'jpeg',
    };
    const data = await blend(blendParams, blendConfig);
    if (!data) {
      console.log('There is something wrong with binding images');
      return;
    }

    console.log('Successfully bounded the images');

    const savingPath = join(process.cwd(), `cat-card-${+new Date()}.jpg`);
    console.log('file saving path:', savingPath);

    await writeFile(savingPath, data);
    console.log('file saved');
  } catch (error) {
    console.log('Something went wrong:', error.message);
  }
};

init().catch(console.error);
