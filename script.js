// --- Sidebar Navigation Highlight and Smooth Scroll ---
const navLinks = document.querySelectorAll('.side-nav a');
const sections = Array.from(document.querySelectorAll('.sections-content > .section'));
window.addEventListener('scroll', function() {
  let lastId = null, minDist = 99999;
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if(rect.top >= -80 && rect.top < minDist) { minDist = rect.top; lastId = sec.id; }
  });
  navLinks.forEach(n => n.classList.remove("active"));
  if (lastId) {
    const navActive = document.querySelector('.side-nav a[href="#'+lastId+'"]');
    if(navActive) navActive.classList.add("active");
  }
});
navLinks.forEach(link => {
  link.addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById(this.getAttribute("href").substring(1)).scrollIntoView({behavior:"smooth"});
  });
});

// --- Curriculum Data, Accordion, Tooltip with Electives Embedded ---
const curriculumData = [
  {
    year: 'First Year',
    semesters: [
      {
        name: 'Semester 1',
        courses: [
          { code: 'DFA', name: 'Drawing for Animation', info: 'Core drawing techniques focused on character and motion for animation.' },
          { code: 'DP', name: 'Digital Photography', info: 'Essentials of capturing and editing digital photographs.' },
          { code: 'VTP', name: 'Visual Thinking and Problem Solving', info: 'Approaches for creative visualization and tackling design challenges.' },
          { code: 'STG', name: 'Story Telling', info: 'Narrative principles and crafting engaging stories for media.' },
          { code: 'LGS', name: 'Language Skills', info: 'Developing proficiency in communication relevant to creative industries.' },
          { code: 'GDS', name: 'Graphic Design', info: 'Fundamentals and application of visual design for print and digital media.' },
          { code: 'E&E', name: 'Ecology & Environment', info: 'Awareness of ecological concepts and environmental responsibility in art/design.' }
        ]
      },
      {
        name: 'Semester 2',
        courses: [
          { code: 'AVD', name: 'AI for Visual Design', info: 'Applying artificial intelligence tools and concepts in visual arts and design.' },
          { code: 'CAR', name: 'Concept Art', info: 'Techniques for visual conceptualization and illustration in entertainment design.' },
          { code: 'ML', name: 'Media Laws', info: 'Understanding of legal frameworks affecting media production and distribution.' },
          { code: 'DTI', name: 'Design Thinking and Innovation', info: 'Creative methodologies for innovation and problem-solving.' },
          { code: 'HVS', name: 'Human Values, Gender Equality & Professional Ethics', info: 'Social values and professional ethics in creative fields.' },
          { code: 'FRL', name: 'Foreign Language (French)', info: 'Basic French language skills for personal and professional growth.' }
        ]
      }
    ]
  },
  {
    year: 'Second Year',
    semesters: [
      {
        name: 'Semester 3',
        courses: [
          { code: 'MRM', name: 'Media Research Methods', info: 'Techniques for inquiry and academic research in media studies.' },
          { code: 'ADS', name: 'Advertising and Semiotics', info: 'Principles of advertising and the study of signs/symbolism in media.' },
          { code: 'PYP', name: 'Python Programming', info: 'Basics of programming and scripting for digital arts with Python.' },
          { code: 'SIL-I', name: 'Social Immersive Learning', info: 'Experiential learning through socially-driven creative projects.' },
          { code: 'CMS', name: 'Communication Skills', info: 'Enhancing written and oral communication for creative professionals.' }
        ]
      },
      {
        name: 'Semester 4',
        courses: [
          { code: 'DMD', name: 'Digital Media Design', info: 'Multimedia content creation for web, video, and interactive platforms.' },
          { code: 'MME', name: 'Media Management and Entrepreneurship', info: 'Business and management skills tailored for media ventures.' },
          { code: 'UI&UX', name: 'UI & UX Design', info: 'User interface and user experience design strategies for interactive media.' },
          { code: 'VP', name: 'Virtual Production', info: 'Merging real and virtual worlds for modern film and video workflows.' }
        ]
      }
    ]
  },
  {
    year: 'Third Year',
    semesters: [
      {
        name: 'Semester 5',
        courses: [
          { code: 'MAP', name: 'Portfolio', info: 'Compilation and presentation of a professional creative portfolio.' },
          { code: 'ITS', name: 'Internship', info: 'Real-world industry experience in a professional animation or game development environment.' }
        ]
      }
    ]
  },
  {
    year: 'Electives',
    isElectives: true,
    semesters: [
      {
        name: 'Approved Electives',
        courses: [
          { code: 'SW', name: 'Screen Writing', info: 'Structuring and writing scripts for films and games.' },
          { code: 'TVP', name: 'Television Production', info: 'Creation, planning, and execution processes for television content.' },
          { code: 'GA', name: 'Game Art', info: 'Artistic principles and techniques for creating 2D/3D game assets.' },
          { code: 'C3D', name: 'Concepts of 3D', info: 'Introduction to 3D modeling, texturing, and visualization skills.' },
          { code: 'EFF', name: 'Editing For Films', info: 'Technical and creative aspects of editing cinematic content.' },
          { code: 'MTP', name: 'Matte Painting', info: 'Creating digital environments and backgrounds for films/games.' },
          { code: 'MDT', name: 'Modeling & Texturing', info: 'Crafting and refining 3D models with realistic textures.' },
          { code: 'EDG', name: 'Environment Design for Games', info: 'Designing immersive worlds and levels for video games.' },
          { code: 'CM', name: 'Cinematography', info: 'Art and technique of visual storytelling with the camera.' },
          { code: 'TAM', name: 'Tracking and Matchmoving', info: 'Integrating live-action footage with digital elements using tracking.' },
          { code: 'SLR', name: 'Shading, Lighting and Rendering', info: 'Creating believable surfaces and lighting in 3D production.' },
          { code: 'GDU', name: 'Game Development Using Unreal', info: 'Game design and development using Unreal Engine.' },
          { code: 'DFM', name: 'Film Production', info: 'Complete process from planning to shooting and editing films.' },
          { code: 'MTM', name: 'Compositing Techniques', info: 'Methods for blending and compositing visuals in post-production.' },
          { code: '3DD', name: '3D Dynamics', info: 'Simulating physics-based effects for animation and games.' },
          { code: 'CAR', name: 'Character Animation', info: 'Bringing digital characters to life with motion and personality.' },
          { code: 'OE-1', name: 'Photography Techniques (Open Elective I)', info: 'Specialized capture and creative photography methods.' },
          { code: 'OE-2', name: 'Art and Ideas (Open Elective II)', info: 'Exploring creative concepts and critical thinking in art.' }
        ]
      }
    ]
  }
];


function buildCurriculumAccordion() {
  const accordion = document.getElementById('curriculum-accordion');
  curriculumData.forEach((yearObj, yearIdx) => {
    // Create year accordion
    const block = document.createElement('div');
    block.className = 'c-block';
    block.innerHTML = `
      <div class="c-block-head" tabindex="0" data-block="${yearIdx}">
        <span>${yearObj.year}</span>
        <span class="c-block-toggle">${yearObj.isElectives ? "+" : "+"}</span>
      </div>
      <div class="c-block-body"></div>
    `;
    accordion.appendChild(block);

    const body = block.querySelector('.c-block-body');
    body.style.display = 'none';

    yearObj.semesters.forEach((semester, semIdx) => {
      const semWrap = document.createElement('div');
      semWrap.className = 'semester-block';
      semWrap.innerHTML = `
        <div class="semester-head" tabindex="0" data-sem="${yearIdx}-${semIdx}">
          <span>${semester.name}</span>
          <span class="sem-toggle">+</span>
        </div>
        <div class="semester-body"></div>
      `;
      body.appendChild(semWrap);

      const semBody = semWrap.querySelector('.semester-body');
      semBody.style.display = 'none';

      // Courses table
      const ul = document.createElement('ul');
      ul.className = 'c-list';
      semester.courses.forEach(c => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="c-course" tabindex="0" data-tooltip="${c.info}">${c.code}</span>
                        <span class="course-name">${c.name}</span>`;
        ul.appendChild(li);
      });
      semBody.appendChild(ul);

      // Semester expand/collapse
      semWrap.querySelector('.semester-head').addEventListener('click', function(){
        if (semBody.style.display === 'block') {
          semBody.style.display = 'none'; this.querySelector('.sem-toggle').textContent = '+';
        } else {
          semBody.style.display = 'block'; this.querySelector('.sem-toggle').textContent = '–';
        }
      });
    });

    // Year block expand/collapse
    block.querySelector('.c-block-head').addEventListener('click', function() {
      if (body.style.display === 'block') {
        body.style.display = 'none'; this.querySelector('.c-block-toggle').textContent = '+';
      } else {
        body.style.display = 'block'; this.querySelector('.c-block-toggle').textContent = '–';
      }
    });
  });
}

// --- Tooltips on Course Codes ---
const tooltip = document.getElementById('course-tooltip');
document.addEventListener('mouseover', function(e){
  if (e.target.matches('.c-course')) {
    tooltip.style.display = 'block';
    tooltip.innerHTML = `<b>${e.target.textContent}</b>: <br>${e.target.dataset.tooltip}`;
    const rect = e.target.getBoundingClientRect();
    tooltip.style.top = window.scrollY + rect.bottom + 10 + 'px';
    tooltip.style.left = window.scrollX + rect.left + 'px';
  }
});
document.addEventListener('mouseout', function(e){
  if (e.target.matches('.c-course')) tooltip.style.display = 'none';
});
document.addEventListener('focusin', function(e){
  if (e.target.matches('.c-course')) {
    tooltip.style.display = 'block';
    tooltip.innerHTML = `<b>${e.target.textContent}</b>: <br>${e.target.dataset.tooltip}`;
    const rect = e.target.getBoundingClientRect();
    tooltip.style.top = window.scrollY + rect.bottom + 10 + 'px';
    tooltip.style.left = window.scrollX + rect.left + 'px';
  }
});
document.addEventListener('focusout', function(e){
  if (e.target.matches('.c-course')) tooltip.style.display = 'none';
});
window.addEventListener('DOMContentLoaded', buildCurriculumAccordion);

// Scroll Up Button
const scrollUpBtn = document.createElement('div');
window.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('scrollUpBtn');
  // Show when scrolled down
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.style.display = 'block';
    } else {
      btn.style.display = 'none';
    }
  });
  // Scroll to top on click
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});


// Example event data structure
const events = [
  {
    title: "Game Production Seminar (Sam Beckann)",
    type: "Seminar",
    images: ["assets/poster_gameprod.png", "assets/gameprod1.png", "assets/gameprod2.png", "assets/gameprod3.png"],
    report: "The webinar led by Sam Beckmann gave students an in-depth understanding of the game development pipeline and the varied roles in the industry. He stressed the importance of building strong portfolios, communicating well, leading teams with humility, and handling burnout. Participants felt inspired and gained practical tools for future careers in animation and gaming."
  },
  {
    title: "Game Design Webinar (Siddharth Menon)",
    type: "Webinar",
    images: ["assets/poster_gamedesign.png", "assets/gamedes1.JPEG", "assets/gamedes2.JPEG","assets/gamedes3.JPEG", "assets/gamedes4.JPEG", "assets/gamedes5.JPEG"],
    report: "The Game Design Webinar discussed the fundamental structure of games and the core responsibilities of a game designer. Led by Siddharth Menon from Dirtcube Interactive, the session emphasized purpose-driven design in game development. It was held online on September 20, 2025, and organized by the KL Department of Fine Arts."
  },
  {
    title: "IndiaJoy 2025 Convention (Hyderabad)",
    type: "Convention",
    images: ["assets/indiajoy25_0.JPEG", "assets/indiajoy25_1.JPEG", "assets/indiajoy25_2.JPEG","assets/indiajoy25_3.JPEG", "assets/indiajoy25_4.png"],
    report: "At IndiaJoy 2025, Assistant Professor Adhiraj attended the event with his students and their Head of Department, Dr. Subhash Yalavarthy. The group engaged with the latest innovations in gaming, animation, and interactive media. This experience provided valuable exposure and inspiration for their academic and professional pursuits."
  }
  // Add more event objects as needed
];

const eventCards = document.querySelectorAll('.event-card');
const modal = document.getElementById('event-modal');
const closeBtn = modal.querySelector('.close-btn');
const nextBtn = modal.querySelector('.next-event-btn');

let currentEvent = 0;
let currentImg = 0;

// Opens the modal for the event at index
function openModal(eventIndex) {
  currentEvent = eventIndex;
  currentImg = 0;
  updateModal();
  modal.style.display = "flex";
}

// Updates modal content with currentEvent
function updateModal() {
  const evt = events[currentEvent];
  document.getElementById('modal-title').textContent = evt.title;
  document.getElementById('modal-type').textContent = evt.type;
  document.getElementById('modal-img').src = evt.images[currentImg];
  document.getElementById('modal-img').alt = evt.title;
  document.getElementById('modal-report').textContent = evt.report;
}

// Image navigation
modal.querySelector('#prev-img').addEventListener('click', () => {
  if (currentImg > 0) currentImg--;
  else currentImg = events[currentEvent].images.length - 1;
  updateModal();
});
modal.querySelector('#next-img').addEventListener('click', () => {
  if (currentImg < events[currentEvent].images.length - 1) currentImg++;
  else currentImg = 0;
  updateModal();
});

// Next event navigation
nextBtn.addEventListener('click', () => {
  currentEvent = (currentEvent + 1) % events.length;
  currentImg = 0;
  updateModal();
});

// Close modal
closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });

// Open modal when event card clicked
eventCards.forEach(card => {
  card.addEventListener('click', () => {
    openModal(parseInt(card.dataset.event));
  });
});

// Optional: close modal when clicking outside modal-content
modal.addEventListener('click', (e) => {
  if (e.target == modal) modal.style.display = 'none';
});








/*
  Copyright © 2025 Adhiraj Bhagawati. All rights reserved.
*/
