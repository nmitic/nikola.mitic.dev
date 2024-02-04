"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import Image from "next/image";
import SendIcon from "../public/send.svg";
import CloseIcon from "../public/close.svg";
import QuestionIcon from "../public/question.svg";
import profilePhoto from "../public/profile_photo.jpeg";
import { AnimatePresence, motion } from "framer-motion";
import useAutoSizeTextArea from "../hooks/useAutoResizeTextArea";

const fakeAnswer = (delay: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate fetching data (replace this with your actual data or API call)
      const fakeData = "Fake data fetched successfully!";
      resolve(fakeData);
    }, delay);
  });
};

const LoadingDots = () => {
  return (
    <div className=" inline-flex items-center justify-center space-x-2">
      <div className=" h-1 w-1 animate-bounce rounded-full bg-white [animation-delay:-0.3s]"></div>
      <div className="h-1 w-1 animate-bounce rounded-full bg-white [animation-delay:-0.15s]"></div>
      <div className="h-1 w-1 animate-bounce rounded-full bg-white"></div>
    </div>
  );
};

export const InterviewerAI = () => {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [visible, setVisible] = useState(true);
  const [error, setError] = useState(false);
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
    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AI_INTERVIEWER_SERVICE}?question=${formData.get("query")}`,
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
      setAnswer("");

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          console.log("End of stream");
          break;
        }
        const decodedText = textDecoder.decode(value);
        console.log("Received chunk:", decodedText);
        setAnswer((prevAnswer) => prevAnswer + decodedText);
      }
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
          className="fixed bottom-8 left-8 right-8 z-[100] rounded-lg border-2 bg-black font-mono md:left-auto md:w-[350px]"
        >
          <div className="relative pb-4 pl-4 pr-4 pt-10">
            <div
              tabIndex={0}
              className="  absolute left-[-1rem] top-[-1rem] w-8 cursor-pointer"
              onClick={handleToggleVisibility}
            >
              <CloseIcon className=" fill-black" />
            </div>
            <h1 className="mb-8">Interview me now!</h1>
            <form onSubmit={handleSubmit} ref={formRef}>
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
              <div className="mt-8 max-h-[40vh] overflow-y-scroll">
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
                </>
                <div className="ml-[38px] mt-3 text-sm">
                  {loading ? (
                    <span>
                      I am thinking, give me some time <LoadingDots />
                    </span>
                  ) : (
                    <>
                      {!!answer?.length ? (
                        <span>{answer}</span>
                      ) : (
                        <>
                          {error ? (
                            <span>
                              Oppps, something went wrong with my AI clone, feel
                              free to contact Niko directly{" "}
                              <a
                                href="mailto:nikola.mitic.dev@gmail.com"
                                className="mr-2 underline transition-opacity hover:opacity-70"
                              >
                                nikola.mitic.dev@gmail.com
                              </a>
                            </span>
                          ) : (
                            <span>
                              Have an AI answer question based on my CV, blog
                              and portfolio! Ask anything!
                            </span>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
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
