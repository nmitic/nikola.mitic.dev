"use client";

import { useEffect, useState } from "react";

const QuestionTranscript = ({
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
    <p className="text-3xl">
      {finalTranscripts ? finalTranscripts + "?" : null}
      <span className=" text-gray-400">{interimTranscripts}</span>
    </p>
  );
};

const AudioAnswer = ({
  question,
  onAnswerDone,
}: {
  question: string;
  onAnswerDone: () => void;
}) => {
  setTimeout(() => {
    onAnswerDone();
  }, 1000);

  return null;
};

enum TalkStatusEnum {
  notListening = "not-listening",
  listening = "listening",
  thinking = "thinking",
  talking = "talking",
}

const getStatusMSG = (status: TalkStatusEnum) => {
  switch (status) {
    case TalkStatusEnum.notListening:
      return "Click here to start talking";
    case TalkStatusEnum.listening:
      return "I am listening";
    case TalkStatusEnum.thinking:
      return "I am thinking, be patient";
    case TalkStatusEnum.talking:
      return "I am talking you better be listening";
    default:
      break;
  }
};

const TalkStatus = ({
  status,
  onClick,
}: {
  status: TalkStatusEnum;
  onClick: () => void;
}) => {
  return (
    <div className=" cursor-pointer" onClick={() => onClick()}>
      {getStatusMSG(status)}
    </div>
  );
};

export const InterviewerAITalk = () => {
  const [question, setQuestion] = useState("");
  const [talkStatus, setTalkStatus] = useState<TalkStatusEnum>(
    TalkStatusEnum.notListening
  );

  const shouldRenderAudioAnswer =
    !!question && talkStatus === TalkStatusEnum.thinking;

  const shouldStartSpeechRecognition = talkStatus === TalkStatusEnum.listening;

  return (
    <>
      <TalkStatus
        status={talkStatus}
        onClick={() => {
          setTalkStatus(TalkStatusEnum.listening);
        }}
      />
      <div className="flex h-full items-center justify-center mb-auto mt-auto">
        {shouldRenderAudioAnswer ? (
          <AudioAnswer
            question={question}
            onAnswerDone={() => {
              setTalkStatus(TalkStatusEnum.listening);
            }}
          />
        ) : null}

        <QuestionTranscript
          onEnd={(question) => {
            if (!!question) {
              setQuestion(question);
              setTalkStatus(TalkStatusEnum.thinking);
            } else {
              setTalkStatus(TalkStatusEnum.notListening);
            }
          }}
          onStart={() => {
            setTalkStatus(TalkStatusEnum.listening);
          }}
          listening={shouldStartSpeechRecognition}
        />
      </div>
    </>
  );
};
