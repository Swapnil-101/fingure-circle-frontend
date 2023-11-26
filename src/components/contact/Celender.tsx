import React, { useEffect } from 'react';

const Calendar = () => {
    // Load Calendly script
    const loadCalendlyScript = () => {
        const script = document.createElement('script');
        script.id = 'calendlyScript';
        script.src = 'https://calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);
    };

    // Load Calendly script on component mount
    useEffect(() => {
        loadCalendlyScript();

        // Cleanup the script on component unmount
        return () => {
            const scriptElement = document.getElementById('calendlyScript');
            if (scriptElement) {
                document.body.removeChild(scriptElement);
            }
        };
    }, []);

    return (
        <div>
            <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/swapniltiwari9819/30min?month=2023-11"
                style={{ minWidth: '320px', height: '980px', marginTop: 0, marginBottom: 0 }}
            />

            <style>
                {`
                    .__cUP1np9gMvFQrcPftuf OGcBAyJGBej5Gnyi9hGA xahN8AEzyAvQtVj17TPv {
                        margin-top: 0 !important;
                        margin-bottom: 0 !important;
                    }
                `}
            </style>
        </div>
    );
};

export default Calendar;
