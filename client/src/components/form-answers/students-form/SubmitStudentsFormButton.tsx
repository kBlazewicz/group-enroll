import Button from '@mui/material/Button';
import { Term, Vote } from '../../../types/types';
import { sendVotes } from '../../../api/api-utils';


const convertToVotes = (votedTerms: Term[], studentId: number): Vote[] => {
    const votes: Vote[] = [];
    votedTerms.forEach(term => {
        votes.push({possibility: true, studentId: studentId, termId: term.id})
    });

    return votes;
}

export const SubmitStudentsFormButton = ({termsToSend, studentId} : {termsToSend: Term[], studentId: number}) => {
    const handleOnClick = async () => {
        if(studentId < 0 ){
            alert("Przesłanie zaznaczonych terminów będzie możliwe dopiero wtedy, gdy zatwierdzisz formularz ze swoimi danymi!");
        }
        else{
            const votes = convertToVotes(termsToSend, studentId)
            await sendVotes(votes); 
            alert("Zaznaczone terminy zostały przesłane. \nDziękujemy za wypełnienie ankiety.");
        }
    }

    return (
        <div style={{textAlign: 'center', margin:'auto'}}>
            <Button variant='contained' onClick={handleOnClick}>
                Submit
            </Button>
        </div>
    )
}