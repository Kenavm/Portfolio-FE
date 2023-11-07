const fetchPortfolioEntries = async () => {
  const res = await fetch('http://localhost:8080/api/v1/portfolio');
  const data = await res.json();
  return data;
}

export default fetchPortfolioEntries;