import React from 'react';

export const LayoutGrid = ({ children }: { children: any }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90%',
                width: '90%',
                margin: '2rem',
                padding: '2rem',
                gap: '2rem',
            }}
        >
            {children}
        </div>
    );
};

