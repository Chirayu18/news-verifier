# Changelog - Political News Rationalizer

## Version 2.0.0 (Current) - Major Dashboard Upgrade

### 🎉 NEW FEATURES

#### Quick Summary Scorecard
- Added comprehensive scorecard at the top of analysis
- Displays: Fallacy count, bias count, objectivity score (0-10), emotional level, source diversity, fact-to-opinion ratio
- Purple gradient design with grid layout
- Instant overview before diving into details

#### Comprehensive Fallacy & Bias Coverage
- **Expanded from 8 to 18 statistical fallacies** checked
- **Expanded from 8 to 18 cognitive biases** checked
- Total: 36 distinct issues now detected
- Each type clearly named and explained

#### Confidence Scores
- AI now reports confidence level for each detection (e.g., "85% confident")
- Adds transparency to the analysis
- Helps users understand detection certainty
- Displayed as blue badges next to each finding

#### Rewrite Suggestions
- Shows HOW biased/fallacious text could be rewritten objectively
- Educational feature to learn better phrasing
- Green boxes with suggested rewrites
- Available for both fallacies and biases

#### Bias Spectrum Visualization
- **Emotional Language Score**: 0-10 scale with visual progress bar
- **Source Diversity Score**: 0-10 scale with visual bar
- **Objectivity Score**: Master metric with visual representation
- **Political Leaning**: Identifies position on political spectrum
- **Fact-to-Opinion Ratio**: Color-coded breakdown (green/orange)
- All with gradient progress bars and labels

#### Enhanced UI/UX
- Expanded dashboard from 400px to 600px width
- Increased max height from 300px to 500px for results
- Better color coding for different sections
- Improved visual hierarchy
- More professional gradient effects
- Enhanced readability with spacing

### 🔧 IMPROVEMENTS

#### AI Prompt Enhancement
- Restructured prompt for better-structured responses
- Added explicit instructions for all 36 fallacy/bias types
- Requests specific formatting for parsing
- Includes rewrite suggestions in prompt
- Asks for spectrum analysis metrics

#### Parser Upgrades
- Updated regex patterns to extract confidence scores
- Added parsing for rewrite suggestions
- Extracts spectrum visualization data
- Handles scorecard metrics
- More robust fallback handling

#### Visual Design
- New scorecard component with gradient background
- Progress bars for spectrum visualization
- Confidence badges with blue styling
- Rewrite boxes with green border
- Enhanced excerpt highlighting
- Better section icons and spacing

### 📋 COMPLETE FEATURE LIST

**Statistical Fallacies (18 types):**
1. Cherry-picking / Selection bias
2. Correlation vs causation
3. Base rate neglect
4. Survivorship bias
5. Simpson's paradox
6. Misleading percentages
7. Sample size issues
8. Confounding variables
9. False dichotomy
10. Hasty generalization
11. Post hoc fallacy
12. Texas sharpshooter
13. Regression to mean
14. Gambler's fallacy
15. Ecological fallacy
16. Prosecutor's fallacy
17. Base rate fallacy
18. Statistical manipulation

**Cognitive Biases (18 types):**
1. Confirmation bias
2. Availability heuristic
3. Anchoring bias
4. Bandwagon effect
5. Authority bias
6. Emotional reasoning
7. In-group/out-group bias
8. False consensus effect
9. Negativity bias
10. Recency bias
11. Framing effect
12. Hindsight bias
13. Dunning-Kruger implications
14. Halo effect
15. Just-world hypothesis
16. Attribution error
17. Sunk cost implications
18. Status quo bias

---

## Version 1.0.0 - Initial Release

### Features
- Basic legitimacy checker
- Claude AI integration (later changed to Gemini)
- Simple analysis of news articles
- Basic bias detection (8 types)
- Basic fallacy detection (8 types)
- 400px popup interface
- API key storage

### Known Issues in v1.0
- Limited fallacy coverage
- No confidence scores
- No visual spectrum analysis
- No rewrite suggestions
- Smaller UI
- Less detailed analysis

---

## Migration Notes (v1 → v2)

### Breaking Changes
- Changed from Claude API to Google Gemini API
- API key format changed (sk-ant-* → AIza*)
- Expanded analysis takes slightly longer (more thorough)

### Data Migration
- Old API keys need to be replaced with Gemini keys
- No other data migration needed (local storage only)

### What's Removed
- Claude-specific error handling
- Smaller 400px UI (now 600px)

### What's Added
- Everything in v2.0 features list above
- FEATURES.md documentation
- CHANGELOG.md (this file)

---

## Roadmap (Future Versions)

### Planned for v2.1
- Comparison mode (analyze two articles side-by-side)
- History tracking
- Export to PDF

### Planned for v3.0
- Source credibility database
- Batch analysis
- Custom detection profiles
- Browser shortcuts

### Under Consideration
- Firefox extension port
- Mobile version
- API for developers
- Plugin system for custom checks

---

**Current Version**: 2.0.0  
**Release Date**: December 2025  
**Status**: Production Ready  
**License**: Educational/Personal Use
