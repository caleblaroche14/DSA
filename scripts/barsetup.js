
class bar {
    constructor({e, height, width, idx}) {
        this.e = e;
        this.height = height;
        this.width = width;
        this.idx = idx;
    }
}


function setup(barClass, amount, parent) {
    console.log('Setting up bars for ' + barClass);
    let parentDiv = document.getElementById(parent);
    var barArr = [];
    for (let a = 0; a < amount; a++){
        var div = document.createElement("div");
        div.classList.add('bar');
        div.classList.add(barClass);
        parentDiv.appendChild(div);
        barArr.push(div);
    }

    let tempBars = [];
    let i = 0;
    for (let b in barArr) {
        // only add bars that are HTML elements
        if (typeof barArr[b] !== 'object' || !barArr[b].classList) continue;
        tempBars.push(new bar({
            e: barArr[b],
            height: Math.floor(Math.random() * 160),
            width: parentDiv.clientWidth / amount,
            idx: i
       }));
        i++;
    };
    return tempBars;
}

function draw(bars){
    let displayArr = [];

    for (let i = 0; i < bars.length; i++) {
        let bar = bars[i];
        bar.e.style.height = bar.height + 'px';
        bar.e.style.width = bar.width + 'px';
        bar.e.style.bottom = '0px';
        bar.e.style.left = (bar.idx * bar.width) + 'px';
        displayArr.push(bar.height);
    }

    //console.log(displayArr);
}
