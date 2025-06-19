// class setup
class bar {
    constructor(val, e, pos, width) {
        this.val = val,
            this.e = e,
            this.pos = pos,
            this.width = width;
    }
}

// initialize to start:
setup('original', 'sort');

function setup(originalid, sortedid) {
    let amt = document.getElementById('sortamt').value;

    // setup arrays
    let original = document.getElementById(originalid);
    let sorted = document.getElementById(sortedid);

    let oArray = [];
    for (let x = 0; x < amt; x++) {
        oArray.push(Math.floor(Math.random() * 100));
    }

    original.innerText = oArray.toString();

    // setup graph
    let graph = document.getElementById('sortgraph');
    let initArr = document.getElementById(originalid).innerHTML.split(',');

    draw(graph, initArr);
}

async function sort(originalid, sortedid, sortt) {
    let graph = document.getElementById('sortgraph');
    let sortElement = document.getElementById(sortt);
    let sorttypevalue = sortElement.options[sortElement.selectedIndex].value;
    let sorted = document.getElementById(sortedid);
    let initArr = document.getElementById(originalid).innerHTML.split(',');

    for (let i = 0; i < initArr.length; i++) {
        initArr[i] = parseInt(initArr[i]);
    }

    // array to sort
    let arr = initArr;

    if (sorttypevalue == 'Bubble Sort') {
        console.log('Bubble Sort: ');

        let n = arr.length;

        // loop through all indicies of array
        for (let i = 0; i < n; i++) {

            // for efficiency, create a flag to check if 
            // the values get swapped
            let swapped = false;

            // loop through all array indicies
            // with the value of the array length, minus the current
            // index to go through all indicies again
            for (let j = 0; j < n - i; j++) {

                // if the current index is creater than the next,
                // swap their values and mark swapped = true
                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;

                    await sleep(10);
                    draw(graph, arr);
                    showChanges(sorted, arr);
                }
            }

            // exit the loop if there was no swap and we can skip 
            // checking the others
            if (!swapped) {
                break;
            }
        }
    } else if (sorttypevalue == 'Selection Sort') {
        let n = arr.length;

        // loop through all indicies
        for (let i = 0; i < n; i++) {

            // set the to the first value we see.
            // we will replace this if we see a lower one
            let minIndex = i;

            // loop again through the indicies
            // but start the loop one ahead of i+1, to check
            // only values ahead of the ones we've already gone through
            for (let j = i + 1; j < n; j++) {

                // set the new min index to j if its less 
                // than our current min index
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }

            // hold the value of the min index temporarily
            let minValue = arr[minIndex];

            // swap down all element of the array
            // one to fit the changing positions
            for (let k = minIndex; k > i; k--) {
                arr[k] = arr[k - 1]

                await sleep(10);
                draw(graph, arr);
                showChanges(sorted, arr);
            }

            // move the min value to the current index being 
            // looped on
            arr[i] = minValue;
        }

        await sleep(10);
        draw(graph, arr);
        showChanges(sorted, arr);
    }

    // output
    console.log('Original: ' + initArr);
    console.log('Sorted: ' + arr);
    draw(graph, arr);
    showChanges(sorted, arr);
}

function showChanges(e, arr) {
    e.innerHTML = arr;
}

function setSelected(e) {
    e.classList.add('isActive');
}

function removeSelected(e) {
    e.classList.remove('isActive');
}

// for visualization
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function draw(graph, arr) {
    // remove old bars
    let deletebars = document.querySelectorAll('.bar');
    for (let b = 0; b < deletebars.length; b++) {
        if (typeof deletebars[b] !== 'object') continue;
        console.log(deletebars);
        deletebars[b].remove();
    }

    // create a bar for each
    for (let b = 0; b < arr.length; b++) {
        let div = document.createElement('div');
        let newBar = new bar(arr[b], div, b, (graph.clientWidth / arr.length));

        newBar.e.style.height = newBar.val + 'px';
        newBar.e.style.width = newBar.width + 'px';
        newBar.e.style.left = (newBar.width * newBar.pos) + 'px';
        newBar.e.classList.add('bar');
        console.log(newBar.e);
        graph.appendChild(newBar.e);
    }
}