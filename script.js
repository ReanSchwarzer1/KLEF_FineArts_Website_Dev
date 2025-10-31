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
        name: 'Fall',
        courses: [
          { code: 'KLGD-101', name: 'Game Development Fundamentals', info: 'Core foundations of game engines, prototyping, and logic.' },
          { code: 'KLAN-102', name: 'Animation Principles I', info: 'Key animation basics and movement studies.' },
          { code: 'KLVFX-103', name: 'Intro to VFX', info: 'Elementary visual effects for games and cinema.' },
          { code: 'KLPORT-104', name: 'Portfolio Studio I', info: 'Personal project-based learning, mentorship.' }
        ]
      },
      {
        name: 'Spring',
        courses: [
          { code: 'KLGD-105', name: 'Level Design', info: 'World-building for immersive games.' },
          { code: 'KLAN-106', name: 'Animation Principles II', info: 'Advanced animation skills.' },
          { code: 'KLART-107', name: 'Game Art Techniques', info: '3D/2D Art asset pipelines.' }
        ]
      }
    ]
  },
  {
    year: 'Second Year',
    semesters: [
      {
        name: 'Fall',
        courses: [
          { code: 'KLGD-201', name: 'Game Programming', info: 'Game logic, scripting, visual code systems.' },
          { code: 'KLAN-202', name: 'Rigging & Motion Capture', info: 'Character setup, rigging, and mocap workflows.' },
          { code: 'KLART-203', name: 'Environment Art', info: 'Asset creation for AAA/viz.' }
        ]
      },
      {
        name: 'Spring',
        courses: [
          { code: 'KLGD-205', name: 'Game Design Studio', info: 'Team project, full dev pipeline.' },
          { code: 'KLVFX-206', name: 'Intermediate VFX', info: 'Particle systems, simulation FX.' }
        ]
      }
    ]
  },
  {
    year: 'Third Year',
    semesters: [
      {
        name: 'Fall',
        courses: [
          { code: 'KLGD-301', name: 'Advanced Game Engines', info: 'Unreal 5, Unity HDRP/URP, shaders, advanced tools.' },
          { code: 'KLART-302', name: 'Procedural Content Creation', info: 'Procedural mesh, particle, and AI tools.' },
          { code: 'KLVR-303', name: 'AR/VR Studio', info: 'Hands-on AR/VR project.' }
        ]
      },
      {
        name: 'Spring',
        courses: [
          { code: 'KLGD-305', name: 'Capstone Game Project', info: 'Full production pipeline—team release.' },
          { code: 'KLPORT-306', name: 'Portfolio II', info: 'Polish, review, and career prep.' }
        ]
      }
    ]
  },
  {
    year: "Electives",
    isElectives: true,
    semesters: [
      {
        name: "Approved Electives",
        courses: [
          { code: 'ELEC-111', name: 'Digital Storyboarding', info: 'Visual storytelling & sequential art.' },
          { code: 'ELEC-118', name: 'Cinematic Techniques', info: 'Directing for interactive media.' },
          { code: 'ELEC-221', name: 'Procedural Tools', info: 'Procedural generation and tech art.' },
          { code: 'ELEC-229', name: 'Tech Art for Realtime', info: 'Shaders, tools, and automation.' },
          { code: 'ELEC-230', name: 'Sound Design for Games', info: 'Audio, SFX and interactive music.' }
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



/*
  Copyright © 2025 Adhiraj Bhagawati. All rights reserved.
*/
