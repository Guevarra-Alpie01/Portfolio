export default function ErrorState({ message }) {
  return (
    <div className="section-shell border-ember/40 p-6 text-sm text-emberSoft">
      <p>{message}</p>
    </div>
  );
}
