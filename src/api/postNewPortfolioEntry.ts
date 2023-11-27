import Entry from "../types/Entry";

const postNewPortfolioEntry = async(portfolioEntry: Entry, token: string) =>  {
  await fetch(`http://localhost:8080/api/v1/portfolio`, {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(portfolioEntry),
  });
}

export default postNewPortfolioEntry;