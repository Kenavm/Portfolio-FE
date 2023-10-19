//entry-container: should be flexbox

const PortfolioEntries = ({entries}) => {

  return <div className = "portfolio-entries">
    {entries.map((entry) => (
      <div className="entry-container">
      <div className="start-and-end-date">
        <p>{entry.startDate}-{entry.endDate}</p>
        <div/>
      <div/>
    ))}

    </div>;
};
export default PortfolioEntries;
