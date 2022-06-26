import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";


export default function ConfirmDialog({ title,
    text,
    onClose,
    onConfirm,
    confirmText,
    ...otherProps
}) {
    return (
        <Dialog {...{ onClose, ...otherProps }}>
            <DialogTitle >
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отменить</Button>
                <Button onClick={onConfirm} autoFocus>
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}


