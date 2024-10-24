document.getElementById('fetch-data').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:5000/api/traffic');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        document.getElementById('traffic-data').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error fetching traffic data:', error);
        document.getElementById('traffic-data').textContent = 'Error fetching data.';
    }
});
