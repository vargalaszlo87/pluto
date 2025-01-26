const filter = {

    // Z-Scores
    calculateZScores: (data) => {
        const mean = descriptive.mean(data);
        const stdDev = descriptive.standardDeviation(data);
        return data.map(value => (value - mean) / stdDev);
    },

    filterDataByZScore: (data, threshold = 2) => {
        const zScores = filter.calculateZScores(data);
        return data.filter((value, index) => Math.abs(zScores[index]) <= threshold);
    },

    // IQR
    calculateIQR: (data) => {
        const sortedData = [...data].sort((a, b) => a - b);
        const q1 = descriptive.quantile(sortedData, 0.25);
        const q3 = descriptive.quantile(sortedData, 0.75);
        const iqr = q3 - q1;
        return { q1, q3, iqr };
    },

    filterDataByIQR: (data, multiplier = 1.5) => {
        const { q1, q3, iqr } = filter.calculateIQR(data);
        const lowerBound = q1 - multiplier * iqr;
        const upperBound = q3 + multiplier * iqr;
        return data.filter(value => value >= lowerBound && value <= upperBound);
    },

    // moving average
    movingAverage: (data, windowSize) => {
        if (windowSize <= 0 || windowSize > data.length) {
            throw new Error("Invalid window size");
        }
    
        const averages = [];
        for (let i = 0; i <= data.length - windowSize; i++) {
            const window = data.slice(i, i + windowSize);
            const windowAvg = window.reduce((sum, value) => sum + value, 0) / windowSize; 
            averages.push(windowAvg);
        }
        return averages;
    }
    

}

