import { Alert } from '@material-ui/lab';

interface ISuccessMessageProps {
    successMessage : string
}

function SuccessMessageComponent(props : ISuccessMessageProps) {
    return(
        <Alert severity='success'>{props.successMessage}</Alert>
    );
}

export default SuccessMessageComponent;