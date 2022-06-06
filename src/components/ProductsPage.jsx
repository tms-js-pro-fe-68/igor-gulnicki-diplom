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
import { Favorite as FavoriteIcon, Share as ShareIcon } from '@mui/icons-material'
import { useState } from 'react'




const productsList = [
    {
        name: 'knives metal',
        description: 'Нож Misen Chef’s Knife лудший нож .',
        price: 55,
        image: 'https://cdn.shopify.com/s/files/1/0020/2853/5874/products/IMG_20210128_123026_240x180_crop_center.jpg?v=1612293782'
    },
    {
        name: 'knives stal',
        description: '7-дюймовый нож-тесак Chopper  из нержавеющей стали ',
        price: 39,
        image: 'https://cdn.shopify.com/s/files/1/0020/2853/5874/products/IMG_20210129_154515_900x.jpg?v=1612293792'
    },
    {
        name: 'knives gold',
        description: 'WE Knife - нож родом из Китая проффесиональный.',
        price: 79,
        image: 'https://cdn.shopify.com/s/files/1/0020/2853/5874/products/IMG_20210205_153038_900x.jpg?v=1612539231'
    },
    {
        name: 'knives bronze',
        description: 'Это поварской нож  традиционно из австралии .',
        price: 89,
        image: 'https://cdn.shopify.com/s/files/1/0020/2853/5874/products/IMG_20210128_141650_900x.jpg?v=1612293818'
    },
    {
        name: 'knives bronze',
        description: ' Mac Mighty Professional Hollow Edge Knife.',
        price: 48.5,
        image: 'https://cdn.shopify.com/s/files/1/0020/2853/5874/products/IMG_20210119_151539_900x.jpg?v=1611094614'
    },
    {
        name: 'knives bronze',
        description: 'Длинный и тонкий разделочный нож — тонкий и длинный,',
        price: 97.3,
        image: 'https://cdn.shopify.com/s/files/1/0020/2853/5874/products/IMG_20210131_110955_900x.jpg?v=1612293749'
    },

]


export function OrderAction() {
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


export default function ProductsPage() {

    return (


        <Box
            sx={{
                p: 2,
                display: 'grid',
                gap: 2,
                gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(6, 1fr)",
                },
            }}
        >
            {productsList.map((item) => (
                <Card sx={{ maxWidth: 250, height: 350 }}
                >
                    <CardMedia
                        component="img"
                        height="170"
                        image={item.image}
                        alt="Paella dish"
                    />
                    <CardContent >
                        <Stack direction='row' justifyContent='space-between' >
                            <Typography variant="body1"  >
                                {item.name}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 'bold' }} >
                                {item.price}$
                            </Typography>
                        </Stack>
                        <Typography variant="body1" color="textSecondary" >
                            {item.description}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <OrderAction />
                    </CardActions>
                </Card>
            ))}
        </Box>

    )


}