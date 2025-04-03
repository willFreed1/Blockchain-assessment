# Blockchain Assessment Solution

This repository contains a solution for the blockchain assessment task, which implements a text fingerprinting function and mock blockchain logging for a chrome plugin

## Explanation

My solution implements a textual fingerprinting system and mock blockchain logging for a chrome plugin, ensuring efficiency, security, and clarity.  

I developed five fingerprinting methods that capture different aspects of the text. The Full-Text Hash uses SHA-256 on the normalized text to represent the entire content. The Structural Fingerprint is based on word length, allowing sentence structure identification while resisting synonym substitutions. The Lexical-Positional Hash associates word beginnings with their positions, detecting word order changes without adding computational overhead. The Content Sampling with Salt method samples different sections of the text and adds a salt to reduce collisions. Finally, the Character Frequency Analysis applies MD5 on the sorted frequency of characters to capture lexical composition.  

Several security measures ensure the integrity of the fingerprints. Text normalization eliminates unnecessary variations, while using multiple methods reduces the risk of collisions. Position-sensitive hashing detects subtle rearrangements, and the combination of SHA-256 and MD5 provides cryptographic diversity. Additionally, outputs remain deterministic for the same input.  

The implementation is optimized for a Chrome plugin. All methods operate in linear time complexity O(n), using minimal memory and avoiding large temporary structures. Since there are no external API requests, execution remains fast, ensuring low latency and optimal browser compatibility.  

The mock blockchain logging simulates Arbitrum transactions, replicating gas parameters, network identifiers, and formatting without actual blockchain interaction. This solution is secure, efficient, and fully adapted to the project's requirements.




## Running the Solution

This implementation can run in any JavaScript environment without dependencies.

To run in a browser console:

1. Open your browser's developer tools (F12 or right-click > Inspect)
2. Go to the Console tab
3. Copy and paste the contents of `blockchain-assessment.js`
4. Press Enter to execute

To run in Node.js:

```
node blockchain-assessment.js
```