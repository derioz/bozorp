# 🧪 BozoRP — Alpha Testing Guide

> **Version:** Alpha 1.0
> **Date:** February 12, 2026
> **URL:** https://derioz.github.io/bozorp/

---

## Getting Started

1. Open the site at the URL above.
2. Browse the **public pages** first (homepage, staff section, gallery, rules).
3. Navigate to `/admin/login` to test the admin panel.

---

## Test 1 — Public Homepage

| # | Step | Expected Result | Pass? |
|---|---|---|---|
| 1.1 | Open the homepage | Page loads with hero section, animations, and dark theme | ☐ |
| 1.2 | Scroll through all sections | Navbar, Hero, Features, Activities, Gallery, Rules, Staff, CTA, Footer all render | ☐ |
| 1.3 | Click navbar links | Each link scrolls to the correct section | ☐ |
| 1.4 | Click the logo/name in the navbar | Returns to the top of the page | ☐ |
| 1.5 | Resize the browser to mobile width | Layout is responsive, no horizontal overflow, mobile menu works | ☐ |

---

## Test 2 — Staff Section (Public)

| # | Step | Expected Result | Pass? |
|---|---|---|---|
| 2.1 | Scroll to the Staff section | Staff cards appear with role-colored accents and animations | ☐ |
| 2.2 | Verify only visible staff show | Hidden staff (if any) should NOT appear | ☐ |
| 2.3 | Check sub-roles on cards | Sub-roles appear as small pill badges below the main role tag | ☐ |
| 2.4 | Click a staff card | Detail modal opens with name, bio, social links, and sub-roles | ☐ |
| 2.5 | Click outside the modal | Modal closes | ☐ |
| 2.6 | Verify staff order | Staff should appear in the order set by the admin | ☐ |

---

## Test 3 — Sign Up & Sign In

| # | Step | Expected Result | Pass? |
|---|---|---|---|
| 3.1 | Navigate to `/admin/login` | Login page loads with email/password form | ☐ |
| 3.2 | Click "Don't have an account? SIGN UP" | Form switches to sign-up mode, Display Name field appears | ☐ |
| 3.3 | Create an account with email + password | Account is created, redirected to admin dashboard | ☐ |
| 3.4 | Log out and sign in with the same credentials | Login succeeds, redirected to admin dashboard | ☐ |
| 3.5 | Try signing in with wrong password | Error message displayed, not redirected | ☐ |
| 3.6 | Click "Already have an account? SIGN IN" | Form switches back to sign-in mode | ☐ |
| 3.7 | Test Google sign-in button | Google OAuth popup appears, login succeeds | ☐ |

---

## Test 4 — Admin Dashboard

| # | Step | Expected Result | Pass? |
|---|---|---|---|
| 4.1 | After login, verify the dashboard loads | Shows welcome message and sidebar navigation | ☐ |
| 4.2 | Click each sidebar link (Staff, Rules, Gallery, Profile) | Each page loads without errors | ☐ |
| 4.3 | Verify mobile sidebar | On mobile, hamburger menu opens/closes the sidebar | ☐ |

---

## Test 5 — Staff Manager (Admin)

### 5A — Custom Positions
| # | Step | Expected Result | Pass? |
|---|---|---|---|
| 5A.1 | Click the "Positions" button (superadmin only) | Position Manager modal opens | ☐ |
| 5A.2 | Type a position name (e.g. "Community Manager") and click Add | Position appears in the list | ☐ |
| 5A.3 | Type in the input and verify no flickering/refresh | Input retains focus while typing | ☐ |
| 5A.4 | Add multiple positions | All positions appear in the list | ☐ |
| 5A.5 | Click the delete icon on a position | Position is removed (after confirmation) | ☐ |
| 5A.6 | Close the modal | Modal closes, positions are persisted | ☐ |

### 5B — Add Staff
| # | Step | Expected Result | Pass? |
|---|---|---|---|
| 5B.1 | Click "Add Staff" | Add Staff modal opens | ☐ |
| 5B.2 | Verify NO email/password fields | Only name, role, title, sub-roles fields are shown | ☐ |
| 5B.3 | Fill in a display name and select a role | Fields accept input | ☐ |
| 5B.4 | Select a title from the dropdown | Custom positions appear as options | ☐ |
| 5B.5 | Click sub-role chips to select sub-roles | Chips toggle on/off with visual feedback | ☐ |
| 5B.6 | Click "Add Staff Member" | Staff member is created and appears in the list | ☐ |

### 5C — Edit Staff
| # | Step | Expected Result | Pass? |
|---|---|---|---|
| 5C.1 | Click the edit (pencil) icon on a staff member | Edit modal opens with pre-filled data | ☐ |
| 5C.2 | Change the display name | Field updates | ☐ |
| 5C.3 | Upload a profile picture | Image uploads and preview updates | ☐ |
| 5C.4 | Change role (superadmin only) | Role dropdown works | ☐ |
| 5C.5 | Edit bio, social links (Discord, Twitter) | Fields save correctly | ☐ |
| 5C.6 | Toggle sub-roles on/off | Chips toggle with visual feedback | ☐ |
| 5C.7 | Toggle the visibility switch | Switch changes state | ☐ |
| 5C.8 | Click "Save Changes" | Modal closes, changes are reflected in the list | ☐ |

### 5D — Visibility Toggle
| # | Step | Expected Result | Pass? |
|---|---|---|---|
| 5D.1 | Click the eye icon on a visible staff member | Member becomes semi-transparent (50% opacity) in admin | ☐ |
| 5D.2 | Refresh the public Staff section | Hidden member does NOT appear on the public page | ☐ |
| 5D.3 | Click the eye icon again to re-show | Member returns to full opacity | ☐ |

### 5E — Drag to Reorder
| # | Step | Expected Result | Pass? |
|---|---|---|---|
| 5E.1 | Drag a staff row to a new position | Row moves, "Save Order" button appears | ☐ |
| 5E.2 | Click "Save Order" | Order is saved, button disappears | ☐ |
| 5E.3 | Refresh the page | Order is persisted | ☐ |
| 5E.4 | Check the public Staff section | Order matches the admin panel | ☐ |

### 5F — Remove Staff
| # | Step | Expected Result | Pass? |
|---|---|---|---|
| 5F.1 | Click the delete icon on a staff member | Confirmation dialog appears | ☐ |
| 5F.2 | Confirm deletion | Member is removed from the list | ☐ |
| 5F.3 | Try to delete the superadmin | Alert: "Cannot remove the superadmin" | ☐ |

---

## Test 6 — Rules Manager

| # | Step | Expected Result | Pass? |
|---|---|---|---|
| 6.1 | Navigate to the Rules tab | Existing rules are listed | ☐ |
| 6.2 | Add a new rule | Rule appears in the list | ☐ |
| 6.3 | Edit an existing rule | Changes are saved | ☐ |
| 6.4 | Delete a rule | Rule is removed from the list | ☐ |
| 6.5 | Check the public Rules section | Updated rules are displayed | ☐ |

---

## Test 7 — Gallery Manager

| # | Step | Expected Result | Pass? |
|---|---|---|---|
| 7.1 | Navigate to the Gallery tab | Existing images are listed | ☐ |
| 7.2 | Upload a new image | Image appears in the gallery | ☐ |
| 7.3 | Delete an image | Image is removed | ☐ |
| 7.4 | Check the public Gallery section | Updated images are displayed | ☐ |

---

## Test 8 — Cross-Browser & Mobile

| # | Step | Expected Result | Pass? |
|---|---|---|---|
| 8.1 | Test all above in Chrome | Everything works | ☐ |
| 8.2 | Test all above in Firefox | Everything works | ☐ |
| 8.3 | Test all above in Safari (if available) | Everything works | ☐ |
| 8.4 | Test on a mobile device or mobile emulator | Responsive layout, touch scrolling, modals work | ☐ |

---

## 🐛 Bug Report Template

If you find a bug, please report it with the following info:

```
**Test #:** (e.g. 5A.2)
**Browser/Device:** (e.g. Chrome 120 / iPhone 15)
**Steps to Reproduce:**
1. ...
2. ...
3. ...
**Expected:** What should happen
**Actual:** What actually happened
**Screenshot:** (if possible)
```

---

## Notes for Testers

- You need **superadmin** role to test the Positions button and Add Staff. Ask the project owner to set your role in Firestore.
- The site is at `https://derioz.github.io/bozorp/` — all admin routes are under `/admin/`.
- If you get a Firestore permission error when adding positions, the security rules may not be deployed yet. Report this.
- After testing, share your results by filling in the checkboxes and noting any issues.
