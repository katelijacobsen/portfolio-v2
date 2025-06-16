interface Props {
  text: string;
  textclr?: string;
  bg?: string;
  rotate?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  style?: React.CSSProperties;
}

function FloatingBrick({ text, textclr, bg, rotate, top, left, right, bottom, style }: Props) {
  return (
    <li
      className={`
        uppercase font-semibold
        text-h4
        px-[clamp(0.5rem,2vw,1.5rem)]
        py-[clamp(0.25rem,1vw,0.75rem)]
        inline-block tracking-[.1ch] rounded-xl
        absolute
        ${textclr || ""}
        ${bg || ""}
        ${rotate || ""}
        ${top || ""}
        ${left || ""}
        ${bottom || ""}
        ${right || ""}
      `}
      style={style}
    >
      {text}
    </li>
  );
}

export default FloatingBrick