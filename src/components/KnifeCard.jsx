import { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
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
import KnifeDialog from "../pages/Homepage/KnifeDialog";


function OrderAction() {
  const [count, setCount] = useState(0)

  return (
    <Box ml="auto">
      {count === 0 && (
        <Button variant='contained' onClick={() => setCount(c => c + 1)}>
          заказать
        </Button>
      )}
      {count > 0 && (
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button onClick={() => setCount(c => c - 1)}>-</Button>
          <Button>{count}</Button>
          <Button onClick={() => setCount(c => c + 1)}>+</Button>
        </ButtonGroup>
      )}
    </Box>
  )
}

export default function KnifeCard({ id, imageUrl, name, price, description, onClick, reloadKnifes }) {
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