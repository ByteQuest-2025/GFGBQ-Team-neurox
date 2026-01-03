
// This module calculates an authenticity score based on detected signals.

/**
 * Calculates an authenticity score based on detected signals.
 * @param {Array} signals - List of detected signals.
 * @returns {number} - Authenticity score (0 to 100).
 */
function calculateAuthenticityScore(signals) {
    const baseScore = 100;
    const penaltyPerSignal = 10; // Deduct 10 points per signal

    const score = baseScore - (signals.length * penaltyPerSignal);
    return Math.max(score, 0); // Ensure score is not negative
}

module.exports = {
    calculateAuthenticityScore
};
