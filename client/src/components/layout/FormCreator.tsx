import React, { useState } from 'react';
import { InputDateForm } from '../teacher-form/InputDateForm';
import { ShareFormCard } from '../share-form/ShareFormCard';


export const FormCreator = () => {
    const [isShareFormVisible, setIsShareFormVisible] = useState<boolean>(false);
    const [surveyCode, setSurveyCode] = useState<string>("");

    const handleDatesSent = (surveyCode: string) => {
        setIsShareFormVisible(true);
        setSurveyCode(surveyCode)
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '90%',
                marginTop: '5rem',
            }}
        >
            <InputDateForm onDatesSent={handleDatesSent}></InputDateForm>
            {isShareFormVisible ? <ShareFormCard surveyCode={surveyCode}></ShareFormCard> : null}
        </div>
    );
};

