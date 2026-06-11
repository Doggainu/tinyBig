"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAccount, useChainId, useSwitchChain } from "wagmi";

import { APP_NAME } from "@/config/app";
import { AppNav } from "@/components/AppNav";
import { ConnectWallet } from "@/components/ConnectWallet";
import { BoostPanel } from "@/components/BoostPanel";
import { DeployPanel } from "@/components/DeployPanel";
import { GmPanel } from "@/components/GmPanel";
import {
  DEPLOY_CHAIN_ID,
  BOOST_GM_MULTIPLIER,
  isContractConfigured,
} from "@/config/contract";
import { POINTS_PER_REFERRAL } from "@/config/referral";
import { isBadgeContractConfigured } from "@/config/badgeContract";
import { PointsRulesCard } from "@/components/PointsRulesCard";
import { useFarcasterMiniApp } from "@/hooks/useFarcasterMiniApp";
import { useHubStats } from "@/hooks/useHubStats";

type Tab = "gm" | "deploy" | "boost";

export function HomeApp() {
  const { inMiniApp } = useFarcasterMiniApp();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<Tab>("gm");

  useEffect(() => {
    const t = searchParams.get("tab");
    if (t === "gm" || t === "deploy" || t === "boost") setTab(t);
  }, [searchParams]);
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const wrongChain = isConnected && chainId !== DEPLOY_CHAIN_ID;

  const {
    deployCount,
    freeDeployAvailable,
    deployFeeOnChain,
    points,
    boostActive,
    refreshStats,
  } = useHubStats();

  const hubReady = isContractConfigured;
  const actionDisabled = !isConnected || wrongChain || !hubReady;

  return (
    <>
      <AppNav />

      <header className="uni-card px-4 py-3 text-center">
        <p className="uni-eyebrow text-[0.6875rem]">
          {inMiniApp ? "Farcaster" : "Web"} · Base
        </p>
        <h1 className="uni-title mt-1 text-2xl">{APP_NAME}</h1>
        <p className="uni-body mt-1 text-xs leading-snug">
          GM, Boost, deploy tokens, refer friends, and earn NFT badges for the{" "}
          <span className="uni-text-accent font-semibold">tB</span> airdrop on
          Base.
        </p>
        <div className="uni-airdrop-callout mt-2 px-3 py-2">
          <p className="uni-airdrop-text text-xs">
            More points = Bigger{" "}
            <span className="uni-text-accent font-semibold">tB</span> airdrop.
            Simple as that.
          </p>
        </div>
      </header>

      {!hubReady && (
        <div className="uni-card uni-card-critical px-4 py-4">
          <p className="uni-label text-[var(--uni-critical)]">Hub not configured</p>
          <p className="uni-caption mt-2">
            Deploy <span className="uni-code">Hub.sol</span> and set{" "}
            <span className="uni-code">HUB_CONTRACT_ADDRESS</span>.
          </p>
        </div>
      )}

      <div className="uni-card px-3 py-3">
        <ConnectWallet />
        {hubReady && isConnected && !wrongChain && (
          <div className="uni-card-inset mt-2 flex items-center justify-between gap-2 px-3 py-1.5">
            <p className="uni-label shrink-0 leading-none">Total points</p>
            <p className="uni-mono text-lg font-semibold leading-none uni-text-accent">
              {points?.toString() ?? "0"}
            </p>
          </div>
        )}
      </div>

      {wrongChain && (
        <button
          type="button"
          className="uni-btn uni-btn-primary"
          disabled={isSwitching}
          onClick={() => switchChain({ chainId: DEPLOY_CHAIN_ID })}
        >
          {isSwitching ? "Switching…" : "Switch to Base"}
        </button>
      )}

      {hubReady && isConnected && !wrongChain && (
        <div className="uni-card p-3">
          <div className="uni-tabs uni-tabs-action mb-2.5">
            <div className="uni-tab-wrap">
              <button
                type="button"
                className={`uni-tab ${tab === "gm" ? "uni-tab-active" : ""}`}
                onClick={() => setTab("gm")}
              >
                GM
              </button>
              {boostActive && (
                <span className="uni-tab-2x-badge" aria-hidden>
                  {BOOST_GM_MULTIPLIER}×
                </span>
              )}
            </div>
            <div
              className={`uni-tab-boost-ring ${boostActive ? "uni-tab-boost-ring--live" : ""}`}
            >
              <button
                type="button"
                className={`uni-tab ${tab === "boost" ? "uni-tab-active" : ""}`}
                onClick={() => setTab("boost")}
              >
                Boost{" "}
                <span className="uni-tab-2x-mark">{BOOST_GM_MULTIPLIER}×</span>
              </button>
            </div>
            <div className="uni-tab-wrap">
              <button
                type="button"
                className={`uni-tab ${tab === "deploy" ? "uni-tab-active" : ""}`}
                onClick={() => setTab("deploy")}
              >
                Deploy
              </button>
              {boostActive && (
                <span className="uni-tab-2x-badge" aria-hidden>
                  {BOOST_GM_MULTIPLIER}×
                </span>
              )}
            </div>
          </div>

          {tab === "gm" ? (
            <GmPanel disabled={actionDisabled} />
          ) : tab === "boost" ? (
            <BoostPanel
              disabled={actionDisabled}
              onSuccess={() => void refreshStats()}
            />
          ) : (
            <DeployPanel
              freeDeployAvailable={freeDeployAvailable}
              deployFeeOnChain={deployFeeOnChain}
              onSuccess={() => void refreshStats()}
            />
          )}
        </div>
      )}

      {hubReady && (
        <PointsRulesCard />
      )}

      {isBadgeContractConfigured && (
        <Link href="/badges" className="uni-btn uni-btn-secondary block text-center">
          View badges · GM & Deploy milestones
        </Link>
      )}

      {hubReady && (
        <Link href="/referral" className="uni-btn uni-btn-secondary block text-center">
          Referral code · +{POINTS_PER_REFERRAL} pts for you and your friend
        </Link>
      )}

      {hubReady && (
        <Link href="/farm" className="uni-btn uni-btn-secondary block text-center">
          Farm tB · live checklist &amp; rank
        </Link>
      )}

      {hubReady && (
        <Link href="/leaderboard" className="uni-btn uni-btn-secondary block text-center">
          Leaderboard · rank by points
        </Link>
      )}

      {!isBadgeContractConfigured && hubReady && (
        <p className="uni-caption text-center">
          Deploy <span className="uni-code">BadgeNFT.sol</span> and set{" "}
          <span className="uni-code">BADGE_NFT_ADDRESS</span> for NFT badges.
        </p>
      )}

      {hubReady && isConnected && !wrongChain && (
        <p className="uni-caption text-center">
          Deploys: <span className="uni-mono">{deployCount?.toString() ?? "0"}</span>
          {" · "}
          <Link href="/badges" className="uni-link">
            Earn badges
          </Link>
        </p>
      )}
    </>
  );
}
