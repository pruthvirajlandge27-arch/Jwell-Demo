const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    }
    else {
      if (file.endsWith('.jsx') || file.endsWith('.js')) {
        filelist.push(path.join(dir, file));
      }
    }
  });
  return filelist;
};

const directories = [
  path.join(__dirname, 'client/src'),
  path.join(__dirname, 'admin/src')
];

let filesToProcess = [];
directories.forEach(dir => {
  if (fs.existsSync(dir)) {
    filesToProcess = filesToProcess.concat(walkSync(dir));
  }
});

let updatedCount = 0;

filesToProcess.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes("'http://localhost:5000") || content.includes('`http://localhost:5000')) {
    // Add API_URL definition if it doesn't exist
    if (!content.includes('const API_URL = import.meta.env.VITE_API_URL')) {
        // Insert it after the last import
        const importMatches = [...content.matchAll(/^import .*;$/gm)];
        let insertIndex = 0;
        if (importMatches.length > 0) {
            const lastMatch = importMatches[importMatches.length - 1];
            insertIndex = lastMatch.index + lastMatch[0].length + 1;
        }
        content = content.slice(0, insertIndex) + `\nconst API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';\n` + content.slice(insertIndex);
    }

    // Replace literal strings
    content = content.replace(/'http:\/\/localhost:5000(\/[^']*)'/g, '`${API_URL}$1`');
    // Replace template literals that start with localhost:5000
    content = content.replace(/`http:\/\/localhost:5000(\/[^`]+)`/g, '`${API_URL}$1`');

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
    updatedCount++;
  }
});

console.log(`Finished updating ${updatedCount} files.`);
