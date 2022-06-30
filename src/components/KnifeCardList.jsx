import { useEffect, useState } from "react";
import { Box, } from '@mui/material'
import AddKnifeItemButton from "./AddKnifeItemButton";
import KnifeCard from "./KnifeCard";


export default function KnifeCardList() {
  const [knifes, setKnifes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadKnifes = () => {
    setError(null);
    setIsLoading(true);
    fetch('https://tms-js-pro-back-end.herokuapp.com/api/knifes', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${sessionStorage.token}`,
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => setKnifes(data))
      .catch((err) => setError(`Error: ${err.message}`))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    loadKnifes();
  }, [])


  const handleItemClick = (id) => () => {
    console.log(id);
  }

  return (
    <>
      <p>{isLoading && 'loading....'}</p>
      <p>{error}</p>
      <Box sx={{
        p: 2,
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(5, 1fr)",
        },
      }}>
        {knifes.map((knife) => (
          <KnifeCard key={knife.id} {...knife}
            onClick={handleItemClick}
            reloadKnifes={loadKnifes}
          />
        ))}
      </Box>
      <AddKnifeItemButton reloadKnifes={loadKnifes} />
    </>
  );
}



