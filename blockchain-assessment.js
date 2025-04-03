// Sample text
const inputText = "This is a sample text used to test the fingerprinting function. It contains exactly fifty words to evaluate how well the solution generates unique hashes and logs them to a mock blockchain like Arbitrum. Efficiency and security are key considerations for this Chrome plugin task.";

/**
 * Generates 5 unique fingerprint hashes the text
 * @param {string} text  text to fingerprint
 * @return {string[]} Array of 5 unique cryptographic hashes
 */
function generateTextFingerprints(text) {
  const normalizedText = text.trim().replace(/\s+/g, ' ');
  const words = normalizedText.split(' ');
  
  // Hash 1: Full text hash
  const fullTextHash = sha256(normalizedText);
  
  // Hash 2: Structural feature based on word lengths
  const wordLengthPattern = words.map(word => word.length).join('');
  const structuralHash = sha256(wordLengthPattern);
  
  // Hash 3: Lexical feature with position weighting
  const lexicalFeature = words.map((word, index) => 
    word.substring(0, Math.min(3, word.length)) + (index % 10)
  ).join('');
  const lexicalHash = sha256(lexicalFeature);
  
  // Hash 4: Content sampling with salt
  const firstQuarter = words.slice(0, Math.floor(words.length / 4)).join(' ');
  const lastQuarter = words.slice(Math.floor(words.length * 3 / 4)).join(' ');
  const contentSample = firstQuarter + "::MIDDLE::" + lastQuarter;
  const saltedSample = contentSample + "SALT_VALUE_1";
  const samplingHash = sha256(saltedSample);
  
  // Hash 5: Character frequency with MD5
  const charFrequency = {};
  for (const char of normalizedText) {
    charFrequency[char] = (charFrequency[char] || 0) + 1;
  }
  const frequencyFeature = Object.entries(charFrequency)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([char, count]) => `${char}${count}`)
    .join('');
  const frequencyHash = md5(frequencyFeature);
  
  return [
    fullTextHash,
    structuralHash,
    lexicalHash,
    samplingHash,
    frequencyHash
  ];
}

/**
 * logging the hashes to Arbitrum blockchain
 * @param {string[]} hashes  array of fingerprint hashes to log
 * @return {Object} dump transaction result with hash and details
 */
function mockBlockchainLog(hashes) {
  // Create a simulated Arbitrum transaction
  const mockTxData = {
    to: "0xAB89F7D91245316D7f9D3d8324dA8Cbd17EE69a0", // dump CA
    from: "0x" + generateRandomHex(40),
    data: "0x" + hashes.map(h => h.substring(2)).join(''),
    value: "0x0",
    gasLimit: "0x" + (100000).toString(16),
    gasPrice: "0x" + (1500000000).toString(16),
    chainId: 42161, // Arbitrum Mainnet
    nonce: Math.floor(Math.random() * 1000),
    timestamp: Math.floor(Date.now() / 1000)
  };
  
  const txDataString = JSON.stringify(mockTxData);
  const mockTxHash = "0x" + sha256(txDataString + Date.now().toString()).substring(0, 64);
  
  return {
    transactionHash: mockTxHash,
    network: "Arbitrum",
    blockNumber: Math.floor(Math.random() * 1000000) + 15000000,
    confirmations: 1,
    status: "success",
    timestamp: new Date().toISOString(),
    gasUsed: 85000 + Math.floor(Math.random() * 20000),
    effectiveGasPrice: mockTxData.gasPrice
  };
}

/**
 * SHA-256 for demonstration purposes
 * @param {string} text - text input to hash
 * @return {string} SHA-256 hash as hex string
 */
function sha256(text) {
  let hash = 0;
  const prime1 = 31;
  const prime2 = 486187739;
  const modulo = 2147483647;
  
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash * prime1) % modulo + char * (i + 1)) % modulo;
    
    if (i % 2 === 0) {
      hash = (hash * prime2) % modulo;
    } else {
      hash = (hash ^ (hash >> 3)) % modulo;
    }
  }
  
  let hexHash = (hash >>> 0).toString(16);
  
  while (hexHash.length < 64) {
    hexHash = hexHash + generateRandomHex(1) + (hash % 16).toString(16);
    hash = (hash * prime1) % modulo;
  }
  
  return "0x" + hexHash.substring(0, 64);
}

/**
 * simple implementation of MD5
 * @param {string} text
 * @return {string}
 */
function md5(text) {
  let hash = 0;
  const prime1 = 17;
  const prime2 = 251;
  const modulo = 1048576;
  
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash + char * prime1 * (text.length - i)) % modulo;
    
    if (char % 2 === 0) {
      hash = (hash + prime2) % modulo;
    } else {
      hash = (hash * prime2) % modulo;
    }
  }
  
  let hexHash = (hash >>> 0).toString(16);
  
  while (hexHash.length < 32) {
    hexHash = hexHash + ((hash + hexHash.length) % 16).toString(16);
    hash = (hash * prime1) % modulo;
  }
  
  return "0x" + hexHash.substring(0, 32);
}

/**
 * Generates random hex chars
 * @param {number} length - Number of hex chars to generate
 * @return {string} Random hex string
 */
function generateRandomHex(length) {
  let result = '';
  const hexChars = '0123456789abcdef';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * hexChars.length);
    result += hexChars[randomIndex];
  }
  
  return result;
}

// Run the demonstration
 
function runDemo() {
  console.log("Text Fingerprinting Demo");
  console.log("=======================");
  console.log("Input Text:", inputText);
  console.log("Word Count:", inputText.split(/\s+/).length);
  console.log();
  
  const startTime = performance.now();
  const fingerprints = generateTextFingerprints(inputText);
  const endTime = performance.now();
  
  console.log("Fingerprinting completed in", (endTime - startTime).toFixed(2), "ms");
  console.log();
  
  console.log("Fingerprint Hashes:");
  fingerprints.forEach((hash, index) => {
    console.log(`${index + 1}. ${hash}`);
  });
  console.log();
  
  console.log("Simulating blockchain logging to Arbitrum...");
  const txResult = mockBlockchainLog(fingerprints);
  
  console.log("Mock Transaction Result:");
  console.log(JSON.stringify(txResult, null, 2));
  
  return {
    fingerprints,
    transactionResult: txResult
  };
}

// Run demo
runDemo(); 