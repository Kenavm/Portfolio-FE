const fetchPublicUser = async (userId: number, token: string) => {
    const res = await fetch(`http://localhost:8080/page/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  }
  
  export default fetchPublicUser;