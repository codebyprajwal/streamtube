// import "../../resources/styles/micro.css";
import { useRef, useState } from "react";
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";


const appId = 'b33eac7c-24bc-4812-95b6-e91cea215262';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

function MicroRecord() {
      const { transcript, resetTranscript } = useSpeechRecognition();
      const [isListening, setIsListening] = useState(false);
      const microphoneRef = useRef(null);
      const [click, setClick] = useState(true);

      document.addEventListener('keydown', function(event){
        if (event.code == "Space") {
          if (isListening) {
            stopHandle()
          } else {
            handleListing()
          }
        }
      }
    )

      
      if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return (
          <div className="mircophone-container">
            Browser is not Support Speech Recognition.
          </div>
        );
      }
      const handleListing = () => {
        setIsListening(true);
        // microphoneRef.current.classList.add("listening");
        SpeechRecognition.startListening({
          continuous: false,
        });
      };
      const stopHandle = () => {
        setIsListening(false);
        // microphoneRef.current.classList.remove("listening");
        SpeechRecognition.stopListening();
      };
      const handleReset = () => {
        stopHandle();
        resetTranscript();
      };

      return (
            <div className="microphone-wrapper">
            <div className="mircophone-container">
              <div className="microphone-status"  style={{  textAlign : "center", fontWeight : "600", fontSize:"2rem" }}>
                {isListening ? "Listening..." : ""}
              </div>
            </div>
            {transcript && (
              <div className="microphone-result-container" style={{ height: "70px", textAlign : "center", marginTop:"10px", textTransform:"capitalize", fontSize:"1.3rem" }}>
                <div className="microphone-result-text" >Result: {transcript}</div>
              </div>
            )}
          </div>
      );
}

export default MicroRecord;