import {Alert} from '@material-ui/lab';

interface IWarningMessageProps {
    warnMessage: string
}

function WarningMessageComponent(props: IWarningMessageProps) {
    return (
        <Alert severity='warning'>{props.warnMessage}</Alert>
    );
}

export default WarningMessageComponent;