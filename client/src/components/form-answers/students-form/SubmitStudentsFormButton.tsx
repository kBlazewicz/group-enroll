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

export const SubmitStudentsFormButton = ({termsToSend, studentId, lastSavedStudentId, saveLastSavedStudentId}
    : {termsToSend: Term[], studentId: number, lastSavedStudentId: number, saveLastSavedStudentId: (id: number) => void}) => {

    const handleOnClick = async () => {
        if(studentId === lastSavedStudentId ) {
            alert("Aby przesłać głosy należy najpierw wypełnić formularz danych studenta.");
        }
        else{
            const votes = convertToVotes(termsToSend, studentId)
            await sendVotes(votes); 
            saveLastSavedStudentId(studentId);
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