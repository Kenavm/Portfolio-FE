import Entry from "../types/Entry";

const updatePortfolioEntry = async (id: number, portfolioEntryDTO: Entry, token: string) => {
  const url = `http://localhost:8080/api/v1/portfolio/${id}`;
  await fetch(url, {
    method: "PUT",
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(portfolioEntryDTO),
  });
};

export default updatePortfolioEntry;
