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

// Connect to Server-Sent Events endpoint
function fetchDataFromJson(endpoint) {
  const resultsContainer = document.getElementById('cv-results');
  resultsContainer.innerHTML = '<div class="cv-loading">Connecting...</div>';

  // Add debug logging
  console.log('Connecting to SSE:', endpoint);

  try {
    // Full path to the SSE endpoint
    const sseUrl = `/sse/${endpoint}`;
    console.log('SSE URL:', sseUrl);

    const eventSource = new EventSource(sseUrl);

    eventSource.onmessage = (event) => {
      try {
        console.log('Received SSE message:', event.data);

        // Check if we got [DONE]
        if (event.data.includes('[DONE]')) {
          console.log('Received DONE signal, closing connection');
          eventSource.close();
          return;
        }

        const data = JSON.parse(event.data);

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
        console.error('Error processing SSE message:', error, event.data);
        resultsContainer.innerHTML = '<div class="cv-error">Error processing response. Check console for details.</div>';
        eventSource.close();
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE connection error:', error);
      resultsContainer.innerHTML = '<div class="cv-error">Connection error. Please try again.</div>';
      eventSource.close();
    };

    // Add onopen handler to confirm successful connection
    eventSource.onopen = (event) => {
      console.log('SSE connection opened:', event);
    };

  } catch (error) {
    console.error('Failed to create EventSource:', error);
    resultsContainer.innerHTML = '<div class="cv-error">Failed to establish connection.</div>';
  }
}
