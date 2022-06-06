import { Add as AddIcon } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { useState } from "react";
// import KnifeItemEditor from "../pages/Homepage/KnifeItemEditor";
import KnifeDialog from "../pages/Homepage/KnifeDialog";



export default function AddKnifeItemButton() { // <= { onAfterSubmit } в пропсах закаменчено
    const [isOpen, setIsOpen] = useState(false);
    const open = () => setIsOpen(true)

    // const handleClick = () => {
    //     fetch(`https://tms-js-pro-back-end.herokuapp.com/api/knifes`, {
    //   method: 'POST',
    //   headers: {
    //     Accept: '<application />json',
    //     'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    //     Authorization: `Token ${sessionStorage.token}`,
    //   },
    //   body: JSON.stringify({description}),
    // })
    // }

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
            <KnifeDialog open={isOpen} onClose={() => setIsOpen(false)} />
            {/* <KnifeItemEditor
                open={isOpen}
                onClose={() => setIsOpen(false)}
                onAfterSubmit={onAfterSubmit}
            /> */}
        </>
    )
}