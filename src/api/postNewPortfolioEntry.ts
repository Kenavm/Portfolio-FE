import Entry from "../types/Entry";

const postNewPortfolioEntry = async(portfolioEntry: Entry) =>  {
  await fetch(`http://localhost:8080/api/v1/portfolio`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(portfolioEntry),
  });
}

export default postNewPortfolioEntry;