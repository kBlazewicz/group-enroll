import React from 'react';

export const FormAnswer = ({ children }: { children: any }) => {
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
            {children}
        </div>
    );
};
