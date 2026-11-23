"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { SEEDED_ANONYMIZED_CORE_TEAM } from "@/lib/hackathonEngine";
import type { RBACRole } from "@/lib/hackathonEngine";

export interface WebsiteAccessPolicy {
  requireInternalPassForAdmin: boolean;
  requireInternalPassForTeamPortal: boolean;
  allowPublicForumAccess: boolean;
  allowPublicGalleryAccess: boolean;
  maintenanceModeEnabled: boolean;
}

export interface CoreTeamRBACMember {
  memberId: string;
  displayName: string;
  role: string;
  department: string;
  inChargeOf: string;
  rbacRole: RBACRole;
  canGrantSiteWideAccess: boolean;
}

export interface VerifiedCoreMemberSession {
  memberId: string;
  displayName: string;
  role: string;
  department: string;
  inChargeOf: string;
  rbacRole: RBACRole;
  canGrantSiteWideAccess: boolean;
  grantedAt: string;
}

export const CORE_TEAM_RBAC_DIRECTORY: CoreTeamRBACMember[] =
  SEEDED_ANONYMIZED_CORE_TEAM.map((m, idx) => ({
    memberId: m.id,
    displayName: m.fictionalName,
    role: m.role,
    department: m.department,
    inChargeOf: m.inChargeOf,
    rbacRole:
      idx === 0
        ? "Super Administrator"
        : idx < 4
        ? "Hackathon Administrator"
        : idx < 6
        ? "Organizer"
        : "Evaluator",
    canGrantSiteWideAccess: idx < 4,
  }));

const DEFAULT_ACCESS_POLICY: WebsiteAccessPolicy = {
  requireInternalPassForAdmin: true,
  requireInternalPassForTeamPortal: false,
  allowPublicForumAccess: true,
  allowPublicGalleryAccess: true,
  maintenanceModeEnabled: false,
};

const STORAGE_KEY = "aigeeks_rbac_internal_access_v2";

interface InternalAccessContextValue {
  session: VerifiedCoreMemberSession | null;
  isInternalAccessGranted: boolean;
  policy: WebsiteAccessPolicy;
  rbacDirectory: CoreTeamRBACMember[];
  grantRoleBasedInternalAccess: (params: {
    memberId: string;
    rbacRole: RBACRole;
  }) => { ok: boolean; message: string };
  revokeInternalAccess: () => void;
  updateWebsiteAccessPolicy: (patch: Partial<WebsiteAccessPolicy>) => void;
  resetWebsiteAccessPolicy: () => void;
  assignMemberRbacRole: (memberId: string, rbacRole: RBACRole) => void;
}

const InternalAccessContext = createContext<InternalAccessContextValue | null>(
  null
);

export function InternalAccessProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rbacDirectory, setRbacDirectory] = useState<CoreTeamRBACMember[]>(
    CORE_TEAM_RBAC_DIRECTORY
  );
  const [session, setSession] = useState<VerifiedCoreMemberSession | null>(
    null
  );
  const [policy, setPolicy] = useState<WebsiteAccessPolicy>(
    DEFAULT_ACCESS_POLICY
  );

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        session?: VerifiedCoreMemberSession | null;
        policy?: Partial<WebsiteAccessPolicy>;
        rbacDirectory?: CoreTeamRBACMember[];
      };
      if (parsed.session) setSession(parsed.session);
      if (parsed.policy) {
        setPolicy((prev) => ({ ...prev, ...parsed.policy }));
      }
      if (Array.isArray(parsed.rbacDirectory) && parsed.rbacDirectory.length > 0) {
        setRbacDirectory(parsed.rbacDirectory);
      }
    } catch {
      // Ignore storage read errors
    }
  }, []);

  const persistState = useCallback(
    (
      nextSession: VerifiedCoreMemberSession | null,
      nextPolicy: WebsiteAccessPolicy,
      nextDirectory: CoreTeamRBACMember[]
    ) => {
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            session: nextSession,
            policy: nextPolicy,
            rbacDirectory: nextDirectory,
          })
        );
      } catch {
        // Ignore storage write errors
      }
    },
    []
  );

  const grantRoleBasedInternalAccess = useCallback(
    ({ memberId, rbacRole }: { memberId: string; rbacRole: RBACRole }) => {
      const member = rbacDirectory.find((m) => m.memberId === memberId);
      if (!member) {
        return {
          ok: false,
          message: "Core Team member record not found in RBAC directory.",
        };
      }

      const nextSession: VerifiedCoreMemberSession = {
        memberId: member.memberId,
        displayName: member.displayName,
        role: member.role,
        department: member.department,
        inChargeOf: member.inChargeOf,
        rbacRole,
        canGrantSiteWideAccess:
          rbacRole === "Super Administrator" ||
          rbacRole === "Hackathon Administrator" ||
          member.canGrantSiteWideAccess,
        grantedAt: new Date().toISOString(),
      };

      setSession(nextSession);
      persistState(nextSession, policy, rbacDirectory);

      return {
        ok: true,
        message: `Role-based internal access granted to ${member.displayName} as ${rbacRole}.`,
      };
    },
    [rbacDirectory, policy, persistState]
  );

  const revokeInternalAccess = useCallback(() => {
    setSession(null);
    persistState(null, policy, rbacDirectory);
  }, [policy, rbacDirectory, persistState]);

  const updateWebsiteAccessPolicy = useCallback(
    (patch: Partial<WebsiteAccessPolicy>) => {
      setPolicy((prev) => {
        const nextPolicy = { ...prev, ...patch };
        persistState(session, nextPolicy, rbacDirectory);
        return nextPolicy;
      });
    },
    [session, rbacDirectory, persistState]
  );

  const resetWebsiteAccessPolicy = useCallback(() => {
    setPolicy(DEFAULT_ACCESS_POLICY);
    persistState(session, DEFAULT_ACCESS_POLICY, rbacDirectory);
  }, [session, rbacDirectory, persistState]);

  const assignMemberRbacRole = useCallback(
    (memberId: string, rbacRole: RBACRole) => {
      const nextDirectory = rbacDirectory.map((item) =>
        item.memberId === memberId
          ? {
              ...item,
              rbacRole,
              canGrantSiteWideAccess:
                rbacRole === "Super Administrator" ||
                rbacRole === "Hackathon Administrator",
            }
          : item
      );
      setRbacDirectory(nextDirectory);
      const nextSession =
        session && session.memberId === memberId
          ? {
              ...session,
              rbacRole,
              canGrantSiteWideAccess:
                rbacRole === "Super Administrator" ||
                rbacRole === "Hackathon Administrator",
            }
          : session;
      if (nextSession) setSession(nextSession);
      persistState(nextSession, policy, nextDirectory);
    },
    [rbacDirectory, policy, session, persistState]
  );

  return (
    <InternalAccessContext.Provider
      value={{
        session,
        isInternalAccessGranted: Boolean(session),
        policy,
        rbacDirectory,
        grantRoleBasedInternalAccess,
        revokeInternalAccess,
        updateWebsiteAccessPolicy,
        resetWebsiteAccessPolicy,
        assignMemberRbacRole,
      }}
    >
      {children}
    </InternalAccessContext.Provider>
  );
}

export function useInternalAccess() {
  const ctx = useContext(InternalAccessContext);
  if (!ctx) {
    throw new Error(
      "useInternalAccess must be used within an InternalAccessProvider"
    );
  }
  return ctx;
}
