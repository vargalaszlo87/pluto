const descriptive = {
	mean: (datas) => {
        let temp = 0;
        datas.forEach(element => {
            temp += element;
        });
        return temp/datas.length;
    },
    median: (datas) => {
        even = (datas.length % 2) ? false : true;
        if (even) {
            let half = Maht.floor(datas.length / 2);
            return (datas[half - 1] + datas[half]) / 2;
        }
        else
            return datas[half];

    },
    mode: (datas) => {


    }



}
