import { Add as AddIcon } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { useState } from "react";
// import KnifeItemEditor from "../pages/Homepage/KnifeItemEditor";
import KnifeDialog from "../pages/Homepage/KnifeDialog";



export default function AddKnifeItemButton({ reloadKnifes }) {
    const [isOpen, setIsOpen] = useState(false);
    const open = () => setIsOpen(true)

    return (
        <>
            <Fab size="medium" color="primary" aria-label="add" sx={{
                position: 'fixed',
                bottom: 16,
                right: 16
            }}
                onClick={open}
            >
                <AddIcon />
            </Fab>
            <KnifeDialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                reloadKnifes={reloadKnifes} />
            {/* <KnifeItemEditor
                open={isOpen}
                onClose={() => setIsOpen(false)}
                onAfterSubmit={onAfterSubmit}
            /> */}
        </>
    )
}