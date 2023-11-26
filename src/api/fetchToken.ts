import PrivateUser from "../types/PrivateUser";

const fetchToken = async (privateUser: PrivateUser) => {
  try {
    const response = await fetch(`http://localhost:8080/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(privateUser),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};

export default fetchToken;
