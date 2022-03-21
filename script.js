/**
 * @author Peter Nordby <peter-sn@hotmail.no>
 * Med litt inspirasjon fra https://www.geeksforgeeks.org/selection-sort-visualizer-in-javascript/
 */

const charts = document.getElementById("chart");
let numBars = document.getElementById("bars").value


generate = (bars = numBars) => {
    for (let i = 0; i < bars; i++) {
        let value = Math.floor(Math.random() * 100) + 1;
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`;
        let w = document.getElementById('chart').offsetWidth;
        bar.style.width = `${Math.floor(w / bars) - 1}px`;
        bar.style.transform = `translateX(${i * (Math.floor(w / bars))}px)`;
        const barLabel = document.createElement("label");  
        barLabel.classList.add("bar_id");
        barLabel.innerHTML = value;      
        bar.appendChild(barLabel);
        charts.appendChild(bar);
    }
};

selectionSort = async () => {
    document.getElementById("sort").disabled = true;
    let bars = document.querySelectorAll(".bar");
    let min_idx = 0;
    
    for (let i = 0; i < bars.length; i++) {
        
        min_idx = i;
        bars[i].style.backgroundColor = 'grey';
        
        for (let j = i+1; j < bars.length; j++) {
            bars[j].style.backgroundColor = 'red';
            
            let speed = parseInt(document.getElementById("speed").value);
            let delay = 400 - speed * 4;
            await new Promise(r => setTimeout(r, delay));
            
            let val1 = parseInt(bars[j].childNodes[0].innerHTML);
            let val2 = parseInt(bars[min_idx].childNodes[0].innerHTML);
            
            if (val1 < val2) {
                bars[j].style.backgroundColor = 'skyblue';
                if (min_idx !== i) {
                    bars[min_idx].style.backgroundColor = 'black';
                }
                min_idx = j;
            } else {
                bars[j].style.backgroundColor = 'black';
            }
        }
        
        let tempHeight = bars[min_idx].style.height;
        let tempValue = bars[min_idx].childNodes[0].innerText;
        bars[min_idx].style.height = bars[i].style.height;
        bars[i].style.height = tempHeight;
        bars[min_idx].childNodes[0].innerText = bars[i].childNodes[0].innerText;
        bars[i].childNodes[0].innerText = tempValue;
                
        bars[min_idx].style.backgroundColor = 'black';
        bars[i].style.backgroundColor = 'chartreuse';
    }
}

bubbleSort = async () => {
    document.getElementById("sort").disabled = true;
    let bars = document.querySelectorAll(".bar");
    
    for (let i = 0; i < bars.length; i++) {        
        for (let j = 0; j < bars.length - i - 1; j++) {
            
            bars[j].style.backgroundColor = 'grey';
            
            let val1 = parseInt(bars[j].childNodes[0].innerHTML);
            let val2 = parseInt(bars[j + 1].childNodes[0].innerHTML);
            
            let speed = parseInt(document.getElementById("speed").value);
            let delay = 400 - speed * 4;
            await new Promise(r => setTimeout(r, delay));
            
            if (val1 > val2) {
                let tempHeight = bars[j + 1].style.height;
                let tempValue = bars[j + 1].childNodes[0].innerText;
                bars[j + 1].style.height = bars[j].style.height;
                bars[j].style.height = tempHeight;
                if ((j + 1) !== bars.length - i - 1) {
                    bars[j+1].style.backgroundColor = 'grey'
                }
                bars[j].style.backgroundColor = 'black'
                bars[j + 1].childNodes[0].innerText = bars[j].childNodes[0].innerText;
                bars[j].childNodes[0].innerText = tempValue;
            }
            

            bars[j].style.backgroundColor = 'black';
        }
    }

    for (let i = 0; i < bars.length; i++) {
        let speed = parseInt(document.getElementById("speed").value);
        let delay = 100 - speed;
        await new Promise(r => setTimeout(r, delay));
        bars[i].style.backgroundColor = 'chartreuse'
    }

}

sort = () => {
    let algo = document.getElementById("algos").value;
    switch (algo) {
        case "selection":
            selectionSort();
            break;
        
        case "bubble":
            bubbleSort();
            break;
    
        default:
            console.log("Not yet implemented...")
            break;
    }
}

generate();

setNumBars = () => {
    while (document.getElementById("chart").firstChild) {
        document.getElementById("chart").removeChild(document.getElementById("chart").firstChild);
    }
    let numBars = document.getElementById("bars").value;
    generate(numBars);
    document.getElementById("sort").disabled = false;
}