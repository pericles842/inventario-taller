export interface ConfirmDialog {
    title?: string,
    message: string,
    classIcon?: string,
    rejectLabel?: string,
    acceptLabel?: string
    reject: any
    accept: any
    closeDialog?: boolean
}