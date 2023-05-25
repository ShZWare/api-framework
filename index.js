require('dotenv').config();

require('rootpath')();

const FRAMEWORK_VERSION = "0.0.2-smallfix2";
const FRAMEWORK_API_VERSION = "0.0.2-smallfix2";

module.exports.frameworkVersion = FRAMEWORK_VERSION;
module.exports.frameworkAPIVersion = FRAMEWORK_API_VERSION;

module.exports.fs = require('fs-extra');

module.exports.colors = require('colors');

module.exports.ascii = require('ascii-table');

module.exports.axios = require('axios');

module.exports.uuid = require('uuid');

module.exports.createAscii = function(table, head1, head2) {
    return new module.exports.ascii(table).setHeading(head1, head2);
}

module.exports.log = function(text, color) {
    let d = new Date(),
        h = d.getHours(),
        m = d.getMinutes(),
    time = h + ":" + m
 
    if (color == "none") {
        console.log(text)
    } else {
        if (typeof(color) == "undefined") { console.log(module.exports.colors.grey(time) + " : " + text) }
        if (typeof(color) != "undefined") { console.log(module.exports.colors.grey(time) + " : " + module.exports.colors[color](text)) }
    }
}

const elevenLabsAPI = 'https://api.elevenlabs.io/v1';

module.exports.getElevenLabsVoice = async function(apiKey, voiceId) {
    try {
        if (!apiKey || !voiceId) {
            module.exports.log("ERROR: Missing parameter, please be sure you didn't make typo", "red");
        }

        const getVoiceURL = `${elevenLabsAPI}/voices/${voiceId}`;

        const getResponse = await module.exports.axios({
			method: 'GET',
			url: getVoiceURL,
			headers: {
				'xi-api-key': apiKey
			}
		});

		return getResponse.data;
    } catch (error) {
		module.exports.log(error, "red");
	}
}

module.exports.getElevenLabsAllVoices = async function (apiKey) {
    try {
        if (!apiKey) {
            module.exports.log("ERROR: Missing apiKey, please be sure you didn't make typo", "red");
        }

        const getVoiceURL = `${elevenLabsAPI}/voices`;

        const getResponse = await module.exports.axios({
            method: 'GET',
            url: getVoiceURL,
            headers: {
                'xi-api-key': apiKey
            }
        });

        return getResponse.data;
    } catch (error) {
        module.exports.log(error, "red");
    }
}

module.exports.getElevenLabsVoiceSettings = async function (apiKey, voiceId) {
    try {
        if (!apiKey || !voiceId) {
            module.exports.log("ERROR: Missing parameter, please be sure you didn't make typo", "red");
        }

        const getVoiceURL = `${elevenLabsAPI}/voices/${voiceId}/settings`;

        const getResponse = await module.exports.axios({
			method: 'GET',
			url: getVoiceURL,
			headers: {
				'xi-api-key': apiKey
			}
		});

		return getResponse.data;
    } catch (error) {
        module.exports.log(error, "red");
    }
} 

module.exports.getElevenLabsAllModels = async function (apiKey) {
    try {
        if (!apiKey) {
            module.exports.log("ERROR: Missing apiKey, please be sure you didn't make typo", "red");
        }

        const getModelURL = `${elevenLabsAPI}/models`;

        const getResponse = await module.exports.axios({
            method: 'GET',
            url: getModelURL,
            headers: {
                'xi-api-key': apiKey
            }
        });

        return getResponse.data;
    } catch (error) {
        module.exports.log(error, "red");
    }
}

module.exports.getElevenLabsTextToSpeech = async function(apiKey, voiceId, fileName, textInput, modelId) {
    try {
        if(!apiKey || !voiceId || !fileName || !textInput || !modelId) {
            module.exports.log("ERROR: Missing parameter, please be sure you didn't make typo", "red");
        }

        const getVoiceURL = `${elevenLabsAPI}/text-to-speech/${voiceId}`;

        const getResponse = await module.exports.axios({
			method: 'POST',
			url: getVoiceURL,
			data: {
				text: textInput,
				model_id: modelId ? modelId : undefined
			},
			headers: {
				'Accept': 'audio/mpeg',
				'xi-api-key': apiKey,
				'Content-Type': 'application/json',
			},
			responseType: 'stream'
		});

        return getResponse.data;
    } catch (error) {
		module.exports.log(error, "red");
	}
}
