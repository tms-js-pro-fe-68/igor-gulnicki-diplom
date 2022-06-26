import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
    TextField,
} from '@mui/material'
import axios from 'axios'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
//   import { useQueryClient } from 'react-query'
import { object, string, number } from 'yup'
// import api from '../../api'
// import FormikTextField from '../../components/FormikTextField'


function FormikTextField({ name, formik, ...otherProps }) {
    return (
        <TextField
            id={name}
            name={name}
            type={name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[name]}
            error={formik.touched[name] && !!formik.errors[name]}
            helperText={
                formik.touched[name] && !!formik.errors[name] && formik.errors[name]
            }
            {...otherProps}
        />
    )
}


export default function KnifeDialog({
    id,
    title,
    text,
    onClose,
    onConfirm,
    reloadKnifes,
    ...otherProps
}) {
    // const queryClient = useQueryClient()
    // состояние для файла
    const [image, setImage] = useState(null)
    const handleSubmit = async (values, { setSubmitting }) => {
        const isPost = !id;
        const isPut = !isPost;

        // 1 POST запрос на создание ресурса
        //   const { data } = await api.post('/pizzas', values)
        // добавить логику с PUT
        const slashIdOrEmpty = isPut ? `/${id}` : ''                  //  if(IsDunkel) 
        const response = await fetch(`https://tms-js-pro-back-end.herokuapp.com/api/knifes${slashIdOrEmpty}`, {
            method: isPut ? 'PUT' : 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token ${sessionStorage.token}`,
            },
            body: JSON.stringify(values)
        })

        if (isPost) {
            const data = await response.json()
            // 2 POST запрос с формой в которую добавлен файл
            const resource = 'knife' // не забудьте поменять
            const formData = new FormData()
            formData.append('image', image)
            const { data: imageUrl } = await axios.post(
                'https://server.kemalkalandarov.lol/api/images',
                formData,
                { params: { resource, id: data.id } }, //
            )



            // 3 PUT обновление только что созданного ресурса, запись url картинки
            //   await api.put(`/pizzas/${data.id}`, { imageUrl })
            await fetch(`https://tms-js-pro-back-end.herokuapp.com/api/knifes/${data.id}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Token ${sessionStorage.token}`,
                },
                body: JSON.stringify({ imageUrl })
            })
        }


        // 4 обновить список ресурсов чтобы отобразился только что созданный,
        // у вас реализация может отличаться, у меня пиццы в raect query, по этому
        // вызываю ф-ю очистки кеша с react query
        if (reloadKnifes) {
            reloadKnifes()
        }

        setSubmitting(false)
        onClose()
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: 0,
        },
        onSubmit: handleSubmit,
        validationSchema: object().shape({
            name: string().required(),
            description: string(),
            price: number().min(20),
        }),
        validateOnMount: true,
        enableReinitialize: true,
    })

    const [imagePreview, setImagePreview] = useState('')
    useEffect(() => {
        const reader = new FileReader()
        reader.onload = e => setImagePreview(e.target.result)

        if (image) {
            reader.readAsDataURL(image)
        }
        // чистим onload чтобы не сработал setImagePreview когда компонент анмаунтится
        return () => {
            reader.onload = undefined
        }
    }, [image])

    const isPost = !id;
    const isAdd = isPost;

    return (
        <Dialog {...{ onClose, ...otherProps }}>
            <Box sx={{
                bgcolor: 'rgba(165, 165, 165, 0.5)',
                backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYiidDKTdPXUwHA73HvaQEuzWAHnMgESrUhg&usqp=CAU)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <form onSubmit={formik.handleSubmit} >
                    <DialogTitle sx={{ color: 'white' }}>{isAdd ? 'Создать нож ' : 'Изменить нож'}</DialogTitle>
                    <DialogContent>
                        <Box
                            sx={{
                                p: 2,
                                display: 'grid',
                                gap: 2,
                                gridTemplateColumns: '1fr 1fr'
                            }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <FormikTextField
                                    autoComplete="off"
                                    label="Name"
                                    name="name"
                                    formik={formik}
                                    sx={{ mb: 2 }}
                                />
                                <FormikTextField
                                    label="Description"
                                    type="description"
                                    name="description"
                                    formik={formik}
                                    inputProps={{ sx: { color: 'white' } }}
                                    sx={{ mb: 2, color: 'white' }}
                                />
                                <FormikTextField
                                    label="Price"
                                    type="number"
                                    name="price"
                                    formik={formik}
                                    sx={{ mb: 2 }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    // justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Box
                                    component="img"
                                    src={imagePreview}
                                    width="150px"
                                    height="150px"
                                    sx={{ mb: 2 }}
                                />
                                {/* {!id &&} */}
                                <input
                                    name="image"
                                    type="file"
                                    // value тут не нужен, достаточно сетить выбранную картинку в стейт image (uncontrolled)
                                    onChange={e => setImage(e.target.files[0])}
                                />
                            </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose} sx={{ color: 'white' }}>Отменить</Button>
                        <Button type="submit" autoFocus sx={{ color: 'white' }}>
                            {isAdd ? 'Создать' : 'Изменить'}
                        </Button>
                    </DialogActions>
                </form>
            </Box>
        </Dialog>

    )
}