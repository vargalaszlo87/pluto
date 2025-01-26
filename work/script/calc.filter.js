const filter = {
    calculateZScores: (data) => {
        const mean = descriptive.mean(data);
        const stdDev = descriptive.standardDeviation(data);
        return data.map(value => (value - mean) / stdDev);
    },

    filterDataByZScore: (data, threshold = 2) => {
        const zScores = this.calculateZScores(data);
        return data.filter((value, index) => Math.abs(zScores[index]) <= threshold);
    }

}

