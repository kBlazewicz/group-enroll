import Button from '@mui/material/Button';
import { Term, Vote } from '../../types/types';
import { sendVotes } from '../../api/api-utils';

const mockStudentId = 1;

const convertToVotes = (votedTerms: Term[]): Vote[] => {
    const votes: Vote[] = [];
    votedTerms.forEach(term => {
        votes.push({possibility: true, studentId: mockStudentId, termId: term.id})
    });

    return votes;
}

export const SubmitStudentsFormButton = ({termsToSend} : {termsToSend: Term[]}) => {
    const handleOnClick = async () => {
        const votes = convertToVotes(termsToSend)
        await sendVotes(votes); 
    }

    return (
        <Button variant='contained' onClick={handleOnClick}>
            Submit
        </Button>
    )
}