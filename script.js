const fs = require('fs');
const os = require('os');

// Function to count words in a file
function countWords(filePath) {
    const text = fs.readFileSync(filePath, 'utf-8');
    const words = text.split(/\s+/);
    return words.length;
}

// Function to list top 3 words with counts in a file
function topWords(filePath) {
    const text = fs.readFileSync(filePath, 'utf-8');
    const words = text.split(/\s+/);
    const wordCounts = {};
    words.forEach(word => {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
    });
    const sortedWords = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]);
    return sortedWords.slice(0, 3);
}

// Function to find IP address of the machine
function getIPAddress() {
    const ifaces = os.networkInterfaces();
    let ipAddress = '';
    Object.keys(ifaces).forEach(ifname => {
        ifaces[ifname].forEach(iface => {
            if (iface.family === 'IPv4' && !iface.internal) {
                ipAddress = iface.address;
            }
        });
    });
    return ipAddress;
}

// List name of all text files
const textFiles = fs.readdirSync('/home/data');
console.log("List of text files:", textFiles);

// Count words in each text file and calculate grand total
let totalWords = 0;
textFiles.forEach(file => {
    const filePath = `/home/data/${file}`;
    const fileWordCount = countWords(filePath);
    console.log(`Total words in ${file}: ${fileWordCount}`);
    totalWords += fileWordCount;
});
console.log("Grand total number of words:", totalWords);

// List top 3 words with counts in IF.txt
const topWordsIF = topWords('/home/data/IF.txt');
console.log("Top 3 words with counts in IF.txt:", topWordsIF);

// Find IP address of the machine
const ipAddress = getIPAddress();
console.log("IP Address of the machine:", ipAddress);

// Create the output directory if it doesn't exist
const outputDirectory = '/home/output/';
if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
}

// Write output to result.txt
const result = `
List of text files: ${textFiles}
Grand total number of words: ${totalWords}
Top 3 words with counts in IF.txt: ${JSON.stringify(topWordsIF)}
IP Address of the machine: ${ipAddress}
`;
fs.writeFileSync(outputDirectory + 'result.txt', result.trim());
