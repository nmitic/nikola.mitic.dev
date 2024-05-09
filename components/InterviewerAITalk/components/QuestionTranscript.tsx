import { useState, useEffect, useRef } from "react";

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
  const recognition = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    recognition.current = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();

    recognition.current.lang = "en-US";
    recognition.current.interimResults = true;
  }, []);

  useEffect(() => {
    let finalTranscriptsTemp = "";
    if (recognition.current) {
      recognition.current.onresult = (event: SpeechRecognitionEvent) => {
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

      recognition.current.onend = (_event: Event) => {
        onEnd(finalTranscriptsTemp);
      };

      recognition.current.onstart = () => {
        onStart();
      };
    }
  }, [listening]);

  useEffect(() => {
    if (listening) {
      recognition?.current?.start();
    } else {
      recognition?.current?.stop();
    }

    return () => {
      recognition?.current?.stop();
    };
  }, [listening]);

  return (
    <p className="text-3xl m-auto max-w-[680px]">
      {finalTranscripts ? finalTranscripts + "?" : null}
      <span className=" text-gray-400">{interimTranscripts}</span>
    </p>
  );
};
