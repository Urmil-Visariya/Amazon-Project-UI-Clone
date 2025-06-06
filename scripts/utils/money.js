export function formatCurrency(priceCents){
    return (priceCents/100).toFixed(2)
}

export default formatCurrency;
//one file can have one export default only