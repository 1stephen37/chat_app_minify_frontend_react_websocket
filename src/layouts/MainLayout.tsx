import React from 'react';

function MainLayout(props: { children: React.ReactNode }) {
    return (
        <main>

            <div className="mt-10">
                {props.children}
            </div>

        </main>
    );
}

export default MainLayout;
