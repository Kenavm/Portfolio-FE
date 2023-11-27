import PrivateUser from "../types/PrivateUser";

const authenticateUser = async (privateUser: PrivateUser) => {
  const base64Credentials = btoa(`${privateUser.username}:${privateUser.password}`);
  
  try {
    const response = await fetch(`http://localhost:8080/auth/login`, {
      method: "POST",
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
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

export default authenticateUser;
