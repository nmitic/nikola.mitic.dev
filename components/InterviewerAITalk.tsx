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
    <p className="text-3xl m-auto max-w-[680px]">
      {finalTranscripts ? finalTranscripts + "?" : null}
      <span className=" text-gray-400">{interimTranscripts}</span>
    </p>
  );
};

const AudioAnswer = ({
  question,
  onAnswerDone,
  onAnswerStart,
  demo = true,
}: {
  question: string;
  onAnswerDone: () => void;
  onAnswerStart: () => void;
  demo?: boolean;
}) => {
  return (
    <audio
      autoPlay
      onPlay={() => {
        onAnswerStart();
      }}
      onEnded={() => {
        onAnswerDone();
      }}
    >
      <source
        src={`${process.env.NEXT_PUBLIC_AI_INTERVIEWER_SERVICE}/api/talk?question=${question}&demo=${demo}`}
        type="audio/mp3"
      />
    </audio>
  );
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

  const listening = talkStatus === TalkStatusEnum.listening;
  const thinking = talkStatus === TalkStatusEnum.thinking;
  const talking = talkStatus === TalkStatusEnum.talking;

  const shouldRenderAudioAnswer = thinking || talking;

  return (
    <>
      <TalkStatus
        status={talkStatus}
        onClick={() => {
          setTalkStatus(TalkStatusEnum.listening);
        }}
      />
      <div className="container max-w-3xl mx-auto mb-auto mt-auto">
        {shouldRenderAudioAnswer && (
          <AudioAnswer
            question={question}
            onAnswerDone={() => {
              setTalkStatus(TalkStatusEnum.listening);
              setQuestion("");
            }}
            onAnswerStart={() => {
              setTalkStatus(TalkStatusEnum.talking);
            }}
          />
        )}

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
          listening={listening}
        />
      </div>
    </>
  );
};
