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

selectionSort = async (delay) => {
    document.getElementById("sort").disabled = true;
    let bars = document.querySelectorAll(".bar");
    let min_idx = 0;
    
    for (let i = 0; i < bars.length; i++) {
        
        min_idx = i;
        bars[i].style.backgroundColor = 'grey';
        
        for (let j = i+1; j < bars.length; j++) {
            bars[j].style.backgroundColor = 'red';
            
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

sort = () => {
    let algo = document.getElementById("algos").value;
    let speed = parseInt(document.getElementById("speed").value);
    let delay = 400 - speed * 4;
    switch (algo) {
        case "selection":
            selectionSort(delay);
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