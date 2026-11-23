# Database Backup, Disaster Recovery & Retention Policy
**Project:** AI Geeks Tech Community  
**Document ID:** `DOCS-OPS-004`  
**Reference Date:** November 17, 2026  
**Status:** Approved Operational Continuity Policy  

---

## 1. Backup Strategy & Recovery Objectives

- **Recovery Point Objective (RPO):** Maximum 1 hour of potential data loss in extreme disaster scenarios.
- **Recovery Time Objective (RTO):** Full application restoration within 15 minutes.
- **Backup Types & Cadence:**
  - *Automated Daily Snapshots:* Daily full logical database dump at 02:00 UTC with 30-day retention.
  - *Continuous WAL Archiving:* Continuous PostgreSQL Write-Ahead Log archiving to redundant cloud object storage (S3/GCS with cross-region replication).
  - *Weekly Cold Backups:* Weekly encrypted snapshot stored in immutable cold storage (Glacier / Archive tier) retained for 365 days for legal compliance.

---

## 2. Disaster Recovery Protocol

1. **Failure Detection:** Automated monitoring alerts trigger via PagerDuty/webhook if database health check fails for >3 consecutive minutes.
2. **Failover Execution:**
   - Standby replica promoted to primary automatically via patroni / AWS RDS Multi-AZ.
   - Application connection strings dynamically rerouted via DNS CNAME or connection pooler (PgBouncer).
3. **Restoration from Snapshot:**
   ```bash
   # Restore logical backup into fresh PostgreSQL instance
   pg_restore --clean --if-exists --no-owner -h db-primary.internal -U aigeeks_admin -d aigeeks_community /backups/aigeeks_snapshot_latest.dump
   ```
4. **Post-Recovery Verification:**
   - Execute integrity check script querying row counts across Users, Events, and AuditLogs.
   - Validate that cryptographic certificate verification endpoint `/verify/[certId]` returns valid data.
