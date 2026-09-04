document.addEventListener('DOMContentLoaded', () => {
  
  const getStartedBtn = document.getElementById('getStartedBtn');
  const authModal = document.getElementById('authModal');
  const closeModal = document.getElementById('closeModal');
  const authForm = document.getElementById('authForm');
  const createAccountBtn = document.getElementById('createAccountBtn');

  if (createAccountBtn && authModal) {
    createAccountBtn.addEventListener('click', () => {
      authModal.classList.add('active');
    });
  }

  function renderProfile(userName) {
    const firstLetter = userName.charAt(0).toUpperCase();
    const parentContainer = getStartedBtn.parentElement;

    const wrapper = document.createElement('div');
    wrapper.className = 'user-profile-wrapper';
    wrapper.id = 'userProfileWrapper';

    wrapper.innerHTML = `
      <div class="user-profile-badge" id="profileBadge">
        <div class="user-avatar">${firstLetter}</div>
        <span>${userName}</span>
      </div>
      <div class="profile-dropdown" id="profileDropdown">
        <button class="btn-logout" id="logoutBtn">Log Out</button>
      </div>
    `;

    getStartedBtn.style.display = 'none';
    parentContainer.appendChild(wrapper);

    const badge = wrapper.querySelector('#profileBadge');
    const dropdown = wrapper.querySelector('#profileDropdown');
    const logoutBtn = wrapper.querySelector('#logoutBtn');

    badge.addEventListener('click', (e) => {
    e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('promptverse_user');
      wrapper.remove();
      getStartedBtn.style.display = 'inline-block';
    });
  }

  // Сохранение сессии
  const savedUser = localStorage.getItem('promptverse_user');
  if (savedUser && getStartedBtn) {
    renderProfile(savedUser);
  }

  if (getStartedBtn && authModal) {
    getStartedBtn.addEventListener('click', () => {
      authModal.classList.add('active');
    });
  }

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      authModal.classList.remove('active');
    });
  }

  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('userName').value.trim();
      if (nameInput) {
        localStorage.setItem('promptverse_user', nameInput);
        authModal.classList.remove('active');
        renderProfile(nameInput);
      }
    });
  }


  /* ==========================================
      (Кнопки и Карточки)
     ========================================== */
  const generatorModal = document.getElementById('generatorModal');
  const closeGenerator = document.getElementById('closeGenerator');
  const generateRunBtn = document.getElementById('generateRunBtn');
  const generateResult = document.getElementById('generateResult');
  const genLoader = document.getElementById('genLoader');
  const resultText = document.getElementById('resultText');
  const promptInput = document.getElementById('promptInput');

  
  const genTriggers = document.querySelectorAll('.start, .card');

  genTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      
      if (trigger.classList.contains('card')) {
        const textElement = trigger.querySelector('p');
        if (textElement && promptInput) {
          promptInput.value = textElement.firstChild.textContent.trim();
        }
      }
      
      if (generatorModal) {
        generatorModal.classList.add('active');
      }
    });
  });

  
  if (closeGenerator) {
    closeGenerator.addEventListener('click', () => {
      generatorModal.classList.remove('active');
    });
  }

  // Имитация генерации
  if (generateRunBtn) {
    generateRunBtn.addEventListener('click', () => {
      const promptVal = promptInput ? promptInput.value.trim() : '';
      if (!promptVal) return;

      generateResult.classList.add('active');
      genLoader.style.display = 'block';
      resultText.textContent = '';

      setTimeout(() => {
        genLoader.style.display = 'none';
        resultText.textContent = `✨ Generated response for: "${promptVal}"`;
      }, 1500);
    });
  }

  
  document.addEventListener('click', (e) => {
    if (authModal && e.target === authModal) {
      authModal.classList.remove('active');
    }
    if (generatorModal && e.target === generatorModal) {
      generatorModal.classList.remove('active');
    }
    const dropdown = document.getElementById('profileDropdown');
    if (dropdown && !e.target.closest('#userProfileWrapper')) {
      dropdown.classList.remove('show');
    }

    
  });

  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15 
  });

  revealElements.forEach(el => revealObserver.observe(el));

});