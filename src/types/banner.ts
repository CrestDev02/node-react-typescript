export interface BannerProps {
    open: boolean;
    message: string;
    handleClose: ()=>void;
    status: string;
}