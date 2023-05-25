# api-framework [![Socket Badge](https://socket.dev/api/badge/npm/package/@shzware-framework/api)](https://socket.dev/npm/package/@shzware-framework/api)
[![Downloads](https://img.shields.io/npm/dt/@shzware-framework/api?style=for-the-badge)](https://www.npmjs.com/package/@shzware-framework/api)
[![Stable Version](https://img.shields.io/npm/v/@shzware-framework/api?style=for-the-badge)](https://www.npmjs.com/package/@shzware-framework/api)

API for ShZWare-Framework

# Installation
```javascript
npm install @shzware-framework/main
```

# Usage
```javascript
const api = require('@shzware-framework/api');
```

## Example
```JavaScript
const api = require('@shzware-framework/api');

// getFrameworkVersion
console.log(api.frameworkVersion);

// getFrameworkAPIVersion
console.log(api.frameworkAPIVersion);

// Better logging system
api.log('Hello world!');

// Create a ASCII Table
const table = api.createAscii('your table name', 'heading name 1', 'heading name 2');

// Print ASCII Table
// With console.log()
console.log(table.toString());
// With api.log()
api.log(table.toString(), 'none'); // I added 'none' as second args to remove the date time at beginning to avoid the ascii table looking weird

// integrated ElevenLabsAPI
// Get ElevenLabs Voice with voiceId
// get your api key here: https://docs.elevenlabs.io/api-reference/quick-start/authentication
// you can see all voiceId through on their web api or feel free to use my api here two methods:
/*
Method 1: https://api.elevenlabs.io/v1/voices

Method 2: const getAllVoices = api.getElevenLabsAllVoices(apiKey).then(res => {
    console.log(res);
})
*/
const apiKey = 'your-api-key', voiceId = 'any-voiceId-from-elevenlabs';

const getResponse = api.getElevenLabsVoice(apiKey, voiceId).then(res => {
    console.log(res);
})

// Get ElevenLabs All Voices
const apiKey = 'your-api-key';

const getResponse = api.getElevenLabsVoice(apiKey).then(res => {
    console.log(res);
})

// Get ElevenLabs Voice Settings
const apiKey = 'your-api-key', voiceId = 'any-voiceId-from-elevenlabs';

const getResponse = api.getElevenLabsVoiceSettings(apiKey, voiceId).then(res => {
    console.log(res);
})

// Get ElevenLabs TextToSpeech
const apiKey = 'your-api-key', voiceId = 'any-voiceId-from-elevenlabs';
const text = 'Hello';
// you can get your modelId through my api by using this method:
/*
const getModelIds = api.getElevenLabsAllModels(apiKey).then(res => {
    console.log(res);
    // or if you want only modelId then do this :
    console.log(res[model_id]);
})
*/
const modelId = 'any-modelId-from-my-api';
const fileName = 'textToSpeech.mp3'; // The name of your audio file after converted with your text

const getResponse = api.getElevenLabsTextToSpeech(apiKey, voiceId, fileName, text, modelId).then(res => {
    res.pipe(api.fs.createWriteStream(fileName)); // will create a mp3 file with your text you wanted to speech
})

// This Framework is currently under development stage
```

## License
The project is released under the [MIT license](http://www.opensource.org/licenses/MIT).
