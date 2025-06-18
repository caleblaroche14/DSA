// initialize to start:
setup(8,'original','sort');

function setup(amt,originalid,sortedid){
    let original = document.getElementById(originalid);
    let sorted = document.getElementById(sortedid);

    let oArray = [];
    for (let x = 0; x < amt; x++){
        oArray.push(Math.floor(Math.random() * 100));
    }

    original.innerText = oArray.toString();
}

async function sort(originalid,sortedid,sortt){
    let sortElement = document.getElementById(sortt);
    let sorttypevalue = sortElement.options[sortElement.selectedIndex].value;
    let sorted = document.getElementById(sortedid);
    let initArr = document.getElementById(originalid).innerHTML.split(',');

    // array to sort
    let arr = initArr;

    if (sorttypevalue == 'Bubble Sort'){
        console.log('Bubble Sort: ');

        let n = arr.length;
        for (let i = 0; i < n; i++){
            let swapped = false;
            for (let j = 0; j < n-i; j++){
                if (arr[j] > arr[j+1]){
                    let temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                    swapped = true;

                    await sleep(500);
                    showChanges(sorted,arr);
                }
            }

            if (!swapped){
                break;
            }
        }
    }

    // output
    console.log('Original: ' +initArr);
    console.log('Sorted: ' + arr);
    showChanges(sorted,arr);
}

function showChanges(e,arr){
    e.innerHTML = arr;
}

function setSelected(e){
    e.classList.add('isActive');
}

function removeSelected(e){
    e.classList.remove('isActive');
}

// for visualization
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}