const transformation = {

    log: (data) => {
        return data.map(value => Math.log(value + 1)); // +1 eltolás a 0 elkerülése érdekében
    },

    sqrt: (data) => {
        return data.map(value => Math.sqrt(value));
    },

    reciprocal: (data) => {
        return data.map(value => 1 / value);
    },

    power: (data, power = 2) => {
        return data.map(value => Math.pow(value, power));
    }


    /*
        Log és négyzetgyök: Ha az eloszlásod ferde (jobbra tolódott).
        Reciprok: Ha a nagyobb értékek túlzott hatással bírnak.
        Power és Box-Cox: Ha általános rugalmas transzformáció kell.
    */


}