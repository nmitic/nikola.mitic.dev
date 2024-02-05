"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import SendIcon from "../public/send.svg";
import CloseIcon from "../public/close.svg";
import QuestionIcon from "../public/question.svg";
import profilePhoto from "../public/profile_photo.jpeg";
import { AnimatePresence, motion } from "framer-motion";
import useAutoSizeTextArea from "../hooks/useAutoResizeTextArea";
import { v4 as uuidv4 } from "uuid";
const fakeAnswer = (delay: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate fetching data (replace this with your actual data or API call)
      const fakeData = "Fake data fetched successfully!";
      resolve(fakeData);
    }, delay);
  });
};

const progressMsgs = [
  "I am thinking, give me some time",
  "AI Clone needs a warm-up! Be patient, its gears are stretching.",
  "In all honesty, Nikola is just being cheap and it takes time to spin up the server he is hosting me on! What guy!",
  "I'm brewing some genius here. Processing ",
  "Please wait a tick. Loading brilliance ",
  "Did you know that Nikola played Rugby in his high school, and know all about the scrum and its origin?",
  "Brain cells are on the move! Wait for the magic.",
  "Almost there, I promise it will be worth the wait",
  "I'm pondering, let the neurons dance a bit.",
  "Psss don't tell him, Nikola is actually my clone. ",
  "Did you know that Nikola is scared of horror movies?",
  "Channeling the spirit of Tesla, innovation is on the horizon.",
  "I'm pondering, let the neurons dance a bit.",
  "Psss don't tell him, Nikola is actually my clone. ",
  "Drawing inspiration from the Danube's flow, creativity knows no bounds.",
  "Did you know that Nikola is scared of horror movies?",
  "Just a moment longer, stitching together strands of insight.",
  "In the land of rakija and čevapi, development is a flavorful journey.",
  "Loading enlightenment, pixel by pixel.",
  "Aligning divs and styling elements, crafting a seamless experience.",
  "Building bridges between code and creativity, one line at a time.",
  "Like the Berlin Wall once divided, my neurons unite to build something extraordinary.",
  "Just like the Serbian hospitality, my UI welcomes users with open arms.",
  "Waiting for the browser to catch up with my creative frenzy.",
  "Sprinting towards greatness, one user story at a time.",
  "Gathering feedback, refining iterations, and moving forward.",
  "Iterations in motion, iterating towards perfection",
  "Inspired by the creative energy of Berlin, our designs are taking shape.",
  "Engaging stakeholders, fostering collaboration, and delivering value.",
  "In the heart of Berlin, where history meets innovation, our code evolves.",
  "Drawing from Berlin's startup culture, we iterate, innovate, and disrupt.",
];

const LoadingDots = () => {
  return (
    <div className=" inline-flex items-center justify-center space-x-2">
      <div className=" h-1 w-1 animate-bounce rounded-full bg-white [animation-delay:-0.3s]"></div>
      <div className="h-1 w-1 animate-bounce rounded-full bg-white [animation-delay:-0.15s]"></div>
      <div className="h-1 w-1 animate-bounce rounded-full bg-white"></div>
    </div>
  );
};

type ChatHistory = {
  question: string;
  answer: string;
  id: string;
}[];

type ChatItem = {
  answer: string;
  question: string;
};

const ChatItem = ({ answer, question }: ChatItem) => {
  return (
    <div className="mb-8">
      <p className="mb-4 text-right">{question}</p>
      {!!answer ? (
        <>
          <Image
            className="mr-2 inline-block w-[30px] rounded-full border-4 border-solid border-black"
            src={profilePhoto}
            alt="Nikola Mitic profile photo"
            placeholder="blur"
            priority
            width={30}
          />
          <span className="align-middle">Nikola Mitic</span>
          <p className="ml-[38px] mt-3">{answer}</p>
        </>
      ) : (
        <LoadingDots />
      )}
    </div>
  );
};

export const InterviewerAI = () => {
  const [loading, setLoading] = useState(false);
  const [streamedAnswer, setStreamedAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [visible, setVisible] = useState(true);
  const [chatHistory, setChatHistory] = useState<ChatHistory>([]);
  const [error, setError] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(progressMsgs[0]);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const submitButtonDisabled = loading || !question?.length;

  useAutoSizeTextArea(textAreaRef.current, question);

  const handleToggleVisibility = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setQuestion("");

    const chatItemId = uuidv4();
    setChatHistory((prev) => [
      ...prev,
      { question: question, answer: "", id: chatItemId },
    ]);

    let progressMsgsIndex = 1;
    const loadingMsgIntervalIdReference = window.setInterval(() => {
      setLoadingMsg(progressMsgs[progressMsgsIndex]);
      if (progressMsgsIndex >= progressMsgs.length) {
        progressMsgsIndex = 0;
      } else {
        progressMsgsIndex++;
      }
    }, 3200);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AI_INTERVIEWER_SERVICE}?question=${question}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Check if the Response object has a ReadableStream as its body
      if (!response.body || !response.body.getReader) {
        console.error("Streaming not supported in this environment.");
        return;
      }

      const reader = response.body.getReader();
      const textDecoder = new TextDecoder();
      setLoading(false);
      window.clearInterval(loadingMsgIntervalIdReference);
      setStreamedAnswer("");

      let fullDecodedAnswer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log("End of stream");
          // setStreamedAnswer("");

          break;
        }
        const decodedText = textDecoder.decode(value);

        console.log("Received chunk:", decodedText);
        fullDecodedAnswer = fullDecodedAnswer + decodedText;

        setStreamedAnswer((prevAnswer) => prevAnswer + decodedText);
      }
      setChatHistory((prev) =>
        prev.map((item) => {
          if (item.id === chatItemId) {
            return { ...item, answer: fullDecodedAnswer };
          }
          return item;
        }),
      );
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error(error);
    }
  };

  const handleQuestionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // Update the state with the new text area value
    setQuestion(event.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents the newline character from being added to the textarea

      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    }
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="visible-ai"
          initial={{ opacity: 0, scale: 1.3 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          className="fixed left-8 right-8 top-20 z-[100] rounded-lg border-2 bg-black font-mono md:left-auto md:w-[450px]"
        >
          <div className="relative pb-4 pl-4 pr-4 pt-10">
            <div
              tabIndex={0}
              className="  absolute left-[-1rem] top-[-1rem] w-8 cursor-pointer"
              onClick={handleToggleVisibility}
            >
              <CloseIcon className=" fill-black" />
            </div>
            <h1 className="mb-8">Interview my AI clone!</h1>
            <form onSubmit={handleSubmit} ref={formRef}>
              <div className="mt-8 flex max-h-[calc(100vh-20rem)] flex-col-reverse overflow-y-scroll">
                {chatHistory.map(({ answer, question, id }) => {
                  return (
                    <ChatItem
                      key={id}
                      answer={answer.length > 0 ? answer : streamedAnswer}
                      question={question}
                    />
                  );
                })}
              </div>
              <div className="relative flex">
                <textarea
                  rows={1}
                  ref={textAreaRef}
                  className="w-full resize-none border-2 bg-black pb-2 pl-2 pr-8 pt-2 text-white"
                  name="query"
                  value={question}
                  onChange={handleQuestionChange}
                  required
                  onKeyDown={handleKeyDown}
                />
                <button
                  type="submit"
                  disabled={submitButtonDisabled}
                  className="absolute bottom-2 right-2 disabled:opacity-40"
                >
                  <SendIcon className="h-6 w-6 text-white" />
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      ) : (
        <div className="fixed bottom-8 right-8">
          <div
            tabIndex={0}
            className="absolute left-[-1rem] top-[-1rem] w-8 cursor-pointer"
            onClick={handleToggleVisibility}
          >
            <QuestionIcon />
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
