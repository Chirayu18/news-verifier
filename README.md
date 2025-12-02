# Political News Rationalizer 🧠

A Chrome extension that uses Google Gemini AI (100% FREE) to analyze political news articles for statistical fallacies, cognitive biases, and manipulation techniques.

## Features

### 🎯 Core Analysis

- **Statistical Fallacies Detection**: Identifies misleading statistics, cherry-picked data, correlation/causation confusion, and more
- **Cognitive Bias Identification**: Detects psychological manipulation tactics like confirmation bias, emotional reasoning, and bandwagon effects
- **Excerpt Highlighting**: Shows exact quotes where fallacies and biases occur
- **Detailed Explanations**: Explains WHY each fallacy matters and HOW it misleads readers

### 🛡️ Protection & Rationalization

- **Rationalization Questions**: Provides critical thinking questions to counter each identified bias
- **Protection Strategies**: Offers actionable steps to protect yourself from manipulation
- **Verification Methods**: Suggests specific sources and techniques to fact-check the article
- **Red Flags Summary**: Highlights the top warning signs in the content

### 📊 Advanced Dashboard Features

#### Quick Summary Scorecard
At-a-glance metrics displayed prominently:
- Total statistical fallacies found
- Total cognitive biases detected
- Objectivity score (0-10)
- Emotional language level
- Source diversity rating
- Fact-to-opinion ratio

#### Comprehensive Fallacy Detection
For each statistical fallacy:
- ✅ **Specific fallacy name** (18 types checked)
- 🎯 **Confidence score** (e.g., 85% certain)
- 📝 **Exact excerpt** from the article
- 💡 **Detailed explanation** of why it's misleading
- ⚠️ **Impact analysis** on reader understanding
- ✏️ **Rewrite suggestion** - how to phrase it objectively

#### In-Depth Bias Analysis
For each cognitive bias:
- ✅ **Specific bias name** (18 types checked)
- 🎯 **Confidence score** for transparency
- 📝 **Exact triggering excerpt**
- 🧠 **Manipulation mechanism** explained
- 🤔 **Rationalization questions** to counter the bias
- ✏️ **Objective rewrite** suggestion

#### Bias Spectrum Visualization
Interactive visual analysis:
- 📊 **Emotional Language Scale** (0-10 with progress bar)
- 📊 **Source Diversity Score** (visual indicator)
- 📊 **Objectivity Score** (overall rating)
- 🎨 **Political Leaning** identification
- 📈 **Fact-to-Opinion Ratio** (visual breakdown)

#### Enhanced Features
- **Color-Coded Sections**: Visual hierarchy for quick scanning
- **Confidence Badges**: AI transparency on detection certainty
- **Rewrite Suggestions**: Educational examples of objective phrasing
- **Organized Layout**: Logical flow from summary to details

### 💰 100% FREE

- Uses Google Gemini 2.0 Flash (completely free)
- No credit card required
- 15 requests per minute (more than enough for personal use)
- No hidden costs or subscriptions

## Installation

### Prerequisites

1. **Google Gemini API Key** (100% FREE): You need a free API key from Google
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy your API key (starts with `AIza`)

### Install the Extension

1. **Download or Clone** this repository to your computer

2. **Open Chrome Extensions Page**:
   - Open Chrome browser
   - Go to `chrome://extensions/`
   - Or click the three dots menu → More Tools → Extensions

3. **Enable Developer Mode**:
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the Extension**:
   - Click "Load unpacked"
   - Navigate to the `news-verifier-extension` folder
   - Click "Select Folder"

5. **Pin the Extension** (optional but recommended):
   - Click the puzzle piece icon in Chrome toolbar
   - Find "News Article Legitimacy Checker"
   - Click the pin icon to keep it visible

## Usage

### First Time Setup

1. Click the extension icon in your Chrome toolbar
2. Enter your Google Gemini API key in the input field
3. Click "Save Key"
4. Your key is now saved securely in your browser's local storage

### Analyzing Articles

1. Navigate to any news article webpage
2. Click the extension icon
3. Click "Analyze This Article"
4. Wait a few seconds while Claude analyzes the content
5. Review the comprehensive analysis

### Understanding the Dashboard

The analysis dashboard includes organized sections:

#### 📊 Statistical Fallacies Detected
- Lists each fallacy found (cherry-picking, correlation/causation, etc.)
- Shows exact excerpts from the article
- Explains why it's misleading
- Describes the impact on reader perception

#### 🧠 Cognitive Biases Invoked
- Identifies psychological manipulation tactics
- Shows triggering excerpts
- Explains how the bias manipulates thinking
- Provides rationalization questions to counter the bias

#### 🛡️ Protection Strategies
- Actionable steps to protect yourself
- Critical thinking techniques
- How to recognize similar tactics in future

#### 🔍 Verification Methods
- Specific alternative sources to check
- Where to find original data
- Fact-checking resources
- Critical questions to ask about claims

#### 🚩 Red Flags Summary
- Top warning signs in the article
- Quick reference for major issues

## Project Structure

```
news-verifier-extension/
├── manifest.json           # Extension configuration
├── popup.html             # Extension popup UI
├── scripts/
│   ├── popup.js          # Popup logic and UI interactions
│   ├── content.js        # Content extraction from webpages
│   └── background.js     # Claude API integration
├── icons/                # Extension icons (you need to add these)
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md             # This file
```

## Creating Icons

The extension requires three icon sizes. You can create simple icons using any image editor:

- **icon16.png**: 16x16 pixels
- **icon48.png**: 48x48 pixels  
- **icon128.png**: 128x128 pixels

Recommended icon theme: A newspaper with a checkmark or magnifying glass

Quick way to create placeholder icons using ImageMagick:
```bash
convert -size 16x16 xc:#667eea icons/icon16.png
convert -size 48x48 xc:#667eea icons/icon48.png
convert -size 128x128 xc:#667eea icons/icon128.png
```

Or use online icon generators like:
- [Favicon.io](https://favicon.io/)
- [IconKitchen](https://icon.kitchen/)

## API Costs

This extension uses the Google Gemini API which is **100% FREE**:

- **Model**: Gemini Pro
- **Cost**: FREE
- **Limits**: 15 requests per minute (more than enough for personal use)
- **No credit card required**

Check [Google AI Studio](https://ai.google.dev/pricing) for current limits.

## Privacy & Security

- Your API key is stored locally in your browser using `chrome.storage.local`
- The API key never leaves your computer except when making requests to Google Gemini API
- Article content is sent to Google Gemini API for analysis (as per Google's privacy policy)
- No data is collected or stored by this extension
- Completely free to use with no hidden costs

## Troubleshooting

### "Please save your API key first"
- Make sure you've entered a valid Google Gemini API key starting with `AIza`
- Get your free key from [Google AI Studio](https://aistudio.google.com/app/apikey)
- Click the "Save Key" button after entering the key

### "Could not extract enough content"
- The page might not be a traditional article format
- Try scrolling down to load the article content
- Some websites use JavaScript to load content dynamically

### "API request failed"
- Check that your API key is valid (get a new one from Google AI Studio if needed)
- Verify you have an internet connection
- Make sure you haven't exceeded the 15 requests per minute limit
- The API might be experiencing issues (check Google Cloud status page)

### Extension icon not showing
- Make sure you've created the icon files in the `icons/` folder
- Reload the extension from `chrome://extensions/`

## Limitations

- Requires internet connection for Google Gemini API
- Free tier has a limit of 15 requests per minute (sufficient for personal use)
- May not work perfectly on all website layouts
- Some websites with heavy JavaScript may not be fully supported

## Development

To modify the extension:

1. Edit the relevant files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes

## License

This project is provided as-is for educational and personal use.

## Support

For issues with:
- **The extension**: Check the troubleshooting section above
- **Google Gemini API**: Visit [Google AI Studio Help](https://ai.google.dev/docs)
- **Chrome Extensions**: See [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)

## Why Use This Extension?

- **🧠 Think Critically**: Learn to spot manipulation in real-time
- **📚 Educational**: Understand statistical fallacies and cognitive biases
- **🛡️ Stay Protected**: Get specific strategies to counter manipulation
- **100% FREE**: No credit card required, no hidden costs
- **⚡ Fast Analysis**: Get comprehensive results in seconds
- **🔒 Privacy-Focused**: Your data stays with you, API key stored locally
- **🎯 Easy to Use**: One-click analysis from any political news article
- **🚀 Powered by Google**: Uses advanced Gemini 2.0 Flash AI

## What Makes This Different?

Unlike simple fact-checkers, this extension:

1. **Comprehensive Analysis**: Checks for 18 statistical fallacies + 18 cognitive biases
2. **Visual Intelligence**: Bias spectrum with progress bars, scores, and metrics
3. **Educational Focus**: Shows HOW to rewrite biased content objectively
4. **Transparent AI**: Displays confidence scores for each detection
5. **Quick Summary**: Scorecard shows counts and metrics at a glance
6. **Teaches Critical Thinking**: Provides rationalization questions for each bias
7. **Evidence-Based**: Shows exact excerpts where issues occur
8. **Actionable**: Specific strategies to protect yourself and verify claims

## Key Improvements in v2.0

### 🎯 New Features
- ✅ **Quick Summary Scorecard**: See fallacy/bias counts, objectivity score, and key metrics instantly
- ✅ **Confidence Scores**: AI shows how certain it is (e.g., "85% confident") for transparency
- ✅ **Rewrite Suggestions**: Learn by seeing how biased text can be rewritten objectively
- ✅ **Bias Spectrum Visualization**: Visual progress bars for emotional language, source diversity, objectivity
- ✅ **Comprehensive Coverage**: Now checks 36 total issues (18 fallacies + 18 biases)
- ✅ **Political Leaning Detection**: Identifies where article falls on political spectrum
- ✅ **Fact-to-Opinion Ratio**: Visual breakdown of factual vs opinion content
- ✅ **Enhanced UI**: Larger 600px dashboard with organized, color-coded sections

## Complete List of Fallacies & Biases Detected

### 📊 Statistical Fallacies (18 Types)
1. **Cherry-picking data / Selection bias** - Selecting only favorable data
2. **Correlation vs causation fallacy** - Assuming correlation implies causation
3. **Base rate neglect** - Ignoring underlying probability
4. **Survivorship bias** - Focusing only on successes
5. **Simpson's paradox** - Trend reverses when data is combined
6. **Misleading percentages** - Using percentages to distort reality
7. **Sample size issues** - Drawing conclusions from too few examples
8. **Confounding variables ignored** - Missing hidden factors
9. **False dichotomy** - Presenting only two options when more exist
10. **Hasty generalization** - Jumping to conclusions too quickly
11. **Post hoc ergo propter hoc** - Assuming sequence implies causation
12. **Texas sharpshooter fallacy** - Cherry-picking clusters in random data
13. **Regression to the mean misinterpretation** - Misunderstanding natural variation
14. **Gambler's fallacy** - Believing past events affect independent future events
15. **Ecological fallacy** - Inferring individual traits from group data
16. **Prosecutor's fallacy** - Misunderstanding conditional probability
17. **Base rate fallacy** - Ignoring prior probabilities
18. **Statistical manipulation** - General misuse of numbers

### 🧠 Cognitive Biases (18 Types)
1. **Confirmation bias** - Seeking information that confirms beliefs
2. **Availability heuristic** - Overweighting easily recalled information
3. **Anchoring bias** - Over-relying on first information heard
4. **Bandwagon effect** - Believing something because others do
5. **Authority bias** - Trusting authority figures uncritically
6. **Emotional reasoning** - Using emotions as evidence
7. **In-group/out-group bias** - Favoring your group over others
8. **False consensus effect** - Assuming others agree with you
9. **Negativity bias** - Focusing more on negative information
10. **Recency bias** - Overweighting recent events
11. **Framing effect** - Being influenced by how information is presented
12. **Hindsight bias** - Believing you "knew it all along"
13. **Dunning-Kruger effect** - Overconfidence from lack of knowledge
14. **Halo effect** - Letting one trait influence overall judgment
15. **Just-world hypothesis** - Believing people get what they deserve
16. **Fundamental attribution error** - Blaming character over circumstances
17. **Sunk cost fallacy** - Continuing because of past investment
18. **Status quo bias** - Preferring things to stay the same

## Contributing

Feel free to fork and improve this extension. Suggestions for improvements:

- Add support for batch analysis
- Save analysis history
- Export reports as PDF
- Add more news source databases
- Implement caching to reduce API calls
- Add keyboard shortcuts
- Support for more languages

---

**Disclaimer**: This tool provides AI-generated analysis and should be used as one of many tools in evaluating news sources. Always use critical thinking and verify information from multiple sources.
