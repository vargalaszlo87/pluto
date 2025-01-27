const scale = {

    minMaxScaling: (data, newMin = 0, newMax = 1) => {
        const oldMin = Math.min(...data);
        const oldMax = Math.max(...data);
        
        if (oldMin === oldMax) {
            throw new Error("All data points have the same value, scaling is not possible.");
        }
    
        return data.map(value => {
            return ((value - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin;
        });
    },

    standardizeData: (data) => {
        const stdDev = Math.sqrt(descriptive.variance(data));
    
        if (stdDev === 0) {
            throw new Error("Standard deviation is zero, all values are identical.");
        }

        return data.map(value => (value - descriptive.mean(data)) / stdDev);
    }

};