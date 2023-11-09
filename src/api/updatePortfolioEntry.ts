import Entry from "../types/Entry";

const updatePortfolioEntry = async (id: number, portfolioEntryDTO: Entry) => {
    const url = `http://localhost:8080/api/v1/portfolio/${id}`;
    await fetch(url, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(portfolioEntryDTO)
    })
}

export default updatePortfolioEntry;