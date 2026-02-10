import React, { useState, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, ChevronDown, ChevronRight, Info, Target, Users, DollarSign, Eye, Calendar, Layers, ArrowRight, X, BarChart3, Clock, CheckCircle, Circle, PlayCircle, PauseCircle, ChevronUp, Filter, Lock, MousePointer, Percent, AlertTriangle, Shield, Zap, RefreshCw, Video, Star, Globe, UserCheck, ArrowDown } from 'lucide-react';

// =============================================================================
// PLATFORM CONFIGURATION - Logos, Colors, and Fallbacks
// =============================================================================
const platformConfig = {
  'meta': { name: 'Meta Ads', logo: 'https://cdn.simpleicons.org/meta/1877F2', color: '#1877F2', altText: 'Meta logo' },
  'facebook': { name: 'Facebook', logo: 'https://cdn.simpleicons.org/facebook/1877F2', color: '#1877F2', altText: 'Facebook logo' },
  'instagram': { name: 'Instagram', logo: 'https://cdn.simpleicons.org/instagram/E4405F', color: '#E4405F', altText: 'Instagram logo' },
  'google': { name: 'Google Ads', logo: 'https://cdn.simpleicons.org/googleads/4285F4', color: '#4285F4', altText: 'Google Ads logo' },
  'spotify': { name: 'Spotify Audio', logo: 'https://cdn.simpleicons.org/spotify/1DB954', color: '#1DB954', altText: 'Spotify logo' },
  'youtube': { name: 'YouTube', logo: 'https://cdn.simpleicons.org/youtube/FF0000', color: '#FF0000', altText: 'YouTube logo' },
  'tiktok': { name: 'TikTok', logo: 'https://cdn.simpleicons.org/tiktok/000000', color: '#000000', altText: 'TikTok logo' },
  'twitter': { name: 'Twitter/X', logo: 'https://cdn.simpleicons.org/x/000000', color: '#000000', altText: 'X logo' },
  'pinterest': { name: 'Pinterest', logo: 'https://cdn.simpleicons.org/pinterest/E60023', color: '#E60023', altText: 'Pinterest logo' },
  'programmatic': { name: 'Programmatic', emoji: '🎯', color: '#6B5B4F' },
  'bellmedia': { name: 'Bell Media', emoji: '📺', color: '#1E1E2A' },
  'ooh': { name: 'Out of Home', emoji: '🚏', color: '#7A7A85' },
  'dooh': { name: 'Digital OOH', emoji: '📺', color: '#1E1E2A' },
  'radio': { name: 'Radio', emoji: '📻', color: '#C9A96E' },
  'podcast': { name: 'Podcast', emoji: '🎙️', color: '#7A7A85' },
  'display': { name: 'Display Network', emoji: '🖼️', color: '#6B5B4F' },
  'email': { name: 'Email Marketing', emoji: '✉️', color: '#7A7A85' },
  'influencer': { name: 'Influencer/Creator', emoji: '🤝', color: '#9B59B6' }
};

// Platform Logo Component with Fallbacks
const PlatformLogo = ({ platformId, size = 20, className = '' }) => {
  const [logoError, setLogoError] = useState(false);
  const config = platformConfig[platformId?.toLowerCase()];

  if (!config) {
    return <span className={className} style={{ fontSize: size }}>❓</span>;
  }

  if (config.logo && !logoError) {
    return (
      <img
        src={config.logo}
        alt={config.altText || config.name}
        width={size}
        height={size}
        className={`platform-logo ${className}`}
        style={{ display: 'block', objectFit: 'contain' }}
        onError={() => setLogoError(true)}
      />
    );
  }

  if (config.emoji) {
    return <span className={className} style={{ fontSize: size * 0.9, lineHeight: 1 }}>{config.emoji}</span>;
  }

  return (
    <div
      className={`platform-logo-fallback ${className}`}
      style={{
        width: size, height: size, borderRadius: '50%', background: config.color,
        color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size * 0.45, fontWeight: 600
      }}
    >
      {config.name.charAt(0)}
    </div>
  );
};

// =============================================================================
// PERIPHERY DIGITAL LOGO COMPONENT
// =============================================================================
const PeripheryLogo = ({ size = 32, color = 'white' }) => (
  <svg viewBox="0 0 100 120" width={size} height={size * 1.2} fill={color} xmlns="http://www.w3.org/2000/svg">
    {/* P letterform — distinctive Periphery Digital mark with bottom-left dot */}
    <path d="M20 10 L20 95 L38 95 L38 62 L52 62 C72 62 85 50 85 36 C85 22 72 10 52 10 Z M38 26 L52 26 C62 26 68 30 68 36 C68 42 62 46 52 46 L38 46 Z" />
    {/* Characteristic dot at bottom-left */}
    <circle cx="20" cy="110" r="10" />
  </svg>
);

// =============================================================================
// CAMPAIGN DATA — Aquilini Leasehold Education Campaign
// =============================================================================
const campaignData = {
  project: {
    name: "Aquilini Leasehold Education Campaign",
    client: "Aquilini Development",
    period: "April – October 2026",
    type: "brand",
    objective: "Education via Authority → Emotional Conversion",
    startDate: "2026-04-01",
    endDate: "2026-10-31",
    phases: [
      {
        id: "phase1",
        name: "Phase 1: Education via Authority",
        start: "2026-04-01",
        end: "2026-07-15",
        description: "Leveraging expert content (Realtors/Influencers) to explain the financial logic of leasehold and remove perceived bias."
      },
      {
        id: "phase2",
        name: "Phase 2: Emotional Conversion",
        start: "2026-07-15",
        end: "2026-10-31",
        description: "Deploying \"Never Say Never\" & \"Sorry\" creatives to show how leasehold empowers the buyer's actual life."
      }
    ]
  },

  scenarios: [
    {
      id: 'baseline',
      name: 'Scenario A: Baseline',
      shortName: 'Baseline',
      label: 'A',
      color: '#7A7A85',
      totalSpend: 42000,
      monthlySpend: 6000,
      metrics: {
        impressions: 3000000,
        impressionsLabel: '3M+',
        reach: 450000,
        reachLabel: '~450,000',
        videoViewRate: 6.0,
        landingPageViews: 19494,
        frequency: 3.8,
        engagedVisitors: 5848
      },
      budgetSplit: {
        education: { percent: 80, amount: 33600, label: 'Education & Awareness' },
        remarketing: { percent: 20, amount: 8400, label: 'Cross-Project Remarketing' }
      }
    },
    {
      id: 'strategic',
      name: 'Scenario B: Strategic',
      shortName: 'Strategic',
      label: 'B',
      recommended: true,
      color: '#3D7A5F',
      totalSpend: 73500,
      monthlySpend: 10500,
      metrics: {
        impressions: 5000000,
        impressionsLabel: '5M+',
        reach: 750000,
        reachLabel: '~750,000',
        videoViewRate: 8.8,
        landingPageViews: 34115,
        frequency: 3.8,
        engagedVisitors: 10235
      },
      budgetSplit: {
        education: { percent: 80, amount: 58800, label: 'Education & Awareness' },
        remarketing: { percent: 20, amount: 14700, label: 'Cross-Project Remarketing' }
      }
    },
    {
      id: 'market',
      name: 'Scenario C: Market Presence',
      shortName: 'Market Presence',
      label: 'C',
      color: '#C9A96E',
      totalSpend: 105000,
      monthlySpend: 15000,
      metrics: {
        impressions: 7000000,
        impressionsLabel: '7M+',
        reach: 1100000,
        reachLabel: '~1,100,000',
        videoViewRate: 10.0,
        landingPageViews: 48736,
        frequency: 3.8,
        engagedVisitors: 14621
      },
      budgetSplit: {
        education: { percent: 80, amount: 84000, label: 'Education & Awareness' },
        remarketing: { percent: 20, amount: 21000, label: 'Cross-Project Remarketing' }
      }
    }
  ],

  benchmarks: {
    blendedCPM: 13.57,
    blendedCPC: 1.47,
    videoLPVRate: 68.23,
    costPerLPV: 6.22,
    monthlyFrequency: 3.8
  },

  audience: {
    primary: {
      name: "The Locked-Out Buyer",
      demographics: "Adults 25-45, Greater Vancouver",
      income: "Household income $80K–$130K",
      psychographics: "Priced out of freehold, first-time buyers, young families seeking affordable homeownership in premium locations",
      locations: "West Side, Burnaby, Mount Pleasant, East Side",
      estimatedReach: "Strategic: ~750,000 unique"
    },
    crossProjectPools: [
      {
        id: 'kwasen',
        name: 'Kwasen',
        type: 'Pre-sale',
        sources: ['Website pixel/visitor data', 'CRM/registration database', 'Meta custom audiences'],
        estimatedSize: 'TBD — to be confirmed with client CRM data',
        status: 'Active'
      },
      {
        id: 'boardwalk',
        name: 'Boardwalk',
        type: 'Pre-sale',
        sources: ['Website pixel/visitor data', 'CRM/registration database', 'Meta custom audiences'],
        estimatedSize: 'TBD — to be confirmed with client CRM data',
        status: 'Active'
      },
      {
        id: 'tnv',
        name: 'The New Village',
        type: 'Pre-sale',
        sources: ['Website pixel/visitor data', 'CRM/registration database', 'Meta custom audiences'],
        estimatedSize: 'TBD — to be confirmed with client CRM data',
        status: 'Active'
      }
    ],
    poolMethodology: "Audience pools are built from three sources per project: (1) Website pixel/visitor data from each project's landing pages, (2) CRM/registration databases from Kwasen, Boardwalk, and The New Village, and (3) Social media engagement audiences (Meta custom audiences). Pools are combined and de-duplicated using Meta's audience overlap tools and email-match hashing to avoid redundant impressions across the remarketing layer."
  },

  riskSolutions: [
    {
      risk: '"Wealth Trap" Narrative',
      riskDetail: 'Public forums label leaseholds as a "wealth trap" due to term mechanics and perceived lack of equity.',
      solution: 'Authority Validation',
      solutionDetail: 'Bypass "Developer Bias" by sponsoring neutral, third-party experts (Realtors/Finance creators) to explain the 99-year financial logic.',
      goal: 'Shift the narrative from "buying land" to "lifestyle attainment" and 30–40% price advantages.',
      phase: 'Phase 1: Education via Authority',
      color: '#3D7A5F'
    },
    {
      risk: 'Technical Drop-off',
      riskDetail: 'Prospects attracted to the $402,900 price point drop off when they hit technical leasehold hurdles.',
      solution: 'Trust-First Prospecting',
      solutionDetail: 'Deliver "Leasehold 101" content to "Locked-Out Buyers" before they reach the sales center.',
      goal: 'Neutralize the stigma early so the sales team doesn\'t waste time re-educating every lead.',
      phase: 'Phase 1: Education via Authority',
      color: '#C9A96E'
    },
    {
      risk: 'Fragmented Messaging',
      riskDetail: 'Individual projects currently waste separate budgets re-educating the same audience.',
      solution: 'Unified Remarketing',
      solutionDetail: 'Cross-Project Nurturing via combined pool of 7,400+ leads from Kwasen, Boardwalk, and The New Village.',
      goal: 'Leverage existing database to drive high-quality LPVs at a target cost of $6.22.',
      phase: 'Both Phases',
      color: '#4A7C9F'
    }
  ],

  strategicPillars: [
    {
      id: 'trust',
      name: 'Trust-Based Prospecting',
      phase: 'Phase 1',
      icon: 'Shield',
      color: '#3D7A5F',
      description: 'Reaching the "Locked-Out Buyer" (priced out of freehold) using partnership video content to clear technical hurdles.',
      target: 'Cold audiences who have never engaged with Aquilini',
      tactics: [
        'Sponsor third-party realtor/expert YouTube videos explaining leasehold',
        'Influencer partnership ads featuring local real estate creators',
        'Educational carousel and video ads on Meta (Facebook/Instagram)',
        'Google Display retargeting on real estate content sites'
      ],
      contentCategories: ['Influencer Partnerships', 'Video Explanations']
    },
    {
      id: 'emotional',
      name: 'Emotional Awareness (Owned Media)',
      phase: 'Phase 2',
      icon: 'Zap',
      color: '#C9A96E',
      description: 'Launching the "Never Say Never" and "Sorry" video series to shift the conversation from "land ownership" to "lifestyle attainment."',
      target: 'Warm audiences who have engaged with education content',
      tactics: [
        '"Never Say Never" video series — family upgrade stories',
        '"Sorry" creative — addressing misconceptions with empathy',
        'YouTube pre-roll and in-stream placements',
        'Meta video view campaigns optimized for ThruPlay'
      ],
      contentCategories: ['Owned Media']
    },
    {
      id: 'crossproject',
      name: 'Cross-Project Nurturing (Remarketing)',
      phase: 'Both Phases',
      icon: 'RefreshCw',
      color: '#4A7C9F',
      description: 'Re-engaging the existing audience from Aquilini\'s previous project databases with "Leasehold 101" content.',
      target: 'Past visitors of Kwasen, Boardwalk, and The New Village',
      tactics: [
        '"Leasehold 101" educational series served to remarketing pools',
        'Cross-project audience combination and de-duplication',
        'Dynamic creative optimization based on source project',
        'Sequential messaging: education → emotional → conversion'
      ],
      contentCategories: ['Remarketing']
    }
  ],

  educationFunnel: [
    {
      id: 'impressions',
      name: 'Impressions',
      subtitle: 'Total Media Exposure',
      color: '#C9A96E',
      icon: Eye,
      widthPercent: 100,
      description: 'Total times the campaign appears across all platforms and placements.'
    },
    {
      id: 'videoViews',
      name: 'Video Views',
      subtitle: 'Content Engagement',
      color: '#3D7A5F',
      icon: Video,
      widthPercent: 72,
      description: 'Users who watched educational or emotional content (Video View Rate benchmark).'
    },
    {
      id: 'landingPageViews',
      name: 'Landing Page Views',
      subtitle: 'Active Interest',
      color: '#4A7C9F',
      icon: MousePointer,
      widthPercent: 45,
      description: 'Users who clicked through to a project or education landing page (68.23% Video LPV Rate).'
    },
    {
      id: 'engaged',
      name: 'Engaged Visitors',
      subtitle: 'Qualified Prospects',
      color: '#1E1E2A',
      icon: UserCheck,
      widthPercent: 22,
      description: 'Visitors who spent 30+ seconds or viewed 2+ pages — qualified for sales follow-up.'
    }
  ],

  platforms: [
    {
      id: "meta",
      name: "Meta Ads (Facebook/Instagram)",
      color: "#1877F2",
      pillar: "trust",
      budgetByScenario: {
        baseline: { total: 16800, monthlyAvg: 2400 },
        strategic: { total: 29400, monthlyAvg: 4200 },
        market: { total: 42000, monthlyAvg: 6000 }
      },
      campaigns: [
        {
          id: "meta-edu-reach",
          name: "Leasehold Education Reach Campaign",
          type: "Reach",
          pillar: "trust",
          phase: "phase1",
          objective: "Awareness",
          startDate: "2026-04-01",
          endDate: "2026-07-15",
          dailySpendByScenario: { baseline: 53, strategic: 93, market: 133 },
          totalSpendByScenario: { baseline: 5653, strategic: 9893, market: 14133 },
          format: "Educational video and carousel ads explaining leasehold advantages; optimized for Reach and Video Views",
          targeting: "Cold — Locked-Out Buyer persona"
        },
        {
          id: "meta-influencer-partnership",
          name: "Influencer Partnership Ads",
          type: "Partnership",
          pillar: "trust",
          phase: "phase1",
          objective: "Video Views",
          startDate: "2026-04-15",
          endDate: "2026-07-31",
          dailySpendByScenario: { baseline: 33, strategic: 60, market: 87 },
          totalSpendByScenario: { baseline: 3567, strategic: 6420, market: 9273 },
          format: "Sponsored content from local real estate creators and realtors; ran as Meta partnership/branded content ads",
          targeting: "Lookalike audiences based on creator followers"
        },
        {
          id: "meta-nsn-video",
          name: "\"Never Say Never\" Video Campaign",
          type: "Video Views",
          pillar: "emotional",
          phase: "phase2",
          objective: "ThruPlay",
          startDate: "2026-07-15",
          endDate: "2026-10-31",
          dailySpendByScenario: { baseline: 47, strategic: 80, market: 113 },
          totalSpendByScenario: { baseline: 5040, strategic: 8640, market: 12240 },
          format: "\"Never Say Never\" family lifestyle video series; optimized for ThruPlay completions",
          targeting: "Warm — engaged with education content"
        },
        {
          id: "meta-remarketing",
          name: "Cross-Project Remarketing",
          type: "Remarketing",
          pillar: "crossproject",
          phase: "both",
          objective: "Landing Page Views",
          startDate: "2026-04-01",
          endDate: "2026-10-31",
          dailySpendByScenario: { baseline: 12, strategic: 21, market: 31 },
          totalSpendByScenario: { baseline: 2540, strategic: 4447, market: 6354 },
          format: "\"Leasehold 101\" educational ads served to past visitors of Kwasen, Boardwalk, The New Village",
          targeting: "CRM + pixel audiences from 3 projects"
        }
      ]
    },
    {
      id: "youtube",
      name: "YouTube",
      color: "#FF0000",
      pillar: "trust",
      budgetByScenario: {
        baseline: { total: 14000, monthlyAvg: 2000 },
        strategic: { total: 24500, monthlyAvg: 3500 },
        market: { total: 35000, monthlyAvg: 5000 }
      },
      campaigns: [
        {
          id: "yt-creator-collab",
          name: "Creator Collaboration Pre-Roll",
          type: "Partnership",
          pillar: "trust",
          phase: "phase1",
          objective: "Video Views",
          startDate: "2026-04-15",
          endDate: "2026-07-15",
          dailySpendByScenario: { baseline: 47, strategic: 80, market: 113 },
          totalSpendByScenario: { baseline: 4247, strategic: 7280, market: 10313 },
          format: "Sponsored segments within local real estate creator videos; YouTube in-stream pre-roll",
          targeting: "Real estate interest audiences in Metro Vancouver"
        },
        {
          id: "yt-edu-explainer",
          name: "Leasehold Explainer Series",
          type: "In-Stream",
          pillar: "trust",
          phase: "phase1",
          objective: "Video Views",
          startDate: "2026-04-01",
          endDate: "2026-07-31",
          dailySpendByScenario: { baseline: 40, strategic: 67, market: 100 },
          totalSpendByScenario: { baseline: 4840, strategic: 8067, market: 12100 },
          format: "5-15 minute educational explainer videos covering 99-year terms, financing, and value retention",
          targeting: "In-market for real estate + Vancouver geo"
        },
        {
          id: "yt-nsn-series",
          name: "\"Never Say Never\" YouTube Series",
          type: "In-Stream",
          pillar: "emotional",
          phase: "phase2",
          objective: "ThruPlay",
          startDate: "2026-07-15",
          endDate: "2026-10-31",
          dailySpendByScenario: { baseline: 33, strategic: 60, market: 80 },
          totalSpendByScenario: { baseline: 3600, strategic: 6480, market: 8640 },
          format: "Emotional family upgrade stories — \"Never Say Never\" branded series; 30-60 second cuts",
          targeting: "Warm — video viewers from Phase 1 + Lookalikes"
        },
        {
          id: "yt-remarketing",
          name: "YouTube Remarketing — Leasehold 101",
          type: "Remarketing",
          pillar: "crossproject",
          phase: "both",
          objective: "Landing Page Views",
          startDate: "2026-05-01",
          endDate: "2026-10-31",
          dailySpendByScenario: { baseline: 7, strategic: 15, market: 21 },
          totalSpendByScenario: { baseline: 1313, strategic: 2673, market: 3947 },
          format: "Short-form \"Leasehold 101\" bumper ads + TrueView served to cross-project audiences",
          targeting: "Kwasen/Boardwalk/TNV video viewers + site visitors"
        }
      ]
    },
    {
      id: "google",
      name: "Google Ads (Search + Display)",
      color: "#4285F4",
      pillar: "trust",
      budgetByScenario: {
        baseline: { total: 11200, monthlyAvg: 1600 },
        strategic: { total: 19600, monthlyAvg: 2800 },
        market: { total: 28000, monthlyAvg: 4000 }
      },
      campaigns: [
        {
          id: "google-search-leasehold",
          name: "Google Search — Leasehold Vancouver",
          type: "Search",
          pillar: "trust",
          phase: "both",
          objective: "Traffic",
          startDate: "2026-04-01",
          endDate: "2026-10-31",
          dailySpendByScenario: { baseline: 27, strategic: 47, market: 67 },
          totalSpendByScenario: { baseline: 5707, strategic: 9987, market: 14267 },
          format: "Targeted Search Campaign for 'leasehold Vancouver', 'affordable condo Vancouver', 'Aquilini leasehold' keywords",
          targeting: "In-market real estate + leasehold-related queries"
        },
        {
          id: "google-display-edu",
          name: "Google Display — Education Content",
          type: "Display",
          pillar: "trust",
          phase: "phase1",
          objective: "Awareness",
          startDate: "2026-04-01",
          endDate: "2026-07-15",
          dailySpendByScenario: { baseline: 20, strategic: 33, market: 47 },
          totalSpendByScenario: { baseline: 2120, strategic: 3533, market: 4947 },
          format: "Educational display ads on real estate content sites (REW, Realtor.ca, Livabl, etc.)",
          targeting: "Contextual — real estate content sites in Vancouver"
        },
        {
          id: "google-demandgen",
          name: "Google Demand Gen — Emotional Creative",
          type: "Demand Gen",
          pillar: "emotional",
          phase: "phase2",
          objective: "Lead Generation",
          startDate: "2026-07-15",
          endDate: "2026-10-31",
          dailySpendByScenario: { baseline: 16, strategic: 28, market: 40 },
          totalSpendByScenario: { baseline: 1728, strategic: 3024, market: 4320 },
          format: "\"Sorry\" + \"Never Say Never\" creative through Google Demand Gen, YouTube and Gmail placements",
          targeting: "Warm — site visitors + video viewers"
        },
        {
          id: "google-remarketing",
          name: "Google Display Remarketing",
          type: "Remarketing",
          pillar: "crossproject",
          phase: "both",
          objective: "Landing Page Views",
          startDate: "2026-04-15",
          endDate: "2026-10-31",
          dailySpendByScenario: { baseline: 8, strategic: 15, market: 23 },
          totalSpendByScenario: { baseline: 1645, strategic: 3056, market: 4466 },
          format: "\"Leasehold 101\" remarketing banners on Google Display Network",
          targeting: "Cross-project pixel audiences"
        }
      ]
    },
  ],

  educationContent: {
    categories: [
      {
        id: 'influencer',
        name: 'Influencer Partnerships',
        description: 'Sponsored creator content explaining leasehold from a neutral, trusted perspective',
        percentOfEducation: 35,
        phase: 'Phase 1',
        isThirdPartyValidation: true,
        examples: ['Local realtor YouTube videos', 'Instagram Reels from Vancouver lifestyle creators', 'Meta partnership/branded content ads'],
        validationNotes: [
          'Real estate creators explain 99-year mechanics (removing technical hurdles)',
          'Finance creators validate price-to-rent ratio and ownership equity',
          'Lifestyle creators showcase Aquilini community living (shifting from "land" to "lifestyle")'
        ]
      },
      {
        id: 'video',
        name: 'Video Explanations',
        description: 'Expert/realtor educational videos covering 99-year terms, financing, and value retention',
        percentOfEducation: 30,
        phase: 'Phase 1',
        examples: ['YouTube explainer series', 'Google Demand Gen video', 'Meta educational video ads']
      },
      {
        id: 'owned',
        name: 'Owned Media',
        description: '"Never Say Never" and "Sorry" emotional video series',
        percentOfEducation: 35,
        phase: 'Phase 2',
        examples: ['"Never Say Never" family upgrade stories', '"Sorry" misconception-addressing creative', 'YouTube pre-roll + Meta ThruPlay']
      }
    ]
  },

  projections: {
    enabled: true,
    generated: "2026-02-06",
    assumptions: [
      "Blended CPM of $13.57 based on historical Vancouver real estate benchmarks",
      "Blended CPC of $1.47 based on Metro Vancouver campaign data",
      "Video Landing Page View Rate of 68.23% based on Kwasen YouTube benchmarks",
      "Monthly frequency target of ~3.8x to ensure educational message retention",
      "Estimates prioritize Frequency over Reach for education effectiveness",
      "Cross-project remarketing pools assume CRM data availability from all 3 projects",
      "Engaged visitor rate estimated at 30% of Landing Page Views (30+ second sessions)"
    ],
    dataSources: [
      "Kwasen YouTube campaign benchmarks (Video View Rate, LPV Rate)",
      "Vancouver real estate market digital benchmarks",
      "Meta Ads industry benchmarks (Real Estate vertical)",
      "Google Ads Keyword Planner estimates for leasehold-related terms",
      "Google Ads Audience Insights — Metro Vancouver DMA"
    ]
  },

  results: {
    available: false
  },

  creatives: {
    agency: 'Periphery Digital',
    concept: '"Never Say Never" Sponsored Ad Carousel',
    format: 'Meta Carousel Ad (4 Slides)',
    audiences: [
      {
        id: 'general',
        name: 'General Audience',
        hook: '"I never thought it was possible to own in Vancouver..."',
        cta: 'CHOOSE LEASEHOLD',
        color: '#F4A0A0',
        image: '/creatives/ad-concept-2.png'
      },
      {
        id: 'first-time',
        name: 'First-Time Buyer',
        hook: '"I never thought I\'d be able to be an investor."',
        cta: 'LEARN HOW TO OWN',
        color: '#E8E88A',
        image: '/creatives/ad-concept-3.png'
      },
      {
        id: 'family',
        name: 'Family Upgrader',
        hook: '"I never thought I\'d be able to afford to live next to the water."',
        cta: 'EXPLORE YOUR OPTIONS',
        color: '#A8C4E8',
        image: '/creatives/ad-concept-4.png'
      }
    ],
    slideFlow: [
      { slide: 1, label: 'Emotional Hook', description: 'Personal testimony with lifestyle imagery' },
      { slide: 2, label: 'Brand Reveal', description: '"Never Say Never" campaign identity' },
      { slide: 3, label: 'Value Proposition', description: 'Leasehold positioned as the smarter choice' },
      { slide: 4, label: 'Conversion', description: 'Price anchor ($402,900) + audience-specific CTA' }
    ]
  },

  influencerContent: {
    sectionTitle: 'Third-Party Validation: Live Content',
    sectionSubtitle: 'Existing influencer partnerships already proving the education-first strategy',
    creator: {
      name: 'Bob Kronbauer',
      handle: '@bobkronbauer',
      alias: 'BC Bob',
      role: 'Vancouver Real Estate & Lifestyle Creator',
      partnership: 'Sponsored by @aquilinidevelopment'
    },
    reels: [
      {
        id: 'reel1',
        embedUrl: 'https://www.instagram.com/reel/DKgQWT-x88w/embed/',
        url: 'https://www.instagram.com/reels/DKgQWT-x88w/',
        project: 'Boardwalk (Tsawwassen)',
        hook: '291 days of sunshine a year',
        description: 'On-location at Boardwalk, Tsawwassen — lifestyle positioning, community storytelling, price-point accessibility',
        phase: 'Phase 1',
        type: 'Education via Authority'
      },
      {
        id: 'reel2',
        embedUrl: 'https://www.instagram.com/reel/DKQW5BASrsJ/embed/',
        url: 'https://www.instagram.com/reels/DKQW5BASrsJ/',
        project: 'Boardwalk (Tsawwassen)',
        hook: 'Leasehold property is one of the...',
        description: 'On-location at Boardwalk, Tsawwassen — explaining leasehold value, validating the ownership model',
        phase: 'Phase 1',
        type: 'Education via Authority'
      }
    ]
  }
};

// =============================================================================
// EDUCATION FUNNEL STAGE DEFINITIONS
// =============================================================================
const educationFunnelStages = [
  {
    id: "impressions",
    name: "Impressions",
    subtitle: "Total Media Exposure",
    color: "#C9A96E",
    icon: Eye,
    description: "Total times the campaign appears across all platforms and placements.",
    metrics: ["CPM", "Reach", "Frequency"]
  },
  {
    id: "videoViews",
    name: "Video Views",
    subtitle: "Content Engagement",
    color: "#3D7A5F",
    icon: Video,
    description: "Users who watched educational or emotional video content past the view threshold.",
    metrics: ["Video View Rate", "ThruPlay Rate", "Avg. Watch Time"]
  },
  {
    id: "landingPageViews",
    name: "Landing Page Views",
    subtitle: "Active Interest",
    color: "#4A7C9F",
    icon: MousePointer,
    description: "Users who clicked through to a project or education landing page.",
    metrics: ["LPV Rate", "CPC", "Cost per LPV"]
  },
  {
    id: "engaged",
    name: "Engaged Visitors",
    subtitle: "Qualified Prospects",
    color: "#1E1E2A",
    icon: UserCheck,
    description: "Visitors who spent 30+ seconds or viewed 2+ pages — qualified for sales follow-up.",
    metrics: ["Engagement Rate", "Bounce Rate", "Pages per Session"]
  }
];

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================
const formatCurrency = (value) => {
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
  return `$${value.toLocaleString()}`;
};

const formatFullCurrency = (value) => {
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

const formatDate = (dateStr, format = 'short') => {
  const date = new Date(dateStr);
  if (format === 'short') return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

const formatLargeNumber = (num) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num?.toLocaleString() || '—';
};

const getDaysBetween = (start, end) => {
  return Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24));
};

const getMonthsInRange = (startDate, endDate) => {
  const months = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  const current = new Date(start.getFullYear(), start.getMonth(), 1);

  while (current <= end) {
    months.push({
      month: current.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      shortMonth: current.toLocaleDateString('en-US', { month: 'short' }),
      year: current.getFullYear(),
      monthNumber: current.getMonth(),
      startDate: new Date(current),
      endDate: new Date(current.getFullYear(), current.getMonth() + 1, 0)
    });
    current.setMonth(current.getMonth() + 1);
  }
  return months;
};

const getWeeksInMonth = (year, month) => {
  const weeks = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  let currentWeekStart = new Date(firstDay);
  let weekNum = 1;

  while (currentWeekStart <= lastDay) {
    const weekEnd = new Date(currentWeekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    if (weekEnd > lastDay) weekEnd.setTime(lastDay.getTime());

    weeks.push({
      weekNumber: weekNum,
      startDate: new Date(currentWeekStart),
      endDate: new Date(weekEnd),
      label: `Wk ${weekNum}`
    });

    currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    weekNum++;
  }
  return weeks;
};

const isCampaignActiveInPeriod = (campaign, periodStart, periodEnd) => {
  const campStart = new Date(campaign.startDate);
  const campEnd = new Date(campaign.endDate);
  return campStart <= periodEnd && campEnd >= periodStart;
};

const getScenarioSpend = (campaign, scenarioId) => {
  return campaign.totalSpendByScenario?.[scenarioId] || 0;
};

const getScenarioDailySpend = (campaign, scenarioId) => {
  return campaign.dailySpendByScenario?.[scenarioId] || 0;
};

const getPlatformTotalForScenario = (platform, scenarioId) => {
  return platform.budgetByScenario?.[scenarioId]?.total || 0;
};

// Pillar config for badges/colors
const pillarConfig = {
  trust: { name: 'Trust-Based', color: '#3D7A5F', icon: Shield },
  emotional: { name: 'Emotional', color: '#C9A96E', icon: Zap },
  crossproject: { name: 'Remarketing', color: '#4A7C9F', icon: RefreshCw }
};

// =============================================================================
// SCENARIO TOGGLE COMPONENT
// =============================================================================
const ScenarioToggle = ({ scenarios, activeScenario, onSelect, mode = 'full' }) => {
  if (mode === 'compact') {
    return (
      <div className="scenario-pills">
        {scenarios.map(s => (
          <button
            key={s.id}
            className={`scenario-pill ${activeScenario === s.id ? 'active' : ''}`}
            style={activeScenario === s.id ? { background: s.color, borderColor: s.color, color: 'white' } : { borderColor: s.color, color: s.color }}
            onClick={() => onSelect(s.id)}
          >
            <span className="pill-label">{s.label}</span>
            <span className="pill-name">{s.shortName}</span>
            {s.recommended && <span className="pill-rec">REC</span>}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="scenario-toggle-full">
      {scenarios.map(s => {
        const isActive = activeScenario === s.id;
        return (
          <div
            key={s.id}
            className={`scenario-card ${isActive ? 'active' : ''} ${s.recommended ? 'recommended-card' : ''}`}
            style={{ borderColor: isActive ? s.color : (s.recommended ? '#3D7A5F' : '#E8E4DE') }}
            onClick={() => onSelect(s.id)}
          >
            {s.recommended && <div className="scenario-rec-badge" style={{ background: s.color }}>Recommended</div>}
            <div className="scenario-card-header">
              <span className="scenario-letter" style={{ background: isActive ? s.color : '#E8E4DE', color: isActive ? 'white' : '#7A7A85' }}>{s.label}</span>
              <div className="scenario-card-title">
                <h4>{s.shortName}</h4>
                <span className="scenario-monthly">{formatCurrency(s.monthlySpend)}/mo</span>
              </div>
            </div>
            <div className="scenario-card-total" style={{ color: isActive ? s.color : '#1E1E2A' }}>
              {formatFullCurrency(s.totalSpend)}
            </div>
            <div className="scenario-card-metrics">
              <div className="scm"><span className="scm-label">Impressions</span><span className="scm-value">{s.metrics.impressionsLabel}</span></div>
              <div className="scm"><span className="scm-label">Reach</span><span className="scm-value">{s.metrics.reachLabel}</span></div>
              <div className="scm"><span className="scm-label">Video View Rate</span><span className="scm-value">{s.metrics.videoViewRate}%</span></div>
              <div className="scm"><span className="scm-label">Landing Page Views</span><span className="scm-value">{formatLargeNumber(s.metrics.landingPageViews)}</span></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// =============================================================================
// EDUCATION FUNNEL COMPONENT
// =============================================================================
const EducationFunnel = ({ scenario, stages }) => {
  const stageValues = [
    { ...stages[0], value: scenario.metrics.impressions, label: formatLargeNumber(scenario.metrics.impressions) },
    { ...stages[1], value: Math.round(scenario.metrics.impressions * (scenario.metrics.videoViewRate / 100)), label: formatLargeNumber(Math.round(scenario.metrics.impressions * (scenario.metrics.videoViewRate / 100))) },
    { ...stages[2], value: scenario.metrics.landingPageViews, label: formatLargeNumber(scenario.metrics.landingPageViews) },
    { ...stages[3], value: scenario.metrics.engagedVisitors, label: formatLargeNumber(scenario.metrics.engagedVisitors) }
  ];

  const getConversionRate = (fromVal, toVal) => {
    if (!fromVal) return null;
    return ((toVal / fromVal) * 100).toFixed(1);
  };

  return (
    <div className="education-funnel-horizontal">
      {stageValues.map((stage, i) => {
        const Icon = stage.icon;
        const convRate = i > 0 ? getConversionRate(stageValues[i - 1].value, stage.value) : null;

        return (
          <React.Fragment key={stage.id}>
            {convRate && (
              <div className="efh-arrow">
                <ArrowRight size={16} />
                <span className="efh-conv-rate">{convRate}%</span>
              </div>
            )}
            <div className="efh-node" style={{ borderTopColor: stage.color }}>
              <div className="efh-icon" style={{ color: stage.color }}>
                <Icon size={18} />
              </div>
              <div className="efh-value" style={{ color: stage.color }}>{stage.label}</div>
              <div className="efh-name">{stage.name}</div>
              <div className="efh-subtitle">{stage.subtitle}</div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

// =============================================================================
// STRATEGIC PILLARS COMPONENT
// =============================================================================
const StrategicPillars = ({ pillars }) => {
  const [expandedPillar, setExpandedPillar] = useState(null);

  const iconMap = { Shield, Zap, RefreshCw };

  return (
    <div className="pillars-grid">
      {pillars.map(pillar => {
        const Icon = iconMap[pillar.icon] || Shield;
        const isExpanded = expandedPillar === pillar.id;

        return (
          <div
            key={pillar.id}
            className={`pillar-card ${isExpanded ? 'expanded' : ''}`}
            style={{ '--pillar-color': pillar.color }}
            onClick={() => setExpandedPillar(isExpanded ? null : pillar.id)}
          >
            <div className="pillar-header">
              <div className="pillar-icon" style={{ color: pillar.color }}>
                <Icon size={20} />
              </div>
              <div className="pillar-title">
                <h4>{pillar.name}</h4>
                <span className="pillar-phase">{pillar.phase}</span>
              </div>
              <span className="pillar-toggle">{isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
            </div>
            <p className="pillar-desc">{pillar.description}</p>
            {isExpanded && (
              <div className="pillar-detail">
                <div className="pillar-target">
                  <span className="pillar-detail-label">Target Audience</span>
                  <span className="pillar-detail-value">{pillar.target}</span>
                </div>
                <div className="pillar-tactics">
                  <span className="pillar-detail-label">Tactics</span>
                  <ul>
                    {pillar.tactics.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                </div>
                {pillar.contentCategories && (
                  <div className="pillar-content-cats">
                    <span className="pillar-detail-label">Content Categories</span>
                    <div className="content-cat-tags">
                      {pillar.contentCategories.map((c, i) => (
                        <span key={i} className="content-cat-tag" style={{ borderColor: pillar.color, color: pillar.color }}>{c}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// =============================================================================
// RISK vs. SOLUTION MATRIX COMPONENT
// =============================================================================
const RiskSolutionMatrix = ({ riskSolutions }) => {
  return (
    <div className="risk-solution-grid">
      <div className="rs-column-headers">
        <div className="rs-col-header rs-col-risk"><AlertTriangle size={14} /> The Risk</div>
        <div className="rs-col-header rs-col-solution"><Shield size={14} /> Our Solution</div>
      </div>
      {riskSolutions.map((item, i) => (
        <div key={i} className="rs-row" style={{ '--rs-color': item.color }}>
          <div className="rs-risk">
            <h4 className="rs-risk-title">{item.risk}</h4>
            <p className="rs-risk-detail">{item.riskDetail}</p>
          </div>
          <div className="rs-solution">
            <h4 className="rs-solution-title" style={{ color: item.color }}>{item.solution}</h4>
            <p className="rs-solution-detail">{item.solutionDetail}</p>
            <div className="rs-goal">
              <Target size={12} />
              <span>{item.goal}</span>
            </div>
            <div className="rs-phase-badge" style={{ color: item.color }}>
              {item.phase}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// =============================================================================
// BUDGET SPLIT BAR COMPONENT
// =============================================================================
const BudgetSplitBar = ({ scenario }) => {
  const { education, remarketing } = scenario.budgetSplit;
  return (
    <div className="budget-split">
      <div className="budget-split-bar">
        <div
          className="split-segment education-segment"
          style={{ width: `${education.percent}%` }}
        />
        <div
          className="split-segment remarketing-segment"
          style={{ width: `${remarketing.percent}%` }}
        />
      </div>
      <div className="budget-split-legend">
        <div className="split-legend-item">
          <span className="split-legend-dot education-dot" />
          <span className="split-legend-text">{education.label}: {formatCurrency(education.amount)}</span>
        </div>
        <div className="split-legend-item">
          <span className="split-legend-dot remarketing-dot" />
          <span className="split-legend-text">{remarketing.label}: {formatCurrency(remarketing.amount)}</span>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// CROSS-PROJECT AUDIENCE COMPONENT
// =============================================================================
const CrossProjectAudience = ({ pools, methodology }) => {
  const [showMethodology, setShowMethodology] = useState(false);

  return (
    <div className="cross-project-audience">
      <div className="cpa-pools">
        {pools.map(pool => (
          <div key={pool.id} className="cpa-pool-card">
            <div className="cpa-pool-header">
              <div className="cpa-pool-icon">
                <Globe size={18} />
              </div>
              <div className="cpa-pool-info">
                <h4>{pool.name}</h4>
                <span className="cpa-pool-type">{pool.type}</span>
              </div>
              <span className={`cpa-pool-status ${pool.status.toLowerCase()}`}>{pool.status}</span>
            </div>
            <div className="cpa-pool-sources">
              {pool.sources.map((s, i) => (
                <span key={i} className="cpa-source-tag">{s}</span>
              ))}
            </div>
            <div className="cpa-pool-size">
              <span className="cpa-size-label">Estimated Pool Size</span>
              <span className="cpa-size-value">{pool.estimatedSize}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="cpa-combined">
        <div className="cpa-combined-card">
          <div className="cpa-combined-header">
            <RefreshCw size={20} />
            <div>
              <h4>Combined Remarketing Pool</h4>
              <span>De-duplicated across all 3 projects</span>
            </div>
          </div>
          <div className="cpa-combined-detail">
            <p>Audiences are combined using Meta's audience overlap tools and email-match hashing to avoid redundant impressions. The 20% remarketing budget serves this unified pool.</p>
          </div>
        </div>
      </div>

      <div className="cpa-methodology-toggle" onClick={() => setShowMethodology(!showMethodology)}>
        {showMethodology ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        <span>Data Sourcing Methodology</span>
      </div>
      {showMethodology && (
        <div className="cpa-methodology-content">
          <p>{methodology}</p>
        </div>
      )}
    </div>
  );
};

// =============================================================================
// EDUCATION CONTENT BREAKDOWN COMPONENT
// =============================================================================
const EducationContentBreakdown = ({ categories, scenario }) => {
  const educationBudget = scenario.budgetSplit.education.amount;
  const hasValidation = categories.some(c => c.isThirdPartyValidation);

  return (
    <div className="edu-content-breakdown">
      {hasValidation && (
        <div className="third-party-header">
          <UserCheck size={18} className="tpv-icon" />
          <div>
            <h4 className="tpv-title">Third-Party Validation: Removing Developer Bias</h4>
            <p className="tpv-subtitle">Neutral creators and experts validate leasehold — not the developer</p>
          </div>
        </div>
      )}
      <h4 className="edu-content-title">Education & Awareness Budget Breakdown (80%)</h4>
      <div className="edu-content-grid">
        {categories.map(cat => {
          const catBudget = Math.round(educationBudget * (cat.percentOfEducation / 100));
          return (
            <div key={cat.id} className={`edu-content-card ${cat.isThirdPartyValidation ? 'tpv-card' : ''}`}>
              <div className="edu-content-header">
                <h5>{cat.name}</h5>
                <span className="edu-content-phase">{cat.phase}</span>
              </div>
              {cat.isThirdPartyValidation && (
                <span className="tpv-badge"><Shield size={10} /> Third-Party Validation</span>
              )}
              <p className="edu-content-desc">{cat.description}</p>
              <div className="edu-content-budget">
                <span className="edu-content-amount">{formatCurrency(catBudget)}</span>
                <span className="edu-content-pct">{cat.percentOfEducation}% of Education</span>
              </div>
              {cat.validationNotes && (
                <div className="tpv-notes">
                  {cat.validationNotes.map((note, i) => (
                    <div key={i} className="tpv-note-item">
                      <CheckCircle size={12} />
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="edu-content-examples">
                {cat.examples.map((ex, i) => (
                  <span key={i} className="edu-example-tag">{ex}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// =============================================================================
// CREATIVE GALLERY COMPONENT
// =============================================================================
const CreativeGallery = ({ creatives }) => {
  const [activeAudience, setActiveAudience] = useState(0);

  if (!creatives) return null;

  const active = creatives.audiences[activeAudience];

  return (
    <div className="creative-gallery">
      <div className="cg-header-row">
        <div className="cg-agency">
          <span className="cg-agency-label">Creative Direction</span>
          <span className="cg-agency-name">{creatives.agency}</span>
        </div>
        <div className="cg-format-badge">
          <PlayCircle size={14} />
          <span>{creatives.format}</span>
        </div>
      </div>

      {/* Audience Tabs */}
      <div className="cg-audience-tabs">
        {creatives.audiences.map((aud, i) => (
          <button
            key={aud.id}
            className={`cg-audience-tab ${i === activeAudience ? 'active' : ''}`}
            onClick={() => setActiveAudience(i)}
            style={{ '--tab-color': aud.color }}
          >
            <Users size={14} />
            {aud.name}
          </button>
        ))}
      </div>

      {/* Creative Preview */}
      <div className="cg-preview-container">
        <div className="cg-preview-image">
          <img
            src={`${import.meta.env.BASE_URL}${active.image.replace(/^\//, '')}`}
            alt={`${active.name} — ${creatives.concept}`}
            loading="lazy"
          />
        </div>
      </div>

      {/* Hook + CTA */}
      <div className="cg-copy-row">
        <div className="cg-copy-item">
          <span className="cg-copy-label">Emotional Hook</span>
          <span className="cg-copy-value">{active.hook}</span>
        </div>
        <div className="cg-copy-item">
          <span className="cg-copy-label">CTA Button</span>
          <span className="cg-copy-cta" style={{ background: active.color }}>{active.cta}</span>
        </div>
      </div>

      {/* Slide Flow */}
      <div className="cg-slide-flow">
        {creatives.slideFlow.map((slide, i) => (
          <div key={i} className="cg-slide-step">
            <div className="cg-slide-num">Slide {slide.slide}</div>
            <div className="cg-slide-label">{slide.label}</div>
            <div className="cg-slide-desc">{slide.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// =============================================================================
// INFLUENCER SHOWCASE COMPONENT
// =============================================================================
const InfluencerShowcase = ({ influencerContent }) => {
  if (!influencerContent) return null;
  const { creator, reels } = influencerContent;

  return (
    <div className="influencer-showcase">
      {/* Creator Profile */}
      <div className="is-creator-row">
        <div className="is-creator-avatar">
          <span>BC</span>
        </div>
        <div className="is-creator-info">
          <h4 className="is-creator-name">{creator.name} <span className="is-creator-alias">({creator.alias})</span></h4>
          <p className="is-creator-role">{creator.role}</p>
          <span className="is-creator-partnership"><Star size={10} /> {creator.partnership}</span>
        </div>
        <a href={`https://www.instagram.com/${creator.handle.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="is-creator-handle">
          <Globe size={14} /> {creator.handle}
        </a>
      </div>

      {/* Reels Grid */}
      <div className="is-reels-grid">
        {reels.map(reel => (
          <div key={reel.id} className="is-reel-card">
            <div className="is-reel-embed">
              <iframe
                src={reel.embedUrl}
                width="100%"
                height="480"
                frameBorder="0"
                scrolling="no"
                allowTransparency="true"
                allow="encrypted-media"
                title={`${creator.name} — ${reel.project}`}
                style={{ borderRadius: '2px', border: 'none' }}
              />
            </div>
            <div className="is-reel-meta">
              <div className="is-reel-project-badge" style={{ background: reel.project === 'Boardwalk' ? 'rgba(74,124,159,0.1)' : 'rgba(61,122,95,0.1)', color: reel.project === 'Boardwalk' ? '#4A7C9F' : '#3D7A5F' }}>
                {reel.project}
              </div>
              <span className="is-reel-phase">{reel.phase}: {reel.type}</span>
              <p className="is-reel-desc">{reel.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// =============================================================================
// SCENARIO COMPARISON TABLE
// =============================================================================
// =============================================================================
// BUDGET DONUT — 80/20 Split, Scenario-Aware
// =============================================================================
const BudgetDonut = ({ scenario }) => {
  const COLORS = ['#3D7A5F', '#4A7C9F'];
  const chartData = [
    { name: 'Education & Awareness', value: scenario.budgetSplit.education.amount },
    { name: 'Cross-Project Remarketing', value: scenario.budgetSplit.remarketing.amount }
  ];

  return (
    <div className="budget-donut">
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie data={chartData} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={2} dataKey="value">
            {chartData.map((entry, i) => <Cell key={i} fill={COLORS[i]} />)}
          </Pie>
          <Tooltip formatter={(v) => formatFullCurrency(v)} contentStyle={{ background: 'white', border: '1px solid #E8E4DE', borderRadius: '8px', fontSize: '12px' }} />
        </PieChart>
      </ResponsiveContainer>
      <div className="donut-center">
        <span className="donut-total">{formatCurrency(scenario.totalSpend)}</span>
        <span className="donut-label">Total</span>
      </div>
      <div className="donut-legend">
        {chartData.map((item, i) => (
          <div key={i} className="legend-row">
            <span className="legend-dot" style={{ background: COLORS[i] }} />
            <span className="legend-name">{item.name}</span>
            <span className="legend-val">{formatCurrency(item.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// =============================================================================
// CAMPAIGN TIMELINE — 2 Phases, 7 Months
// =============================================================================
const CampaignTimeline = ({ phases }) => (
  <div className="timeline-wrap">
    <div className="timeline-track">
      {phases.map((phase, i) => (
        <div key={i} className="timeline-phase">
          <div className="phase-dot" style={{ background: i === 0 ? '#3D7A5F' : '#C9A96E' }} />
          <div className="phase-name">{phase.name}</div>
          <div className="phase-dates">{formatDate(phase.start)} - {formatDate(phase.end)}</div>
          {phase.description && <div className="phase-description">{phase.description}</div>}
        </div>
      ))}
    </div>
  </div>
);

// =============================================================================
// PLATFORM CARD — Scenario-Aware with Pillar Badge
// =============================================================================
const PlatformCard = ({ platform, activeScenario, expanded, onToggle }) => {
  const totalBudget = getPlatformTotalForScenario(platform, activeScenario);
  const pillar = pillarConfig[platform.pillar];

  return (
    <div className={`platform-card ${expanded ? 'expanded' : ''}`}>
      <div className="platform-card-header" onClick={onToggle}>
        <div className="platform-card-left">
          <div className="platform-logo-wrap-lg">
            <PlatformLogo platformId={platform.id} size={26} />
          </div>
          <div>
            <h4>{platform.name}</h4>
            <span className="campaign-count">{platform.campaigns.length} campaign{platform.campaigns.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
        <div className="platform-card-right">
          {pillar && (
            <span className="pillar-badge" style={{ backgroundColor: `${pillar.color}15`, color: pillar.color, border: `1px solid ${pillar.color}30` }}>
              {pillar.name}
            </span>
          )}
          <span className="platform-budget">{formatCurrency(totalBudget)}</span>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>
      {expanded && (
        <div className="platform-card-body">
          {platform.campaigns.map((c, i) => {
            const spend = getScenarioSpend(c, activeScenario);
            const daily = getScenarioDailySpend(c, activeScenario);
            const campPillar = pillarConfig[c.pillar];
            return (
              <div key={i} className="campaign-detail-card">
                <div className="campaign-detail-top">
                  <span className="campaign-detail-name">{c.name}</span>
                  <span className="campaign-detail-budget">{formatCurrency(spend)}</span>
                </div>
                <div className="campaign-detail-meta">
                  <span><Calendar size={12} /> {formatDate(c.startDate)} - {formatDate(c.endDate)}</span>
                  <span><DollarSign size={12} /> ${daily}/day</span>
                  {campPillar && <span className="pillar-badge-sm" style={{ backgroundColor: `${campPillar.color}15`, color: campPillar.color }}>{campPillar.name}</span>}
                </div>
                <p className="campaign-format">{c.format}</p>
                {c.targeting && <div className="campaign-targeting"><Target size={12} /> {c.targeting}</div>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// =============================================================================
// TRUE GANTT CHART — 7-Month, Phase Overlays, Scenario-Aware
// =============================================================================
const TrueGanttChart = ({ platforms, projectStart, projectEnd, phases, activeScenario }) => {
  const selectedView = 'full';
  const [collapsedPlatforms, setCollapsedPlatforms] = useState({});
  const [hoveredCampaign, setHoveredCampaign] = useState(null);
  const [hoveredPlatform, setHoveredPlatform] = useState(null);

  const months = useMemo(() => getMonthsInRange(projectStart, projectEnd), [projectStart, projectEnd]);

  const getVisibleRange = () => {
    if (selectedView === 'full') return { start: new Date(projectStart), end: new Date(projectEnd), months, isMonthly: false };
    if (selectedView === 'phase1' && phases[0]) return {
      start: new Date(phases[0].start), end: new Date(phases[0].end),
      months: months.filter(m => new Date(m.startDate) < new Date(phases[0].end) && new Date(m.endDate) >= new Date(phases[0].start)),
      isMonthly: false
    };
    if (selectedView === 'phase2' && phases[1]) return {
      start: new Date(phases[1].start), end: new Date(phases[1].end),
      months: months.filter(m => new Date(m.startDate) < new Date(phases[1].end) && new Date(m.endDate) >= new Date(phases[1].start)),
      isMonthly: false
    };
    const selectedMonth = months.find(m => m.month === selectedView);
    if (selectedMonth) {
      const weeks = getWeeksInMonth(selectedMonth.year, selectedMonth.monthNumber);
      return { start: selectedMonth.startDate, end: selectedMonth.endDate, weeks, isMonthly: true, month: selectedMonth };
    }
    return { start: new Date(projectStart), end: new Date(projectEnd), months, isMonthly: false };
  };

  const visibleRange = getVisibleRange();
  const totalDays = getDaysBetween(visibleRange.start, visibleRange.end);

  const togglePlatform = (platformId) => {
    setCollapsedPlatforms(prev => ({ ...prev, [platformId]: !prev[platformId] }));
  };

  const getBarPosition = (campaign) => {
    const campStart = new Date(campaign.startDate);
    const campEnd = new Date(campaign.endDate);
    const rangeStart = visibleRange.start;
    const rangeEnd = visibleRange.end;
    const visStart = campStart < rangeStart ? rangeStart : campStart;
    const visEnd = campEnd > rangeEnd ? rangeEnd : campEnd;
    if (visStart > rangeEnd || visEnd < rangeStart) return null;
    const startOffset = getDaysBetween(rangeStart, visStart);
    const duration = getDaysBetween(visStart, visEnd) + 1;
    return { left: `${(startOffset / totalDays) * 100}%`, width: `${Math.max((duration / totalDays) * 100, 2)}%` };
  };

  const getPlatformCombinedBar = (campaigns) => {
    if (!campaigns || campaigns.length === 0) return null;
    const activeCampaigns = campaigns.filter(c => isCampaignActiveInPeriod(c, visibleRange.start, visibleRange.end));
    if (activeCampaigns.length === 0) return null;
    let earliestStart = new Date(activeCampaigns[0].startDate);
    let latestEnd = new Date(activeCampaigns[0].endDate);
    activeCampaigns.forEach(c => {
      const start = new Date(c.startDate);
      const end = new Date(c.endDate);
      if (start < earliestStart) earliestStart = start;
      if (end > latestEnd) latestEnd = end;
    });
    const rangeStart = visibleRange.start;
    const rangeEnd = visibleRange.end;
    const visStart = earliestStart < rangeStart ? rangeStart : earliestStart;
    const visEnd = latestEnd > rangeEnd ? rangeEnd : latestEnd;
    if (visStart > rangeEnd || visEnd < rangeStart) return null;
    const startOffset = getDaysBetween(rangeStart, visStart);
    const duration = getDaysBetween(visStart, visEnd) + 1;
    return {
      left: `${(startOffset / totalDays) * 100}%`,
      width: `${Math.max((duration / totalDays) * 100, 2)}%`,
      startDate: earliestStart, endDate: latestEnd, campaignCount: activeCampaigns.length
    };
  };

  // Phase overlay positions
  const getPhaseOverlay = (phase) => {
    const phaseStart = new Date(phase.start);
    const phaseEnd = new Date(phase.end);
    const rangeStart = visibleRange.start;
    const rangeEnd = visibleRange.end;
    const visStart = phaseStart < rangeStart ? rangeStart : phaseStart;
    const visEnd = phaseEnd > rangeEnd ? rangeEnd : phaseEnd;
    if (visStart > rangeEnd || visEnd < rangeStart) return null;
    const startOffset = getDaysBetween(rangeStart, visStart);
    const duration = getDaysBetween(visStart, visEnd) + 1;
    return { left: `${(startOffset / totalDays) * 100}%`, width: `${(duration / totalDays) * 100}%` };
  };

  const getPillarColor = (pillarId) => {
    return pillarConfig[pillarId]?.color || '#7A7A85';
  };

  return (
    <div className="gantt-container">
      <div className="gantt-controls">
        <div className="gantt-legend">
          <div className="legend-item"><span className="legend-bar" style={{ background: '#3D7A5F' }} /> Trust-Based</div>
          <div className="legend-item"><span className="legend-bar" style={{ background: '#C9A96E' }} /> Emotional</div>
          <div className="legend-item"><span className="legend-bar" style={{ background: '#4A7C9F' }} /> Remarketing</div>
        </div>
      </div>

      <div className="gantt-chart">
        <div className="gantt-header">
          <div className="gantt-label-col">Campaign</div>
          <div className="gantt-timeline-col">
            {visibleRange.isMonthly ? (
              visibleRange.weeks.map((w, i) => <div key={i} className="gantt-time-header">{w.label}</div>)
            ) : (
              visibleRange.months.map((m, i) => <div key={i} className="gantt-time-header">{m.shortMonth}</div>)
            )}
          </div>
          <div className="gantt-budget-col">Budget</div>
        </div>

        {/* Phase overlay bands */}
        {!visibleRange.isMonthly && selectedView === 'full' && (
          <div className="gantt-phase-overlays" style={{ position: 'relative', height: 0 }}>
            {phases.map((phase, i) => {
              const pos = getPhaseOverlay(phase);
              if (!pos) return null;
              return (
                <div
                  key={phase.id}
                  className="gantt-phase-band"
                  style={{
                    position: 'absolute',
                    left: `calc(280px + ${pos.left})`,
                    width: `calc(${pos.width} * (100% - 370px) / 100%)`,
                    top: 0,
                    bottom: 0,
                    backgroundColor: i === 0 ? 'rgba(61,122,95,0.04)' : 'rgba(201,169,110,0.04)',
                    borderLeft: i === 0 ? 'none' : '2px dashed rgba(201,169,110,0.3)',
                    pointerEvents: 'none',
                    zIndex: 0
                  }}
                />
              );
            })}
          </div>
        )}

        <div className="gantt-body">
          {platforms.map(platform => {
            const isCollapsed = collapsedPlatforms[platform.id];
            const activeCampaigns = platform.campaigns.filter(c =>
              isCampaignActiveInPeriod(c, visibleRange.start, visibleRange.end)
            );
            if (activeCampaigns.length === 0 && selectedView !== 'full') return null;
            const platformTotal = getPlatformTotalForScenario(platform, activeScenario);

            return (
              <div key={platform.id} className="platform-group">
                <div className="platform-row" onClick={() => togglePlatform(platform.id)}>
                  <div className="gantt-label-col platform-header">
                    <span className="platform-toggle">{isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}</span>
                    <div className="platform-logo-wrap">
                      <PlatformLogo platformId={platform.id} size={18} />
                    </div>
                    <span className="platform-name">{platform.name}</span>
                    <span className="platform-count">({activeCampaigns.length})</span>
                  </div>
                  <div className="gantt-timeline-col">
                    <div className="timeline-grid platform-grid">
                      {visibleRange.isMonthly
                        ? visibleRange.weeks.map((_, i) => <div key={i} className="grid-line" />)
                        : visibleRange.months.map((_, i) => <div key={i} className="grid-line" />)
                      }
                    </div>
                    {isCollapsed ? (
                      (() => {
                        const combinedBar = getPlatformCombinedBar(platform.campaigns);
                        if (!combinedBar) return <div className="platform-bar-bg" />;
                        return (
                          <>
                            <div
                              className="platform-combined-bar"
                              style={{ left: combinedBar.left, width: combinedBar.width, backgroundColor: platform.color }}
                              onMouseEnter={(e) => { e.stopPropagation(); setHoveredPlatform(platform.id); }}
                              onMouseLeave={() => setHoveredPlatform(null)}
                            >
                              <span className="combined-bar-label">{formatCurrency(platformTotal)}</span>
                            </div>
                            {hoveredPlatform === platform.id && (
                              <div className="platform-tooltip" style={{ left: combinedBar.left }}>
                                <div className="tooltip-header">{platform.name}</div>
                                <div className="tooltip-row"><span>Total Budget:</span> {formatCurrency(platformTotal)}</div>
                                <div className="tooltip-row"><span>Date Range:</span> {formatDate(combinedBar.startDate)} - {formatDate(combinedBar.endDate)}</div>
                                <div className="tooltip-row"><span>Campaigns:</span> {combinedBar.campaignCount}</div>
                                <div className="tooltip-hint">Click to expand campaigns</div>
                              </div>
                            )}
                          </>
                        );
                      })()
                    ) : (
                      <div className="platform-bar-bg" />
                    )}
                  </div>
                  <div className="gantt-budget-col platform-total">{formatCurrency(platformTotal)}</div>
                </div>

                {!isCollapsed && activeCampaigns.map(campaign => {
                  const barPos = getBarPosition(campaign);
                  if (!barPos) return null;
                  const spend = getScenarioSpend(campaign, activeScenario);
                  const daily = getScenarioDailySpend(campaign, activeScenario);
                  const barColor = getPillarColor(campaign.pillar);

                  return (
                    <div
                      key={campaign.id}
                      className="campaign-row"
                    >
                      <div className="gantt-label-col campaign-label">
                        <span className="stage-dot" style={{ backgroundColor: barColor }} />
                        <span className="campaign-name-text" title={campaign.name}>{campaign.name}</span>
                        <span className="campaign-type-badge">{campaign.type}</span>
                      </div>
                      <div className="gantt-timeline-col">
                        <div className="timeline-grid">
                          {visibleRange.isMonthly
                            ? visibleRange.weeks.map((_, i) => <div key={i} className="grid-line" />)
                            : visibleRange.months.map((_, i) => <div key={i} className="grid-line" />)
                          }
                        </div>
                        <div
                          className="campaign-bar"
                          style={{ left: barPos.left, width: barPos.width, backgroundColor: barColor }}
                          onMouseEnter={() => setHoveredCampaign(campaign)}
                          onMouseLeave={() => setHoveredCampaign(null)}
                        >
                          <span className="bar-label">{formatCurrency(spend)}</span>
                        </div>
                        {hoveredCampaign?.id === campaign.id && (
                          <div className="campaign-tooltip" style={{ left: barPos.left }}>
                            <div className="tooltip-header">{campaign.name}</div>
                            <div className="tooltip-row"><span>Platform:</span> {platform.name}</div>
                            <div className="tooltip-row"><span>Dates:</span> {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}</div>
                            <div className="tooltip-row"><span>Budget:</span> {formatCurrency(spend)}</div>
                            <div className="tooltip-row"><span>Daily:</span> ${daily}/day</div>
                            <div className="tooltip-row"><span>Pillar:</span> {pillarConfig[campaign.pillar]?.name || campaign.pillar}</div>
                          </div>
                        )}
                      </div>
                      <div className="gantt-budget-col">{formatCurrency(spend)}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* Total Row */}
          <div className="gantt-total-row">
            <div className="gantt-label-col" style={{ fontWeight: 700, fontSize: 13, color: '#1E1E2A' }}>
              Total Campaign Budget
            </div>
            <div className="gantt-timeline-col">
              <div className="timeline-grid platform-grid">
                {visibleRange.isMonthly
                  ? visibleRange.weeks.map((_, i) => <div key={i} className="grid-line" />)
                  : visibleRange.months.map((_, i) => <div key={i} className="grid-line" />)
                }
              </div>
            </div>
            <div className="gantt-budget-col platform-total" style={{ fontWeight: 700, fontSize: 14, color: '#3D7A5F' }}>
              {formatCurrency(platforms.reduce((sum, p) => sum + getPlatformTotalForScenario(p, activeScenario), 0))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

// =============================================================================
// PROJECTIONS TAB
// =============================================================================
const ProjectionsTab = ({ scenarios, activeScenario, benchmarks, projections }) => {
  const [showAssumptions, setShowAssumptions] = useState(false);
  const scenario = scenarios.find(s => s.id === activeScenario);

  const funnelMetrics = [
    { label: 'Total Impressions', value: formatLargeNumber(scenario.metrics.impressions), icon: Eye },
    { label: 'Video View Rate', value: `${scenario.metrics.videoViewRate}%`, icon: Video },
    { label: 'Landing Page Views', value: formatLargeNumber(scenario.metrics.landingPageViews), icon: MousePointer },
    { label: 'Engaged Visitors', value: formatLargeNumber(scenario.metrics.engagedVisitors), icon: UserCheck },
    { label: 'Unique Reach', value: scenario.metrics.reachLabel, icon: Users },
    { label: 'Total Investment', value: formatFullCurrency(scenario.totalSpend), icon: DollarSign }
  ];

  return (
    <div className="projections-tab">
      {/* Scenario Comparison — Hero Position */}
      <div className="card hero-card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Investment Scenario Comparison</h2>
            <p className="card-subtitle">Side-by-side performance across all three budget scenarios — Scenario B recommended</p>
          </div>
        </div>
        <ScenarioComparisonTable scenarios={scenarios} />
      </div>

      <div className="projections-header-banner">
        <div className="banner-icon"><TrendingUp size={24} /></div>
        <div className="banner-content">
          <h3>Performance Projections — {scenario.name}</h3>
          <p>Based on historical Vancouver benchmarks: ${benchmarks.blendedCPM} CPM, ${benchmarks.blendedCPC} CPC, {benchmarks.videoLPVRate}% Video LPV Rate</p>
        </div>
        <div className="banner-badge">
          <Lock size={14} />
          <span>PROJECTED</span>
        </div>
      </div>

      {/* Active Scenario Metrics */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Projected Outcomes — {scenario.shortName}</h2>
            <p className="card-subtitle">7-month campaign • {formatCurrency(scenario.monthlySpend)}/month • {scenario.metrics.frequency}x monthly frequency</p>
          </div>
        </div>
        <div className="projections-metrics-grid">
          {funnelMetrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <div key={i} className={`projection-metric-card ${i < 2 ? 'highlight' : ''}`}>
                <div className="metric-icon"><Icon size={20} /></div>
                <div className="metric-content">
                  <span className="metric-label">{m.label}</span>
                  <span className="metric-value">{m.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Assumptions */}
      <div className="card assumptions-card">
        <div className="assumptions-header" onClick={() => setShowAssumptions(!showAssumptions)}>
          <div className="assumptions-title">
            {showAssumptions ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            <span>Methodology & Assumptions</span>
          </div>
          <span className="assumptions-toggle">{showAssumptions ? 'Hide' : 'Show'}</span>
        </div>
        {showAssumptions && (
          <div className="assumptions-content">
            <div className="assumptions-section">
              <h4>Assumptions</h4>
              <ul>
                {projections.assumptions.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
            <div className="assumptions-section">
              <h4>Data Sources</h4>
              <ul>
                {projections.dataSources.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="projections-disclaimer">
        <div className="disclaimer-icon"><AlertTriangle size={20} /></div>
        <div className="disclaimer-content">
          <h4>Important — Prepared by Periphery Digital</h4>
          <p>
            These projections are estimates based on historical performance and industry benchmarks.
            Actual results may vary based on creative quality, market conditions, targeting accuracy,
            competitive landscape, and seasonal factors. Projections serve as planning guidelines,
            not guarantees.
          </p>
        </div>
      </div>
    </div>
  );
};

const ScenarioComparisonTable = ({ scenarios }) => {
  const metrics = [
    { key: 'totalSpend', label: 'Total 7-Month Spend', format: (v) => formatFullCurrency(v) },
    { key: 'monthlySpend', label: 'Monthly Spend', format: (v) => formatCurrency(v) },
    { key: 'impressions', label: 'Est. Total Impressions', format: (v, s) => s.metrics.impressionsLabel },
    { key: 'reach', label: 'Est. Reach (Unique)', format: (v, s) => s.metrics.reachLabel },
    { key: 'videoViewRate', label: 'Target Video View Rate', format: (v, s) => `${s.metrics.videoViewRate}%` },
    { key: 'landingPageViews', label: 'Est. Landing Page Views', format: (v, s) => formatLargeNumber(s.metrics.landingPageViews) },
    { key: 'engagedVisitors', label: 'Est. Engaged Visitors', format: (v, s) => formatLargeNumber(s.metrics.engagedVisitors) },
    { key: 'frequency', label: 'Monthly Frequency', format: (v, s) => `${s.metrics.frequency}x` },
    { key: 'divider', label: 'Efficiency Metrics', isDivider: true },
    { key: 'cpm', label: 'Blended CPM', format: (v, s) => '$' + ((s.totalSpend / s.metrics.impressions) * 1000).toFixed(2), highlight: true },
    { key: 'costPerLPV', label: 'Cost per Landing Page View', format: (v, s) => '$' + (s.totalSpend / s.metrics.landingPageViews).toFixed(2), highlight: true }
  ];

  return (
    <div className="scenario-comparison-table">
      <div className="sct-header">
        <div className="sct-metric-col">Metric</div>
        {scenarios.map(s => (
          <div key={s.id} className="sct-scenario-col" style={{ borderTopColor: s.color }}>
            <span className="sct-scenario-letter" style={{ background: s.color }}>{s.label}</span>
            <span className="sct-scenario-name">{s.shortName}</span>
            {s.recommended && <span className="sct-rec">REC</span>}
          </div>
        ))}
      </div>
      <div className="sct-body">
        {metrics.map((m, i) => {
          if (m.isDivider) {
            return (
              <div key={m.key} className="sct-row sct-divider">
                <div className="sct-metric-col sct-divider-label">{m.label}</div>
                {scenarios.map(s => <div key={s.id} className="sct-value-col" />)}
              </div>
            );
          }
          return (
            <div key={m.key} className={`sct-row ${i % 2 === 0 ? 'even' : 'odd'} ${m.highlight ? 'highlight' : ''}`}>
              <div className="sct-metric-col">{m.label}</div>
              {scenarios.map(s => (
                <div key={s.id} className={`sct-value-col ${s.recommended ? 'recommended' : ''}`}>
                  {m.format(s[m.key], s)}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// =============================================================================
// MAIN DASHBOARD
// =============================================================================
export default function AquiliniLeaseholdDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeScenario, setActiveScenario] = useState('strategic');
  const [expandedPlatform, setExpandedPlatform] = useState(null);


  const data = campaignData;
  const scenario = data.scenarios.find(s => s.id === activeScenario);

  const tabs = [
    { id: 'overview', label: 'Executive Summary', icon: Layers },
    { id: 'strategy', label: 'Strategy & Audiences', icon: Target },
    { id: 'schedule', label: 'Media Plan', icon: Calendar },
    { id: 'projections', label: 'Investment & Projections', icon: TrendingUp }
  ];

  return (
    <div className="dashboard">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

        :root {
          /* Color Palette */
          --c-primary: #1E1E2A;
          --c-primary-light: #2E2E3A;
          --c-green: #3D7A5F;
          --c-green-light: #F7FBF9;
          --c-gold: #C9A96E;
          --c-gold-light: #FFFBF5;
          --c-blue: #4A7C9F;
          --c-red: #B85C5C;
          --c-teal: #3D8B8B;
          --c-text: #1E1E2A;
          --c-text-secondary: #7A7A85;
          --c-border: #ECEAE6;
          --c-border-light: #F5F3EF;
          --c-bg: #FAFAFA;
          --c-bg-warm: #F5F3EF;
          --c-bg-deep: #ECEAE6;
          --c-surface: #FFFFFF;

          /* Typography */
          --font-display: 'Cormorant Garamond', Georgia, serif;
          --font-body: 'DM Sans', -apple-system, sans-serif;

          /* Spacing Scale (4px base) */
          --s-1: 4px; --s-2: 8px; --s-3: 12px; --s-4: 16px; --s-5: 20px;
          --s-6: 24px; --s-7: 28px; --s-8: 32px; --s-10: 40px; --s-12: 48px;
          --s-16: 64px; --s-24: 96px;

          /* Shadows — flattened: most elements sit on-surface */
          --shadow-subtle: none;
          --shadow-medium: 0 2px 8px rgba(30,30,42,0.04);
          --shadow-elevated: 0 8px 24px rgba(30,30,42,0.08);
          --shadow-dramatic: 0 12px 36px rgba(30,30,42,0.12);

          /* Border Radius — editorial sharpness */
          --r-sm: 4px; --r-md: 4px; --r-lg: 2px; --r-xl: 4px;
          --r-soft: 6px;
          --r-sharp: 0px;

          /* Transitions */
          --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
          --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
          --t-fast: 150ms; --t-normal: 250ms; --t-slow: 400ms;
        }

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        ::selection { background: rgba(201,169,110,0.25); color: var(--c-primary); }

        .dashboard {
          min-height: 100vh;
          background: linear-gradient(165deg, var(--c-bg) 0%, var(--c-bg-warm) 50%, var(--c-bg-deep) 100%);
          font-family: var(--font-body);
          color: var(--c-text);
          padding: var(--s-10);
          position: relative;
        }

        /* Subtle grain texture overlay */
        .dashboard::before {
          content: '';
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          opacity: 0.025;
          pointer-events: none;
          z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 256px 256px;
        }

        .dashboard > * { position: relative; z-index: 1; }

        /* Header */
        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--s-7); padding-bottom: var(--s-6); border-bottom: 1px solid rgba(30,30,42,0.08); }
        .header-left { display: flex; align-items: center; gap: var(--s-5); }
        .brand-logo { width: 52px; height: 52px; background: #E8722A; border-radius: 10px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(232,114,42,0.25); }
        .header-text h1 { font-family: var(--font-display); font-size: 28px; font-weight: 600; color: var(--c-text); letter-spacing: -0.3px; }
        .header-meta { display: flex; gap: var(--s-4); font-size: 13px; color: var(--c-text-secondary); margin-top: var(--s-1); }
        .header-meta span { display: flex; align-items: center; gap: 5px; }
        .header-prepared { font-size: 11px; color: var(--c-text-secondary); margin-top: 6px; font-style: italic; }
        .header-right { text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
        .header-period { font-size: 12px; color: var(--c-text-secondary); }
        .header-budget { font-family: var(--font-display); font-size: 34px; font-weight: 700; color: var(--c-green); letter-spacing: -0.5px; }
        .header-objective { font-size: 11px; color: var(--c-green); padding: 0; background: none; border-radius: 0; display: inline-block; font-weight: 600; letter-spacing: 0.8px; text-transform: uppercase; }

        /* Nav */
        .nav-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--s-7); gap: var(--s-4); flex-wrap: wrap; }
        .nav-tabs { display: flex; gap: 4px; background: var(--c-surface); padding: 5px; border-radius: var(--r-soft); width: fit-content; box-shadow: none; border: 1px solid var(--c-border); backdrop-filter: blur(12px); }
        .nav-tab { display: flex; align-items: center; gap: 7px; padding: 10px 20px; border: none; background: transparent; font-family: var(--font-body); font-size: 13px; font-weight: 500; color: var(--c-text-secondary); cursor: pointer; border-radius: 6px; transition: all var(--t-normal) var(--ease-out); }
        .nav-tab:hover:not(.active) { background: var(--c-border-light); color: var(--c-text); }
        .nav-tab.active { background: var(--c-primary); color: var(--c-bg); box-shadow: 0 2px 8px rgba(30,30,42,0.2); }

        /* Scenario Pills (Compact) */
        .scenario-pills { display: flex; gap: 6px; }
        .scenario-pill { display: flex; align-items: center; gap: 6px; padding: 8px 14px; border: 2px solid; border-radius: var(--r-sm); background: var(--c-surface); font-family: var(--font-body); font-size: 12px; font-weight: 600; cursor: pointer; transition: all var(--t-normal) var(--ease-out); }
        .scenario-pill:hover { transform: translateY(-2px); box-shadow: var(--shadow-medium); }
        .scenario-pill.active { box-shadow: var(--shadow-elevated); }
        .pill-label { font-weight: 700; }
        .pill-name { }
        .pill-rec { font-size: 9px; padding: 2px 5px; background: rgba(255,255,255,0.3); border-radius: 3px; letter-spacing: 0.5px; }

        /* Scenario Toggle Full */
        .scenario-toggle-full { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
        .scenario-card { background: var(--c-surface); border-radius: var(--r-lg); padding: var(--s-6); border: 2px solid var(--c-border); cursor: pointer; transition: all var(--t-normal) var(--ease-out); position: relative; overflow: hidden; }
        .scenario-card:hover { border-color: var(--c-gold); }
        .scenario-card.active { box-shadow: var(--shadow-dramatic); }
        .scenario-rec-badge { position: absolute; top: 12px; right: 12px; padding: 4px 10px; border-radius: 0; font-size: 9px; font-weight: 600; color: white; letter-spacing: 1.2px; text-transform: uppercase; }
        .scenario-card-header { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }
        .scenario-letter { width: 36px; height: 36px; border-radius: 2px; display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-weight: 700; font-size: 18px; flex-shrink: 0; }
        .scenario-card-title h4 { font-size: 16px; font-weight: 600; color: #1E1E2A; }
        .scenario-monthly { font-size: 12px; color: #7A7A85; }
        .scenario-card-total { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 700; margin-bottom: 20px; }
        .scenario-card-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .scm { display: flex; flex-direction: column; gap: 2px; }
        .scm-label { font-size: 10px; color: #7A7A85; text-transform: uppercase; letter-spacing: 0.3px; }
        .scm-value { font-size: 14px; font-weight: 600; color: #1E1E2A; }

        /* Layout */
        .main-grid { display: grid; grid-template-columns: 1fr 320px; gap: 24px; }
        .main-grid.full-width { grid-template-columns: 1fr; }
        .main-content { display: flex; flex-direction: column; gap: 24px; }

        /* Cards — subtle contained sections */
        .card { background: var(--c-surface); border-radius: var(--r-sm); padding: var(--s-6); border: 1px solid var(--c-border-light); box-shadow: none; transition: none; margin-bottom: var(--s-5); }
        .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--s-7); }
        .card-title { font-family: var(--font-display); font-size: 26px; font-weight: 600; color: var(--c-text); letter-spacing: -0.5px; }
        .card-subtitle { font-size: 13px; color: var(--c-text-secondary); margin-top: var(--s-1); line-height: 1.55; }

        /* Sidebar — open sections */
        .sidebar { display: flex; flex-direction: column; gap: var(--s-5); }
        .sidebar-card { background: var(--c-surface); border-radius: var(--r-sm); padding: var(--s-4) var(--s-5); border: 1px solid var(--c-border-light); box-shadow: none; margin-bottom: var(--s-3); }
        .sidebar-title { font-family: var(--font-display); font-size: 15px; font-weight: 600; color: var(--c-text); margin-bottom: var(--s-4); }

        /* Budget Donut */
        .budget-donut { position: relative; }
        .donut-center { position: absolute; top: 90px; left: 50%; transform: translate(-50%, -50%); text-align: center; }
        .donut-total { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; color: #1E1E2A; display: block; }
        .donut-label { font-size: 10px; color: #7A7A85; text-transform: uppercase; letter-spacing: 0.5px; }
        .donut-legend { display: flex; flex-direction: column; gap: 6px; margin-top: 12px; }
        .legend-row { display: flex; align-items: center; gap: 8px; font-size: 11px; }
        .legend-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .legend-name { flex: 1; color: #7A7A85; }
        .legend-val { font-weight: 600; color: #1E1E2A; }

        /* Audience */
        .audience-list { display: flex; flex-direction: column; gap: 10px; }
        .audience-item { display: flex; flex-direction: column; gap: 2px; }
        .audience-label { font-size: 9px; text-transform: uppercase; letter-spacing: 0.5px; color: #7A7A85; }
        .audience-value { font-size: 12px; color: #1E1E2A; }

        /* Timeline */
        .timeline-wrap { padding: 16px 0; }
        .timeline-track { display: flex; background: #F5F3EF; border-radius: 8px; padding: 4px; }
        .timeline-phase { flex: 1; position: relative; padding: 14px; background: white; margin: 0 2px; border-radius: 6px; }
        .timeline-phase:first-child { margin-left: 0; border-radius: 6px 0 0 6px; }
        .timeline-phase:last-child { margin-right: 0; border-radius: 0 6px 6px 0; }
        .phase-dot { width: 9px; height: 9px; border-radius: 50%; margin-bottom: 8px; }
        .phase-name { font-size: 12px; font-weight: 600; color: #1E1E2A; margin-bottom: 3px; }
        .phase-dates { font-size: 10px; color: #7A7A85; }
        .phase-description { font-size: 11px; color: #7A7A85; margin-top: 6px; line-height: 1.4; }

        /* Education Funnel */
        .education-funnel { display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .edu-funnel-stage-wrap { width: 100%; display: flex; flex-direction: column; align-items: center; }
        .edu-funnel-conv-rate { display: flex; align-items: center; gap: 4px; font-size: 11px; color: #7A7A85; margin: 4px 0; }
        .edu-funnel-bar { border-radius: 10px; padding: 16px 22px; transition: all 0.3s; }
        .edu-funnel-bar:hover { transform: scale(1.01); box-shadow: 0 4px 14px rgba(30,30,42,0.1); }
        .edu-funnel-inner { display: flex; align-items: center; justify-content: space-between; color: white; }
        .edu-funnel-left { display: flex; align-items: center; gap: 12px; }
        .edu-funnel-text { display: flex; flex-direction: column; }
        .edu-funnel-name { font-weight: 600; font-size: 15px; }
        .edu-funnel-sub { font-size: 11px; opacity: 0.8; }
        .edu-funnel-right { text-align: right; }
        .edu-funnel-value { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; }
        .edu-funnel-detail { background: rgba(30,30,42,0.03); border-radius: 10px; padding: 16px; margin-top: 6px; animation: slideDown 0.3s ease; }
        .edu-funnel-detail p { font-size: 12px; color: #7A7A85; line-height: 1.5; margin-bottom: 10px; }
        .edu-funnel-detail-metrics { display: flex; flex-wrap: wrap; gap: 6px; }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }

        /* Pillars — editorial sections */
        .pillars-grid { display: flex; flex-direction: column; gap: 0; }
        .pillar-card { background: transparent; border-radius: 0; border: none; border-bottom: 1px solid var(--c-border); padding: 28px 0; cursor: pointer; transition: background var(--t-normal); }
        .pillar-card:last-child { border-bottom: none; }
        .pillar-card:hover { background: var(--c-bg-warm); }
        .pillar-card.expanded { background: var(--c-bg-warm); }
        .pillar-header { display: flex; align-items: center; gap: 10px; }
        .pillar-icon { width: auto; height: auto; background: none; border-radius: 0; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .pillar-title h4 { font-size: 16px; font-weight: 600; color: #1E1E2A; }
        .pillar-phase { font-size: 10px; color: #7A7A85; text-transform: uppercase; letter-spacing: 1px; }
        .pillar-toggle { margin-left: auto; color: #7A7A85; }
        .pillar-desc { font-size: 13px; color: #7A7A85; margin-top: 10px; line-height: 1.5; }
        .pillar-detail { margin-top: 16px; padding-top: 16px; border-top: 1px solid #F0EBE4; animation: slideDown 0.3s ease; }
        .pillar-detail-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: #7A7A85; display: block; margin-bottom: 6px; }
        .pillar-detail-value { font-size: 13px; color: #1E1E2A; }
        .pillar-tactics { margin-top: 12px; }
        .pillar-tactics ul { list-style: none; padding: 0; }
        .pillar-tactics li { font-size: 12px; color: #1E1E2A; padding: 4px 0 4px 14px; position: relative; }
        .pillar-tactics li:before { content: '•'; position: absolute; left: 0; color: #C9A96E; }
        .pillar-content-cats { margin-top: 12px; }
        .content-cat-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .content-cat-tag { padding: 0; border: none; border-radius: 0; font-size: 11px; font-weight: 500; color: var(--c-text-secondary); }

        /* Risk vs. Solution Matrix — editorial */
        .risk-solution-grid { display: flex; flex-direction: column; gap: 0; }
        .rs-column-headers { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; padding: 0 0 16px 0; border-bottom: 1px solid var(--c-border); }
        .rs-col-header { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .rs-col-risk { color: var(--c-red, #B85C5C); }
        .rs-col-solution { color: var(--c-green, #3D7A5F); }
        .rs-row { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: start; padding: 28px 0; border-bottom: 1px solid var(--c-border); position: relative; }
        .rs-row:last-child { border-bottom: none; padding-bottom: 0; }
        .rs-risk { background: transparent; border-radius: 0; padding: 0; border: none; }
        .rs-risk-title { font-family: var(--font-display, 'Cormorant Garamond', serif); font-size: 20px; font-weight: 600; color: var(--c-red, #B85C5C); margin: 0 0 8px 0; }
        .rs-risk-detail { font-size: 13px; color: var(--c-text-secondary, #7A7A85); line-height: 1.55; margin: 0; }
        .rs-arrow { display: none; }
        .rs-solution { background: transparent; border-radius: 0; padding: 0; border: none; }
        .rs-solution-title { font-family: var(--font-display, 'Cormorant Garamond', serif); font-size: 20px; font-weight: 600; margin: 0 0 8px 0; }
        .rs-solution-detail { font-size: 13px; color: var(--c-text, #1E1E2A); line-height: 1.55; margin: 0 0 12px 0; }
        .rs-goal { display: flex; align-items: flex-start; gap: 6px; font-size: 12px; color: var(--c-green, #3D7A5F); font-weight: 500; background: transparent; padding: 10px 0 0 0; border-radius: 0; border-top: 1px solid var(--c-border-light); line-height: 1.4; }
        .rs-goal svg { flex-shrink: 0; margin-top: 1px; }
        .rs-phase-badge { font-size: 10px; font-weight: 600; padding: 0; border: none; border-radius: 0; background: transparent; text-transform: uppercase; letter-spacing: 1.2px; color: var(--c-text-secondary); position: static; display: block; margin-top: 10px; }

        /* Budget Split */
        .budget-split { margin-top: 8px; }
        .budget-split-bar { display: flex; border-radius: 8px; overflow: hidden; height: 40px; }
        .split-segment { display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; }
        .education-segment { background: #3D7A5F; }
        .remarketing-segment { background: #4A7C9F; }
        .split-label { font-size: 10px; font-weight: 600; opacity: 0.9; }
        .split-amount { font-size: 11px; font-weight: 700; }
        .budget-split-legend { display: flex; gap: 20px; margin-top: 10px; }
        .split-legend-item { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #7A7A85; }
        .split-legend-dot { width: 8px; height: 8px; border-radius: 50%; }
        .education-dot { background: #3D7A5F; }
        .remarketing-dot { background: #4A7C9F; }

        /* Cross-Project Audience */
        .cross-project-audience { }
        .cpa-pools { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .cpa-pool-card { background: transparent; border-radius: 0; border: none; border-bottom: 1px solid var(--c-border); padding: 20px 0; }
        .cpa-pool-header { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
        .cpa-pool-icon { width: auto; height: auto; background: none; border-radius: 0; display: inline-flex; align-items: center; justify-content: center; color: #7A7A85; flex-shrink: 0; }
        .cpa-pool-info h4 { font-size: 14px; font-weight: 600; color: #1E1E2A; }
        .cpa-pool-type { font-size: 11px; color: #7A7A85; }
        .cpa-pool-status { font-size: 10px; padding: 0; border-radius: 0; font-weight: 600; margin-left: auto; text-transform: uppercase; letter-spacing: 0.8px; }
        .cpa-pool-status.active { background: none; color: #3D7A5F; }
        .cpa-pool-sources { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 12px; }
        .cpa-source-tag { font-size: 10px; padding: 0; background: none; border-radius: 0; color: #7A7A85; }
        .cpa-pool-size { }
        .cpa-size-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.3px; color: #7A7A85; display: block; margin-bottom: 2px; }
        .cpa-size-value { font-size: 12px; color: #1E1E2A; font-weight: 500; }
        .cpa-combined { display: flex; flex-direction: column; align-items: center; margin: 20px 0; }
        .cpa-arrow { color: #7A7A85; margin-bottom: 12px; }
        .cpa-combined-card { background: transparent; border: none; border-top: 2px solid var(--c-green); border-radius: 0; padding: 20px 0; width: 100%; }
        .cpa-combined-header { display: flex; align-items: center; gap: 14px; color: #3D7A5F; margin-bottom: 12px; }
        .cpa-combined-header h4 { font-size: 16px; font-weight: 600; color: #1E1E2A; }
        .cpa-combined-header span { font-size: 12px; color: #7A7A85; display: block; }
        .cpa-combined-detail p { font-size: 12px; color: #7A7A85; line-height: 1.5; }
        .cpa-methodology-toggle { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #7A7A85; cursor: pointer; margin-top: 16px; padding: 8px 0; }
        .cpa-methodology-toggle:hover { color: #1E1E2A; }
        .cpa-methodology-content { background: transparent; border-radius: 0; padding: 16px 0 0 0; margin-top: 8px; border-top: 1px solid var(--c-border-light); animation: slideDown 0.3s ease; }
        .cpa-methodology-content p { font-size: 12px; color: #7A7A85; line-height: 1.6; }

        /* Education Content Breakdown */
        .edu-content-breakdown { margin-top: 20px; }
        .edu-content-title { font-size: 14px; font-weight: 600; color: #1E1E2A; margin-bottom: 14px; }
        .edu-content-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .edu-content-card { background: transparent; border: none; border-right: 1px solid var(--c-border); border-radius: 0; padding: 18px 24px 18px 0; }
        .edu-content-card:last-child { border-right: none; }
        .edu-content-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .edu-content-header h5 { font-size: 14px; font-weight: 600; color: #1E1E2A; }
        .edu-content-phase { font-size: 10px; padding: 0; background: none; border-radius: 0; color: #7A7A85; text-transform: uppercase; letter-spacing: 0.8px; }
        .edu-content-desc { font-size: 12px; color: #7A7A85; line-height: 1.4; margin-bottom: 12px; }
        .edu-content-budget { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .edu-content-amount { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 700; color: #3D7A5F; }
        .edu-content-pct { font-size: 11px; color: #7A7A85; }
        .edu-content-examples { display: flex; flex-wrap: wrap; gap: 4px; }
        .edu-example-tag { font-size: 10px; padding: 0; background: none; border-radius: 0; color: #7A7A85; }

        /* Third-Party Validation */
        .third-party-header { display: flex; align-items: flex-start; gap: 12px; padding: 0 0 20px 0; background: transparent; border-radius: 0; margin-bottom: 20px; border: none; border-top: 2px solid var(--c-green); padding-top: 20px; }
        .tpv-icon { width: auto; height: auto; background: none; border-radius: 0; display: inline-flex; align-items: center; justify-content: center; color: var(--c-green, #3D7A5F); flex-shrink: 0; }
        .tpv-title { font-family: var(--font-display, 'Cormorant Garamond', serif); font-size: 18px; font-weight: 600; color: var(--c-primary, #1E1E2A); margin: 0 0 4px 0; }
        .tpv-subtitle { font-size: 13px; color: var(--c-text-secondary, #7A7A85); margin: 0; line-height: 1.4; }
        .tpv-badge { display: inline-flex; align-items: center; gap: 4px; font-size: 10px; font-weight: 600; padding: 0; background: none; color: var(--c-green, #3D7A5F); border-radius: 0; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; }
        .tpv-card { border-left: none !important; }
        .tpv-notes { display: flex; flex-direction: column; gap: 6px; margin-bottom: 10px; padding: 10px 0 0 0; background: transparent; border-radius: 0; border-top: 1px solid var(--c-border-light); }
        .tpv-note-item { display: flex; align-items: flex-start; gap: 8px; font-size: 12px; color: var(--c-text, #1E1E2A); line-height: 1.4; }
        .tpv-note-item svg { flex-shrink: 0; color: var(--c-green, #3D7A5F); margin-top: 2px; }

        /* Creative Gallery */
        .creative-gallery { }
        .cg-header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .cg-agency-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.6px; color: var(--c-text-secondary, #7A7A85); display: block; margin-bottom: 2px; }
        .cg-agency-name { font-size: 14px; font-weight: 600; color: var(--c-primary, #1E1E2A); }
        .cg-format-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 500; padding: 0; background: none; border-radius: 0; color: var(--c-text-secondary, #7A7A85); text-transform: uppercase; letter-spacing: 0.5px; }
        .cg-audience-tabs { display: flex; gap: 8px; margin-bottom: 20px; }
        .cg-audience-tab { display: flex; align-items: center; gap: 6px; padding: 10px 16px 8px; border: none; border-bottom: 2px solid transparent; background: transparent; border-radius: 0; font-size: 12px; font-weight: 500; color: var(--c-text-secondary, #7A7A85); cursor: pointer; transition: all var(--t-normal, 250ms) var(--ease-out, ease); font-family: var(--font-body, 'DM Sans', sans-serif); }
        .cg-audience-tab:hover { color: var(--c-primary, #1E1E2A); border-bottom-color: var(--c-border); }
        .cg-audience-tab.active { border-bottom-color: var(--tab-color, var(--c-gold)); color: var(--c-primary, #1E1E2A); font-weight: 600; }
        .cg-preview-container { border-radius: var(--r-sm); overflow: hidden; margin-bottom: 20px; background: #F5F3EF; border: 1px solid var(--c-border, #ECEAE6); min-height: 200px; }
        .cg-preview-image { width: 100%; }
        .cg-preview-image img { width: 100%; height: auto; display: block; object-fit: contain; }
        .cg-copy-row { display: grid; grid-template-columns: 1fr auto; gap: 20px; align-items: center; margin-bottom: 20px; padding: 16px 20px; background: var(--c-bg-warm, #F5F3EF); border-radius: 12px; }
        .cg-copy-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--c-text-secondary, #7A7A85); display: block; margin-bottom: 4px; }
        .cg-copy-value { font-family: var(--font-display, 'Cormorant Garamond', serif); font-size: 18px; font-weight: 600; font-style: italic; color: var(--c-primary, #1E1E2A); line-height: 1.3; }
        .cg-copy-cta { display: inline-block; padding: 8px 20px; border-radius: 8px; font-size: 11px; font-weight: 700; letter-spacing: 0.8px; color: var(--c-primary, #1E1E2A); }
        .cg-slide-flow { display: flex; align-items: stretch; gap: 0; }
        .cg-slide-step { flex: 1; text-align: center; padding: 14px 10px; background: transparent; border: none; border-right: 1px solid var(--c-border, #ECEAE6); border-radius: 0; }
        .cg-slide-step:last-child { border-right: none; }
        .cg-slide-num { font-size: 10px; text-transform: uppercase; letter-spacing: 0.8px; color: var(--c-gold, #C9A96E); font-weight: 700; margin-bottom: 4px; }
        .cg-slide-label { font-size: 13px; font-weight: 600; color: var(--c-primary, #1E1E2A); margin-bottom: 2px; }
        .cg-slide-desc { font-size: 11px; color: var(--c-text-secondary, #7A7A85); line-height: 1.3; }
        .cg-slide-arrow { display: flex; align-items: center; padding: 0 6px; color: var(--c-gold, #C9A96E); }

        /* Influencer Showcase */
        .influencer-showcase { }
        .is-creator-row { display: flex; align-items: center; gap: 16px; padding: 20px 0; background: transparent; border-radius: 0; margin-bottom: 20px; border: none; border-bottom: 1px solid var(--c-border); }
        .is-creator-avatar { width: 48px; height: 48px; border-radius: 50%; background: var(--c-primary, #1E1E2A); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0; }
        .is-creator-info { flex: 1; }
        .is-creator-name { font-size: 16px; font-weight: 600; color: var(--c-primary, #1E1E2A); margin: 0; }
        .is-creator-alias { font-weight: 400; color: var(--c-text-secondary, #7A7A85); }
        .is-creator-role { font-size: 12px; color: var(--c-text-secondary, #7A7A85); margin: 2px 0 4px 0; }
        .is-creator-partnership { display: inline-flex; align-items: center; gap: 4px; font-size: 10px; font-weight: 600; padding: 0; background: none; color: var(--c-gold, #C9A96E); border-radius: 0; text-transform: uppercase; letter-spacing: 1px; }
        .is-creator-handle { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; color: var(--c-text-secondary, #7A7A85); text-decoration: none; padding: 6px 14px; border: 1px solid var(--c-border, #ECEAE6); border-radius: 8px; transition: all var(--t-normal, 250ms); }
        .is-creator-handle:hover { border-color: var(--c-gold, #C9A96E); color: var(--c-primary, #1E1E2A); }
        .is-reels-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .is-reel-card { border: 1px solid var(--c-border, #ECEAE6); border-radius: 2px; overflow: hidden; background: white; transition: border-color var(--t-normal, 250ms); }
        .is-reel-card:hover { border-color: var(--c-gold); }
        .is-reel-embed { background: #FAFAFA; min-height: 200px; }
        .is-reel-embed iframe { display: block; }
        .is-reel-meta { padding: 16px; }
        .is-reel-project-badge { display: inline-block; font-size: 10px; font-weight: 600; padding: 0; border-radius: 0; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.8px; }
        .is-reel-phase { font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--c-text-secondary, #7A7A85); display: block; margin-bottom: 6px; }
        .is-reel-desc { font-size: 12px; color: var(--c-text, #1E1E2A); line-height: 1.5; margin: 0; }

        /* Metric Tags — plain text */
        .metric-tag { padding: 0; background: none; border-radius: 0; font-size: 11px; color: #7A7A85; }

        /* Scenario Comparison Table */
        .scenario-comparison-table { border-radius: 10px; overflow: hidden; border: 1px solid #E8E4DE; }
        .sct-header { display: flex; background: #F9F7F4; border-bottom: 1px solid #E8E4DE; }
        .sct-metric-col { width: 200px; flex-shrink: 0; padding: 14px 16px; font-size: 12px; font-weight: 600; color: #7A7A85; }
        .sct-scenario-col { flex: 1; padding: 12px 16px; text-align: center; border-top: 3px solid transparent; display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .sct-scenario-letter { width: 24px; height: 24px; border-radius: 2px; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: 700; }
        .sct-scenario-name { font-size: 12px; font-weight: 600; color: #1E1E2A; }
        .sct-rec { font-size: 9px; padding: 0; background: none; color: #3D7A5F; border-radius: 0; font-weight: 600; letter-spacing: 0.8px; text-transform: uppercase; }
        .sct-body { }
        .sct-row { display: flex; border-bottom: 1px solid #F0EBE4; }
        .sct-row:last-child { border-bottom: none; }
        .sct-row.even { background: #FDFCFA; }
        .sct-row.odd { background: white; }
        .sct-row:hover { background: #FFF8E7; }
        .sct-row .sct-metric-col { font-size: 12px; color: #7A7A85; font-weight: 500; display: flex; align-items: center; }
        .sct-value-col { flex: 1; padding: 12px 16px; text-align: center; font-size: 13px; font-weight: 600; color: #1E1E2A; display: flex; align-items: center; justify-content: center; }
        .sct-value-col.recommended { background: rgba(61,122,95,0.04); }
        .sct-row.highlight { background: var(--c-gold-light, #FFFBF5); }
        .sct-row.highlight .sct-metric-col { color: var(--c-primary, #1E1E2A); font-weight: 600; }
        .sct-row.highlight .sct-value-col { font-weight: 700; color: var(--c-green, #3D7A5F); }
        .sct-divider { background: var(--c-bg-warm, #F5F3EF) !important; border-bottom: 1px solid var(--c-border, #ECEAE6); }
        .sct-divider:hover { background: var(--c-bg-warm, #F5F3EF) !important; }
        .sct-divider-label { font-size: 11px !important; text-transform: uppercase; letter-spacing: 0.8px; color: var(--c-gold, #C9A96E) !important; font-weight: 700 !important; padding: 10px 16px !important; }

        /* Gantt Total Row */
        .gantt-total-row { display: flex; background: #F9F7F4; border-top: 2px solid #E8E4DE; }
        .gantt-total-row .gantt-label-col { display: flex; align-items: center; }
        .gantt-total-row .gantt-timeline-col { position: relative; min-height: 48px; }
        .gantt-total-row .gantt-budget-col { display: flex; align-items: center; justify-content: flex-end; }

        /* Pillar Badge — de-pilled */
        .pillar-badge { display: inline-flex; align-items: center; padding: 0; border-radius: 0; font-size: 10px; font-weight: 600; letter-spacing: 0.8px; text-transform: uppercase; }
        .pillar-badge-sm { display: inline-flex; align-items: center; padding: 0; border-radius: 0; font-size: 9px; font-weight: 600; letter-spacing: 0.5px; }

        /* Gantt Chart */
        .gantt-container { position: relative; }
        .gantt-controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
        .view-selector { display: flex; align-items: center; gap: 8px; }
        .view-selector select { padding: 9px 14px; border: 1px solid #E8E4DE; border-radius: 7px; font-family: 'DM Sans', sans-serif; font-size: 12px; color: #1E1E2A; background: white; cursor: pointer; }
        .gantt-legend { display: flex; gap: 16px; }
        .gantt-legend .legend-item { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #7A7A85; }
        .legend-bar { width: 20px; height: 10px; border-radius: 3px; }

        .gantt-chart { border: 1px solid #E8E4DE; border-radius: 4px; overflow: visible; background: white; }
        .gantt-header { display: flex; background: #F9F7F4; border-bottom: 1px solid #E8E4DE; font-size: 11px; font-weight: 600; color: #7A7A85; }
        .gantt-label-col { width: 280px; flex-shrink: 0; padding: 12px 16px; border-right: 1px solid #E8E4DE; }
        .gantt-timeline-col { flex: 1; display: flex; }
        .gantt-time-header { flex: 1; text-align: center; padding: 12px 8px; border-right: 1px solid #F0EBE4; }
        .gantt-time-header:last-child { border-right: none; }
        .gantt-budget-col { width: 90px; flex-shrink: 0; padding: 12px 16px; text-align: right; border-left: 1px solid #E8E4DE; }

        .platform-group { border-bottom: 1px solid #F0EBE4; }
        .platform-group:last-child { border-bottom: none; }
        .platform-row { display: flex; background: #FDFCFA; cursor: pointer; transition: background 0.2s; }
        .platform-row:hover { background: #F5F3EF; }
        .platform-row .gantt-label-col { display: flex; align-items: center; gap: 8px; }
        .platform-header { display: flex; align-items: center; gap: 10px; }
        .platform-toggle { color: #7A7A85; flex-shrink: 0; }
        .platform-logo-wrap { width: 32px; height: 32px; background: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
        .platform-logo-wrap-lg { width: 44px; height: 44px; background: #F9F7F4; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .platform-name { font-size: 13px; font-weight: 600; color: #1E1E2A; }
        .platform-count { font-size: 11px; color: #7A7A85; }
        .platform-bar-bg { height: 8px; background: #F0EBE4; border-radius: 4px; margin: 14px 8px; flex: 1; }
        .platform-total { font-weight: 600; color: #1E1E2A; font-size: 13px; display: flex; align-items: center; justify-content: flex-end; }
        .platform-row .gantt-timeline-col { position: relative; min-height: 48px; }
        .platform-grid { position: absolute; inset: 0; display: flex; z-index: 1; }

        .platform-combined-bar {
          position: absolute; top: 50%; transform: translateY(-50%); height: 32px; border-radius: 6px;
          display: flex; align-items: center; justify-content: center; z-index: 2;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.05) 100%);
          box-shadow: 0 2px 8px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2);
          transition: all 0.2s ease; cursor: pointer;
        }
        .platform-combined-bar:hover { transform: translateY(-50%) scale(1.01); box-shadow: 0 4px 12px rgba(0,0,0,0.18); }
        .combined-bar-label { font-size: 11px; font-weight: 700; color: white; text-shadow: 0 1px 3px rgba(0,0,0,0.3); }

        .platform-tooltip {
          position: absolute; bottom: calc(100% + 8px); background: #1E1E2A; color: #FAFAFA;
          padding: 12px 14px; border-radius: 8px; font-size: 11px; z-index: 100; min-width: 200px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.25); animation: tooltipFade 0.2s ease; pointer-events: none;
        }
        .tooltip-hint { margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 10px; color: rgba(255,255,255,0.5); font-style: italic; }

        .campaign-row { display: flex; border-top: 1px solid #F5F3EF; transition: background 0.2s; cursor: pointer; }
        .campaign-row:hover { background: #FDFCFA; }
        .campaign-row.selected { background: #FFF8E7; }
        .campaign-row .gantt-label-col { padding-left: 56px; display: flex; align-items: center; gap: 8px; }
        .campaign-label { display: flex; align-items: center; gap: 8px; }
        .stage-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .campaign-name-text { font-size: 12px; color: #1E1E2A; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; }
        .campaign-type-badge { font-size: 9px; padding: 2px 6px; background: #F0EBE4; border-radius: 4px; color: #7A7A85; flex-shrink: 0; }
        .campaign-row .gantt-timeline-col { position: relative; min-height: 44px; }
        .timeline-grid { position: absolute; inset: 0; display: flex; }
        .grid-line { flex: 1; border-right: 1px solid #F5F3EF; }
        .grid-line:last-child { border-right: none; }
        .campaign-bar { position: absolute; top: 50%; transform: translateY(-50%); height: 26px; border-radius: 5px; display: flex; align-items: center; justify-content: center; transition: all var(--t-normal) var(--ease-out); z-index: 2; }
        .campaign-bar:hover { transform: translateY(-50%) scale(1.03); box-shadow: 0 4px 14px rgba(0,0,0,0.2); z-index: 5; filter: brightness(1.08); }
        .bar-label { font-size: 10px; font-weight: 600; color: white; text-shadow: 0 1px 2px rgba(0,0,0,0.2); }
        .campaign-row .gantt-budget-col { font-size: 12px; color: #7A7A85; display: flex; align-items: center; justify-content: flex-end; }

        .campaign-tooltip { position: absolute; bottom: calc(100% + 8px); background: var(--c-primary); color: var(--c-bg); padding: var(--s-3) var(--s-4); border-radius: var(--r-sm); font-size: 11px; z-index: 100; min-width: 220px; box-shadow: var(--shadow-dramatic); animation: tooltipFade 0.2s var(--ease-out); pointer-events: none; backdrop-filter: blur(4px); }
        @keyframes tooltipFade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .tooltip-header { font-weight: 600; font-size: 12px; margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px; }
        .tooltip-row { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 4px; }
        .tooltip-row span:first-child { color: rgba(255,255,255,0.6); }

        .campaign-detail-panel { position: fixed; right: 0; top: 0; bottom: 0; width: 400px; background: white; box-shadow: -4px 0 24px rgba(0,0,0,0.1); z-index: 1000; animation: slideIn 0.3s ease; overflow-y: auto; }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .detail-panel-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-bottom: 1px solid #E8E4DE; background: #FDFCFA; }
        .detail-panel-header h3 { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 600; color: #1E1E2A; }
        .close-btn { background: none; border: none; color: #7A7A85; cursor: pointer; padding: 8px; border-radius: 6px; transition: all 0.2s; }
        .close-btn:hover { background: #F5F3EF; color: #1E1E2A; }
        .detail-panel-body { padding: 24px; }
        .detail-panel-body .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
        .detail-panel-body .detail-item { display: flex; flex-direction: column; gap: 4px; }
        .detail-panel-body .detail-item.full-width { grid-column: 1 / -1; }
        .detail-panel-body .detail-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: #7A7A85; }
        .detail-panel-body .detail-value { font-size: 14px; font-weight: 500; color: #1E1E2A; }
        .detail-panel-body .detail-text { font-size: 13px; color: #4A4A5A; line-height: 1.5; }

        /* Platform Cards */
        .platforms-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
        .platform-card { background: #FDFCFA; border: 1px solid #E8E4DE; border-radius: 12px; overflow: hidden; transition: all 0.2s; }
        .platform-card:hover { border-color: #C9A96E; }
        .platform-card.expanded { grid-column: 1 / -1; }
        .platform-card-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 18px; cursor: pointer; }
        .platform-card-left { display: flex; align-items: center; gap: 14px; }
        .platform-card-left h4 { font-size: 14px; font-weight: 600; color: #1E1E2A; }
        .platform-card-left .campaign-count { font-size: 11px; color: #7A7A85; display: block; }
        .platform-card-right { display: flex; align-items: center; gap: 10px; }
        .platform-card-right .platform-budget { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 700; color: #3D7A5F; }
        .platform-card-body { padding: 0 18px 18px; display: flex; flex-direction: column; gap: 10px; animation: slideDown 0.3s ease; }
        .campaign-detail-card { background: white; border-radius: 8px; padding: 14px; }
        .campaign-detail-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .campaign-detail-name { font-weight: 600; font-size: 13px; color: #1E1E2A; }
        .campaign-detail-budget { font-family: 'Cormorant Garamond', serif; font-size: 16px; font-weight: 600; color: #1E1E2A; }
        .campaign-detail-meta { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 10px; font-size: 11px; color: #7A7A85; }
        .campaign-detail-meta span { display: flex; align-items: center; gap: 4px; }
        .campaign-format { font-size: 12px; color: #7A7A85; line-height: 1.4; margin-bottom: 8px; }
        .campaign-targeting { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #7A7A85; padding-top: 8px; border-top: 1px solid #F5F3EF; }

        .platform-logo { flex-shrink: 0; object-fit: contain; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.05)); }

        /* Projections Tab */
        .projections-tab { display: flex; flex-direction: column; gap: 24px; }
        .projections-header-banner {
          display: flex; align-items: center; gap: 16px; padding: 20px 0;
          background: transparent;
          border-radius: 0; border: none; border-top: 2px solid var(--c-green);
        }
        .banner-icon { width: auto; height: auto; background: none; border-radius: 0; display: inline-flex; align-items: center; justify-content: center; color: #3D7A5F; box-shadow: none; }
        .banner-content { flex: 1; }
        .banner-content h3 { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600; color: #1E1E2A; }
        .banner-content p { font-size: 12px; color: #7A7A85; margin-top: 2px; }
        .banner-badge { display: flex; align-items: center; gap: 6px; padding: 0; background: none; border-radius: 0; font-size: 11px; font-weight: 600; color: var(--c-green); border: none; text-transform: uppercase; letter-spacing: 0.8px; }

        .projections-metrics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .projection-metric-card { display: flex; align-items: center; gap: 14px; padding: 20px 0; background: transparent; border-radius: 0; border: none; border-right: 1px solid var(--c-border-light); transition: all 0.2s; }
        .projection-metric-card:last-child { border-right: none; }
        .projection-metric-card:hover { background: var(--c-bg-warm); }
        .metric-icon { width: auto; height: auto; background: none; border-radius: 0; display: inline-flex; align-items: center; justify-content: center; color: var(--c-gold); flex-shrink: 0; }
        .metric-content { display: flex; flex-direction: column; gap: 2px; }
        .metric-label { font-size: 11px; color: #7A7A85; text-transform: uppercase; letter-spacing: 0.5px; }
        .metric-value { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 700; color: #1E1E2A; }
        .projection-metric-card.highlight { background: transparent; }
        .projection-metric-card.highlight .metric-icon { color: var(--c-green); }

        /* Assumptions */
        .assumptions-card { padding: 0; }
        .assumptions-header { display: flex; justify-content: space-between; align-items: center; padding: 18px 24px; cursor: pointer; transition: background 0.2s; }
        .assumptions-header:hover { background: #FDFCFA; }
        .assumptions-title { display: flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 600; color: #1E1E2A; }
        .assumptions-toggle { font-size: 12px; color: #C9A96E; }
        .assumptions-content { padding: 0 24px 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; animation: slideDown 0.3s ease; }
        .assumptions-section h4 { font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #7A7A85; margin-bottom: 12px; }
        .assumptions-section ul { list-style: none; padding: 0; margin: 0; }
        .assumptions-section li { font-size: 12px; color: #7A7A85; padding: 6px 0; border-bottom: 1px solid #F5F3EF; position: relative; padding-left: 14px; }
        .assumptions-section li:before { content: '•'; position: absolute; left: 0; color: #C9A96E; }
        .assumptions-section li:last-child { border-bottom: none; }

        .projections-disclaimer { display: flex; gap: 16px; padding: 20px 0; background: transparent; border-radius: 0; border: none; border-top: 1px solid var(--c-border); }
        .disclaimer-icon { width: auto; height: auto; background: none; border-radius: 0; display: inline-flex; align-items: center; justify-content: center; color: #C9A96E; flex-shrink: 0; }
        .disclaimer-content h4 { font-size: 13px; font-weight: 600; color: #1E1E2A; margin-bottom: 6px; }
        .disclaimer-content p { font-size: 12px; color: #7A7A85; line-height: 1.5; }

        /* Problem Statement — editorial */
        .problem-card { border-left: none; border-top: 1px solid var(--c-gold); padding-top: var(--s-6); }
        .problem-card h3 { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; color: #1E1E2A; margin-bottom: 12px; letter-spacing: -0.3px; }
        .problem-card p { font-size: 13px; color: #7A7A85; line-height: 1.65; }

        /* Footer */
        .dashboard-footer { margin-top: 40px; padding: 20px 0; border-top: 1px solid rgba(30,30,42,0.08); display: flex; justify-content: space-between; align-items: center; }
        .footer-left { font-size: 12px; color: #7A7A85; }
        .footer-right { font-size: 11px; color: #7A7A85; }

        /* Brand Lockup (header) */
        .brand-lockup { display: flex; align-items: center; gap: var(--s-3); }
        .brand-wordmark { font-family: var(--font-body); font-size: 10px; font-weight: 600; letter-spacing: 2px; color: var(--c-text-secondary); text-transform: uppercase; }

        /* Hero Card Variant — editorial, distinguished by type not boxes */
        .hero-card { border-left: none; border-top: 1px solid var(--c-gold); background: transparent; position: relative; overflow: visible; padding-top: var(--s-8); }
        .hero-card::after { display: none; }

        /* Scenario Comparison Strip */
        .scenario-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--s-4); margin-bottom: var(--s-6); }
        .scenario-strip-item { background: var(--c-surface); border-radius: 2px; padding: var(--s-5); border: 2px solid var(--c-border); cursor: pointer; transition: all var(--t-normal) var(--ease-out); position: relative; opacity: 0.6; }
        .scenario-strip-item:hover { opacity: 0.85; border-color: var(--c-gold); box-shadow: var(--shadow-medium); }
        .scenario-strip-item.recommended:not(.active) { opacity: 0.7; border-color: var(--c-green); border-style: dashed; }
        .scenario-strip-item.active { opacity: 1; border-color: var(--c-primary); border-style: solid; box-shadow: var(--shadow-medium); z-index: 2; }
        .scenario-strip-item.active.recommended { border-color: var(--c-green); background: linear-gradient(135deg, var(--c-green-light) 0%, var(--c-surface) 100%); box-shadow: 0 6px 24px rgba(61,122,95,0.18); }
        .strip-rec-badge { display: flex; align-items: center; gap: 4px; position: absolute; top: 10px; right: 12px; font-size: 9px; font-weight: 600; color: #3D7A5F; letter-spacing: 1px; text-transform: uppercase; }
        .strip-header { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .strip-letter { width: 28px; height: 28px; border-radius: 2px; display: flex; align-items: center; justify-content: center; color: white; font-family: 'Cormorant Garamond', serif; font-weight: 700; font-size: 14px; flex-shrink: 0; }
        .strip-name { font-size: 14px; font-weight: 600; color: #1E1E2A; }
        .strip-total { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 700; margin-bottom: 12px; }
        .strip-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .strip-metric { display: flex; flex-direction: column; }
        .strip-metric span { font-size: 14px; font-weight: 600; color: #1E1E2A; font-variant-numeric: tabular-nums; }
        .strip-metric label { font-size: 10px; color: #7A7A85; text-transform: uppercase; letter-spacing: 0.3px; }

        /* KPI Executive Summary Bar */
        .kpi-bar { display: flex; align-items: center; justify-content: center; gap: 0; background: linear-gradient(135deg, var(--c-primary, #1E1E2A) 0%, var(--c-primary-light, #2E2E3A) 100%); border-radius: 0; padding: 28px 40px; margin-bottom: 24px; }
        .kpi-item { flex: 1; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 2px; }
        .kpi-value { font-family: var(--font-display, 'Cormorant Garamond', serif); font-size: 40px; font-weight: 700; color: var(--c-gold, #C9A96E); line-height: 1.1; font-variant-numeric: tabular-nums; }
        .kpi-label { font-size: 13px; font-weight: 600; color: white; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
        .kpi-context { font-size: 11px; color: rgba(255,255,255,0.5); margin-top: 2px; }
        .kpi-divider { width: 1px; height: 56px; background: rgba(255,255,255,0.15); margin: 0 20px; flex-shrink: 0; }

        /* Key Metrics Row */
        .key-metrics-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--s-4); }
        .key-metric-item { display: flex; align-items: center; gap: 14px; padding: 18px 0; background: transparent; border-radius: 0; border: none; border-right: 1px solid var(--c-border-light); transition: all 0.2s; }
        .key-metric-item:last-child { border-right: none; }
        .key-metric-item:hover { background: var(--c-bg-warm); }
        .key-metric-icon { width: auto; height: auto; background: none; border-radius: 0; display: inline-flex; align-items: center; justify-content: center; color: var(--c-gold); flex-shrink: 0; }
        .key-metric-content { display: flex; flex-direction: column; gap: 2px; }
        .key-metric-value { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 700; color: #1E1E2A; font-variant-numeric: tabular-nums; }
        .key-metric-label { font-size: 10px; color: #7A7A85; text-transform: uppercase; letter-spacing: 0.5px; }

        /* Horizontal Education Funnel */
        .education-funnel-horizontal { display: flex; align-items: center; justify-content: center; gap: 0; padding: var(--s-5) 0; }
        .efh-node { flex: 1; text-align: center; padding: var(--s-5) var(--s-4); border-radius: 0; border: none; border-top: 2px solid var(--c-border); background: transparent; transition: all var(--t-normal) var(--ease-out); min-width: 0; }
        .efh-node:hover { background: var(--c-bg-warm); }
        .efh-icon { width: auto; height: auto; border-radius: 0; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; background: none !important; }
        .efh-value { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; margin-bottom: 4px; font-variant-numeric: tabular-nums; }
        .efh-name { font-size: 12px; font-weight: 600; color: #1E1E2A; margin-bottom: 2px; }
        .efh-subtitle { font-size: 10px; color: #7A7A85; }
        .efh-arrow { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 0 8px; color: #7A7A85; flex-shrink: 0; }
        .efh-conv-rate { font-size: 11px; font-weight: 600; color: #3D7A5F; white-space: nowrap; }

        /* CTA Card — editorial */
        .cta-card { border-left: none; border-top: 1px solid var(--c-gold); background: var(--c-bg-warm); margin-top: var(--s-8); position: relative; overflow: visible; padding-top: var(--s-8); }
        .cta-card::before { display: none; }
        .cta-inner { display: flex; gap: var(--s-4); align-items: flex-start; }
        .cta-icon { width: auto; height: auto; background: none; border-radius: 0; display: inline-flex; align-items: center; justify-content: center; color: var(--c-green); flex-shrink: 0; box-shadow: none; margin-top: 2px; }
        .cta-content { flex: 1; }
        .cta-title { font-family: var(--font-display); font-size: 21px; font-weight: 600; color: var(--c-text); margin-bottom: var(--s-2); letter-spacing: -0.2px; }
        .cta-body { font-size: 14px; color: #4A4A5A; line-height: 1.65; margin-bottom: var(--s-3); }
        .cta-hint { font-size: 12px; color: var(--c-gold); font-weight: 600; letter-spacing: 0.3px; }

        /* Footer (upgraded) */
        .dashboard-footer { margin-top: var(--s-12); padding: var(--s-6) 0; border-top: 1px solid var(--c-border); display: flex; justify-content: space-between; align-items: center; position: relative; }
        .dashboard-footer::before { content: ''; position: absolute; top: -1px; left: 0; width: 60px; height: 2px; background: linear-gradient(90deg, var(--c-gold), transparent); animation: goldLineGrow 0.6s var(--ease-out) both; animation-delay: 0.3s; transform-origin: left; }
        .footer-brand { display: flex; align-items: center; gap: var(--s-3); }
        .footer-logo { width: 28px; height: 28px; background: #E8722A; border-radius: 6px; display: flex; align-items: center; justify-content: center; }
        .footer-agency { font-family: var(--font-body); font-size: 11px; font-weight: 600; letter-spacing: 1.8px; color: var(--c-text-secondary); text-transform: uppercase; }
        .footer-meta { display: flex; gap: var(--s-3); font-size: 11px; color: var(--c-text-secondary); letter-spacing: 0.3px; }

        /* Card borders & depth — flat, no hover lift */
        .card:hover { box-shadow: none; transform: none; }
        .sidebar-card:hover { box-shadow: none; transform: none; }

        /* Typography refinements */
        .card-subtitle, .pillar-desc, .phase-description, .cpa-combined-detail p, .edu-content-desc, .disclaimer-content p, .assumptions-section li { line-height: 1.55; }
        .sct-value-col, .strip-metric span, .key-metric-value, .efh-value, .scenario-card-total, .metric-value { font-variant-numeric: tabular-nums; }
        .section-subheader { font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 16px; color: #1E1E2A; margin-bottom: 14px; }

        /* Scenario card recommended emphasis — no scale, use border-top */
        .scenario-card.recommended-card { transform: none; z-index: 1; border-color: var(--c-green); border-top: 2px solid var(--c-green); background: linear-gradient(135deg, var(--c-green-light) 0%, var(--c-surface) 100%); }
        .scenario-card:not(.recommended-card) { opacity: 0.88; }
        .scenario-card:not(.recommended-card):hover { opacity: 1; }

        /* Custom scrollbar */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--c-border); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--c-text-secondary); }

        /* Focus states */
        *:focus-visible { outline: 2px solid var(--c-gold); outline-offset: 2px; border-radius: 4px; }
        .nav-tab:focus-visible, .scenario-strip-item:focus-visible, .scenario-pill:focus-visible { outline: 2px solid var(--c-gold); outline-offset: 2px; }

        /* Smooth number transitions */
        .header-budget, .strip-total, .scenario-card-total, .key-metric-value, .efh-value { transition: color var(--t-normal) var(--ease-out); }

        /* Animations */
        @keyframes tabFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardReveal {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shimmerIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes subtlePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(0.985); }
        }
        @keyframes goldLineGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        /* Staggered card entrance */
        .card { animation: cardReveal var(--t-slow) var(--ease-out) both; }
        .card:nth-child(1) { animation-delay: 0ms; }
        .card:nth-child(2) { animation-delay: 60ms; }
        .card:nth-child(3) { animation-delay: 120ms; }
        .card:nth-child(4) { animation-delay: 180ms; }
        .card:nth-child(5) { animation-delay: 240ms; }
        .card:nth-child(6) { animation-delay: 300ms; }

        /* Sticky nav */
        .nav-row { position: sticky; top: 0; z-index: 50; background: linear-gradient(165deg, var(--c-bg) 0%, var(--c-bg-warm) 50%, var(--c-bg-deep) 100%); padding-top: var(--s-2); padding-bottom: var(--s-2); backdrop-filter: blur(8px); }

        /* Responsive */
        @media (max-width: 1200px) {
          .main-grid { grid-template-columns: 1fr; }
          .sidebar { flex-direction: row; flex-wrap: wrap; }
          .sidebar-card { flex: 1; min-width: 260px; }
          .campaign-detail-panel { width: 100%; max-width: 400px; }
          .projections-metrics-grid { grid-template-columns: repeat(2, 1fr); }
          .scenario-toggle-full { grid-template-columns: 1fr; }
          .assumptions-content { grid-template-columns: 1fr; }
          .cpa-pools { grid-template-columns: 1fr; }
          .edu-content-grid { grid-template-columns: 1fr; }
          .rs-row { grid-template-columns: 1fr; gap: 8px; }
          .rs-column-headers { grid-template-columns: 1fr; }
          .rs-col-header:nth-child(2) { display: none; }
          .rs-arrow { display: none; }
          .rs-phase-badge { position: static; margin-top: 8px; align-self: flex-start; }
          .scenario-strip { grid-template-columns: 1fr; }
          .scenario-strip-item.active { transform: none; }
          .key-metrics-row { grid-template-columns: repeat(2, 1fr); }
          .education-funnel-horizontal { flex-direction: column; }
          .efh-arrow { flex-direction: row; padding: 4px 0; }
        }
        @media (max-width: 1024px) {
          .scenario-toggle-full { grid-template-columns: 1fr; }
          .gantt-label-col { width: 200px; }
          .key-metrics-row { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 768px) {
          .dashboard { padding: 20px; }
          .header { flex-direction: column; gap: 16px; }
          .header-right { text-align: left; align-items: flex-start; }
          .nav-row { flex-direction: column; position: static; }
          .nav-tabs { width: 100%; overflow-x: auto; }
          .platforms-grid { grid-template-columns: 1fr; }
          .gantt-label-col { width: 180px; }
          .projections-metrics-grid { grid-template-columns: 1fr; }
          .projections-header-banner { flex-direction: column; text-align: center; }
          .projections-disclaimer { flex-direction: column; }
          .scenario-pills { flex-wrap: wrap; }
          .key-metrics-row { grid-template-columns: 1fr; }
          .education-funnel-horizontal { flex-direction: column; }
          .efh-arrow { flex-direction: row; padding: 4px 0; }
          .cta-inner { flex-direction: column; }
          .brand-lockup { flex-direction: column; gap: 4px; }
          .kpi-bar { flex-direction: column; padding: 20px; gap: 16px; }
          .kpi-divider { width: 80%; height: 1px; margin: 0; }
          .kpi-value { font-size: 28px; }
          .rs-row { grid-template-columns: 1fr; gap: 8px; }
          .rs-arrow { display: none; }
          .rs-phase-badge { position: static; margin-top: 8px; align-self: flex-start; }
          .cg-audience-tabs { flex-wrap: wrap; }
          .cg-copy-row { grid-template-columns: 1fr; }
          .cg-slide-flow { flex-direction: column; gap: 8px; }
          .cg-slide-arrow { transform: rotate(90deg); justify-content: center; padding: 4px 0; }
          .is-reels-grid { grid-template-columns: 1fr; }
          .is-creator-row { flex-wrap: wrap; }
          .is-creator-handle { margin-top: 8px; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }

        /* Print Styles */
        @media print {
          .nav-row, .scenario-pills { display: none; }
          .dashboard { padding: 20px; background: white; }
          .dashboard::before { display: none; }
          .card { break-inside: avoid; box-shadow: none; border: 1px solid var(--c-border); animation: none; }
          .campaign-bar, .donut-ring, .edu-funnel-bar, .efh-node, .split-segment, .strip-letter, .scenario-letter { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          .dashboard-footer { position: fixed; bottom: 0; width: 100%; }
          .dashboard-footer::before { display: none; }
          .cta-card { break-before: auto; }
          .scenario-strip-item.active { transform: none; }
          .hero-card::after, .cta-card::before { display: none; }
        }

        /* === Readability Pass (Round 2 — enlarged) === */
        .dashboard { font-size: 16px; }
        .card-subtitle, .pillar-desc, .rs-risk-detail, .rs-solution-detail,
        .edu-content-desc, .campaign-format, .disclaimer-content p,
        .cpa-methodology-content p, .pillar-tactics li, .cpa-combined-detail p,
        .rs-goal, .cg-slide-desc, .tpv-note-item, .is-reel-desc,
        .detail-panel-body .detail-text, .assumptions-section li { font-size: 15px; line-height: 1.6; }

        .scm-label, .donut-label, .phase-dates, .audience-label,
        .pillar-detail-label, .cpa-source-tag, .cpa-size-label,
        .edu-content-phase, .tpv-badge, .metric-label, .key-metric-label,
        .efh-subtitle, .detail-label, .pillar-badge, .efh-name,
        .pillar-phase, .is-reel-phase { font-size: 12px; }

        .scenario-rec-badge, .sct-rec, .is-reel-project-badge { font-size: 11px; }

        .nav-tab { font-size: 15px; }
        .cta-body { font-size: 16px; line-height: 1.7; }
        .problem-card p { font-size: 15px; line-height: 1.7; }
        .card-title { font-size: 28px; }
        .header-text h1 { font-size: 30px; }
        .campaign-detail-name { font-size: 14px; }
        .gantt-header, .gantt-legend { font-size: 12px; }
        .scenario-card-title h4 { font-size: 17px; }
        .scm-value { font-size: 15px; }
        .campaign-tooltip, .platform-tooltip { font-size: 12px; }
        .tooltip-header { font-size: 13px; }
      `}</style>

      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="brand-lockup">
            <div className="brand-logo">
              <PeripheryLogo size={28} color="white" />
            </div>
            <span className="brand-wordmark">PERIPHERY DIGITAL</span>
          </div>
          <div className="header-text">
            <h1>{data.project.name}</h1>
            <div className="header-meta">
              <span>{data.project.client}</span>
              <span>•</span>
              <span><Calendar size={13} /> {data.project.period}</span>
            </div>
          </div>
        </div>
        <div className="header-right">
          <div className="header-period">Campaign Investment ({scenario.shortName})</div>
          <div className="header-budget">{formatFullCurrency(scenario.totalSpend)}</div>
          <div className="header-objective">{data.project.objective}</div>
        </div>
      </header>

      {/* Nav Row with Compact Scenario Toggle */}
      <div className="nav-row">
        <nav className="nav-tabs">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                <Icon size={15} />
                {tab.label}
              </button>
            );
          })}
        </nav>
        {activeTab !== 'overview' && (
          <ScenarioToggle scenarios={data.scenarios} activeScenario={activeScenario} onSelect={setActiveScenario} mode="compact" />
        )}
      </div>

      {/* Tab: Executive Summary */}
      {activeTab === 'overview' && (
        <>
          {/* Problem Statement — hero card */}
          <div className="card problem-card hero-card">
            <h3>The Business Problem: The "Leasehold Hurdle"</h3>
            <p>
              While prospects are attracted to Aquilini's starting price of $402,900, they often drop off the moment they encounter the term "leasehold" because they lack neutral, third-party context. Currently, individual projects are forced to spend their own budgets "re-educating" the same audience, leading to fragmented efforts. This campaign creates a unified "Validation Funnel" to neutralize the leasehold stigma before the customer reaches a sales center.
            </p>
          </div>

          {/* Always-visible Scenario Comparison Strip */}
          <div className="scenario-strip">
            {data.scenarios.map(s => {
              const isRec = s.recommended;
              const isActive = activeScenario === s.id;
              return (
                <div
                  key={s.id}
                  className={`scenario-strip-item ${isRec ? 'recommended' : ''} ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveScenario(s.id)}
                >
                  {isRec && <div className="strip-rec-badge"><CheckCircle size={12} /> Recommended</div>}
                  <div className="strip-header">
                    <span className="strip-letter" style={{ background: s.color }}>{s.label}</span>
                    <span className="strip-name">{s.shortName}</span>
                  </div>
                  <div className="strip-total" style={{ color: isActive ? s.color : '#1E1E2A' }}>{formatFullCurrency(s.totalSpend)}</div>
                  <div className="strip-metrics">
                    <div className="strip-metric"><span>{s.metrics.impressionsLabel}</span><label>Impressions</label></div>
                    <div className="strip-metric"><span>{s.metrics.reachLabel}</span><label>Reach</label></div>
                    <div className="strip-metric"><span>{formatLargeNumber(s.metrics.engagedVisitors)}</span><label>Engaged</label></div>
                    <div className="strip-metric"><span>{s.metrics.videoViewRate}%</span><label>Video VR</label></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* KPI Executive Summary Bar */}
          <div className="kpi-bar">
            <div className="kpi-item">
              <span className="kpi-value">{scenario.metrics.reachLabel}</span>
              <span className="kpi-label">Target Reach</span>
              <span className="kpi-context">Unique people across Metro Vancouver</span>
            </div>
            <div className="kpi-divider" />
            <div className="kpi-item">
              <span className="kpi-value">{scenario.metrics.frequency}x</span>
              <span className="kpi-label">Monthly Frequency</span>
              <span className="kpi-context">Educational retention threshold</span>
            </div>
            <div className="kpi-divider" />
            <div className="kpi-item">
              <span className="kpi-value">7,400+</span>
              <span className="kpi-label">Remarketing Pool</span>
              <span className="kpi-context">Leads from Kwasen, Boardwalk & TNV</span>
            </div>
          </div>

          <div className="main-grid">
            <div className="main-content">
              {data.project.phases && data.project.phases.length > 0 && (
                <div className="card">
                  <div className="card-header">
                    <div>
                      <h2 className="card-title">Campaign Timeline</h2>
                      <p className="card-subtitle">7-month education campaign — April to October 2026</p>
                    </div>
                  </div>
                  <CampaignTimeline phases={data.project.phases} />
                </div>
              )}

              {/* Key Metrics Summary from Projections */}
              <div className="card">
                <div className="card-header">
                  <div>
                    <h2 className="card-title">Key Performance Metrics — {scenario.shortName}</h2>
                    <p className="card-subtitle">Projected outcomes based on ${data.benchmarks.blendedCPM} CPM and {data.benchmarks.videoLPVRate}% Video LPV Rate</p>
                  </div>
                </div>
                <div className="key-metrics-row">
                  {[
                    { label: 'Total Impressions', value: scenario.metrics.impressionsLabel, icon: Eye },
                    { label: 'Unique Reach', value: scenario.metrics.reachLabel, icon: Users },
                    { label: 'Landing Page Views', value: formatLargeNumber(scenario.metrics.landingPageViews), icon: MousePointer },
                    { label: 'Engaged Visitors', value: formatLargeNumber(scenario.metrics.engagedVisitors), icon: UserCheck }
                  ].map((m, i) => {
                    const Icon = m.icon;
                    return (
                      <div key={i} className="key-metric-item">
                        <div className="key-metric-icon"><Icon size={18} /></div>
                        <div className="key-metric-content">
                          <span className="key-metric-value">{m.value}</span>
                          <span className="key-metric-label">{m.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="sidebar">
              <div className="sidebar-card">
                <h3 className="sidebar-title">Budget Breakdown</h3>
                <BudgetDonut scenario={scenario} />
              </div>

              <div className="sidebar-card">
                <h3 className="sidebar-title">Budget Allocation</h3>
                <BudgetSplitBar scenario={scenario} />
              </div>

              {data.audience?.primary && (
                <div className="sidebar-card">
                  <h3 className="sidebar-title">Primary Audience</h3>
                  <div className="audience-list">
                    <div className="audience-item"><span className="audience-label">Persona</span><span className="audience-value" style={{ fontWeight: 600 }}>{data.audience.primary.name}</span></div>
                    <div className="audience-item"><span className="audience-label">Demographics</span><span className="audience-value">{data.audience.primary.demographics}</span></div>
                    <div className="audience-item"><span className="audience-label">Income</span><span className="audience-value">{data.audience.primary.income}</span></div>
                    <div className="audience-item"><span className="audience-label">Psychographics</span><span className="audience-value">{data.audience.primary.psychographics}</span></div>
                    <div className="audience-item"><span className="audience-label">Geographic Focus</span><span className="audience-value">{data.audience.primary.locations}</span></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Tab: Strategy & Audiences */}
      {activeTab === 'strategy' && (
        <div className="main-grid full-width">
          <div className="main-content">
            {/* Risk vs. Solution Matrix */}
            <div className="card hero-card">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Risk vs. Solution</h2>
                  <p className="card-subtitle">Every identified barrier is matched with a strategic response</p>
                </div>
              </div>
              <RiskSolutionMatrix riskSolutions={data.riskSolutions} />
            </div>

            {/* Strategic Pillars */}
            <div className="card">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Strategic Pillars</h2>
                  <p className="card-subtitle">Click any pillar to explore tactics and content categories</p>
                </div>
              </div>
              <StrategicPillars pillars={data.strategicPillars} />
            </div>

            {/* Education Funnel — Horizontal */}
            <div className="card">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Education Funnel</h2>
                  <p className="card-subtitle">How prospects move through the validation journey — {scenario.shortName} scenario</p>
                </div>
              </div>
              <EducationFunnel scenario={scenario} stages={campaignData.educationFunnel} />
            </div>

            {/* Budget Philosophy */}
            <div className="card">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Budget Philosophy — {scenario.shortName}</h2>
                  <p className="card-subtitle">80/20 split between Education & Awareness and Cross-Project Remarketing</p>
                </div>
              </div>
              <BudgetSplitBar scenario={scenario} />
              <EducationContentBreakdown categories={data.educationContent.categories} scenario={scenario} />
            </div>

            {/* Creative Preview */}
            {data.creatives && (
              <div className="card">
                <div className="card-header">
                  <div>
                    <h2 className="card-title">Creative Preview — "{data.creatives.concept.split('"')[1]}"</h2>
                    <p className="card-subtitle">Sponsored carousel ad concepts — 3 audience-specific variations</p>
                  </div>
                </div>
                <CreativeGallery creatives={data.creatives} />
              </div>
            )}

            {/* Influencer Content Showcase */}
            {data.influencerContent && (
              <div className="card">
                <div className="card-header">
                  <div>
                    <h2 className="card-title">{data.influencerContent.sectionTitle}</h2>
                    <p className="card-subtitle">{data.influencerContent.sectionSubtitle}</p>
                  </div>
                </div>
                <InfluencerShowcase influencerContent={data.influencerContent} />
              </div>
            )}

            {/* Cross-Project Audience Pools (merged from Audiences tab) */}
            <div className="card">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Cross-Project Audience Pools</h2>
                  <p className="card-subtitle">Remarketing audiences from Aquilini's existing project databases</p>
                </div>
              </div>
              <CrossProjectAudience pools={data.audience.crossProjectPools} methodology={data.audience.poolMethodology} />
            </div>

            {/* Primary Persona (merged from Audiences tab) */}
            <div className="card">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Primary Persona</h2>
                  <p className="card-subtitle">The core audience for the education campaign</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="audience-item"><span className="audience-label">Persona Name</span><span className="audience-value" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600 }}>{data.audience.primary.name}</span></div>
                <div className="audience-item"><span className="audience-label">Demographics</span><span className="audience-value">{data.audience.primary.demographics}</span></div>
                <div className="audience-item"><span className="audience-label">Income</span><span className="audience-value">{data.audience.primary.income}</span></div>
                <div className="audience-item"><span className="audience-label">Geographic Focus</span><span className="audience-value">{data.audience.primary.locations}</span></div>
                <div className="audience-item" style={{ gridColumn: '1 / -1' }}><span className="audience-label">Psychographics</span><span className="audience-value">{data.audience.primary.psychographics}</span></div>
                <div className="audience-item"><span className="audience-label">Estimated Reach</span><span className="audience-value">{data.audience.primary.estimatedReach}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Media Plan (Gantt + Channel Overview) */}
      {activeTab === 'schedule' && (
        <div className="main-grid full-width">
          <div className="main-content">
            <div className="card">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Media Schedule — {scenario.shortName}</h2>
                  <p className="card-subtitle">Hover any campaign bar for details • Budgets reflect {scenario.name}</p>
                </div>
              </div>
              <TrueGanttChart
                platforms={data.platforms}
                projectStart={data.project.startDate}
                projectEnd={data.project.endDate}
                phases={data.project.phases}
                activeScenario={activeScenario}
              />
            </div>

            {/* Channel Overview (moved from Overview tab) */}
            <div className="card">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Channel Details</h2>
                  <p className="card-subtitle">Click any channel for campaign breakdowns — {scenario.shortName} scenario</p>
                </div>
              </div>
              <div className="platforms-grid">
                {data.platforms.map(p => (
                  <PlatformCard key={p.id} platform={p} activeScenario={activeScenario} expanded={expandedPlatform === p.id} onToggle={() => setExpandedPlatform(expandedPlatform === p.id ? null : p.id)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Investment & Projections (Comparison table is hero) */}
      {activeTab === 'projections' && (
        <div className="main-grid full-width">
          <div className="main-content">
            <ProjectionsTab scenarios={data.scenarios} activeScenario={activeScenario} benchmarks={data.benchmarks} projections={data.projections} />
          </div>
        </div>
      )}

      {/* Recommended Next Steps CTA */}
      <div className="card cta-card">
        <div className="cta-inner">
          <div className="cta-icon"><CheckCircle size={24} /></div>
          <div className="cta-content">
            <h3 className="cta-title">Recommended Next Steps</h3>
            <p className="cta-body">
              Periphery Digital recommends <strong>Scenario B: Strategic</strong> at <strong>{formatFullCurrency(73500)}</strong> (7 months).
              This scenario delivers 5M+ impressions at ~750,000 unique reach with an 8.8% video view rate — the optimal balance of education penetration and budget efficiency.
            </p>
            <p className="cta-hint">Schedule a call with Periphery Digital to discuss scope and timing.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-brand">
          <div className="footer-logo">
            <PeripheryLogo size={16} color="white" />
          </div>
          <span className="footer-agency">PERIPHERY DIGITAL</span>
        </div>
        <div className="footer-meta">
          <span>Media Strategy Proposal</span>
          <span>•</span>
          <span>Confidential</span>
          <span>•</span>
          <span>{data.project.period}</span>
        </div>
      </footer>
    </div>
  );
}
