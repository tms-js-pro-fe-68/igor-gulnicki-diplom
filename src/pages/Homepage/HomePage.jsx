import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddKnifeItemButton from "../../components/AddKnifeItemButton";
import AppBar from "../../components/AppBar";
import ProductsPage from "../../components/ProductsPage";
import KnifeCardList from "../../components/KnifeCardList";
import Footer from "../../components/Footer";


export default function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.token) navigate(('/login'));
    }, []);

    return (
        <Box>
            <AppBar />
            {/* <ProductsPage /> */}
            <KnifeCardList />

            <Footer />
        </Box>
    )
}