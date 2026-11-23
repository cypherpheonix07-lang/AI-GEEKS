# AI GEEKS — Master Website Audit
## Document 11: Problem Statement Selection & Intelligence Analytics Audit

**Auditor:** Quantitative Systems & Analytics Specialist  
**Scope:** Selection Math Engine, Distinct Counts, Capacity Guard, Analytics Dashboard  
**Status:** **100% VERIFIED**

---

### 1. Dynamic Selection Mathematical Engine

Let $S$ be the set of all active selections for problem statement $P_i$.
The distinct team count $C(P_i)$ is formally evaluated as:
$$C(P_i) = \left| \{ T \in \text{Teams} \mid \exists s \in \text{Selections}: s.\text{teamId} = T.\text{id} \land s.\text{problemId} = P_i.\text{id} \land s.\text{status} = \text{"ACTIVE"} \} \right|$$

- **Share Percentage:**
$$\text{Share}(P_i) = \frac{C(P_i)}{\sum_{j=1}^n C(P_j)} \times 100\%$$
- **Remaining Capacity:**
$$\text{Capacity}_{\text{remaining}}(P_i) = \max\left(0, P_i.\text{maxAllowedTeams} - C(P_i)\right)$$

---

### 2. Analytics Dashboard Views (`AdminHackathonsConsole.tsx`)
1. **Key Performance Indicators (KPIs):**
   - Total Registered Teams
   - Total Published Problems
   - Active Selections
   - Capacity Saturation Rate (%)
2. **Bar Chart:** Teams distribution per problem statement with capacity ceilings.
3. **Donut / Domain Share:** Share of selections across Technical Domains (AI Agents, Computer Vision, Distributed Systems, Web3).
4. **Timeline Trend:** Cumulative selection progression over the 24-hour hackathon window.
5. **Team Breakdown Table:** Real-time search, domain filtering, and export capabilities.

---

### 3. Automated Verification Evidence
- **Scenario #05:** Teams can view published problem statements -> **PASS**
- **Scenario #06:** Eligible Verified teams can select an available problem -> **PASS**
- **Scenario #08:** Problem statement counts update dynamically from database records -> **PASS**
- **Scenario #09:** Capacity limits are enforced during simultaneous submissions -> **PASS**
- **Scenario #15:** Analytics display Bar, Donut, Trend, and Team Breakdown views -> **PASS**
