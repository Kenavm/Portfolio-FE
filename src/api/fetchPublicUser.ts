const fetchPublicUser = async (user_id: number) => {
    const res = await fetch(`http://localhost:8080/api/v1/public-user/${user_id}`);
    const data = await res.json();
    return data;
  }
  
  export default fetchPublicUser;