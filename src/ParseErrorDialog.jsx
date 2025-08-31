import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ParseErrorDialog = ({ isOpen, onClose, errorDetails }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const createGitHubIssue = () => {
        const title = encodeURIComponent('Parse Error Report');
        const body = encodeURIComponent(`## Parse Error Details

**Error Message:** ${errorDetails.error}

${errorDetails.errorCount ? '**Multiple Log Entries Affected**' : `**Log Entry:** 
\`\`\`
${(errorDetails.logEntry && errorDetails.logEntry.text) || 'N/A'}
\`\`\``}

${errorDetails.errorCount ? '' : `**Log Entry Details:**
- **Entry Index:** ${errorDetails.entryIndex || 'N/A'}
- **Time:** ${(errorDetails.logEntry && errorDetails.logEntry.time) || 'N/A'}
- **Component:** ${(errorDetails.logEntry && errorDetails.logEntry.component) || 'N/A'}
- **Level:** ${(errorDetails.logEntry && errorDetails.logEntry.level) || 'N/A'}`}

**Pattern:** ${(errorDetails.pattern && errorDetails.pattern.case) || 'N/A'}

${errorDetails.rawData ? `**Raw Data:**
\`\`\`
${errorDetails.rawData}
\`\`\`

` : ''}
${errorDetails.errorCount ? `**Error Count:** ${errorDetails.errorCount}

**Error Details:**
${errorDetails.errors ? errorDetails.errors.map((e, idx) => `
**Entry #${e.entryIndex || idx + 1}** (${(e.logEntry && e.logEntry.time) || 'N/A'}):
- **Component:** ${(e.logEntry && e.logEntry.component) || 'N/A'}
- **Level:** ${(e.logEntry && e.logEntry.level) || 'N/A'}
- **Error:** ${e.error}
- **Text:** \`${(e.logEntry && e.logEntry.text) || 'N/A'}\`
`).join('') : 'N/A'}

` : ''}
**Stack Trace:**
\`\`\`
${errorDetails.stack || 'N/A'}
\`\`\`

**Browser:** ${navigator.userAgent}

**Timestamp:** ${new Date().toISOString()}

---

**Please attach your CCP log file to this issue for better analysis.**

**Steps to attach:**
1. Click "Attach files by dragging & dropping, selecting or pasting them" below
2. Upload your original CCP log file (e.g., agent-log.txt)
3. This will help us reproduce and fix the parsing issue
`);

        const url = `https://github.com/amazon-connect/amazon-connect-snippets/issues/new?title=${title}&body=${body}&labels=bug,parser`;
        window.open(url, '_blank');
    };

    const handleFeedback = async () => {
        setIsSubmitting(true);
        createGitHubIssue();
        setTimeout(() => {
            setIsSubmitting(false);
            onClose();
        }, 1000);
    };

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    };

    const dialogStyle = {
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '24px',
        maxWidth: '500px',
        width: '90%',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
    };

    const closeButtonStyle = {
        background: 'none',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        padding: '0',
        width: '24px',
        height: '24px',
    };

    const errorDetailsStyle = {
        backgroundColor: '#f5f5f5',
        padding: '12px',
        borderRadius: '4px',
        margin: '12px 0',
        fontSize: '14px',
        fontFamily: 'monospace',
    };

    const actionsStyle = {
        display: 'flex',
        gap: '12px',
        justifyContent: 'flex-end',
        marginTop: '20px',
    };

    const buttonStyle = {
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
    };

    const primaryButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#007bff',
        color: 'white',
    };

    const secondaryButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#6c757d',
        color: 'white',
    };

    return (
        <div style={overlayStyle}>
            <div style={dialogStyle}>
                <div style={headerStyle}>
                    <h3>⚠️ Parse Error Detected</h3>
                    <button type="button" style={closeButtonStyle} onClick={onClose}>×</button>
                </div>

                <div>
                    <p>
                        An error occurred while parsing the log entry.
                        This might indicate a new log format that needs to be supported.
                    </p>

                    <div style={errorDetailsStyle}>
                        <strong>Error:</strong>
                        {' '}
                        {errorDetails.error}
                        <br />
                        <strong>Pattern:</strong>
                        {' '}
                        {(errorDetails.pattern && errorDetails.pattern.case) || 'Unknown'}
                        {errorDetails.logEntry && !errorDetails.errorCount && (
                            <>
                                <br />
                                <strong>Log Entry:</strong>
                                {' '}
                                <div style={{ marginTop: '4px', fontSize: '12px', wordBreak: 'break-all' }}>
                                    {errorDetails.logEntry.text || 'N/A'}
                                </div>
                                {errorDetails.logEntry.line && (
                                    <>
                                        <br />
                                        <strong>Line:</strong>
                                        {' '}
                                        {errorDetails.logEntry.line}
                                    </>
                                )}
                                {errorDetails.logEntry.time && (
                                    <>
                                        <br />
                                        <strong>Time:</strong>
                                        {' '}
                                        {errorDetails.logEntry.time}
                                    </>
                                )}
                            </>
                        )}
                        {errorDetails.errorCount && (
                            <>
                                <br />
                                <strong>Multiple Log Entries Affected</strong>
                            </>
                        )}
                        {errorDetails.rawData && (
                            <>
                                <br />
                                <strong>Raw Data:</strong>
                                {' '}
                                <div style={{ marginTop: '4px', fontSize: '12px', wordBreak: 'break-all' }}>
                                    {errorDetails.rawData}
                                </div>
                            </>
                        )}
                        {errorDetails.errorCount && (
                            <>
                                <br />
                                <strong>Error Count:</strong>
                                {' '}
                                {errorDetails.errorCount}
                                {errorDetails.errors && (
                                    <>
                                        <br />
                                        <strong>Error Details:</strong>
                                        <div style={{ marginTop: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                                            {errorDetails.errors.map((err) => (
                                                <div
                                                    key={`${(err.logEntry && err.logEntry.line) || Math.random()}-${err.error}`}
                                                    style={{
                                                        marginBottom: '8px',
                                                        padding: '4px',
                                                        backgroundColor: '#fff',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '2px',
                                                    }}
                                                >
                                                    <div style={{
                                                        fontSize: '12px',
                                                        fontWeight: 'bold',
                                                    }}
                                                    >
                                                        Entry #
                                                        {err.entryIndex || 'N/A'}
                                                        {' '}
                                                        -
                                                        {' '}
                                                        {(err.logEntry && err.logEntry.time) || 'N/A'}
                                                    </div>
                                                    <div style={{
                                                        fontSize: '11px',
                                                        color: '#666',
                                                        marginTop: '2px',
                                                    }}
                                                    >
                                                        {err.error}
                                                    </div>
                                                    <div style={{
                                                        fontSize: '11px',
                                                        marginTop: '2px',
                                                        wordBreak: 'break-all',
                                                        maxHeight: '100px',
                                                        overflowY: 'auto',
                                                        backgroundColor: '#f8f9fa',
                                                        padding: '4px',
                                                        border: '1px solid #e9ecef',
                                                        borderRadius: '2px',
                                                    }}
                                                    >
                                                        {(err.logEntry && err.logEntry.text) || 'N/A'}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>

                    <p>Would you like to report this issue to help improve the parser?</p>
                </div>

                <div style={actionsStyle}>
                    <button
                        type="button"
                        style={secondaryButtonStyle}
                        onClick={onClose}
                    >
                        Ignore
                    </button>
                    <button
                        type="button"
                        style={primaryButtonStyle}
                        onClick={handleFeedback}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Opening GitHub...' : 'Report Issue'}
                    </button>
                </div>
            </div>
        </div>
    );
};

ParseErrorDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    errorDetails: PropTypes.shape({
        error: PropTypes.string,
        stack: PropTypes.string,
        errorCount: PropTypes.number,
        entryIndex: PropTypes.number,
        errors: PropTypes.arrayOf(PropTypes.shape({
            error: PropTypes.string,
            entryIndex: PropTypes.number,
            logEntry: PropTypes.shape({
                text: PropTypes.string,
                line: PropTypes.number,
                time: PropTypes.string,
                component: PropTypes.string,
                level: PropTypes.string,
            }),
        })),
        logEntry: PropTypes.shape({
            text: PropTypes.string,
            line: PropTypes.number,
            time: PropTypes.string,
            component: PropTypes.string,
            level: PropTypes.string,
        }),
        pattern: PropTypes.shape({
            case: PropTypes.string,
        }),
        rawData: PropTypes.string,
    }).isRequired,
};

export default ParseErrorDialog;
