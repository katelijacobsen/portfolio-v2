
interface Props {
  text: string;
}

function FloatingBrick({ text }: Props) {
  return (
    <li>{text}</li>
  )
}

export default FloatingBrick