const fetchSkillEntries = async () => {
    const res = await fetch('http://localhost:8080/api/v1/skills');
    const data = await res.json();
    return data;
  }
  
  export default fetchSkillEntries;