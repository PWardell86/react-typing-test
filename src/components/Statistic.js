import './Statistic.css';

function Statistic(props) {
  const label = props.label ? props.label + ": " : "";
  return (
    <div className="statistic">
      <div className="label">{label}</div>
      <div className="value">{props.value}</div>
    </div>
  );
}

export default Statistic;