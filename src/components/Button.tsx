export interface Props {
  label: string;
  onClick: () => void;
}
export default function Button({ label, onClick }: Props): JSX.Element {
  return <button onClick={onClick}>{label}</button>;
}
