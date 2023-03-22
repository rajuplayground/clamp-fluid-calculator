const inputForm = document.getElementById('input-form')
const clampValWrapper = document.getElementById('clamp-vals')

inputForm.addEventListener('submit', (e) => {
    //prevent submit
    e.preventDefault();
    //get form data
    const formData = new FormData(e.target);

    //get values from form data
    const vwMin = parseInt(formData.get('vw-min'));
    const sizeMin = parseInt(formData.get('size-min'));
    const vwMax = parseInt(formData.get('vw-max'));
    const sizeMax = parseInt(formData.get('size-max'));

    // if using rem for sizeMin and sizeMax
    // convert to pixel and pass to calculate function

    const { min, preferredVW, preferredAdj, preferredOp, max } = calculateClampValueinPX(vwMin, sizeMin, vwMax, sizeMax);

    clampValWrapper.innerHTML = `<span>clamp(</span>${min / 16}rem, ${preferredVW}vw ${preferredOp} ${Math.abs((preferredAdj / 16).toFixed(1))}rem, ${max / 16} rem<span>)</span>`

})

function calculateClampValueinPX(vwMin, sizeMin, vwMax, sizeMax) {
    const slope = (sizeMax - sizeMin) / (vwMax - vwMin)
    const intercept = sizeMin - (slope * vwMin);

    const vwVal = (slope * 100);

    const preferredOp = intercept > 0 ? '+' : '-'

    const min = sizeMin; //in px
    const preferredVW = Math.abs(vwVal.toFixed(1)); // vw unit
    const preferredAdj = intercept // in px
    const max = sizeMax; //in px

    return { min, preferredVW, preferredAdj, preferredOp, max }
}
