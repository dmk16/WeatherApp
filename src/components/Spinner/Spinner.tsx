import "./Spinner.css";

export default function Spinner() {
  return (
    <div
      className="spinner-container"
      role="status"
      aria-label="Loading weather"
    >
      <div className="spinner" />
      <p className="spinner-text">Loading weather...</p>
    </div>
  );
}
