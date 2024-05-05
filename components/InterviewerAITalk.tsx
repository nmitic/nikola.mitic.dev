"use client";

import { useEffect, useState } from "react";

const QuestionTranscript = ({
  onSpeechEnd,
}: {
  onSpeechEnd: (question: string) => void;
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

    recognition.start();

    recognition.onend = (_event: Event) => {
      onSpeechEnd(finalTranscriptsTemp);
    };

    return () => {
      recognition.stop();
    };
  }, []);

  return (
    <p>
      {finalTranscripts}
      <span className=" text-gray-400">{interimTranscripts}</span>
    </p>
  );
};

const AudioAnswer = ({ question }: { question: string }) => {
  // useEffect(() => {
  //   const playAudio = async () => {
  //     if (!!question) {
  //       try {
  //         const response = await fetch(
  //           `${process.env.NEXT_PUBLIC_AI_INTERVIEWER_SERVICE}/api/talk?question=${question}`
  //         );
  //         if (!response.ok) {
  //           throw new Error(`${response.status} = ${response.statusText}`);
  //         }
  //       } catch (error) {
  //         console.error("Error playing audio:", error);
  //       }
  //     }
  //   };

  //   playAudio();
  // }, [question]);

  if (!question) {
    return null;
  }

  return (
    <div>
      <audio controls autoPlay>
        <source src="horse.ogg" type="audio/ogg" />
        <source
          src={`${process.env.NEXT_PUBLIC_AI_INTERVIEWER_SERVICE}/api/talk?question=${question}`}
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export const InterviewerAITalk = () => {
  const [question, setQuestion] = useState("");

  return (
    <div>
      <AudioAnswer question={question} />
      <QuestionTranscript
        onSpeechEnd={(question) => {
          setQuestion(question);
        }}
      />
    </div>
  );
};
