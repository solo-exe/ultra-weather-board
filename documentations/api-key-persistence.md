# API Key Persistence Implementation

## Overview
This document describes the implementation of persistent API key storage using localStorage with a 30-minute expiration mechanism for the Ultra Weather Board application.

## Current Implementation

The current implementation stores the API key in React component state:
- **State Management**: `useState<string | undefined>(undefined)` in [`App.tsx`](file:///Users/solomon/Documents/Repos/Personal/ultra-weather-board-repos/ultra-weather-board/src/App.tsx)
- **Submission Handler**: `handleApiKeySubmit` function processes form data and sets the API key in state
- **Display Logic**: The API key form is conditionally rendered when no API key exists
- **Limitation**: API key is lost on page refresh or when the user navigates away

## Proposed Changes

### 1. Create Utility Module
**File**: `src/utils/apiKeyStorage.ts`

This module will handle all localStorage operations for API key management:
- **`saveApiKey(key: string)`**: Stores the API key with a timestamp
- **`getApiKey()`**: Retrieves the API key if it exists and hasn't expired
- **`clearApiKey()`**: Removes the API key from localStorage
- **Expiration Logic**: Automatically validates the 30-minute expiration window

**Storage Format**:
```typescript
{
  apiKey: string,
  expiresAt: number // Unix timestamp
}
```

### 2. Modify App Component
**File**: [`App.tsx`](file:///Users/solomon/Documents/Repos/Personal/ultra-weather-board-repos/ultra-weather-board/src/App.tsx)

Changes:
- **Initialize State**: Load API key from localStorage on component mount using `useEffect`
- **Update Handler**: Modify `handleApiKeySubmit` to save the API key to localStorage
- **Expiration Check**: Add periodic check (using `useEffect` with interval) to clear expired API key from state

### 3. Update API Key Form
**File**: [`ApiKeyForm.tsx`](file:///Users/solomon/Documents/Repos/Personal/ultra-weather-board-repos/ultra-weather-board/src/components/ApiKeyForm.tsx)

Changes:
- Update the description text to reflect that the API key will be stored in localStorage
- Update text to mention the 30-minute expiration
- Add optional "Clear API Key" button for users who want to manually remove their key

## Implementation Details

### Security Considerations
- **localStorage**: While not encrypted, it's appropriate for API keys that are meant to be used client-side
- **Domain Isolation**: localStorage is isolated per domain, preventing cross-site access
- **Expiration**: 30-minute timeout reduces exposure if a user forgets to clear their key
- **User Control**: Users can manually clear the key at any time

### Expiration Mechanism
1. When saving: Store current timestamp + 30 minutes (1800000 ms)
2. When retrieving: Compare current time with stored expiration time
3. Auto-cleanup: If expired, automatically remove from localStorage and state

### Edge Cases Handled
- Invalid data in localStorage (corrupted JSON)
- Missing expiration timestamp
- Clock skew or manipulation (reasonable tolerance)
- Multiple tabs/windows (localStorage events for synchronization)

## Files Modified

1. **[NEW]** [`src/utils/apiKeyStorage.ts`](file:///Users/solomon/Documents/Repos/Personal/ultra-weather-board-repos/ultra-weather-board/src/utils/apiKeyStorage.ts) - Utility functions for API key storage
2. **[MODIFY]** [`src/App.tsx`](file:///Users/solomon/Documents/Repos/Personal/ultra-weather-board-repos/ultra-weather-board/src/App.tsx) - Integration with localStorage utilities
3. **[MODIFY]** [`src/components/ApiKeyForm.tsx`](file:///Users/solomon/Documents/Repos/Personal/ultra-weather-board-repos/ultra-weather-board/src/components/ApiKeyForm.tsx) - Updated UI text and added clear button

## Testing Plan

1. **Manual Testing**:
   - Submit an API key and verify it persists across page refreshes
   - Wait 30 minutes and verify the key expires
   - Test clearing the key manually
   - Verify the form reappears when key is cleared or expired

2. **Edge Case Testing**:
   - Manually corrupt localStorage data
   - Test with multiple browser tabs open
   - Test with browser developer tools (localStorage inspection)

## Benefits

- ✅ **Persistence**: API key survives page refreshes
- ✅ **Security**: Automatic expiration after 30 minutes
- ✅ **User Experience**: Users don't need to re-enter their key repeatedly
- ✅ **Control**: Users can manually clear their key anytime
- ✅ **Clean Code**: Separated concerns with dedicated utility module
