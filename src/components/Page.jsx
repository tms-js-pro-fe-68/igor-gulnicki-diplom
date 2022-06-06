import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Page({ sx, ...otherProps }) {
    const navigate = useNavigate();
    const navigateToLogin = () => navigate('/login', { replace: true });

    useEffect(() => {
        if (!sessionStorage.token)
            navigateToLogin()
    }, [])

    return (
        <Box sx={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(169, 169, 169, 0.5)',
            backgroundImage: 'url(https://i.ytimg.com/vi/tQa-QYa_hoM/maxresdefault.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            ...sx,
        }}
            {...otherProps}
        />
    )
}