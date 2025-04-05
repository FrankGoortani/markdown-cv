/**
 * Frank Goortani CV Chat Interface
 * This script adds a chat interface to the CV site that connects to the SSE endpoint
 */

document.addEventListener('DOMContentLoaded', () => {
  // Create the chat interface and append to body
  createChatInterface();
});

function createChatInterface() {
  // Create the main container
  const chatContainer = document.createElement('div');
  chatContainer.id = 'cv-chat-container';

  // Create toggle button
  const chatButton = document.createElement('button');
  chatButton.id = 'cv-chat-button';
  chatButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
  chatButton.setAttribute('title', 'Ask about Frank');

  // Create chat box (initially hidden)
  const chatBox = document.createElement('div');
  chatBox.id = 'cv-chat-box';
  chatBox.classList.add('hidden');

  // Create chat header
  const chatHeader = document.createElement('div');
  chatHeader.id = 'cv-chat-header';

  const chatTitle = document.createElement('div');
  chatTitle.id = 'cv-chat-title';
  chatTitle.textContent = 'Ask about Frank Goortani';

  const closeButton = document.createElement('button');
  closeButton.id = 'cv-chat-close';
  closeButton.innerHTML = '&times;';
  closeButton.setAttribute('title', 'Close');

  chatHeader.appendChild(chatTitle);
  chatHeader.appendChild(closeButton);

  // Create chat content
  const chatContent = document.createElement('div');
  chatContent.id = 'cv-chat-content';

  // Create query buttons section
  const buttonsContainer = document.createElement('div');
  buttonsContainer.id = 'cv-query-buttons';

  const profileButton = createQueryButton('Profile', 'profile');
  const skillsButton = createQueryButton('Skills', 'skills');
  const interestsButton = createQueryButton('Interests', 'interests');
  const resumeButton = createQueryButton('Resume', 'resume');
  const pictureButton = createQueryButton('Picture', 'picture');

  buttonsContainer.appendChild(profileButton);
  buttonsContainer.appendChild(skillsButton);
  buttonsContainer.appendChild(interestsButton);
  buttonsContainer.appendChild(resumeButton);
  buttonsContainer.appendChild(pictureButton);

  // Create search form
  const searchForm = document.createElement('form');
  searchForm.id = 'cv-search-form';

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.id = 'cv-search-input';
  searchInput.placeholder = 'Search skills, keywords, companies...';

  const searchButton = document.createElement('button');
  searchButton.type = 'submit';
  searchButton.id = 'cv-search-button';
  searchButton.textContent = 'Search';

  searchForm.appendChild(searchInput);
  searchForm.appendChild(searchButton);

  // Create company form
  const companyForm = document.createElement('form');
  companyForm.id = 'cv-company-form';

  const companyInput = document.createElement('input');
  companyInput.type = 'text';
  companyInput.id = 'cv-company-input';
  companyInput.placeholder = 'Company name (e.g., Uber, Home Depot)';

  const companyButton = document.createElement('button');
  companyButton.type = 'submit';
  companyButton.id = 'cv-company-button';
  companyButton.textContent = 'Get Experience';

  companyForm.appendChild(companyInput);
  companyForm.appendChild(companyButton);

  // Create results container
  const resultsContainer = document.createElement('div');
  resultsContainer.id = 'cv-results';

  // Add welcome message to results
  const welcomeMessage = document.createElement('div');
  welcomeMessage.id = 'cv-welcome-message';
  welcomeMessage.innerHTML = '<p>Welcome! Use the buttons above to learn about Frank Goortani, or search for specific skills and experience.</p>';
  resultsContainer.appendChild(welcomeMessage);

  // Assemble all elements
  chatContent.appendChild(buttonsContainer);
  chatContent.appendChild(searchForm);
  chatContent.appendChild(companyForm);
  chatContent.appendChild(resultsContainer);

  chatBox.appendChild(chatHeader);
  chatBox.appendChild(chatContent);

  chatContainer.appendChild(chatButton);
  chatContainer.appendChild(chatBox);

  // Add the chat interface to the page
  document.body.appendChild(chatContainer);

  // Add event listeners
  chatButton.addEventListener('click', () => {
    chatBox.classList.remove('hidden');
  });

  closeButton.addEventListener('click', () => {
    chatBox.classList.add('hidden');
  });

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      performSearch(searchTerm);
      searchInput.value = '';
    }
  });

  companyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const companyName = companyInput.value.trim();
    if (companyName) {
      getCompanyExperience(companyName);
      companyInput.value = '';
    }
  });
}

// Helper function to create a query button
function createQueryButton(label, query) {
  const button = document.createElement('button');
  button.classList.add('cv-query-button');
  button.textContent = label;
  button.addEventListener('click', () => handleQuery(query));
  return button;
}

// Handle a query button click
function handleQuery(query) {
  // Call the fetchDataFromJson function with the endpoint
  fetchDataFromJson(query);
}

// Handle search query
function performSearch(term) {
  const resultsContainer = document.getElementById('cv-results');
  resultsContainer.innerHTML = '<div class="cv-loading">Searching for "' + term + '"...</div>';

  // Call fetchDataFromJson with the search endpoint
  fetchDataFromJson('search?q=' + encodeURIComponent(term));
}

// Handle company experience query
function getCompanyExperience(company) {
  const resultsContainer = document.getElementById('cv-results');
  resultsContainer.innerHTML = '<div class="cv-loading">Loading experience at "' + company + '"...</div>';

  // Call fetchDataFromJson with the company endpoint
  fetchDataFromJson('company?name=' + encodeURIComponent(company));
}

// Fetch data from static JSON files
async function fetchDataFromJson(endpoint) {
  const resultsContainer = document.getElementById('cv-results');
  resultsContainer.innerHTML = '<div class="cv-loading">Loading...</div>';

  // Add debug logging
  console.log('Fetching from JSON:', endpoint);

  try {
    // Construct the JSON file path based on the endpoint
    let jsonPath;

    // Handle company endpoint specially
    if (endpoint.startsWith('company?name=')) {
      const companyName = endpoint.split('=')[1].toLowerCase();
      // Handle specific companies we have JSON for
      if (companyName.includes('uber')) {
        jsonPath = 'static-json/company-uber.json';
      } else if (companyName.includes('home') && companyName.includes('depot')) {
        jsonPath = 'static-json/company-home-depot.json';
      } else {
        throw new Error(`No data available for company: ${companyName}`);
      }
    }
    // Handle search endpoint specially
    else if (endpoint.startsWith('search?q=')) {
      const searchTerm = endpoint.split('=')[1].toLowerCase();
      // For now, we only have JavaScript search results pre-cached
      if (searchTerm.toLowerCase() === 'javascript') {
        jsonPath = 'static-json/search-javascript.json';
      } else {
        throw new Error(`No pre-cached search results for: ${searchTerm}`);
      }
    }
    // Handle other simple endpoints
    else {
      jsonPath = `static-json/${endpoint}.json`;
    }

    console.log('Fetching JSON from:', jsonPath);

    const response = await fetch(jsonPath);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Special handling for resume link
    if (endpoint === 'resume') {
      resultsContainer.innerHTML = `<div class="cv-result"><a href="${data.text}" target="_blank" class="cv-resume-link">View/Download PDF Resume</a></div>`;
    }
    // Special handling for profile picture
    else if (endpoint === 'picture') {
      resultsContainer.innerHTML = `<div class="cv-result cv-picture"><img src="${data.text}" alt="Frank Goortani" /></div>`;
    }
    // Handle regular text responses
    else {
      // Convert newlines to HTML breaks for proper formatting
      const formattedText = data.text.replace(/\n/g, '<br>');
      resultsContainer.innerHTML = `<div class="cv-result">${formattedText}</div>`;
    }
  } catch (error) {
    console.error('Error fetching data:', error);

    if (endpoint.startsWith('search?q=')) {
      resultsContainer.innerHTML = '<div class="cv-error">Search is limited to precomputed terms. Try searching for "JavaScript" as a demo.</div>';
    } else if (endpoint.startsWith('company?name=')) {
      resultsContainer.innerHTML = '<div class="cv-error">Company lookup is limited to "Uber" and "Home Depot" as a demo.</div>';
    } else {
      resultsContainer.innerHTML = `<div class="cv-error">Failed to load data. ${error.message}</div>`;
    }
  }
}
