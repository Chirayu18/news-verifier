// Content script to extract article content from web pages

/**
 * Extract article content from the current page
 * Tries multiple selectors to find the main article content
 */
function extractArticleContent() {
  const selectors = [
    'article',
    '[role="article"]',
    '.article-content',
    '.post-content',
    '.entry-content',
    '.story-body',
    'main article',
    'main .content',
    '.article-body',
    '#article-body',
    '.post-body'
  ];

  let content = {
    title: '',
    text: '',
    url: window.location.href,
    domain: window.location.hostname,
    author: '',
    publishDate: ''
  };

  // Extract title
  content.title = document.querySelector('h1')?.innerText || 
                  document.querySelector('title')?.innerText || 
                  'No title found';

  // Try to extract author
  const authorSelectors = [
    '[rel="author"]',
    '.author-name',
    '.by-author',
    '[itemprop="author"]',
    '.article-author'
  ];
  
  for (const selector of authorSelectors) {
    const authorElement = document.querySelector(selector);
    if (authorElement) {
      content.author = authorElement.innerText.trim();
      break;
    }
  }

  // Try to extract publish date
  const dateSelectors = [
    'time[datetime]',
    '[itemprop="datePublished"]',
    '.publish-date',
    '.post-date',
    '.article-date'
  ];
  
  for (const selector of dateSelectors) {
    const dateElement = document.querySelector(selector);
    if (dateElement) {
      content.publishDate = dateElement.getAttribute('datetime') || 
                           dateElement.innerText.trim();
      break;
    }
  }

  // Try to find article content
  let articleElement = null;
  
  for (const selector of selectors) {
    articleElement = document.querySelector(selector);
    if (articleElement && articleElement.innerText.trim().length > 200) {
      break;
    }
  }

  // If no article element found, try to get the main content
  if (!articleElement || articleElement.innerText.trim().length < 200) {
    articleElement = document.querySelector('main') || document.body;
  }

  // Extract text content, removing scripts, styles, and navigation
  if (articleElement) {
    const clone = articleElement.cloneNode(true);
    
    // Remove unwanted elements
    const unwantedSelectors = [
      'script', 'style', 'nav', 'header', 'footer', 
      '.advertisement', '.ad', '.social-share', 
      '.comments', '.related-articles', 'aside',
      '[class*="ad-"]', '[id*="ad-"]'
    ];
    
    unwantedSelectors.forEach(selector => {
      clone.querySelectorAll(selector).forEach(el => el.remove());
    });

    // Get all paragraphs and headings
    const textElements = clone.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
    const paragraphs = Array.from(textElements)
      .map(el => el.innerText.trim())
      .filter(text => text.length > 0);
    
    content.text = paragraphs.join('\n\n');
  }

  // If still no content, get all paragraphs from the page
  if (!content.text || content.text.length < 100) {
    const paragraphs = Array.from(document.querySelectorAll('p'))
      .map(p => p.innerText.trim())
      .filter(text => text.length > 50);
    content.text = paragraphs.join('\n\n');
  }

  return content;
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractContent') {
    try {
      const articleContent = extractArticleContent();
      sendResponse({ success: true, content: articleContent });
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
  }
  return true; // Keep the message channel open for async response
});
