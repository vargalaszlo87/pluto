const descriptive = {
    count: (datas) => {
        return datas.length;
    },
    sum: (datas) => {
        let temp = 0;
        datas.forEach(element => {
            temp += element;
        });
        return temp;
    },
	mean: (datas) => {
        return descriptive.sum(datas)/descriptive.count(datas);
    },
    median: (datas) => {
        const even = (datas.length % 2) ? false : true;
        let half = 0;
        if (even) {
            half = Math.floor(datas.length / 2);
            return (datas[half - 1] + datas[half]) / 2;
        }
        else
            return datas[half];

    },
    mode: (datas) => {
        let mode = {};
        let maxCount = 0;
        let modes = [];
        datas.forEach(function (i) {
            if (mode[i] == null) {
                mode[i] = 1;
            } else
                mode[i]++;
            if (mode[i] > maxCount) {
                modes = [i];
                maxCount = mode[i];
            } else if (mode[i] === maxCount)
                modes.push(i);
        });
        return modes;
    },
    min: (datas) => {
        return Math.min(...datas);
    },
    max: (datas) => {
        return Math.max(...datas);
    },
    range: (datas) => {
        return descriptive.max(datas) - descriptive.min(datas);
    },
    variance: (datas) => {
        let temp = 0;
        const mean = descriptive.mean(datas);
        datas.forEach(element => {
            temp += Math.pow(element - mean,2);
        });
        return temp / (descriptive.count(datas) - 1);
    },   
    standardDeviation: (datas) => {
        return Math.sqrt(descriptive.variance(datas));
    },
    standardError: (datas) => {
        return descriptive.standardDeviation(datas) / Math.sqrt(descriptive.count(datas));
    },
    ZTransform: (datas) => {
        let temp = [];
        const mean = descriptive.mean(datas);
        const standardDeviation = descriptive.standardDeviation(datas);
        datas.forEach(element => {
            temp.push((element - mean) / standardDeviation);
        });
        return temp;
    },
    kurtosis: (datas) => {
        /* not stable */
        /* don't use it! */
        let temp = 0;
        const mean = descriptive.mean(datas);
        const standardDeviation = descriptive.standardDeviation(datas);
        const reciprocalCount = 1/descriptive.count(datas);
        datas.forEach(element => {
            temp += Math.pow((element - mean), 4);
            temp /= Math.pow(standardDeviation,4);
        });
        return reciprocalCount * temp;
    }  

}
