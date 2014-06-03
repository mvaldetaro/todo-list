var inputSpeech = document.querySelectorAll('#inputSpeech');
var recognizing = false;
var text = "";

var language = 'pt-BR';

inputSpeech.value= '';

var SpeechRecognition = window.SpeechRecognition ||
                        window.webkitSpeechRecognition ||
                        window.mozSpeechRecognition ||
                        window.msSpeechRecognition ||
                        window.oSpeechRecognition;

var recognizing = false;

if (SpeechRecognition !== undefined) {
    var recognition = new SpeechRecognition;
    recognition.lang = language;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function() {
      var recognizing = true;
      console.log('Fale Calmamente.');
    };

    recognition.onerror = function(event) {
      console.log("Reconheceu um erro.");
    }

    recognition.onend = function() {
      recognizing = false;
      console.log("Concluído!");
    }

    recognition.onresult = function(event) {
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          text += event.results[i][0].transcript;
          event.result = text;
        }
      }
      console.log(text);
    }

    recognition.start();

} else {
    console.error('Your browser do not support the Web Speech API');
}



