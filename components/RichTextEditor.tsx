import { useCallback, useState } from "react";
import { BaseEditor, createEditor } from "slate";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";

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
      {props.children.map((item: any, index: number) => (
        <li key={index}>{item}</li>
      ))}
    </ol>
  );
};

const BulletList = (props: any) => {
  return (
    <ul {...props.attributes}>
      {props.children.map((item: any, index: number) => (
        <li key={index}>{item}</li>
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
    return (
      <span {...otherProps} {...otherProps.attributes}>
        {otherProps.children}
      </span>
    ); // Base case to stop recursion
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

type RichTextEditorProps = {
  initialValue: any;
  readOnly?: boolean;
};

const RichTextEditor = ({
  initialValue,
  readOnly = false,
}: RichTextEditorProps) => {
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

  const renderLeaf = useCallback((props: any) => {
    return <LeafRenderer possibleLeafs={getTrueKeys(props.leaf)} {...props} />;
  }, []);

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={(value) => {
        console.log(value);
      }}
    >
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        readOnly={readOnly}
      />
    </Slate>
  );
};

export default RichTextEditor;
