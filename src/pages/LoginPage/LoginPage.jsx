/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import Page from "../../components/Page";
// import api from '../../api';


export default function LoginPage() {
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting }) => {

        const { email, password } = values;
        const response = await fetch(
            'https://tms-js-pro-back-end.herokuapp.com/api/users/signin',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            },
        );
        const data = await response.json().catch();

        if (!response.ok) {
            const err = await response.json();
            throw Error(JSON.stringify(err.errors));
        }

        console.log(data);
        sessionStorage.token = data.token;
        sessionStorage.email = data.email;
        navigate('/', { replace: true });

        setSubmitting(false);
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: handleSubmit,
        validationSchema: object().shape({
            email: string().email().required(),
            password: string().min(2).required(),
        }),
        validateOnMount: true,
    });

    console.log(formik);

    return (
        <Page position="static">
            <Paper component='form'
                sx={{
                    display: 'grid',
                    gridTemplateColums: '1fr ',
                    width: '500px',
                    justifyContent: 'right',
                    gap: 2,
                    padding: 3,
                    backgroundColor: 'rgba(169, 169, 169, 0.3)',
                    borderRadius: '20px'
                }}
                elevation={6}
                onSubmit={formik.handleSubmit}>
                Введите данные для покупки ножей
                <TextField
                    label="email"
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    error={formik.touched.email && !!formik.errors.email}
                    helperText={
                        formik.touched.email &&
                        !!formik.errors.email &&
                        formik.errors.email
                    }
                />
                <TextField
                    label="password"
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    error={formik.touched.password && !!formik.errors.password}
                    helperText={
                        formik.touched.password &&
                        !!formik.errors.password &&
                        formik.errors.password
                    }
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={!formik.isValid && !formik.isSubmitting}
                >
                    Войти
                </Button>
            </Paper>
        </Page>
    )
}