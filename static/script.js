const lengthSlider = document.getElementById('length-slider');
const lengthVal = document.getElementById('length-val');
const passwordDisplay = document.getElementById('password-display');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const strengthBadge = document.getElementById('strength-badge');
const entropyBadge = document.getElementById('entropy-badge');

// Update length display when slider moves
lengthSlider.addEventListener('input', (e) => {
    lengthVal.textContent = e.target.value;
});

// Fetch password and analytics from the Python backend
async function fetchPassword() {
    const length = lengthSlider.value;
    generateBtn.textContent = 'Generating...';
    generateBtn.disabled = true;

    try {
        const response = await fetch(`/api/generate?length=${length}`);
        const data = await response.json();

        if (response.ok) {
            passwordDisplay.value = data.password;
            entropyBadge.textContent = `Entropy: ${data.entropy} bits`;
            strengthBadge.textContent = `Strength: ${data.strength}`;
            
            // Color code the strength badge
            strengthBadge.className = 'badge'; // reset
            if (data.strength === "Strong") strengthBadge.classList.add('strong');
            else if (data.strength === "Moderate") strengthBadge.classList.add('moderate');
            else strengthBadge.classList.add('weak');
        } else {
            console.error('API Error:', data.detail);
        }
    } catch (error) {
        console.error('Network Error:', error);
    } finally {
        generateBtn.textContent = 'Generate Password';
        generateBtn.disabled = false;
    }
}

// Copy to clipboard functionality
copyBtn.addEventListener('click', () => {
    if (!passwordDisplay.value) return;
    
    navigator.clipboard.writeText(passwordDisplay.value).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.backgroundColor = '#10b981';
        copyBtn.style.color = 'white';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.backgroundColor = '';
            copyBtn.style.color = '';
        }, 2000);
    });
});

// Generate initial password on page load
generateBtn.addEventListener('click', fetchPassword);
fetchPassword();