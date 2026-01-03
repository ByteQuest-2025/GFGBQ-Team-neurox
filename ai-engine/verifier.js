
// This module converts detected signals into human-readable explanations.

/**
 * Converts detected signals into human-readable explanations.
 * @param {Array} signals - List of detected signals.
 * @returns {Array} - List of human-readable explanations.
 */
function generateExplanations(signals) {
    return signals.map(signal => {
        return `${signal.type}: ${signal.description} (Confidence: ${signal.confidence}%)`;
    });
}

module.exports = {
    generateExplanations
};
