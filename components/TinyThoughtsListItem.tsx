"use client";

import { ClientDate } from "./ClientDate";
import Image from "next/image";
import profilePhoto from "../public/profile_photo.jpeg";
import { useCallback, useState } from "react";
import { tinyThought } from "../types/tt";
import { useSession } from "next-auth/react";

import { createEditor, leaf } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const ParagraphElement = (props: any) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const NumberedList = (props: any) => {
  return (
    <ol {...props.attributes}>
      {props.children.map((item: any) => (
        <li>{item}</li>
      ))}
    </ol>
  );
};

const BulletList = (props: any) => {
  return (
    <ul {...props.attributes}>
      {props.children.map((item: any) => (
        <li>{item}</li>
      ))}
    </ul>
  );
};

const Blockquote = (props: any) => {
  return <blockquote>{props.children}</blockquote>;
};

const CodeBlock = (props: any) => {
  return (
    <pre>
      <code>{props.children}</code>
    </pre>
  );
};

const HeadingOne = (props: any) => {
  return <h1>{props.children}</h1>;
};

const HeadingTwo = (props: any) => {
  return <h2>{props.children}</h2>;
};

const HeadingThree = (props: any) => {
  return <h3>{props.children}</h3>;
};

const HeadingFour = (props: any) => {
  return <h4>{props.children}</h4>;
};

const HeadingFive = (props: any) => {
  return <h5>{props.children}</h5>;
};

const HeadingSix = (props: any) => {
  return <h6>{props.children}</h6>;
};

const Anchor = (props: any) => {
  console.log(props);
  const {
    element: { href, rel, openInNewTab, id, className, title },
    children,
  } = props;
  //should be element!!!
  return (
    <a
      href={href}
      id={id}
      className={className}
      title={title}
      rel={rel}
      {...{
        ...(openInNewTab && { target: "_blank" }),
      }}
    >
      <span>{children}</span>
    </a>
  );
};

const BoldLeaf = ({ attributes, children, leaf }: any) => {
  return (
    <strong>
      <span>{children}</span>
    </strong>
  );
};

const ItalicsLeaf = ({ attributes, children, leaf }: any) => {
  return (
    <em>
      <span>{children}</span>
    </em>
  );
};

const UnderlineLeaf = ({ attributes, children, leaf }: any) => {
  return (
    <u>
      <span>{children}</span>
    </u>
  );
};

const CodeLeaf = ({ attributes, children, leaf }: any) => {
  return (
    <code>
      <span>{children}</span>
    </code>
  );
};

const SpanLeaf = ({ attributes, children, leaf }: any) => {
  return <span>{children}</span>;
};

export const TinyThoughtsListItem = ({
  tinyThought,
}: {
  tinyThought: tinyThought;
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { data: session } = useSession();

  const [editor] = useState(() => withReact(createEditor()));

  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case "paragraph":
        return <ParagraphElement {...props} />;
      case "bulleted-list":
        return <BulletList {...props} />;
      case "numbered-list":
        return <NumberedList {...props} />;
      case "block-quote":
        return <Blockquote {...props} />;
      case "code-block":
        return <CodeBlock {...props} />;
      case "heading-one":
        return <HeadingOne {...props} />;
      case "heading-two":
        return <HeadingTwo {...props} />;
      case "heading-three":
        return <HeadingThree {...props} />;
      case "heading-four":
        return <HeadingFour {...props} />;
      case "heading-five":
        return <HeadingFive {...props} />;
      case "heading-six":
        return <HeadingSix {...props} />;
      case "link":
        return <Anchor {...props} />;
      default:
        return <ParagraphElement {...props} />;
    }
  }, []);

  interface LeafToComponentMap {
    [leaf: string]: any;
  }

  const leafToComponentMap: LeafToComponentMap = {
    italic: ItalicsLeaf,
    code: CodeLeaf,
    bold: BoldLeaf,
    underline: UnderlineLeaf,
    span: SpanLeaf,
  };

  const getTrueKeys = (styles: {
    bold: boolean;
    underline: boolean;
    code: boolean;
    italic: boolean;
  }): string[] =>
    Object.entries(styles)
      .filter(([key, value]) => value === true)
      .map(([key]) => key);

  const LeafRenderer = (props: any) => {
    const { possibleLeafs, ...otherProps } = props;

    if (possibleLeafs.length === 0) {
      return otherProps.children; // Base case to stop recursion
    }

    const [currentLeaf, ...remainingLeafs] = possibleLeafs;
    const CurrentLeaf = leafToComponentMap[currentLeaf];

    return (
      <CurrentLeaf {...otherProps}>
        {/* Recursive call with the correct props */}
        <LeafRenderer possibleLeafs={remainingLeafs} {...otherProps} />
      </CurrentLeaf>
    );
  };

  const renderLeaf = useCallback((props: any) => {
    return <LeafRenderer possibleLeafs={getTrueKeys(props.leaf)} {...props} />;
  }, []);

  const isLoggedIn = !!session;

  return (
    <article className="mx-auto max-w-xl border-[1px] p-4 flex">
      <Image
        className="rounded-full mr-3 self-start"
        src={profilePhoto}
        alt="Nikola Mitic profile photo"
        width={40}
      />
      <div>
        <section className="mb-4">
          <span className="text-white text-xl">Nikola Mitic </span>
          <span className="text-gray-500">@nmitic - </span>
          <span className="text-gray-500">
            <ClientDate date={tinyThought.createdAt} />
          </span>
        </section>
        <section className="prose prose-invert max-w-none mb-4">
          <Slate
            editor={editor}
            initialValue={tinyThought.content.raw.children}
          >
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              readOnly={!editMode}
            />
          </Slate>
        </section>
        {editMode ? (
          <button
            className=" border-2 px-4 py-1 hover:bg-white hover:text-black transition-colors"
            onClick={() => setEditMode(false)}
          >
            SAVE
          </button>
        ) : (
          <button
            className=" border-2 px-4 py-1 hover:bg-white hover:text-black transition-colors"
            onClick={() => setEditMode(true)}
          >
            EDIT
          </button>
        )}
      </div>
    </article>
  );
};
