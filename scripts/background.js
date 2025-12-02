// Background service worker for Google Gemini API integration
// Political News Rationalizer v3.0 - Research-Based Statistical Fallacy Detection

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

/**
 * Analyze article content using Google Gemini API with research-backed fallacy detection
 */
async function analyzeWithGemini(articleContent, apiKey) {
  try {
    const prompt = `You are an expert statistical analyst and cognitive psychologist specializing in identifying statistical fallacies and cognitive biases in news articles.

Article Title: ${articleContent.title}
URL: ${articleContent.url}
Domain: ${articleContent.domain}
${articleContent.author ? `Author: ${articleContent.author}` : ''}
${articleContent.publishDate ? `Published: ${articleContent.publishDate}` : ''}

Article Content:
${articleContent.text}

Your task is to analyze this article for 10 SPECIFIC statistical fallacies and identify the cognitive biases they exploit.

=== STATISTICAL FALLACIES TO DETECT ===

1. FALSE CAUSALITY (Post Hoc Ergo Propter Hoc)
   - Definition: Assuming Event A caused Event B just because A preceded B
   - Detection Signals:
     * "After X happened, Y occurred, so X caused Y"
     * Temporal sequence presented as causal
     * No discussion of confounding variables
     * Missing mechanism explanation
   - Cognitive Biases Exploited: Illusory correlation, confirmation bias, narrative fallacy, hindsight bias
   - Example: "Crime dropped after new mayor took office, proving policies work"

2. GAMBLER'S FALLACY
   - Definition: Believing past independent events affect future probabilities
   - Detection Signals:
     * Words like "due," "overdue," "bound to happen"
     * "Can't keep winning/losing forever"
     * Expecting mean reversion in independent events
   - Cognitive Biases Exploited: Representativeness heuristic, clustering illusion, recency bias
   - Example: "Market has gone up 5 days straight, correction is due"

3. MCNAMARA FALLACY
   - Definition: Over-reliance on quantifiable metrics while ignoring important qualitative factors
   - Detection Signals:
     * Singular focus on easily measured metrics
     * Missing qualitative context
     * "What gets measured gets managed" mindset
     * Proxy metrics replacing actual goals
   - Cognitive Biases Exploited: Quantification bias, availability heuristic, anchoring bias, reductionism
   - Example: "Test scores up 15%, education reform works" (ignoring creativity, critical thinking)

4. REGRESSION TOWARD THE MEAN
   - Definition: Extreme measurements naturally followed by more moderate ones; mistaken for intervention effect
   - Detection Signals:
     * Intervention applied at extreme high/low point
     * Dramatic "turnaround" stories
     * Before-after without control groups
     * Single data point comparisons
   - Cognitive Biases Exploited: Illusion of control, narrative fallacy, confirmation bias, attribution error
   - Example: "Worst-performing schools improved after new program" (natural regression from extreme)

5. SURVIVORSHIP BIAS
   - Definition: Focusing on successes while ignoring failures that were filtered out
   - Detection Signals:
     * Success stories without failure mentions
     * "Successful people all share X trait"
     * Historical analysis ignoring lost records
     * Sample selected based on outcome
   - Cognitive Biases Exploited: Availability heuristic, confirmation bias, hindsight bias, optimism bias
   - Example: "Billionaire dropouts prove college unnecessary" (ignoring failed dropouts)

6. CHERRY PICKING (Selection Bias)
   - Definition: Selectively presenting data that supports conclusion while ignoring contradictory evidence
   - Detection Signals:
     * Specific time periods chosen
     * Unusual starting/ending points
     * Selective examples without full context
     * "Studies show" without naming which
   - Cognitive Biases Exploited: Confirmation bias, anchoring bias, availability heuristic, in-group bias
   - Example: "Crime up 15% under current administration" (selecting specific period)

7. DATA DREDGING (P-Hacking, Texas Sharpshooter)
   - Definition: Testing many hypotheses until finding significant results by chance
   - Detection Signals:
     * Highly specific findings (day of week, exact percentage)
     * No theoretical mechanism proposed
     * First study on topic with "surprising" result
     * No replication studies
   - Cognitive Biases Exploited: Apophenia, confirmation bias, availability heuristic, narrative fallacy
   - Example: "Eating blueberries every Tuesday reduces cancer 18%" (massive multiple testing)

8. HAWTHORNE EFFECT
   - Definition: Behavior changes when people know they're being observed; temporary performance improvement
   - Detection Signals:
     * Short study duration (weeks, not months)
     * Results measured during intervention only
     * No long-term follow-up
     * Awareness of observation mentioned
   - Cognitive Biases Exploited: Recency bias, optimism bias, novelty effect, social desirability bias
   - Example: "Monitoring software boosts productivity 25%" (temporary effect while watched)

9. SAMPLING BIAS
   - Definition: Drawing conclusions from non-representative sample
   - Detection Signals:
     * Convenience samples (easiest to reach)
     * Self-selection (volunteers)
     * "Poll shows" without methodology
     * High non-response rates
     * Missing demographic information
   - Cognitive Biases Exploited: Availability heuristic, confirmation bias, representativeness heuristic, bandwagon effect
   - Example: "Poll shows 75% support" (online poll, self-selected respondents)

10. OVERFITTING
    - Definition: Model fit too closely to specific data; poor generalization to new data
    - Detection Signals:
      * Perfect or near-perfect historical performance
      * No out-of-sample validation
      * Very complex models with many variables
      * Predictions too specific/confident
    - Cognitive Biases Exploited: Pattern recognition bias, hindsight bias, overconfidence effect, authority bias
    - Example: "Economic model predicts recession with 95% accuracy" (overfit to historical data)

=== YOUR OUTPUT FORMAT ===

Structure your response EXACTLY as follows:

## DASHBOARD METRICS
- Total Fallacies: [number]
- Objectivity: [0-10]
- Legitimacy: [High/Medium/Low]

## FALLACY INSTANCES

IMPORTANT: Report EACH instance of a fallacy SEPARATELY. If the same fallacy type appears 3 times in the article, create 3 separate entries.

For EACH fallacy instance found:

**Fallacy:** [One of the 10 fallacy names]
**Confidence:** [Percentage]
**Location:** "[Exact quote, 1 sentence max]"
**Why Misleading:** [One concise sentence]
**Biases Exploited:** [2-3 bias names]
**Better Version:** "[Rewrite in 1 sentence]"

---

If NO fallacies: "✓ No statistical fallacies detected."

## CRITICAL THINKING

For readers to protect themselves:
1. [One actionable question to ask]
2. [One actionable question to ask]  
3. [One actionable question to ask]

## FACT-CHECK

Where to verify:
- [Specific source 1]
- [Specific source 2]
- [Specific source 3]

=== IMPORTANT ANALYSIS GUIDELINES ===

1. Be SPECIFIC: Use exact fallacy names from the list above
2. Be EVIDENCE-BASED: Always provide exact excerpts
3. Be CONFIDENT: Only flag fallacies you're 60%+ confident about
4. Be EDUCATIONAL: Explain WHY it's misleading, not just WHAT is wrong
5. Be CONSTRUCTIVE: Provide rewrite suggestions showing better phrasing
6. Be THOROUGH: Check for ALL 10 fallacies systematically
7. Be HONEST: If article is well-written and objective, say so

Priority order (most harmful first):
1. False Causality
2. Cherry Picking  
3. Survivorship Bias
4. Sampling Bias
5. McNamara Fallacy
6. Data Dredging
7. Regression to Mean
8. Gambler's Fallacy
9. Hawthorne Effect
10. Overfitting

Remember: Your goal is to EDUCATE readers about statistical reasoning, not just criticize articles. Be fair, thorough, and helpful.`;

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
      throw new Error('Invalid response format from Gemini API');
    }

    return {
      success: true,
      analysis: data.candidates[0].content.parts[0].text
    };

  } catch (error) {
    console.error('Gemini API Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Listen for messages from popup
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyzeArticle') {
    // Handle async API call
    analyzeWithGemini(request.articleContent, request.apiKey)
      .then(result => sendResponse(result))
      .catch(error => sendResponse({ success: false, error: error.message }));
    
    return true; // Keep the message channel open for async response
  }
});

/**
 * Handle extension installation
 */
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Political News Rationalizer v3.0 installed successfully');
  }
});
