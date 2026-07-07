import "./ErrorMessage.css";

type Props = {
  message: string;
};

export default function ErrorMessage({ message }: Props) {
  const [title, ...rest] = message.split(". ");

  return (
    <div className="error-message" role="alert">
      <div className="error-icon">⚠️</div>
      <h3>{title}</h3>
      {rest.length > 0 && <p>{rest.join(". ")}</p>}
    </div>
  );
}
