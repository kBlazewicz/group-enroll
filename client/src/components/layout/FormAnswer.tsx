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
                height: '100%',
                width: '90%',
                margin: '1rem',
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
