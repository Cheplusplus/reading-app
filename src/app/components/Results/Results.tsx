type ResultsProps = {
  results: Results;
};
const Results = ({ results }: ResultsProps) => {
  return (
    <div>
      <p>{results.score}%</p>
    </div>
  );
};

export default Results;
