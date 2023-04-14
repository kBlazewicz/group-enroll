import Button from '@mui/material/Button';
import { Term } from '../../types/types';

export const SubmitStudentsFormButton = ({checkedTerms: checkedTerms}: {checkedTerms: Term[]}) => {
    const handleOnClick = () => {
        console.log(checkedTerms)
    }
    return (
        <Button variant='contained' onClick={handleOnClick}>
            Submit
        </Button>
    )
}