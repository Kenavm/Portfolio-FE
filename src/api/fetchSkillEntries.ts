const fetchSkillEntries = async (token: string) => {
    const res = await fetch('http://localhost:8080/api/v1/skills', {
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  }
  
  export default fetchSkillEntries;