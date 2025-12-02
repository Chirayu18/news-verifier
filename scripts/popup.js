// Popup script for handling user interactions

const apiKeyInput = document.getElementById('apiKey');
const saveApiKeyBtn = document.getElementById('saveApiKey');
const analyzeBtn = document.getElementById('analyzeBtn');
const statusDiv = document.getElementById('status');
const resultsDiv = document.getElementById('results');
const resultsContent = document.getElementById('resultsContent');
const loadingDiv = document.getElementById('loading');

/**
 * Show status message
 */
function showStatus(message, type = 'info') {
  statusDiv.textContent = message;
  statusDiv.className = `status ${type}`;
  
  // Auto-hide after 3 seconds for success messages
  if (type === 'success') {
    setTimeout(() => {
      statusDiv.className = 'status';
    }, 3000);
  }
}

/**
 * Load saved API key
 */
async function loadApiKey() {
  try {
    const result = await chrome.storage.local.get(['geminiApiKey']);
    if (result.geminiApiKey) {
      apiKeyInput.value = result.geminiApiKey;
      analyzeBtn.disabled = false;
      showStatus('API key loaded', 'success');
    } else {
      analyzeBtn.disabled = true;
    }
  } catch (error) {
    console.error('Error loading API key:', error);
  }
}

/**
 * Save API key to storage
 */
async function saveApiKey() {
  const apiKey = apiKeyInput.value.trim();
  
  if (!apiKey) {
    showStatus('Please enter an API key', 'error');
    return;
  }

  if (!apiKey.startsWith('AIza')) {
    showStatus('Invalid API key format. Should start with AIza', 'error');
    return;
  }

  try {
    await chrome.storage.local.set({ geminiApiKey: apiKey });
    showStatus('API key saved successfully!', 'success');
    analyzeBtn.disabled = false;
  } catch (error) {
    showStatus('Error saving API key: ' + error.message, 'error');
  }
}

/**
 * Parse legitimacy score from analysis
 */
function extractLegitimacyScore(analysisText) {
  const match = analysisText.match(/LEGITIMACY SCORE[:\s]*\(?([^:\n\)]+)/i);
  if (match) {
    const score = match[1].toLowerCase();
    if (score.includes('high')) return 'high';
    if (score.includes('medium') || score.includes('moderate')) return 'medium';
    if (score.includes('low')) return 'low';
  }
  return null;
}

/**
 * Parse and format structured analysis into visual dashboard
 */
function formatAnalysis(analysisText) {
  let html = '';
  
  // Extract sections using regex
  const sections = {
    metrics: analysisText.match(/## DASHBOARD METRICS\s*([\s\S]*?)(?=##|$)/i)?.[1]?.trim() || '',
    fallacies: analysisText.match(/## FALLACY INSTANCES\s*([\s\S]*?)(?=##|$)/i)?.[1]?.trim() || '',
    thinking: analysisText.match(/## CRITICAL THINKING\s*([\s\S]*?)(?=##|$)/i)?.[1]?.trim() || '',
    factcheck: analysisText.match(/## FACT-CHECK\s*([\s\S]*?)(?=##|$)/i)?.[1]?.trim() || ''
  };

  // Dashboard Metrics
  if (sections.metrics) {
    const fallaciesCount = sections.metrics.match(/Total Fallacies:\s*(\d+)/i)?.[1] || '0';
    const objectivityScore = sections.metrics.match(/Objectivity:\s*(\d+)/i)?.[1] || '5';
    const legitimacy = sections.metrics.match(/Legitimacy:\s*(\w+)/i)?.[1] || 'Medium';

    const legitColor = legitimacy.toLowerCase() === 'high' ? '#10b981' : 
                      legitimacy.toLowerCase() === 'medium' ? '#f59e0b' : '#ef4444';

    html += `
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-value" style="color: #f59e0b;">${fallaciesCount}</div>
          <div class="metric-label">Fallacies</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">${objectivityScore}/10</div>
          <div class="metric-label">Objectivity</div>
        </div>
        <div class="metric-card">
          <div class="metric-value" style="color: ${legitColor}; font-size: 20px;">${legitimacy}</div>
          <div class="metric-label">Legitimacy</div>
        </div>
      </div>
    `;
  }

  // Fallacy Instances
  if (sections.fallacies) {
    if (sections.fallacies.includes('No statistical fallacies detected')) {
      html += `
        <div class="empty-state">
          <div class="empty-state-icon">✓</div>
          <strong>No Statistical Fallacies Detected</strong>
          <p style="margin-top: 8px;">This article appears to be statistically sound.</p>
        </div>
      `;
    } else {
      // Parse each fallacy instance
      const fallacyPattern = /\*\*Fallacy:\*\*\s*(.+?)\s*\*\*Confidence:\*\*\s*(.+?)\s*\*\*Location:\*\*\s*"(.+?)"\s*\*\*Why Misleading:\*\*\s*(.+?)\s*\*\*Biases Exploited:\*\*\s*(.+?)\s*\*\*Better Version:\*\*\s*"(.+?)"\s*---/gs;
      let match;
      let instanceNum = 0;
      
      while ((match = fallacyPattern.exec(sections.fallacies)) !== null) {
        instanceNum++;
        const fallacyName = match[1].trim();
        const confidence = match[2].trim();
        const location = match[3].trim();
        const whyMisleading = match[4].trim();
        const biasesExploited = match[5].trim();
        const betterVersion = match[6].trim();
        
        // Get icon for fallacy type
        const fallacyIcons = {
          'FALSE CAUSALITY': '🔗',
          'GAMBLER\'S FALLACY': '🎲',
          'MCNAMARA FALLACY': '📊',
          'REGRESSION': '📉',
          'SURVIVORSHIP BIAS': '🏆',
          'CHERRY PICKING': '🍒',
          'DATA DREDGING': '⛏️',
          'HAWTHORNE EFFECT': '👁️',
          'SAMPLING BIAS': '📝',
          'OVERFITTING': '🎯'
        };
        
        let icon = '⚠️';
        for (const [key, value] of Object.entries(fallacyIcons)) {
          if (fallacyName.toUpperCase().includes(key)) {
            icon = value;
            break;
          }
        }
        
        // Parse biases into tags
        const biases = biasesExploited.split(',').map(b => b.trim());
        const biasTags = biases.map(b => `<span class="bias-tag">${b}</span>`).join('');
        
        html += `
          <div class="fallacy-card">
            <div class="fallacy-header">
              <div class="fallacy-name">
                <span class="fallacy-icon">${icon}</span>
                ${fallacyName}
              </div>
              <div class="confidence">${confidence}</div>
            </div>
            <div class="quote-box">${location}</div>
            <div class="why-misleading">💡 ${whyMisleading}</div>
            <div class="bias-tags">${biasTags}</div>
            <div class="rewrite">
              <div class="rewrite-label">✏️ Better Version</div>
              <div class="rewrite-text">${betterVersion}</div>
            </div>
          </div>
        `;
      }
      
      if (instanceNum === 0) {
        html += `
          <div class="empty-state">
            <div class="empty-state-icon">✓</div>
            <strong>No Statistical Fallacies Detected</strong>
          </div>
        `;
      }
    }
  }

  // Critical Thinking Section
  if (sections.thinking && sections.thinking.length > 5) {
    html += `
      <div class="thinking-box">
        <div class="thinking-title">
          <span>🧠</span> Critical Thinking Questions
        </div>
        <ul class="thinking-questions">
    `;
    
    const questions = sections.thinking.match(/\d+\.\s*(.+?)(?=\d+\.|$)/gs) || [];
    questions.forEach(q => {
      const cleaned = q.replace(/^\d+\.\s*/, '').trim();
      if (cleaned) {
        html += `<li>${cleaned}</li>`;
      }
    });
    
    html += `
        </ul>
      </div>
    `;
  }

  // Fact-Check Section
  if (sections.factcheck && sections.factcheck.length > 5) {
    html += `
      <div class="fact-check-box">
        <div class="fact-check-title">
          <span>🔍</span> Fact-Check Sources
        </div>
        <ul class="fact-check-sources">
    `;
    
    const sources = sections.factcheck.match(/[-•]\s*(.+?)(?=[-•]|$)/gs) || [];
    sources.forEach(s => {
      const cleaned = s.replace(/^[-•]\s*/, '').trim();
      if (cleaned) {
        html += `<li>${cleaned}</li>`;
      }
    });
    
    html += `
        </ul>
      </div>
    `;
  }

  // Fallback: if no structured sections found, display raw content
  if (html.length < 100) {
    html = `<div class="dashboard-section">
      <h3>Analysis Results</h3>
      <p style="white-space: pre-wrap;">${analysisText}</p>
    </div>`;
  }

  return html;
}

/**
 * Analyze current article
 */
async function analyzeArticle() {
  try {
    // Get API key
    const result = await chrome.storage.local.get(['geminiApiKey']);
    if (!result.geminiApiKey) {
      showStatus('Please save your API key first', 'error');
      return;
    }

    // Show loading state
    analyzeBtn.disabled = true;
    loadingDiv.classList.add('show');
    resultsDiv.classList.remove('show');
    statusDiv.className = 'status';

    // Get active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab) {
      throw new Error('No active tab found');
    }

    // Extract article content from the page
    const response = await chrome.tabs.sendMessage(tab.id, { action: 'extractContent' });
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to extract article content');
    }

    const articleContent = response.content;

    // Validate content
    if (!articleContent.text || articleContent.text.length < 100) {
      throw new Error('Could not extract enough content from this page. Make sure you are on a news article page.');
    }

    // Send to background script for Gemini API analysis
    chrome.runtime.sendMessage(
      {
        action: 'analyzeArticle',
        articleContent: articleContent,
        apiKey: result.geminiApiKey
      },
      (analysisResult) => {
        // Hide loading
        loadingDiv.classList.remove('show');
        analyzeBtn.disabled = false;

        if (analysisResult.success) {
          // Show results
          resultsContent.innerHTML = formatAnalysis(analysisResult.analysis);
          resultsDiv.classList.add('show');
          showStatus('Analysis complete!', 'success');
        } else {
          showStatus('Analysis failed: ' + analysisResult.error, 'error');
        }
      }
    );

  } catch (error) {
    console.error('Error:', error);
    showStatus('Error: ' + error.message, 'error');
    loadingDiv.classList.remove('show');
    analyzeBtn.disabled = false;
  }
}

/**
 * Event listeners
 */
saveApiKeyBtn.addEventListener('click', saveApiKey);
analyzeBtn.addEventListener('click', analyzeArticle);

// Allow Enter key to save API key
apiKeyInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    saveApiKey();
  }
});

// Load API key on popup open
loadApiKey();
