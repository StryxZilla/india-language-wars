// India Language Wars - Data Visualizations

// 538-style color palette
const colors = {
    primary: '#ed713a',
    secondary: '#3b5998',
    hindi: '#e74c3c',
    dravidian: '#3498db',
    otherIndo: '#2ecc71',
    tibeto: '#9b59b6',
    neutral: '#95a5a6',
    grid: '#e5e5e5'
};

// Chart.js default configuration
Chart.defaults.font.family = "'Libre Franklin', -apple-system, sans-serif";
Chart.defaults.color = '#666';

// ============================================
// 1. Language Demographics Bar Chart
// ============================================

const languageData = {
    labels: [
        'Hindi*', 'Bengali', 'Marathi', 'Telugu', 'Tamil', 
        'Gujarati', 'Urdu', 'Kannada', 'Odia', 'Malayalam',
        'Punjabi', 'Assamese', 'Maithili'
    ],
    speakers: [528.3, 97.2, 83.0, 81.1, 69.0, 55.5, 50.8, 43.7, 37.5, 34.8, 33.1, 15.3, 13.6],
    percentage: [43.6, 8.0, 6.9, 6.7, 5.7, 4.6, 4.2, 3.6, 3.1, 2.9, 2.7, 1.3, 1.1],
    family: ['indo-aryan', 'indo-aryan', 'indo-aryan', 'dravidian', 'dravidian', 
             'indo-aryan', 'indo-aryan', 'dravidian', 'indo-aryan', 'dravidian',
             'indo-aryan', 'indo-aryan', 'indo-aryan']
};

const languageCtx = document.getElementById('languageChart').getContext('2d');
new Chart(languageCtx, {
    type: 'bar',
    data: {
        labels: languageData.labels,
        datasets: [{
            label: 'Native Speakers (millions)',
            data: languageData.speakers,
            backgroundColor: languageData.family.map(f => 
                f === 'dravidian' ? colors.dravidian : colors.hindi
            ),
            borderWidth: 0,
            borderRadius: 2
        }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const idx = context.dataIndex;
                        return `${context.raw}M speakers (${languageData.percentage[idx]}%)`;
                    }
                }
            },
            annotation: {
                annotations: {
                    majorityLine: {
                        type: 'line',
                        xMin: 605,
                        xMax: 605,
                        borderColor: '#999',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        label: {
                            display: true,
                            content: '50% threshold',
                            position: 'start',
                            backgroundColor: 'transparent',
                            color: '#666',
                            font: { size: 11 }
                        }
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: colors.grid
                },
                title: {
                    display: true,
                    text: 'Native Speakers (millions)',
                    font: { size: 12 }
                },
                max: 600
            },
            y: {
                grid: {
                    display: false
                }
            }
        }
    }
});

// ============================================
// 2. Power Distribution Chart
// ============================================

const powerData = {
    regions: ['Hindi Belt', 'South India', 'East India', 'West India', 'North-East', 'Other'],
    lokSabhaSeats: [225, 129, 84, 70, 25, 10],
    population: [410, 250, 145, 125, 45, 35]
};

const powerCtx = document.getElementById('powerChart').getContext('2d');
new Chart(powerCtx, {
    type: 'bar',
    data: {
        labels: powerData.regions,
        datasets: [
            {
                label: 'Lok Sabha Seats',
                data: powerData.lokSabhaSeats,
                backgroundColor: colors.primary,
                borderRadius: 2
            },
            {
                label: 'Population (millions)',
                data: powerData.population,
                backgroundColor: colors.secondary,
                borderRadius: 2
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                align: 'start',
                labels: {
                    boxWidth: 12,
                    padding: 20
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    color: colors.grid
                },
                title: {
                    display: true,
                    text: 'Count',
                    font: { size: 12 }
                }
            }
        }
    }
});

// ============================================
// 3. Bilingualism Chart
// ============================================

const bilingualData = {
    languages: ['Hindi', 'English', 'Bengali', 'Telugu', 'Marathi', 'Tamil'],
    native: [43.6, 0.02, 8.0, 6.7, 6.9, 5.7],
    total: [57.1, 10.6, 8.9, 7.8, 8.2, 6.3]
};

const bilingualCtx = document.getElementById('bilingualChart').getContext('2d');
new Chart(bilingualCtx, {
    type: 'bar',
    data: {
        labels: bilingualData.languages,
        datasets: [
            {
                label: 'Native Speakers %',
                data: bilingualData.native,
                backgroundColor: colors.primary,
                borderRadius: 2
            },
            {
                label: 'Total Speakers % (1st, 2nd, or 3rd language)',
                data: bilingualData.total,
                backgroundColor: colors.secondary,
                borderRadius: 2
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                align: 'start',
                labels: {
                    boxWidth: 12,
                    padding: 16,
                    font: { size: 11 }
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.raw}%`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    color: colors.grid
                },
                title: {
                    display: true,
                    text: 'Percentage of Population',
                    font: { size: 12 }
                },
                max: 60
            }
        }
    }
});

// ============================================
// 4. Interactive India Map (Simplified SVG)
// ============================================

const stateData = [
    // Hindi Belt (Red)
    { id: 'UP', name: 'Uttar Pradesh', x: 430, y: 190, family: 'hindi-belt', lang: 'Hindi' },
    { id: 'MP', name: 'Madhya Pradesh', x: 380, y: 260, family: 'hindi-belt', lang: 'Hindi' },
    { id: 'RJ', name: 'Rajasthan', x: 300, y: 190, family: 'hindi-belt', lang: 'Hindi' },
    { id: 'BR', name: 'Bihar', x: 500, y: 200, family: 'hindi-belt', lang: 'Hindi' },
    { id: 'JH', name: 'Jharkhand', x: 500, y: 240, family: 'hindi-belt', lang: 'Hindi' },
    { id: 'CG', name: 'Chhattisgarh', x: 430, y: 300, family: 'hindi-belt', lang: 'Hindi' },
    { id: 'UK', name: 'Uttarakhand', x: 400, y: 140, family: 'hindi-belt', lang: 'Hindi' },
    { id: 'HP', name: 'Himachal Pradesh', x: 355, y: 120, family: 'hindi-belt', lang: 'Hindi' },
    { id: 'HR', name: 'Haryana', x: 330, y: 160, family: 'hindi-belt', lang: 'Hindi' },
    { id: 'DL', name: 'Delhi', x: 355, y: 170, family: 'hindi-belt', lang: 'Hindi' },
    
    // Dravidian Languages (Blue)
    { id: 'TN', name: 'Tamil Nadu', x: 385, y: 450, family: 'dravidian', lang: 'Tamil' },
    { id: 'AP', name: 'Andhra Pradesh', x: 400, y: 370, family: 'dravidian', lang: 'Telugu' },
    { id: 'TS', name: 'Telangana', x: 380, y: 330, family: 'dravidian', lang: 'Telugu' },
    { id: 'KA', name: 'Karnataka', x: 330, y: 400, family: 'dravidian', lang: 'Kannada' },
    { id: 'KL', name: 'Kerala', x: 320, y: 470, family: 'dravidian', lang: 'Malayalam' },
    
    // Other Indo-Aryan (Green)
    { id: 'WB', name: 'West Bengal', x: 550, y: 250, family: 'other-indo', lang: 'Bengali' },
    { id: 'OD', name: 'Odisha', x: 480, y: 300, family: 'other-indo', lang: 'Odia' },
    { id: 'MH', name: 'Maharashtra', x: 320, y: 320, family: 'other-indo', lang: 'Marathi' },
    { id: 'GJ', name: 'Gujarat', x: 240, y: 270, family: 'other-indo', lang: 'Gujarati' },
    { id: 'PB', name: 'Punjab', x: 310, y: 135, family: 'other-indo', lang: 'Punjabi' },
    { id: 'GA', name: 'Goa', x: 280, y: 380, family: 'other-indo', lang: 'Konkani' },
    { id: 'AS', name: 'Assam', x: 610, y: 200, family: 'other-indo', lang: 'Assamese' },
    
    // Tibeto-Burman (Purple)
    { id: 'SK', name: 'Sikkim', x: 560, y: 190, family: 'tibeto', lang: 'Nepali' },
    { id: 'AR', name: 'Arunachal Pradesh', x: 640, y: 175, family: 'tibeto', lang: 'Various' },
    { id: 'NL', name: 'Nagaland', x: 645, y: 210, family: 'tibeto', lang: 'Various' },
    { id: 'MN', name: 'Manipur', x: 645, y: 235, family: 'tibeto', lang: 'Meitei' },
    { id: 'MZ', name: 'Mizoram', x: 630, y: 265, family: 'tibeto', lang: 'Mizo' },
    { id: 'TR', name: 'Tripura', x: 600, y: 260, family: 'tibeto', lang: 'Bengali' },
    { id: 'ML', name: 'Meghalaya', x: 590, y: 220, family: 'tibeto', lang: 'Khasi' },
    { id: 'JK', name: 'Jammu & Kashmir', x: 290, y: 90, family: 'other-indo', lang: 'Kashmiri/Urdu' },
    { id: 'LD', name: 'Ladakh', x: 340, y: 60, family: 'tibeto', lang: 'Tibetan' }
];

function createMap() {
    const container = document.getElementById('indiaMap');
    const width = container.offsetWidth;
    const height = 400;
    
    // Simplified approach: Create a schematic/bubble map representation
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '200 40 500 480');
    svg.setAttribute('class', 'india-svg');
    svg.style.width = '100%';
    svg.style.height = '100%';
    
    // Background shape for India outline (simplified)
    const outline = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    outline.setAttribute('d', 'M280,80 L320,60 L380,70 L420,90 L450,100 L500,120 L550,150 L600,160 L660,170 L680,190 L680,240 L660,280 L630,290 L600,280 L570,270 L540,280 L510,320 L490,340 L470,370 L450,400 L420,450 L400,490 L380,510 L350,490 L320,470 L290,440 L260,400 L240,350 L220,300 L210,260 L220,220 L240,180 L260,140 L280,100 Z');
    outline.setAttribute('fill', '#e8e8e8');
    outline.setAttribute('stroke', '#ccc');
    outline.setAttribute('stroke-width', '2');
    svg.appendChild(outline);
    
    // Color mapping
    const familyColors = {
        'hindi-belt': colors.hindi,
        'dravidian': colors.dravidian,
        'other-indo': colors.otherIndo,
        'tibeto': colors.tibeto
    };
    
    // Create state circles
    stateData.forEach(state => {
        // Circle for the state
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', state.x);
        circle.setAttribute('cy', state.y);
        circle.setAttribute('r', '18');
        circle.setAttribute('fill', familyColors[state.family]);
        circle.setAttribute('stroke', '#fff');
        circle.setAttribute('stroke-width', '2');
        circle.setAttribute('class', 'state-circle');
        circle.style.cursor = 'pointer';
        circle.style.transition = 'all 0.2s';
        
        // Hover effect
        circle.addEventListener('mouseenter', function() {
            this.setAttribute('r', '22');
            this.style.filter = 'brightness(1.1)';
        });
        circle.addEventListener('mouseleave', function() {
            this.setAttribute('r', '18');
            this.style.filter = 'none';
        });
        
        // Tooltip
        const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        title.textContent = `${state.name}\nLanguage: ${state.lang}`;
        circle.appendChild(title);
        
        svg.appendChild(circle);
        
        // State label
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', state.x);
        label.setAttribute('y', state.y + 4);
        label.setAttribute('class', 'state-label');
        label.textContent = state.id;
        svg.appendChild(label);
    });
    
    container.appendChild(svg);
}

// Initialize map when DOM is ready
document.addEventListener('DOMContentLoaded', createMap);

// ============================================
// 5. Timeline Animation
// ============================================

function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}

document.addEventListener('DOMContentLoaded', animateTimeline);

// ============================================
// 6. Smooth Scroll & Progress Indicator
// ============================================

// Add reading progress bar
function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, ${colors.primary}, ${colors.secondary});
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

document.addEventListener('DOMContentLoaded', createProgressBar);

// Console message for developers
console.log('%c📊 India Language Wars Visualization', 'font-size: 20px; font-weight: bold; color: #ed713a;');
console.log('%cData sources: Census of India 2011, Constitution of India', 'color: #666;');
console.log('%cBuilt with Chart.js and vanilla JavaScript', 'color: #666;');
