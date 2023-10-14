import React from "react";
import { useRouter } from "next/navigation";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { htmlToSlate, slateDemoHtmlToSlateConfig } from "slate-serializers";
import { GraphQLClient } from "graphql-request";
import {
  CREATE_NEW_TT,
  DELETE_TT,
  PUBLISH_TT,
  UPDATE_TT,
} from "../app/tiny_thoughts/queries";
import {
  CreateResponseType,
  UpdateResponseType,
  tinyThought,
} from "../types/tt";
import Markdown from "markdown-to-jsx";

const client = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH as string);

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className=" flex flex-wrap gap-2 [&>*]:p-2 [&>*]:border [&>*]:border-white">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-white text-black" : ""}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-white text-black" : ""}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "bg-white text-black" : ""}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "bg-white text-black" : ""}
      >
        code
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "bg-white text-black" : ""}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 }) ? "bg-white text-black" : ""
        }
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 }) ? "bg-white text-black" : ""
        }
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 }) ? "bg-white text-black" : ""
        }
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={
          editor.isActive("heading", { level: 4 }) ? "bg-white text-black" : ""
        }
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={
          editor.isActive("heading", { level: 5 }) ? "bg-white text-black" : ""
        }
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={
          editor.isActive("heading", { level: 6 }) ? "bg-white text-black" : ""
        }
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-white text-black" : ""}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "bg-white text-black" : ""}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "bg-white text-black" : ""}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "bg-white text-black" : ""}
      >
        blockquote
      </button>
    </div>
  );
};

const extensions = [
  // TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

const Actions = ({
  onSave,
  onDelete,
}: {
  onSave: (content: string) => void;
  onDelete: () => void;
}) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className=" flex gap-2 [&>*]:p-2 [&>*]:border [&>*]:border-white">
      <button onClick={() => onSave(editor.getHTML())}>Save</button>
      <button onClick={() => onDelete()}>Delete</button>
    </div>
  );
};

const AddAction = ({
  onAdd,
}: {
  onAdd: (content: string, clearContent: () => void) => void;
}) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className=" flex gap-2 [&>*]:p-2 [&>*]:border [&>*]:border-white">
      <button
        onClick={() => onAdd(editor.getHTML(), editor.commands.clearContent)}
      >
        Add
      </button>
    </div>
  );
};

export const AddTipTap = ({
  updateTT,
}: {
  updateTT: React.Dispatch<React.SetStateAction<tinyThought[]>>;
}) => {
  const router = useRouter();

  const handleAdd = async (content: string, clearContent: () => void) => {
    try {
      const responseCreate: CreateResponseType = await client.request(
        CREATE_NEW_TT,
        {
          content: {
            children: htmlToSlate(content, slateDemoHtmlToSlateConfig),
          },
        }
      );
      await client.request(PUBLISH_TT, {
        id: responseCreate.createTinyThought.id,
      });
      updateTT((data) => [responseCreate.createTinyThought, ...data]);
      clearContent();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      slotAfter={<AddAction onAdd={handleAdd} />}
      children={undefined}
      editorProps={{
        attributes: {
          class:
            "prose prose-invert max-w-none min-h-[200px] border border-white p-4 mb-4 mt-4 focus:outline-none",
        },
      }}
    ></EditorProvider>
  );
};

export default ({
  initialContent,
  id,
  updateTT,
  editMode,
}: {
  initialContent: {
    html: string;
    markdown: string;
  };
  id: string;
  updateTT: React.Dispatch<React.SetStateAction<tinyThought[]>>;
  editMode: boolean;
}) => {
  const router = useRouter();

  const handleSave = async (content: string) => {
    try {
      const responseUpdate: UpdateResponseType = await client.request(
        UPDATE_TT,
        {
          content: {
            children: htmlToSlate(content, slateDemoHtmlToSlateConfig),
          },
          id,
        }
      );
      await client.request(PUBLISH_TT, {
        id: responseUpdate.updateTinyThought.id,
      });
      setEditMode(false);

      updateTT((data) =>
        data.map((data) => {
          if (data.id === id) {
            return responseUpdate.updateTinyThought;
          }

          return data;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await client.request(DELETE_TT, {
        id,
      });

      setEditMode(false);
      updateTT((data) => data.filter((data) => data.id !== id));

      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="prose prose-invert max-w-none">
      {editMode ? (
        <EditorProvider
          slotBefore={editMode ? <MenuBar /> : null}
          extensions={extensions}
          content={initialContent.html}
          slotAfter={
            editMode ? (
              <Actions onSave={handleSave} onDelete={handleDelete} />
            ) : null
          }
          children={undefined}
        ></EditorProvider>
      ) : (
        <Markdown className="text-white">{initialContent.markdown}</Markdown>
      )}
    </section>
  );
};
