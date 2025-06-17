document.getElementById('bubbleamt').value = 50;

function setupBubbleSort(go){
    let deletebars = document.querySelectorAll('.bubblesortbar');
    for (let b = 0; b < deletebars.length; b++){
        if (typeof deletebars[b] !== 'object') continue;
        console.log(deletebars);
        deletebars[b].remove();
    }

    var bubbleSortBars = [];
    bubbleSortBars = setup('bubblesortbar',document.getElementById('bubbleamt').value, 'bubblebarholder');
    draw(bubbleSortBars);

    if (go){
        bubbleSort(bubbleSortBars)
    }
}

async function bubbleSort(bars) {
    let n = bars.length;
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (bars[j].height > bars[j + 1].height) {
                bars[j].e.classList.add('isActive');
                bars[j+ 1].e.classList.add('isActive');
                let temp = bars[j].height;
                bars[j].height = bars[j + 1].height;
                bars[j + 1].height = temp;
                swapped = true;
            }

            draw(bars);
            await sleep(1);
            bars[j].e.classList.remove('isActive');
            bars[j+1].e.classList.remove('isActive');
        }

        if (!swapped) {
            break;
        }

    }
}

function startBubbleSort() {
    bubbleSort(bubbleSortBars);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}