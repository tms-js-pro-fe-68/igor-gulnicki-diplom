// import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useEffect, useState } from "react";
import {
  Box,
  // Button,
  // ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography
} from '@mui/material'
import { Favorite as FavoriteIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import ConfirmDialog from './ConfirmDialog';
import { OrderAction } from "./ProductsPage";
import AddKnifeItemButton from "./AddKnifeItemButton";
import KnifeDialog from "../pages/Homepage/KnifeDialog";


function ClickBoundary(props) {
  return <Box {...props} onClick={(e) => e.stopPropagation()} />
}


function KnifeCard({ id, imageUrl, name, price, description, onClick, reloadKnifes }) {
  const handleDelete = () => {
    fetch(`https://tms-js-pro-back-end.herokuapp.com/api/knifes/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${sessionStorage.token}`,
      },
    }).then(reloadKnifes)
  }

  const [isDeleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);

  const handleDeleteConfirmOpen = () => setDeleteConfirmDialogOpen(true)
  const handleDeleteConfirmClose = () => setDeleteConfirmDialogOpen(false)

  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true)

  return (
    <Card onClick={onClick} sx={{ maxWidth: 250, height: 350, }}
    >
      <CardMedia
        component="img"
        height="170"
        image={imageUrl}
        alt="Paella dish"
      />
      <CardContent >
        <Stack direction='row' justifyContent='space-between' >
          <Typography variant="body1"  >
            {name}
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 'bold' }} >
            {price}руб.
          </Typography>
        </Stack>
        <Typography variant="body1" color="textSecondary" >
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing onClick={(e) => e.stopPropagation()}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton edge="end" onClick={open}>
          <EditIcon />
        </IconButton>
        <IconButton edge="end" onClick={handleDeleteConfirmOpen}>
          <DeleteIcon />
        </IconButton>
        <OrderAction />
      </CardActions>
      <KnifeDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        reloadKnifes={reloadKnifes}
        id={id} />
      <ConfirmDialog
        confirmText='Удалить'
        title="Удаление ножа"
        text="Вы уверены что хотите удалить нож?"
        open={isDeleteConfirmDialogOpen}
        onConfirm={handleDelete}
        onClose={handleDeleteConfirmClose} />
    </Card>
  )
}


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
        // console.log(response);
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



