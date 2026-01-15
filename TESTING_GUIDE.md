# Testing Guide - Interaction Tracking & TMDB Features

## Prerequisites
- Backend deployed with fixes (interactions, TMDB search, cast/crew)
- Frontend running locally or deployed
- User account created and logged in

## 1. Test Interaction Tracking

### Setup
1. Open browser DevTools (F12)
2. Go to Console tab
3. Go to Network tab and filter by "interactions"

### Test View Interactions
**Steps**:
1. Login to the app
2. Navigate to any movie detail page
3. Check Console for: `[Interaction] Tracked: view movie <uuid>`
4. Check Network tab for POST to `/interactions`
5. Verify response: `{"message": "Interaction tracked", "success": true}`

**Expected**:
- Console shows debug message
- Network shows 200 OK response
- No errors in console

### Test Click Interactions
**Steps**:
1. Go to Home page
2. Click on any movie card
3. Check Console for: `[Interaction] Tracked: click movie <uuid>`
4. Go to Search page
5. Click on any movie
6. Check Console again

**Expected**:
- Each click tracked separately
- Debouncing prevents duplicates (clicking same item rapidly = 1 request)

### Test Search Interactions
**Steps**:
1. Go to Search page
2. Type "inception" (min 3 characters)
3. Wait for results
4. Check Console for multiple: `[Interaction] Tracked: search movie <uuid>`
5. Check Network tab for multiple POST requests

**Expected**:
- One interaction per movie in results
- All tracked asynchronously

### Test Offline Queue
**Steps**:
1. Open DevTools → Network tab
2. Set throttling to "Offline"
3. Click on several movies
4. Check Console for: `[Interaction] Queued: ...`
5. Set throttling back to "Online"
6. Check Console for: `[Interaction] Processing queue: X items`

**Expected**:
- Interactions queued when offline
- Automatically sent when back online

---

## 2. Test TMDB Search Fallback

### Test Database Search (Normal)
**Steps**:
1. Go to Search page
2. Search for a movie you know exists (e.g., "The Godfather")
3. Check results - should be instant
4. No blue notification banner

**Expected**:
- Fast results (<500ms)
- No "Results from TMDb" banner

### Test TMDB Fallback
**Steps**:
1. Go to Search page
2. Search for a very new movie not in DB (e.g., "The Matrix Resurrections")
3. Wait 2-3 seconds
4. Check for blue notification banner: "Results from TMDb"
5. Search same movie again - should be instant now

**Expected**:
- First search: slower (2-3s), blue banner
- Second search: fast (<500ms), no banner (now in DB)

### Verify in Network Tab
**Steps**:
1. Open DevTools → Network tab
2. Search for new movie
3. Look for request to `/search/semantic`
4. Check response JSON for `"source": "tmdb"`

**Expected Response**:
```json
{
  "query": "The Matrix Resurrections",
  "results": [...],
  "source": "tmdb"
}
```

---

## 3. Test Cast & Crew Display

### Test Movie Details
**Steps**:
1. Go to any movie detail page
2. Scroll down to "Cast & Crew" section
3. Verify you see:
   - **Crew** (left column): Names with job titles (e.g., "Jack Hill - Director")
   - **Cast** (right column): Actor names with character names (e.g., "Tom Hanks as Forrest Gump")

**Expected**:
- Two-column layout
- Text only (no images)
- Crew shows: Name - Job
- Cast shows: Name as Character

### Test Without Details
**Steps**:
1. Open DevTools → Network tab
2. Navigate to movie detail page
3. Look for request to `/movies/{id}?include_details=true`
4. Check response includes `genres`, `cast`, `crew`

**Expected**:
- Request includes `include_details=true` parameter
- Response has cast/crew arrays
- UI displays the data

---

## 4. Integration Testing

### Full User Flow
**Steps**:
1. **Login** → Check no errors
2. **Home page** → Click featured movie → Check interaction tracked
3. **Movie detail** → Check view tracked, cast/crew displayed
4. **Rate movie** → Give 5 stars
5. **Search** → Search "action movies" → Check search interactions
6. **Click result** → Check click tracked
7. **Recommendations** → Check personalized section
8. **Click recommendation** → Check click tracked

**Expected**:
- All interactions tracked
- No console errors
- Smooth user experience
- Network requests succeed

---

## 5. Error Scenarios

### Invalid UUID
**Steps**:
1. Open Console
2. Run: `interactionService.trackView('invalid-uuid', 'movie')`
3. Check Console for warning: `[Interaction] Invalid UUID format: invalid-uuid`

**Expected**:
- Warning logged
- No API request sent
- No UI errors

### Unauthenticated User
**Steps**:
1. Logout
2. Browse movies
3. Click on movies
4. Check Network tab - no `/interactions` requests

**Expected**:
- No tracking when logged out
- No errors
- App works normally

### Network Error
**Steps**:
1. Login
2. Open DevTools → Network tab
3. Set throttling to "Offline"
4. Click on movie
5. Check Console for: `[Interaction] Queued: ...`
6. Go back online
7. Check interactions sent

**Expected**:
- Graceful handling
- Queued for later
- Sent when online

---

## 6. Performance Testing

### Check Response Times
**Steps**:
1. Open DevTools → Network tab
2. Perform various actions
3. Check timing for each request:
   - Interactions: <100ms
   - Search (DB): <500ms
   - Search (TMDB): 2-3s first time, <500ms after
   - Movie details (no details): <100ms
   - Movie details (with details): 500ms-1s

**Expected**:
- Fast interactions
- TMDB only slow first time
- No blocking UI

---

## 7. Console Debugging

### Enable Debug Logs
Already enabled! Check Console for:

**Successful Tracking**:
```
[Interaction] Tracked: view movie ff0b9d75-3b2f-403a-ab5b-1f18ab5e108f
[Interaction] Tracked: click movie ff0b9d75-3b2f-403a-ab5b-1f18ab5e108f
[Interaction] Tracked: search movie ff0b9d75-3b2f-403a-ab5b-1f18ab5e108f
```

**Queued (Offline)**:
```
[Interaction] Queued: {data: {...}, timestamp: 1234567890}
[Interaction] Processing queue: 5 items
```

**Warnings**:
```
[Interaction] Invalid UUID format: invalid-uuid
[Interaction] Failed: Invalid item_id format
```

**Errors**:
```
[Interaction] Error: Network error
```

---

## 8. Backend Verification

### Check Backend Logs (Koyeb)
1. Go to Koyeb dashboard
2. Open your service logs
3. Look for:

**Interactions**:
```
INFO: Interaction tracked: user=1, item=uuid, type=view
```

**TMDB Search**:
```
INFO: No results in DB for 'Inception', searching TMDB...
INFO: TMDB search returned 5 movies for query: Inception
INFO: Added movie from TMDB: Inception
```

**Cast/Crew**:
```
INFO: Fetching TMDB details for movie 12345
```

---

## Common Issues & Solutions

### Issue: Interactions not tracked
**Check**:
- User is logged in?
- Token valid?
- UUID format correct?
- Network tab shows requests?

### Issue: TMDB search not working
**Check**:
- TMDB_API_KEY set in Koyeb?
- Backend logs show TMDB errors?
- Rate limit exceeded?

### Issue: Cast/Crew not showing
**Check**:
- Movie has tmdb_id in database?
- Request includes `include_details=true`?
- Response includes cast/crew arrays?

### Issue: Console errors
**Check**:
- Browser console for error details
- Network tab for failed requests
- Backend logs for server errors

---

## Success Criteria

✅ All interactions tracked when authenticated  
✅ No interactions when logged out  
✅ TMDB fallback works for new movies  
✅ Cast & crew displayed on movie details  
✅ Offline queue works  
✅ No console errors  
✅ Fast performance  
✅ Smooth user experience  

---

## Next Steps After Testing

1. **Monitor** backend logs for errors
2. **Collect** interaction data for analytics
3. **Verify** recommendations improve over time
4. **Optimize** if performance issues found
5. **Add** more interaction types if needed

Happy testing! 🚀
