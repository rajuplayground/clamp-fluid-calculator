const inputForm = document.getElementById('input-form')
const clampValWrapper = document.getElementById('clamp-vals')

inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const vwMin = parseInt(formData.get('vw-min'));
    const sizeMin = parseInt(formData.get('size-min'));
    const vwMax = parseInt(formData.get('vw-max'));
    const sizeMax = parseInt(formData.get('size-max'));

    const fluidVals = calculateClampValue(vwMin, sizeMin, vwMax, sizeMax);
    const { vwVal, constVal } = fluidVals
    const operatorSymbol = constVal > 0 ? '+' : '-'
    clampValWrapper.innerHTML = `<span>clamp(</span>${sizeMin / 16}rem, ${vwVal.toFixed(1)}vw ${operatorSymbol} ${Math.abs(constVal.toFixed(1))}rem , ${sizeMax / 16}rem<span>)</span>`

})

function calculateClampValue(vwMin, sizeMin, vwMax, sizeMax) {
    let vwVal = 0;
    let constVal = 0;
    const slope = (sizeMax - sizeMin) / (vwMax - vwMin)
    vwVal = slope * 100;
    constVal = (sizeMin - (slope * vwMin)) / 16
    return { vwVal, constVal }
}
