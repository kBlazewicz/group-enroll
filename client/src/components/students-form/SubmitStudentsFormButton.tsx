import Button from '@mui/material/Button';
import { OptionDay } from './StudentsForm';

export const SubmitStudentsFormButton = ({checkedOptions}: {checkedOptions: OptionDay[]}) => {
    const handleOnClick = () => {
        console.log(checkedOptions)
    }
    return (
        <Button variant='contained' onClick={handleOnClick}>
            Submit
        </Button>
    )
}