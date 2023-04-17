import React, { ReactNode } from 'react';

interface Props {
    children: ReactNode[];
}

const FormAnswer: React.FC<Props> = ({ children }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '90%',
            }}
        >
            {children.map((child, index) => (
                <div key={index} style={{ margin: '1rem 0' }}>
                    {child}
                </div>
            ))}
        </div>
    );
};

export default FormAnswer;
