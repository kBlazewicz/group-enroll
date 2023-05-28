import Button from '@mui/material/Button';
import { Term, Vote } from '../../types/types';
import { sendVotes } from '../../api/api-utils';


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
            alert("Do przesłania głosów konieczne jest wcześniejsze przesłanie swoich danych!")
        }
        else{
        const votes = convertToVotes(termsToSend, studentId)
        await sendVotes(votes); 
        }
    }

    return (
        <Button variant='contained' onClick={handleOnClick}>
            Submit
        </Button>
    )
}