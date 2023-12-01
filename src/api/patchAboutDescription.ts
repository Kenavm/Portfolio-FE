const patchAboutDescription = async (
  id: number,
  newDescription: string,
  token: string
) => {
  const url = `http://localhost:8080/api/v1/public-user/${id}`;
  await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDescription),
  });
};

export default patchAboutDescription;
