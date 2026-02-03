
export enum Language {
  TH = 'TH',
  EN = 'EN',
}

export interface NavItem {
  label: string;
  path: string;
}

export interface PolicyItem {
  id: number;
  title: string;
  why: string;
  what: string;
  how: string;
  audioUrl: string;
  summary: string; // Short summary for the share card
  imageUrl: string; // Thumbnail for the marquee
}

export interface Content {
  nav: {
    home: string;
    about: string;
    candidates: string;
    policy: string;
    contact: string;
    saranbot: string;
  };
  home: {
    partyName: string;
    slogan: string;
    policyBtn: string;
    saranbotBtn: string;
    marqueeKeywords: string[];
    policyHighlights: {
      complaint: string;
      academic: string;
      welfare: string;
      esport: string;
    }
  };
  aboutPage: {
    title: string;
    subtitle: string;
    intro: string;
    defTitle: string;
    def1Title: string;
    def1Desc: string;
    def2Title: string;
    def2Desc: string;
    def3Title: string;
    def3Desc: string;
    ideologyTitle: string;
    ideologyText: string;
  };
  candidate: {
    rolePresident: string;
    roleVice: string;
    roleSecretary: string;
    roleTreasurer: string;
    roleAcademic: string;
    roleDiscipline: string;
    roleActivity: string;
    rolePR: string;
    roleArt: string;
    roleSport: string;
    visionTitle: string;
  };
  policyPage: {
    title: string;
    listenBtn: string;
    pauseBtn: string;
    saveBtn: string;
    whyLabel: string;
    whatLabel: string;
    howLabel: string;
    viewAllBtn: string;
    listTitle: string;
  };
  contactPage: {
    title: string;
    subtitle: string;
    formTitle: string;
    nameLabel: string;
    gradeLabel: string;
    messageLabel: string;
    submitBtn: string;
    socialTitle: string;
    locationTitle: string;
    locationText: string;
  };
  saranbotPage: {
    welcome: string;
    subtitle: string;
    disclaimerTitle: string;
    disclaimerText: string;
    acceptBtn: string;
    starterQuestions: string[];
    placeholder: string;
    systemInstruction: string;
  };
}

export interface CandidateProfile {
  id: string;
  role: string;
  name: string;
  nickname: string;
  grade: string;
  image: string;
  vision: string;
  quote: string;
}
