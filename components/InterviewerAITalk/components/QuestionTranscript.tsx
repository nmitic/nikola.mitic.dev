import { useState, useEffect } from "react";

export const QuestionTranscript = ({
  onEnd,
  onStart,
  listening,
}: {
  onEnd: (question: string) => void;
  onStart: () => void;
  listening: boolean;
}) => {
  const [finalTranscripts, setFinalTranscripts] = useState("");
  const [interimTranscripts, setInterimTranscripts] = useState("");

  useEffect(() => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();

    recognition.lang = "en-US";
    recognition.interimResults = true;

    let finalTranscriptsTemp = "";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscriptsTemp = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscriptsTemp += transcript;
        } else {
          interimTranscriptsTemp += transcript;
        }
      }
      setFinalTranscripts(finalTranscriptsTemp);
      setInterimTranscripts(interimTranscriptsTemp);
    };

    recognition.onend = (_event: Event) => {
      onEnd(finalTranscriptsTemp);
    };

    recognition.onstart = () => {
      onStart();
    };

    if (listening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [listening]);

  return (
    <p className="text-3xl m-auto max-w-[680px]">
      {finalTranscripts ? finalTranscripts + "?" : null}
      <span className=" text-gray-400">{interimTranscripts}</span>
    </p>
  );
};
