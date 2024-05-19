import { FormEventHandler, ChangeEventHandler, useRef } from "react";
import useAutoSizeTextArea from "../../../hooks/useAutoResizeTextArea";
import SendIcon from "../../../public/send.svg";

export const ChatForm = ({
  question,
  onSubmit,
  onChange,
  disabled,
}: {
  question: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  disabled: boolean;
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  useAutoSizeTextArea(textAreaRef.current, question);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents the newline character from being added to the textarea

      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    }
  };

  return (
    <form onSubmit={onSubmit} ref={formRef} name="chatFrom">
      <div className="flex px-4">
        <textarea
          rows={1}
          ref={textAreaRef}
          className="resize-none border-2 bg-black pb-2 pl-2 pr-8 pt-2 text-white rounded-xl w-full"
          name="query"
          value={question}
          onChange={onChange}
          required
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <button
          type="submit"
          disabled={disabled}
          className="disabled:opacity-40 -ml-8 z-10"
        >
          <SendIcon className="h-6 w-6 text-white" />
        </button>
      </div>
    </form>
  );
};
