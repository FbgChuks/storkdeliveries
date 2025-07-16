document.getElementById('quoteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const transportMode = document.getElementById('transportMode').value;
    const cargoType = document.getElementById('cargoType').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    
    // Calculate base rate (simplified example)
    let baseRate = 0;
    
    if (transportMode === 'ocean') {
        baseRate = weight * 0.5 + (length * width * height) / 5000;
    } else if (transportMode === 'air') {
        baseRate = weight * 2.5;
    } else if (transportMode === 'road') {
        baseRate = weight * 0.8 + (length * width * height) / 3000;
    } else if (transportMode === 'rail') {
        baseRate = weight * 0.6 + (length * width * height) / 4000;
    }
    
    // Adjust for cargo type
    if (cargoType === 'perishable') baseRate *= 1.3;
    if (cargoType === 'hazardous') baseRate *= 1.5;
    if (cargoType === 'oversized') baseRate *= 1.8;
    
    // Add additional services
    let additionalCost = 0;
    if (document.getElementById('insurance').checked) additionalCost += 50;
    if (document.getElementById('express').checked) additionalCost += baseRate * 0.2;
    if (document.getElementById('customs').checked) additionalCost += 100;
    
    const totalCost = baseRate + additionalCost;
    
    // Display results
    document.getElementById('quoteAmount').textContent = `$${totalCost.toFixed(2)}`;
    document.getElementById('quoteDetails').textContent = 
        `Base rate: $${baseRate.toFixed(2)} | Additional services: $${additionalCost.toFixed(2)}`;
    
    document.getElementById('quoteResult').classList.remove('hidden');
});