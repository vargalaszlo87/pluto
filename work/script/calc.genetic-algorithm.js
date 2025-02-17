
/*!
 * The "config" section can you set your parameters of project.
 */

let geneticAlgorithmConfig = {

    // add your categories
    categories: [],

    // add the names of categories
    categoriesNames: [],

    // set the range of categories
    ranges: {
        min: 0,
        max: 1
    },

    // "negative impact", where the highest value is worse
    negativeImpact: [],

    // set the deafult weights
    defaultWeights: {},

    // input datas
    inputDatas: []
};

/*!
 * The genetic algorithm in pure JS.
 */

// Véletlenszerű súlyozás generálása a default súlyok körül
function generateWeights() {
    let weights = {};
    geneticAlgorithmConfig.categories.forEach(category => {
        let baseWeight = geneticAlgorithmConfig.defaultWeights[category] || 0;
        weights[category] = Math.max(-1, Math.min(1, baseWeight + (Math.random() - 0.5) * 0.2));
    });
    return weights;
};

// fitness 
function fitness(item, weights) {
    return geneticAlgorithmConfig.categories.reduce((score, category) => {
        let value = item[category] ?? 0; // if item[category] is undefined, then 0
        if (geneticAlgorithmConfig.negativeImpact.includes(category)) {
            value = geneticAlgorithmConfig.ranges.max - value; // negative effect
        }
        return score + value * (weights[category] ?? 0); // if isn't weight, then 0
    }, 0);
};

// generate population
function generatePopulation(size) {
    return Array.from({ length: size }, (_, i) => geneticAlgorithmConfig.inputDatas[i]);
};

// generate weight-population
function generateWeightPopulation(size) {
    return Array.from({ length: size }, generateWeights);
};

// selection: choice the best item
function selection(population, weights, eliteCount) {
    return population.sort((a, b) => fitness(b, weights) - fitness(a, weights)).slice(0, eliteCount);
};

// crossover: a new element from two
function crossover(parent1, parent2) {
    let child = { id: parent1.id };
    geneticAlgorithmConfig.categories.forEach(category => {
        child[category] = (parent1[category] + parent2[category]) / 2;
    });
    return child;
};

// mutation: random modification (little)
function mutate(item, mutationRate) {
    let mutatedItem = Object.assign({}, item); // copied item
    if (Math.random() < mutationRate) {
        geneticAlgorithmConfig.categories.forEach(category => {
            mutatedItem[category] = Math.max(
                geneticAlgorithmConfig.ranges.min,
                Math.min(geneticAlgorithmConfig.ranges.max, mutatedItem[category] + (Math.random() - 0.5))
            );
        });
    }
    return mutatedItem;
};

// main function
// generations, populationSize, customWeights, eliteRate, mutationRate, earlyStopThreshold, earlyStopPatience 
function geneticAlgorithm(setup) {

    // error handling
    if (
        (setup.generations === undefined || setup.generations < 2) ||
        (setup.populationSize === undefined || setup.populationSize < 2)
    )
        return false;

    // default values (ES5 compatibility)
    setup.eliteRate = setup.eliteRate === undefined ? 0.1 : setup.eliteRate;
    setup.mutationRate = setup.mutationRate === undefined ? 0.1 : setup.mutationRate;
    setup.earlyStopThreshold = setup.earlyStopThreshold === undefined ? 0.001 : setup.earlyStopThreshold;
    setup.earlyStopPatiente = setup.earlyStopPatiente === undefined ? 10 : setup.earlyStopPatiente;

    // values
    let population = generatePopulation(setup.populationSize);
    let weightPopulation = setup.customWeights ? [setup.customWeights] : generateWeightPopulation(10);
    let eliteCount = Math.max(1, Math.floor(setup.populationSize * setup.eliteRate));
    let bestFitness = -Infinity;
    let noImprovementCount = 0;
    let i;
	
	console.log("stop");
	console.log(weightPopulation);

    for (i = 0; i < setup.generations; i++) {
        let selected = selection(population, weightPopulation[0], eliteCount);
        let newPopulation = [...selected];

        while (newPopulation.length < setup.populationSize) {
            let parent1 = selected[Math.floor(Math.random() * selected.length)];
            let parent2 = selected[Math.floor(Math.random() * selected.length)];
            let child = crossover(parent1, parent2);
            newPopulation.push(mutate(child, setup.mutationRate));
        }

        population = newPopulation;
        let currentBestFitness = fitness(selection(population, weightPopulation[0], 1)[0], weightPopulation[0]);

        if (Math.abs(currentBestFitness - bestFitness) < setup.earlyStopThreshold) {
            noImprovementCount++;
            if (noImprovementCount >= setup.earlyStopPatiente) {
                console.log("Early stopping triggered at generation", i);
                break;
            }
        } else {
            noImprovementCount = 0;
            bestFitness = currentBestFitness;
        }
    }

    return { bestItem: selection(population, weightPopulation[0], 1)[0], bestWeights: weightPopulation[0], generation: i };
}

/*!
 *  Make the result.
 */

// setup for geneticAlgorithm()    
/*const setup = {
     generations: 500,
     populationSize: geneticAlgorithmConfig.inputDatas.length,
     customWeights: null,
     eliteRate: 0.1,
     mutationRate: 0.05, 
     earlyStopThreshold: 0.01,
     earlyStopPatiente: 10,
};*/

// calc
//const result = geneticAlgorithm(setup);

/*
// output
const generationValue = result.generation;
const selectedItemId = result.bestItem.id;
const selectedItemDatas = geneticAlgorithmConfig.inputDatas[selectedItemId - 1];
const optimizedWeights = result.bestWeights;
const fitnessValue = fitness(result.bestItem, result.bestWeights)

// console output
console.log("The value of generation", generationValue);
console.log("The ID of the best Item:", selectedItemId);
console.log("The datas of the best Item", selectedItemDatas);
console.log("Optimized weights", optimizedWeights);
console.log("Fitness value", fitnessValue);
*/