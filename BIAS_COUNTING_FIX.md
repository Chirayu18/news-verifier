# Cognitive Bias Counting Bug Fix

## The Problem

**Symptoms:**
- Dashboard shows "Total Biases: 4"
- But scrolling down shows "✓ No Cognitive Biases Detected"
- Users see contradiction between metrics and actual content

**Root Cause:**

Gemini AI was confused about what to count as "Total Biases":

1. **What Gemini was doing WRONG:**
   - Counting biases mentioned in "Biases Exploited" field under FALLACY INSTANCES
   - Including those in "Total Biases" metric
   - But NOT creating separate bias cards in COGNITIVE BIAS INSTANCES section
   - Outputting "No cognitive biases detected" in bias section

2. **Example of wrong behavior:**
   ```
   ## DASHBOARD METRICS
   Total Biases: 4  ← Counting from fallacy section
   
   ## FALLACY INSTANCES
   **Biases Exploited:** Confirmation Bias, Authority Bias, Recency Bias, Anchoring Bias
   
   ## COGNITIVE BIAS INSTANCES
   ✓ No cognitive biases detected.  ← Empty!
   ```

## The Fix

**Changes Made to `scripts/background.js`:**

### 1. Dashboard Metrics Instructions (Line 184-188)
**BEFORE:**
```
## DASHBOARD METRICS
- Total Fallacies: [number]
- Total Biases: [number]
```

**AFTER:**
```
## DASHBOARD METRICS
- Total Fallacies: [number of fallacy instances found]
- Total Biases: [number of STANDALONE cognitive bias instances found - count ONLY biases in COGNITIVE BIAS INSTANCES section, NOT those mentioned in fallacies]
```

### 2. Cognitive Bias Section Instructions (Line 207-215)
**BEFORE:**
```
## COGNITIVE BIAS INSTANCES

IMPORTANT: Report EACH cognitive bias instance SEPARATELY (beyond those already mentioned in fallacies).
```

**AFTER:**
```
## COGNITIVE BIAS INSTANCES

CRITICAL INSTRUCTIONS:
1. This section is COMPLETELY INDEPENDENT from the fallacy section above
2. Do NOT count or reference biases mentioned in "Biases Exploited" in fallacies
3. Look FRESH at the article for the 10 cognitive biases listed above
4. Report EACH cognitive bias instance you find as a NEW, SEPARATE entry
5. Even if a similar bias was mentioned in fallacies, report it HERE if you find it in the article
6. The "Total Biases" count in dashboard should ONLY count biases in THIS section
```

## Expected Behavior After Fix

**Correct Output:**
```
## DASHBOARD METRICS
Total Fallacies: 2
Total Biases: 3  ← Counting ONLY from COGNITIVE BIAS INSTANCES section

## FALLACY INSTANCES
**Fallacy:** FALSE CAUSALITY
**Biases Exploited:** Confirmation Bias, Authority Bias

---

## COGNITIVE BIAS INSTANCES

**Bias:** CONFIRMATION BIAS
**Confidence:** 75%
**Location:** "Scientists are pretty sure..."
**How It Manipulates:** Uses certainty language without evidence
**Counter Strategy:** Ask for peer-reviewed studies and error margins

---

**Bias:** AUTHORITY BIAS
**Confidence:** 80%
**Location:** "Experts say..."
**How It Manipulates:** Appeals to unnamed authorities
**Counter Strategy:** Demand specific names and credentials

---

**Bias:** RECENCY BIAS
**Confidence:** 70%
**Location:** "Recent findings suggest..."
**How It Manipulates:** Implies new = better without context
**Counter Strategy:** Check if findings are replicated
```

## Testing Checklist

- [ ] Dashboard "Total Biases" count matches number of bias cards shown
- [ ] Bias cards appear with cyan borders (not just empty state)
- [ ] Each bias has: icon, confidence, quote, manipulation, counter strategy
- [ ] No contradiction between dashboard metrics and displayed content
- [ ] Fallacy section still shows "Biases Exploited" (that's fine)
- [ ] Cognitive Bias section shows SEPARATE standalone analysis

## Files Modified

1. `/scripts/background.js` - Lines 184-188, 207-215
   - Clarified dashboard metrics counting rules
   - Added explicit 6-point instructions for cognitive bias section
   - Made it clear: biases are INDEPENDENT analysis from fallacies

## Version

Fixed in: v3.2.0
Date: December 2, 2025
