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
import { Favorite as FavoriteIcon, Share as ShareIcon } from '@mui/icons-material'
import ConfirmDialog from './ConfirmDialog';
import { OrderAction } from "./ProductsPage";


function ClickBoundary(props) {
  return <Box {...props} onClick={(e) => e.stopPropagation()} />
}


function KnifeCard({ id, imageUrl, name, price, description, onClick, }) {

  const handleDelete = () => {
    fetch(`https://tms-js-pro-back-end.herokuapp.com/api/knifes/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${sessionStorage.token}`,
      },
    })
  }

  const [isDeleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);

  const handleDeleteConfirmOpen = () => setDeleteConfirmDialogOpen(true)
  const handleDeleteConfirmClose = () => setDeleteConfirmDialogOpen(false)

  return (
    <>
      {/* <Paper onClick={onClick} sx={{ p: 2, pl: 3, bgcolor: '#777777' }}>
        <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
          <Typography sx={{ flex: 1 }}>{description}</Typography>
          <ClickBoundary>
            <Stack direction='row' spacing={2}  >
              <IconButton edge="end" >
                <EditIcon />
              </IconButton>
              <IconButton edge="end" onClick={handleDeleteConfirmOpen}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          </ClickBoundary>
        </Stack>
      </Paper> */}
      <Card sx={{ maxWidth: 250, height: 350 }}
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
              {price}$
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
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <OrderAction />
        </CardActions>
      </Card>
      <ConfirmDialog
        title="DELETE Todo item"
        text="Are you sure?"
        open={isDeleteConfirmDialogOpen}
        onConfirm={handleDelete}
        onClose={handleDeleteConfirmClose} />
    </>
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
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: '1fr', p: 2 }}>
        {knifes.map((knife) => (
          <KnifeCard key={knife.id} {...knife}
            onClick={handleItemClick}
            onChange={loadKnifes}
          />
        ))}
      </Box>
    </>
  );
}



