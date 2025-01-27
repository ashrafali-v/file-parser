const fs = require('fs');

class FileParser {
  static identifyObjectType(obj) {
    const trimmedObj = obj.trim();

    if (/^\d+$/.test(trimmedObj)) {
      return { type: 'integer', value: trimmedObj };
    }

    if (/^\d+\.\d+$/.test(trimmedObj)) {
      return { type: 'real number', value: trimmedObj };
    }

    if (/^[a-zA-Z]+$/.test(trimmedObj)) {
      return { type: 'alphabetical string', value: trimmedObj };
    }

    if (/^[a-zA-Z0-9]+$/.test(trimmedObj)) {
      return { type: 'alphanumeric', value: trimmedObj };
    }

    return { type: 'unknown', value: trimmedObj };
  }

  static parseFile(filePath) {
    const outputStream = fs.createWriteStream(`output/output.txt`);
    const fileStream = fs.createReadStream(filePath, {
      encoding: 'utf8',
      highWaterMark: 64 * 1024
    });

    let buffer = '';
    let objectCount = 0;

    fileStream.on('data', (chunk) => {
      buffer += chunk;
      const objects = buffer.split(',');

      while (objects.length > 1) {
        const obj = objects.shift();

        if (obj.trim()) {
          const result = this.identifyObjectType(obj);
          const output = `${++objectCount}: "${result.value}" | Type: ${result.type}`
          outputStream.write(output + "\n");
          console.log(output);
        }
      }

      buffer = objects[0] || '';
    });

    fileStream.on('end', () => {
      if (buffer.trim()) {
        const result = this.identifyObjectType(buffer);
        const output = `Object ${++objectCount}: "${result.value}" | Type: ${result.type}`
        outputStream.write(output);
        console.log(output);
      }
      outputStream.end();
    });

    fileStream.on('error', (error) => {
      console.error('File reading error:', error);
      process.exit(1);
    });
  }
}

FileParser.parseFile('random_objects.txt');