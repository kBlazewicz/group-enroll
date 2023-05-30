import { useEffect, useState } from "react"
import { StudentDataForm } from "./student-data-form/StudentDataForm"
import { StudentsForm } from "./students-form/StudentsForm"
import { useParams } from "react-router";
import { fetchSurvey } from "../../api/api-utils";
import { Term } from "../../types/types";

export const FormAnswers = () => {
    const [savedStudentId, setSavedStudentId] = useState<number>(-1);
    const [lastSavedStudentId, setLastSavedStudentId] = useState<number>(-1);
    const [survey, setSurvey] = useState<Term[]>([]);
    const [isSurveyFound, setIsSurveyFound] = useState<boolean>(false);
    let { guid } = useParams();

    useEffect(() => {
        const loadData = async () => {
            let data = []
            if(guid){
                const response = await fetchSurvey(guid);
                if (response.ok){
                    data = await response.json();
                    setIsSurveyFound(true);
                } 
                else {
                    setIsSurveyFound(false);
                }
            }
            setSurvey(data);
        }
        loadData();
    }, [guid, savedStudentId])

    const handleStudentSave = (studentId: number) => {
        setSavedStudentId(studentId)
    }

    return (<>
        {isSurveyFound ? 
            <>
                <StudentDataForm onStudentSave={handleStudentSave}></StudentDataForm>
                <StudentsForm terms={survey} studentId={savedStudentId} lastSavedStudentId={lastSavedStudentId} saveLastSavedStudentId={setLastSavedStudentId}/>
            </> : 
            `Survey with code ${guid} was not found!`
        }
    </>)
}