
    // Create Human Object
    const humanObj = {
        "Dinos": [
            {
                "species": "Triceratops",
                "weight": 13000,
                "height": 114,
                "diet": "herbavor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "First discovered in 1889 by Othniel Charles Marsh"
            },
            {
                "species": "Tyrannosaurus Rex",
                "weight": 11905,
                "height": 144,
                "diet": "carnivor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "The largest known skull measures in at 5 feet long."
            },
            {
                "species": "Anklyosaurus",
                "weight": 10500,
                "height": 55,
                "diet": "herbavor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "Anklyosaurus survived for approximately 135 million years."
            },
            {
                "species": "Brachiosaurus",
                "weight": 70000,
                "height": "372",
                "diet": "herbavor",
                "where": "North America",
                "when": "Late Jurasic",
                "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
            },
            {
                "species": "Stegosaurus",
                "weight": 11600,
                "height": 79,
                "diet": "herbavor",
                "where": "North America, Europe, Asia",
                "when": "Late Jurasic to Early Cretaceous",
                "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
            },
            {
                "species": "Elasmosaurus",
                "weight": 16000,
                "height": 59,
                "diet": "carnivor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
            },
            {
                "species": "Pteranodon",
                "weight": 44,
                "height": 20,
                "diet": "carnivor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
            },
            {
                "species": "Pigeon",
                "weight": 0.5,
                "height": 9,
                "diet": "herbavor",
                "where": "World Wide",
                "when": "Holocene",
                "fact": "All birds are living dinosaurs."
            }
        ]
    };
    //console.log("Human Data : "+JSON.stringify(humanObj));

    // Create Dino Objects
    function setDinoArray(){
        const dinoArray = [];
        humanObj.Dinos.forEach(Dinos => {
            dinoArray.push(new dinoContructor(Dinos));
        });
        let dinoArrayMiddle = (dinoArray.length)/2;
        dinoArray.splice(dinoArrayMiddle, 0, 'Human');
        return dinoArray;
    }

    // Create Dino Constructor
    function dinoContructor(Dinos){
        this.species = Dinos.species;
        this.diet = Dinos.diet;
        this.where = Dinos.where;
        this.when = Dinos.when;
        this.fact = Dinos.fact;
        this.weight = Dinos.weight;
        this.height = Dinos.height;
    }

    // Use IIFE to get human data from form
    function clickEvent(e){
        e.preventDefault();
        var diet = document.getElementById('diet');
        var name = document.getElementById('name');
        var heightInInches = document.getElementById('feet');
        var totalHeight = (heightInInches.value*12)+document.getElementById('inches').value;
        var weight = document.getElementById('weight');
        const formData = {
            diet : diet.value,
            name : name.value,
            height : totalHeight,
            weight : weight.value
        }
        console.log("formData: "+JSON.stringify(formData));
        if(name.validity.valueMissing || (name.value)===""){
            console.log("Enter correct Name");
            name.setCustomValidity("Enter correct Name");
            name.reportValidity();
            return;
        } else if(totalHeight<1){
            console.log("Enter correct height");
            heightInInches.setCustomValidity("Enter correct height");
            heightInInches.reportValidity();
            return;
        } else if(weight.value<1){
            console.log("Enter correct weight");
            weight.setCustomValidity("Enter correct weight");
            weight.reportValidity();
            return;
        }
        const dinoArray = setDinoArray();
        addTiles(dinoArray,formData);
    }



// Remove form from screen
// On button click, prepare and display infographic
    (function (){ 
        document.getElementById('btn').addEventListener('click',clickEvent);
    })();
   
    function randomNumGenerate(len){
        let num = Math.floor(Math.random()*(len-1));
        console.log("Random number generated is :"+num); 
        return num;
    }
    // Generate Tiles for each Dino in Array
    // Add tiles to DOM
    function addTiles(dinoArray,formData){
        document.querySelector('form').style.display='none';
        const len = dinoArray.length;
        const numEle = [];
        for(i=0;i<len;i++){
            if(i==4){
                const gridEle = document.getElementById('grid');
                const ele = document.createElement('div');
                ele.className = 'grid-item';
                ele.innerHTML = `<h3>${formData.name}</h3><img src="images/human.png" alt="image of human"><p>Height : ${formData.height}inches ; Weight : ${formData.weight}lbs</p>`;
                gridEle.appendChild(ele);
            }else if(dinoArray[i].species==='Pigeon'){
                const gridEle = document.getElementById('grid');
                const ele = document.createElement('div');
                ele.className = 'grid-item';
                ele.innerHTML = `<h3>${dinoArray[i].species}</h3><img src="images/${dinoArray[i].species.toLowerCase()}.png" alt="image of ${dinoArray[i].species}"><p>${dinoArray[i].fact}</p>`;
                gridEle.appendChild(ele);
            }else{
                const gridEle = document.getElementById('grid');
                const ele = document.createElement('div');
                ele.className = 'grid-item';
                const randomEle = function numElement(){      
                    num = randomNumGenerate(len);
                    var check = numEle.includes(num);
                    if(num!=4 &&  check===false){
                        numEle.push(num);
                        console.log(numEle);        
                    } else {num = numElement();}
                    return num;
                }();
                let fact;
                if(randomEle===3 || randomEle===1){
                     fact = function (){
                        let fact = compareWeight(dinoArray[randomEle],formData);
                        return fact;
                    }();
                } else if(randomEle===6){
                    fact = function (){
                        let fact = compareHeight(dinoArray[randomEle],formData);
                        return fact;
                    }();
                } else if(randomEle===7){
                    fact = function (){
                        let fact = compareLargestAnimal(dinoArray,formData);
                        return fact;
                    }();
                } else fact = dinoArray[randomEle].fact;
                let species = (dinoArray[randomEle].species).toLowerCase();
                console.log(species);
                ele.innerHTML = `<h3>${dinoArray[randomEle].species}</h3><img src="images/${species}.png" alt="image of ${dinoArray[randomEle].species}"><p>${fact}</p>`;
                gridEle.appendChild(ele);
            }
        }
    }

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches.
    function compareWeight(animal,Human){
        if(Human.weight>animal.weight){
            let diff = Human.weight-animal.weight;
            return `${animal.species} weighed ${diff} less than ${Human.name}`
        }
        else if(Human.weight<animal.weight){
            let diff = animal.weight-Human.weight;
            return `${animal.species} weighed ${diff} more than ${Human.name}`
        } else  return `${animal.species} weighed same as ${Human.name}`
    }

    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    function compareHeight(animal,Human){
        if(Human.height>animal.height){
            let diff = Human.height-animal.height;
            return `${animal.species} height is ${diff} shorter than ${Human.name}`
        }else if(Human.height<animal.weight){
            let diff = animal.height-Human.height;
            return `${animal.species} height is ${diff} larger than ${Human.name}`
        }
    }

    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    function compareLargestAnimal(animal,Human){
        let largest = animal[0].height;
        let max = 0;
        console.log("maximum"+largest);
        for (var i = 0; i < animal.length; i++) {
            if (largest < animal[i].height ) {
                largest = animal[i].height;
                max=i;
            }
        }
        return `${animal[max].species} is the largest of all`
    }