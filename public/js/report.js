// Get the chart container
const container = document.querySelector('.chart');
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.alignItems = 'center';
container.style.width = '100%';
container.style.height = '100%';

// Define the Levels enum
const Levels = {
    excellent: "Excellent",
    good: "Good",
    pass: "Pass",
    fail: "Fail"
};

// Function to assign level based on score
function assignLevel(score) {
    if (score >= 8) {
        return Levels.excellent;
    } else if (score >= 6 && score < 8) {
        return Levels.good;
    } else if (score >= 4 && score < 6) {
        return Levels.pass;
    } else {
        return Levels.fail;
    }
}

// Set up colors for different levels
const levelColors = {
    [Levels.excellent]: '#4CAF50', // Green
    [Levels.good]: '#2196F3',      // Blue
    [Levels.pass]: '#FFC107',      // Yellow/Amber
    [Levels.fail]: '#F44336'       // Red
};

// Create chart elements
function createChartElements() {
    // Create legend
    const legend = document.createElement('div');
    legend.style.marginBottom = '10px';
    legend.style.fontSize = '0.85rem';
    legend.style.display = 'flex';
    legend.style.flexWrap = 'wrap';
    legend.style.justifyContent = 'center';
    legend.style.width = '100%';

    // Create legend items
    Object.entries(Levels).forEach(([key, value]) => {
        const item = document.createElement('div');
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.style.marginRight = '12px';
        item.style.marginBottom = '4px';

        const colorBox = document.createElement('div');
        colorBox.style.width = '12px';
        colorBox.style.height = '12px';
        colorBox.style.backgroundColor = levelColors[value];
        colorBox.style.marginRight = '4px';

        const label = document.createElement('span');
        label.textContent = value;

        item.appendChild(colorBox);
        item.appendChild(label);
        legend.appendChild(item);
    });

    // Create charts container
    const chartsContainer = document.createElement('div');
    chartsContainer.style.display = 'flex';
    chartsContainer.style.width = '100%';
    chartsContainer.style.height = 'calc(100% - 30px)';

    // Create canvases
    const barChartDiv = document.createElement('div');
    barChartDiv.style.flex = '1';
    barChartDiv.style.height = '100%';
    barChartDiv.style.paddingRight = '10px';

    const barCanvas = document.createElement('canvas');
    barCanvas.id = 'barChart';
    barChartDiv.appendChild(barCanvas);

    const pieChartDiv = document.createElement('div');
    pieChartDiv.style.flex = '1';
    pieChartDiv.style.height = '100%';
    pieChartDiv.style.paddingLeft = '10px';

    const pieCanvas = document.createElement('canvas');
    pieCanvas.id = 'pieChart';
    pieChartDiv.appendChild(pieCanvas);

    chartsContainer.appendChild(barChartDiv);
    chartsContainer.appendChild(pieChartDiv);

    container.appendChild(legend);
    container.appendChild(chartsContainer);

    return { barCanvas, pieCanvas };
}

// Create charts
function createCharts(scores) {
    // Process scores
    const processedScores = scores.map(item => ({
        score: item.score,
        type: item.type || assignLevel(item.score)
    }));

    // Calculate counts by level
    const levelCounts = {
        [Levels.excellent]: 0,
        [Levels.good]: 0,
        [Levels.pass]: 0,
        [Levels.fail]: 0
    };

    processedScores.forEach(item => {
        levelCounts[item.type]++;
    });

    // Create chart elements
    const { barCanvas, pieCanvas } = createChartElements();

    // Create bar chart
    new Chart(barCanvas, {
        type: 'bar',
        data: {
            labels: Object.values(Levels),
            datasets: [{
                label: 'Students',
                data: Object.values(levelCounts),
                backgroundColor: Object.values(Levels).map(level => levelColors[level]),
                borderColor: Object.values(Levels).map(level => levelColors[level]),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Score Distribution'
                }
            }
        }
    });

    // Create pie chart
    new Chart(pieCanvas, {
        type: 'pie',
        data: {
            labels: Object.values(Levels),
            datasets: [{
                data: Object.values(levelCounts),
                backgroundColor: Object.values(Levels).map(level => levelColors[level]),
                borderColor: '#ffffff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        padding: 10
                    }
                },
                title: {
                    display: true,
                    text: 'Percentage Distribution'
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

const scores = JSON.parse(container.getAttribute('scores'))
// Initialize charts when the page is loaded
document.addEventListener('DOMContentLoaded', function () {
    if (scores.length > 0) {
        createCharts(scores);
    }
});