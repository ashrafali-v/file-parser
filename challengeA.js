const fs = require('fs');

class RandomObjectGenerator {
  static generateRandomString(length) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
  }

  static generateRandomReal() {
    return (Math.random() * 1000).toFixed(6);
  }

  static generateRandomInteger() {
    return Math.floor(Math.random() * 1000000);
  }

  static generateRandomAlphanumeric(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    const totalSpaces = Math.floor(Math.random() * 11);
    const frontSpaces = Math.floor(Math.random() * (totalSpaces + 1));
    const backSpaces = totalSpaces - frontSpaces;

    const spaceFront = ' '.repeat(frontSpaces);
    const spaceBack = ' '.repeat(backSpaces);

    const alphanumeric = Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');

    return spaceFront + alphanumeric + spaceBack;
  }

  static generateFourObjects() {
    return [
      this.generateRandomString(10),
      this.generateRandomReal(),
      this.generateRandomInteger(),
      this.generateRandomAlphanumeric(10)
    ];
  }
}

function generateFile(filename, targetSize) {
  const initialObjects = RandomObjectGenerator.generateFourObjects();
  const initialLine = initialObjects.join(',') + ',';

  const stream = fs.createWriteStream(filename);
  let currentSize = 0;

  function writeChunk() {
    const chunk = initialLine;

    if (currentSize + chunk.length < targetSize) {
      stream.write(chunk);
      currentSize += chunk.length;
      setImmediate(writeChunk);
    } else {
      stream.write(initialObjects.join(','));
      stream.end();
    }
  }

  writeChunk();

  stream.on('finish', () => {
    console.log(`File generated: ${filename}`);
    console.log(`Size: ${fs.statSync(filename).size} bytes`);
  });
}

generateFile('random_objects.txt', 10 * 1024 * 1024);