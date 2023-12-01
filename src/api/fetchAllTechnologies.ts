const fetchAllTechnologies = async () => {
  const res = await fetch(`http://localhost:8080/api/v1/technologies`);
  const data = await res.json();
  return data;
}

export default fetchAllTechnologies;