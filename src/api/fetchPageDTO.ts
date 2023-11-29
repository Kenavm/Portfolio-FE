const fetchPageDTO = async (userId: number, token?: string) => {
  if(token) {
    const res = await fetch(`http://localhost:8080/page/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  } else {
    const res = await fetch(`http://localhost:8080/public/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  }
 
}

export default fetchPageDTO;