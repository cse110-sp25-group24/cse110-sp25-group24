# BeeZee 24/7 Standup Notes

**Date:** 2025-05-27  
**Time:** 6:20 PM – 06:45 PM  
**Location/Tool:** In person  
**Facilitator:** Alexis Vega  
**Notetaker:** Alexis Vega  

---

## ✅ Attendance

| Team Member               | Present? | Notes (remote, etc.) |
|--------------------------|----------|-----------------------|
| Alexis Vega              | ✅       |                       |
| Aruthan Raveendra        | ✅       |                       |
| Chris Enotiadis          | ❌       |                       |
| Eric Song                | ✅       |                       |
| Myat Thiha               | ✅       |                       |
| Noeh Parrales            | ✅       |                       |
| Phiroze Duggal           | ❌       |                       |
| Thanh-Long Nguyen Trong  | ✅       |                       |
| Vincent Nguyen           | ✅       |                       |
| William Widjaja          | ❌       |                       |
| Yilong Chen              | ✅       |                       |

---

## 🧠 Agenda

- Merge code branches together into `main` (may have conflicts)  
- Verify frontend performs as expected  
- Clarify feature status (Shadow DOM, Map interaction, Form routing)  
- Assign remaining backend and integration tasks  
- Finalize testing plan and understand CI/CD testing expectations  
- Set up dedicated Slack threads per subteam  

---

## 📌 Key Discussion Points

- `TL` restructured the repo; PR was made but had no direction due to merge conflicts  
- Merge should be resolved by **end of week**  
- Shadow DOM responsibility = **Yilong**  
- Map backend: **store coordinates + place markers** (requires frontend input)  
- Clicking the map should **return coordinates**, for user to add memory card  
- **Eric** to be given clearer API expectations for frontend to backend communication  
- Code refactor for backend can happen next week (low priority)  
- **CI/CD testing:** Currently using Jest + manual testing  
- **Unit testing**: sufficient for backend logic  
- **End-to-End testing**: not necessary for card storage  

---

## 📋 Task Delegations

| Task                                     | Assigned To             |
|------------------------------------------|--------------------------|
| Merge restructure PR + conflict cleanup | Widjaja + Alexis         |
| Map features (click → coordinates → save) | Aruthan + TL             |
| Shadow DOM rendering                     | Yilong                   |
| Footer link handling                     | Phiroze                  |
| Backend logic for map + form storage     | Myat + Eric              |
| Form/page routing and saving flow        | Noeh + Vincent + Chris   |

---

## 🎯 Weekly Deliverables

- Working **CRUD application**:
  - Create new memory card  
  - Display card in frontend  
- **Map UI** connected and functioning:
  - User clicks map, adds info, sees card appear  
