const normalize = {

    normalizeL2: (data) => {

        const l2Norm = Math.sqrt(data.reduce((sum, value) => sum + value ** 2, 0));
    
        if (l2Norm === 0) {
            throw new Error("The L2 norm is zero; all data points are zero.");
        }
    
        return data.map(value => value / l2Norm);
    },

    normalizeL1: (data) => {
        
        const l1Norm = data.reduce((sum, value) => sum + Math.abs(value), 0);
    
        if (l1Norm === 0) {
            throw new Error("The L1 norm is zero; all data points are zero.");
        }
    
        return data.map(value => value / l1Norm);
    }

};