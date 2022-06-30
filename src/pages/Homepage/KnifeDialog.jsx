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
import { object, string, number } from 'yup'



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
    const isPost = !id;
    const isPut = !isPost;

    const [image, setImage] = useState(null)

    const handleSubmit = async (values, { setSubmitting }) => {
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
            const resource = 'knife'
            const formData = new FormData()
            formData.append('image', image)
            const { data: imageUrl } = await axios.post(
                'https://server.kemalkalandarov.lol/api/images',
                formData,
                { params: { resource, id: data.id } }, //
            )


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

        return () => {
            reader.onload = undefined
        }
    }, [image])

    useEffect(() => {
        if (!otherProps.open) return;
        if (isPost) return;
        fetch(`https://tms-js-pro-back-end.herokuapp.com/api/knifes/${id}`)
            .then(response => response.json())
            .then(data => {
                formik.setValues(data)
                setImagePreview(data.imageUrl)
            })

    }, [otherProps.open])

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
                                {isAdd && <input
                                    name="image"
                                    type="file"
                                    onChange={e => setImage(e.target.files[0])}
                                />}
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