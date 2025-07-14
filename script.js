// FAQ functionality
function toggleFAQ(index) {
    const faqAnswer = document.getElementById(`faq-${index}`);
    const faqQuestion = faqAnswer.previousElementSibling;
    const icon = faqQuestion.querySelector('i');

    if (faqAnswer.style.display === 'block') {
        faqAnswer.style.display = 'none';
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
    } else {
        faqAnswer.style.display = 'block';
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
    }
}

// Package tabs functionality
document.addEventListener('DOMContentLoaded', function() {
    // Package tab switching
    const packageTabs = document.querySelectorAll('.package-tab');
    packageTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const section = this.getAttribute('data-section');

            // Remove active class from all tabs
            packageTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            // Hide all content sections
            document.querySelectorAll('.package-tab-content').forEach(content => {
                content.classList.remove('active');
            });

            // Show selected content section
            document.getElementById(section).classList.add('active');
        });
    });

    // Pricing tab switching
    const pricingTabs = document.querySelectorAll('.pricing-tab-btn');
    pricingTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabType = this.getAttribute('data-tab');

            // Remove active class from all pricing tabs
            pricingTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            // Hide all price tabs
            document.querySelectorAll('.price-tab').forEach(price => {
                price.classList.remove('active');
            });

            // Show selected price tab
            document.getElementById(`${tabType}-price`).classList.add('active');
        });
    });

    // Populate itinerary
    populateItinerary();

    // Populate package details
    populatePackageDetails();

    // Create stars animation
    createStars();
});

// Itinerary data
const itineraryData = [
    {
        day: 0,
        title: "Delhi Departure",
        description: "We'll start our incredible journey from Delhi's Kashmiri Gate in the evening. Board our comfortable AC bus for an overnight journey to Shimla, the gateway to the mountains. Rest well as tomorrow we begin our adventure into the mystical Spiti Valley!",
        highlights: ["Evening departure from Kashmiri Gate", "Overnight journey to Shimla"],
        stay: "Overnight Bus"
    },
    {
        day: 1,
        title: "Shimla to Sangla",
        description: "Wake up to the fresh mountain air in Shimla! After a hearty breakfast, we'll begin our scenic drive to Sangla. The journey takes us through beautiful landscapes, winding roads, and stunning valleys. We'll stop at the famous Kinnaur Gate for photos and to soak in the mountain views. Arrive in Sangla by evening and check into our accommodation.",
        highlights: ["Breakfast in Shimla", "Scenic drive to Sangla", "Visit Kinnaur Gate"],
        stay: "Sangla"
    },
    {
        day: 2,
        title: "Sangla to Tabo via Khab & Nako",
        description: "Today we venture deeper into the Himalayas! First stop is Khab Sangam, where the Spiti and Sutlej rivers meet - a truly mesmerizing sight. Then we'll visit the charming Nako Village and explore the serene Nako Lake along with its ancient monastery. The journey continues to Tabo, where we'll spend the night in this historic town.",
        highlights: ["Visit Khab Sangam & Nako Village", "Explore Nako Lake & Monastery", "Overnight in Tabo"],
        stay: "Tabo"
    },
    {
        day: 3,
        title: "Tabo to Kaza via Dhankar",
        description: "Begin the day by exploring the famous Tabo Monastery, known as the 'Ajanta of the Himalayas' for its ancient murals and sculptures. Next, we'll visit the spectacular Dhankar Monastery, perched dramatically on a cliff. If time permits, we'll also visit the Pin Valley Wildlife Reserve, home to snow leopards and other rare Himalayan wildlife. End the day in Kaza, the heart of Spiti Valley.",
        highlights: ["Explore Tabo Monastery", "Visit Dhankar Monastery", "Discover Pin Valley Wildlife Reserve"],
        stay: "Kaza"
    },
    {
        day: 4,
        title: "Kaza Village Circuit",
        description: "Get ready for an epic day of exploration! We'll visit Hikkim, home to the world's highest post office - send a postcard from here! Then to Komic, one of the world's highest villages where you can experience life at extreme altitude. Next stop is Langza village with its giant Buddha statue overlooking the valley. Finally, we'll visit the iconic Key Monastery, a 1000-year-old architectural marvel. Return to Kaza for the night.",
        highlights: ["World's highest post office", "Highest village exploration", "Ancient Key Monastery visit"],
        stay: "Kaza"
    },
    {
        day: 5,
        title: "Kaza to Chandrataal via Chicham Bridge",
        description: "Adventure awaits as we cross the famous Chicham Bridge - Asia's highest bridge connecting two villages! The journey continues through the stunning Kunzum Pass (4,590m) with breathtaking views of the Spiti Valley. Our destination is the magical Chandrataal Lake, also known as Moon Lake. We'll set up camp here and spend the night under a blanket of stars - one of the most memorable experiences of the trip!",
        highlights: ["Cross Chicham Bridge", "Journey via Kunzum Pass", "Camping under starry skies"],
        stay: "Chandrataal (Camping)"
    },
    {
        day: 6,
        title: "Chandrataal to Manali",
        description: "Wake up to the serene beauty of Chandrataal Lake - the perfect moment for sunrise photos and peaceful reflection. After breakfast, we'll begin our scenic drive to Manali, descending from the high altitude desert to lush green valleys. Once in Manali, you can explore the famous Mall Road, shop for souvenirs, and enjoy the vibrant hill station atmosphere.",
        highlights: ["Serene morning by the lake", "Scenic drive to Manali", "Mall Road exploration"],
        stay: "Manali"
    },
    {
        day: 7,
        title: "Manali to Delhi",
        description: "Your last day in the mountains! Explore Manali at your own pace - visit the ancient Hadimba Devi Temple surrounded by cedar forests, wander through the hippie vibes of Old Manali, or simply relax and reflect on your incredible journey. In the evening, we'll board our bus back to Delhi, carrying memories that will last a lifetime!",
        highlights: ["Hadimba Devi Temple", "Old Manali streets", "Evening departure to Delhi"],
        stay: "Delhi"
    }
];

function populateItinerary() {
    const itineraryList = document.getElementById('itinerary-list');

    itineraryData.forEach(item => {
        const itineraryItem = document.createElement('div');
        itineraryItem.className = 'itinerary-item';

        itineraryItem.innerHTML = `
            <div class="itinerary-day">
                <div class="day-number">Day ${item.day}</div>
            </div>
            <div class="itinerary-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <ul class="itinerary-highlights">
                    ${item.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
                <div class="itinerary-stay">
                    <i class="fas fa-bed"></i>
                    <span>Stay: ${item.stay}</span>
                </div>
            </div>
        `;

        itineraryList.appendChild(itineraryItem);
    });
}

function populatePackageDetails() {
    // Inclusions
    const inclusions = [
        { icon: "fas fa-car", text: "AC Transport from Delhi to Delhi" },
        { icon: "fas fa-bed", text: "6 nights accommodation (hotels & camping)" },
        { icon: "fas fa-utensils", text: "12 meals (6 breakfast + 6 dinner)" },
        { icon: "fas fa-user-tie", text: "Experienced trip captain & local guides" },
        { icon: "fas fa-file-alt", text: "All permits and entry fees" },
        { icon: "fas fa-shield-alt", text: "Travel insurance coverage" },
        { icon: "fas fa-lungs", text: "24x7 oxygen cylinder support" },
        { icon: "fas fa-camera", text: "Professional photography assistance" }
    ];

    // Exclusions
    const exclusions = [
        { icon: "fas fa-plane", text: "Flight tickets to/from Delhi" },
        { icon: "fas fa-coffee", text: "Lunch and personal meals" },
        { icon: "fas fa-shopping-bag", text: "Personal shopping and souvenirs" },
        { icon: "fas fa-monument", text: "Monument entry fees (~₹500-1000)" },
        { icon: "fas fa-wine-bottle", text: "Personal beverages and alcohol" },
        { icon: "fas fa-phone", text: "Personal phone calls and internet" },
        { icon: "fas fa-medkit", text: "Personal medical expenses" },
        { icon: "fas fa-taxi", text: "Any transportation not mentioned" }
    ];

    // Packing list
    const packingList = [
        { icon: "fas fa-tshirt", text: "Warm clothes (3-4 layers)" },
        { icon: "fas fa-shoe-prints", text: "Comfortable trekking shoes" },
        { icon: "fas fa-sun", text: "Sunglasses and sunscreen" },
        { icon: "fas fa-pills", text: "Personal medications" },
        { icon: "fas fa-camera", text: "Camera with extra batteries" },
        { icon: "fas fa-battery-full", text: "Power bank and chargers" },
        { icon: "fas fa-water", text: "Water bottle" },
        { icon: "fas fa-id-card", text: "Original ID proofs" }
    ];

    // Populate inclusions
    const inclusionsContainer = document.getElementById('inclusions');
    inclusionsContainer.innerHTML = `
        <div class="package-grid">
            ${inclusions.map(item => `
                <div class="package-item">
                    <i class="${item.icon}"></i>
                    <span>${item.text}</span>
                </div>
            `).join('')}
        </div>
    `;

    // Populate exclusions
    const exclusionsContainer = document.getElementById('exclusions');
    exclusionsContainer.innerHTML = `
        <div class="package-grid">
            ${exclusions.map(item => `
                <div class="package-item">
                    <i class="${item.icon}"></i>
                    <span>${item.text}</span>
                </div>
            `).join('')}
        </div>
    `;

    // Populate packing list
    const packingContainer = document.getElementById('packing');
    packingContainer.innerHTML = `
        <div class="package-grid">
            ${packingList.map(item => `
                <div class="package-item">
                    <i class="${item.icon}"></i>
                    <span>${item.text}</span>
                </div>
            `).join('')}
        </div>
    `;
}

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(`${modalId}-modal`);
    modal.style.display = 'flex';

    // Populate modal content
    const modalBody = modal.querySelector('.modal-body');

    if (modalId === 'terms') {
        modalBody.innerHTML = `
            <h3>Booking Terms & Conditions</h3>
            <ul>
                <li>Advance payment required for booking confirmation</li>
                <li>Cancellation charges apply as per policy</li>
                <li>Travel insurance is mandatory for all participants</li>
                <li>Participants must be physically fit for high altitude travel</li>
                <li>Weather conditions may affect itinerary</li>
                <li>Accommodation is on sharing basis</li>
                <li>All permits and documents are participant's responsibility</li>
                <li>Company reserves right to modify itinerary if required</li>
            </ul>
        `;
    } else if (modalId === 'insurance') {
    modalBody.innerHTML = `
        <h3><strong>Travel Insurance Policy by ASEGO</strong></h3>
        <p><strong>1. Insurance Provider</strong><br>
        We are not an insurance provider. We act solely as a facilitator to offer travel insurance services provided by ASEGO Insurance. All policies are issued, managed, and underwritten by ASEGO. We do not hold any liability for the acceptance, rejection, settlement, or denial of any claims under the policy.</p>

        <p><strong>2. Coverage Overview (As per ASEGO's Policy)</strong><br>
        Insurance coverage is provided directly by ASEGO and may include:</p>
        <ul>
            <li>Trip Cancellation or Interruption</li>
            <li>Medical Emergencies</li>
            <li>Emergency Evacuation</li>
            <li>Baggage Loss or Delay</li>
            <li>Travel Delay</li>
            <li>Accidental Death & Dismemberment</li>
        </ul>

        <p><strong>3. Policy Terms</strong><br>
        Actual benefits, limits, and terms of coverage are subject to the policy issued by ASEGO. Customers are advised to carefully review the ASEGO policy document before purchasing.</p>

        <p><strong>4. Claims & Support</strong><br>
        All claims must be filed directly with ASEGO Insurance. We will not be involved in the processing, tracking, or outcome of any insurance claim. For claims, support, or assistance, contact ASEGO directly:</p>
        <p>
            ASEGO Insurance Support<br>
            Phone: +91 22 67872 037<br>
            Email: <a href="mailto:claims@asego.in">claims@asego.in</a><br>
            Website: <a href="https://asego.in/claim-and-assistance" target="_blank">https://asego.in/claim-and-assistance</a>
        </p>

        <p><strong>5. Exclusions & Limitations</strong><br>
        Coverage exclusions, waiting periods, and claim conditions are defined solely by ASEGO. We bear no responsibility for:</p>
        <ul>
            <li>Rejected or delayed claims</li>
            <li>Changes in policy terms by ASEGO</li>
            <li>Service quality or customer support provided by ASEGO</li>
        </ul>

        <p><strong>6. Policy Cancellation & Refunds</strong><br>
        Cancellation and refund terms are governed by ASEGO's policy. We cannot initiate, process, or guarantee any refund or cancellation of insurance once purchased.</p>

        <p><strong>7. Disclaimer</strong><br>
        By purchasing insurance through us, you acknowledge that:</p>
        <ul>
            <li>We are not liable for any claims, decisions made by ASEGO</li>
            <li>All disputes, issues, or grievances must be resolved directly with ASEGO</li>
            <li>You are responsible for understanding the terms and scope of the insurance before purchase</li>
        </ul>

        <p><strong>8. Governing Law</strong><br>
        These terms are governed by the laws of India. Any legal disputes related to insurance must be directed to ASEGO in accordance with their policy terms.</p>
    `;
}
}

function closeModal(modalId) {
    const modal = document.getElementById(`${modalId}-modal`);
    modal.style.display = 'none';
}

// Lead capture functionality
function captureLead() {
    const email = document.getElementById('leadEmail').value;
    if (email && email.includes('@')) {
        alert('Thank you! Your detailed itinerary PDF will be sent to your email shortly.');
        document.getElementById('leadEmail').value = '';
    } else {
        alert('Please enter a valid email address.');
    }
}

// Create animated stars
function createStars() {
    const starsContainer = document.querySelector('.stars-container');
    const numberOfStars = 100;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}
