import { Content, Language, CandidateProfile, PolicyItem } from './types';

export const CONTENT: Record<Language, Content> = {
  [Language.EN]: {
    nav: {
      home: "Home",
      about: "About Us",
      candidates: "Candidates",
      policy: "Policies",
      contact: "Connect",
      saranbot: "Saran Bot",
    },
    home: {
      partyName: "Sarunsiriprapha Party",
      slogan: "No Drama. Focus on Solutions. Sarunsiriprapha Party Delivers.",
      policyBtn: "Read Full Policies",
      saranbotBtn: "Chat with Saran Bot AI",
      marqueeKeywords: [
        "Transparency", "Student Voice", "Academic Excellence", "E-Sports Ready", 
        "Inclusive Welfare", "Creative Arts", "Modern Facilities", "Real Solutions"
      ],
      policyHighlights: {
        complaint: "Voice Box",
        academic: "Academic Hub",
        welfare: "Welfare Support",
        esport: "Talent & E-sports"
      }
    },
    aboutPage: {
      title: "Sarunsiriprapha Party",
      subtitle: "The Light of Prosperity and Refuge",
      intro: "Amidst the chaos and issues within the school, we realize students need more than just promises. We need a 'Refuge' for peace of mind and 'Light' to guide the way to real solutions. Sarunsiriprapha Party was born under an ideology grounded in reality:",
      defTitle: "Definition of Name: Foundation of Determination",
      def1Title: "Sarun (Refuge)",
      def1Desc: "To be a shelter, a shield against problems, and a safe space that listens to every student's voice.",
      def2Title: "Siri (Prosperity)",
      def2Desc: "The auspiciousness, goodness, and prosperity we strive to create within the school environment.",
      def3Title: "Prapha (Radiance)",
      def3Desc: "The light that illuminates the path, resolving the darkness of issues, and bringing clarity and transparency to our work.",
      ideologyTitle: "Ideology: No Drama. Focus on Solutions.",
      ideologyText: "We don't focus on flashy but empty images. We focus on Action to eliminate accumulated problems and create tangible changes for all of us."
    },
    candidate: {
      rolePresident: "President",
      roleVice: "Vice President",
      roleSecretary: "Secretary",
      roleTreasurer: "Treasurer",
      roleAcademic: "Academic Affairs",
      roleDiscipline: "Student Discipline",
      roleActivity: "Student Activities",
      rolePR: "Public Relations",
      roleArt: "Arts & Culture",
      roleSport: "Sports & Recreation",
      visionTitle: "Vision Statement",
    },
    policyPage: {
      title: "Our Core Policies",
      listenBtn: "Listen to Policy (TH)",
      pauseBtn: "Pause Audio",
      saveBtn: "Save Policy Card",
      whyLabel: "Why",
      whatLabel: "What",
      howLabel: "How",
      viewAllBtn: "View All Policies",
      listTitle: "Complete Strategy List",
    },
    contactPage: {
      title: "Join the Movement",
      subtitle: "Your voice is the missing piece of our puzzle. Reach out, speak up, and let's make the school better together.",
      formTitle: "Send us a Message",
      nameLabel: "Your Name",
      gradeLabel: "Grade / Class",
      messageLabel: "What's on your mind?",
      submitBtn: "Send Message",
      socialTitle: "Follow Our Journey",
      locationTitle: "Find Us",
      locationText: "Student Council Room, Building 3, 2nd Floor"
    },
    saranbotPage: {
      welcome: "Hello, I am Saran Bot",
      subtitle: "The AI assistant of Sarunsiriprapha Party. How can I help you today?",
      disclaimerTitle: "AI Disclaimer",
      disclaimerText: "Saran Bot is an AI-generated assistant. While I strive for accuracy regarding party policies, please verify critical information on our official policy pages.",
      acceptBtn: "I Understand",
      starterQuestions: [
        "What are your 10 core policies?",
        "Who is the Party Leader?",
        "Why vote for Number 3?",
        "How to contact the team?"
      ],
      placeholder: "Type your question here...",
      systemInstruction: "You are Saran Bot, the official AI for Sarunsiriprapha Party (No. 3). Your name means 'The auspicious light that provides refuge'. \n\nOUR TEAM (10 members):\n1. Champ (President)\n2. Few (VP)\n3. First (Secretary)\n4. Pai (Treasurer)\n5. Ashi (Academic)\n6. Ikkyu (Discipline)\n7. Mind (Activities)\n8. Papang (PR)\n9. Angie (Arts)\n10. Jujean (Sports)\n\nOUR 10 CORE POLICIES:\n1. Seasonal Festivals & Market\n2. Affordable Cutlery\n3. Complaints Box (Hybrid)\n4. E-sports Support\n5. Academic Support Hub\n6. Creative Arts Support\n7. Talent Show (The Stage)\n8. Umbrella Exchange\n9. Good Food, Better Choices (Consumption for All)\n10. No Drama Space (Anonymous Venting)\n\nRULES:\n1. Maintain a 'No Drama' spirit. Be solution-oriented, calm, and professional.\n2. Use headings (###) and bullet points for structured answers.\n3. Wrap key terms or slogans in **asterisks** (e.g., **No Drama**).\n4. MANDATORY: At the end of every message, provide 2-3 interactive buttons using this EXACT format: [Button: Label | /path]\n- Paths: /policies, /candidates, /about, /contact\nExample: [Button: Explore Policies | /policies]\n\nBe helpful and concise."
    }
  },
  [Language.TH]: {
    nav: {
      home: "หน้าหลัก",
      about: "ความเป็นมา",
      candidates: "ผู้สมัคร",
      policy: "นโยบาย",
      contact: "ติดต่อ",
      saranbot: "Saran Bot",
    },
    home: {
      partyName: "พรรคศรัณศิริประภา",
      slogan: "No Drama เน้นแก้ปัญหา พรรคศรัณศิริประภาจัดให้",
      policyBtn: "อ่านนโยบายฉบับเต็ม",
      saranbotBtn: "ปรึกษา Saran Bot AI",
      marqueeKeywords: [
        "โปร่งใสตรวจสอบได้", "กล่องร้องเรียน", "พัฒนาวิชาการ", "สนับสนุน E-Sports", 
        "สวัสดิการทั่วถึง", "พื้นที่สร้างสรรค์", "ซ่อมแซมทันใจ", "รับฟังทุกเสียง"
      ],
      policyHighlights: {
        complaint: "กล่องรับเรื่องร้องเรียน",
        academic: "ศูนย์กลางวิชาการ",
        welfare: "สวัสดิการนักเรียน",
        esport: "ส่งเสริมความสามารถ/E-sports"
      }
    },
    aboutPage: {
      title: "พรรคศรัณศิริประภา",
      subtitle: "แสงสว่างแห่งสิริมงคลที่เป็นที่พึ่ง",
      intro: "ท่ามกลางปัญหาและความวุ่นวายในรั้วโรงเรียน เราตระหนักดีว่านักเรียนต้องการมากกว่าแค่คำสัญญา เราต้องการ \"ที่พึ่ง\" ที่อุ่นใจ และ \"แสงสว่าง\" ที่นำทางไปสู่ทางออกที่แท้จริง พรรคศรัณศิริประภา จึงถือกำเนิดขึ้นภายใต้อุดมการณ์ที่ยึดถือความเป็นจริง",
      defTitle: "นิยามแห่งชื่อ: รากฐานแห่งความมุ่งมั่น",
      def1Title: "ศรัณ (Refuge)",
      def1Desc: "การเป็นที่พึ่งพิง เป็นเกราะป้องกันปัญหา และเป็นพื้นที่ปลอดภัยที่รับฟังทุกเสียงของนักเรียน",
      def2Title: "ศิริ (Prosperity)",
      def2Desc: "ความเป็นสิริมงคล ความดีงาม และความเจริญรุ่งเรืองที่เรามุ่งมั่นจะสร้างให้เกิดขึ้นในโรงเรียน",
      def3Title: "ประภา (Radiance)",
      def3Desc: "แสงสว่างที่ส่องทาง แก้ไขความมืดมนของปัญหา และนำพาความชัดเจน โปร่งใส มาสู่การทำงาน",
      ideologyTitle: "อุดมการณ์: No Drama เน้นแก้ปัญหา",
      ideologyText: "เราไม่เน้นสร้างภาพลักษณ์ที่หวือหวาแต่ว่างเปล่า เรามุ่งเน้นการลงมือทำ (Action) เพื่อขจัดปัญหาที่หมักหมม และสร้างการเปลี่ยนแปลงที่มองเห็นได้จริงให้กับพวกเราทุกคน"
    },
    candidate: {
      rolePresident: "นายกองค์การนักเรียน",
      roleVice: "อุปนายก",
      roleSecretary: "เลขานุการ",
      roleTreasurer: "เหรัญญิก",
      roleAcademic: "วิชาการ",
      roleDiscipline: "วินัยนักเรียน",
      roleActivity: "กิจกรรมนักเรียน",
      rolePR: "ประชาสัมพันธ์",
      roleArt: "ศิลปะและวัฒนธรรม",
      roleSport: "กีฬาและนันทนาการ",
      visionTitle: "วิสัยทัศน์",
    },
    policyPage: {
      title: "นโยบายหลักของเรา",
      listenBtn: "ฟังเสียงนโยบาย (TH)",
      pauseBtn: "หยุดเสียง",
      saveBtn: "บันทึกรูปนโยบาย",
      whyLabel: "ทำไมต้องมี",
      whatLabel: "คืออะไร",
      howLabel: "ทำอย่างไร",
      viewAllBtn: "ดูนโยบายทั้งหมด",
      listTitle: "สรุปนโยบายทั้งหมด",
    },
    contactPage: {
      title: "ร่วมเป็นส่วนหนึ่งกับเรา",
      subtitle: "เสียงของคุณคือจิ๊กซอว์ชิ้นสำคัญ ติดต่อเรา เสนอแนะ และร่วมสร้างโรงเรียนที่ดีกว่าไปด้วยกัน",
      formTitle: "ส่งข้อความถึงพรรค",
      nameLabel: "ชื่อของคุณ",
      gradeLabel: "ระดับชั้น / ห้อง",
      messageLabel: "มีอะไรอยากบอกเรา?",
      submitBtn: "ส่งข้อความ",
      socialTitle: "ติดตามข่าวสาร",
      locationTitle: "พบกับเราได้ที่",
      locationText: "ห้ององค์การนักเรียน อาคาร 3 ชั้น 2"
    },
    saranbotPage: {
      welcome: "สวัสดีครับ ผมคือ Saran Bot",
      subtitle: "ผู้ช่วย AI ของพรรคศรัณศิริประภา มีอะไรให้ผมช่วยดูแลไหมครับ?",
      disclaimerTitle: "ข้อกำหนดการใช้งาน AI",
      disclaimerText: "Saran Bot เป็นระบบปัญญาประดิษฐ์ที่ถูกสร้างขึ้นเพื่อให้ข้อมูลเกี่ยวกับพรรค แม้เราจะพยายามให้ข้อมูลที่แม่นยำที่สุด แต่โปรดตรวจสอบข้อมูลสำคัญจากหน้าเว็บไซต์หลักอีกครั้ง",
      acceptBtn: "เข้าใจแล้ว",
      starterQuestions: [
        "นโยบายเบอร์ 3 มีอะไรบ้าง?",
        "ใครคือนายกองค์การนักเรียน?",
        "ทำไมต้องเลือกพรรคศรัณศิริประภา?",
        "ติดต่อทีมงานได้ที่ไหน?"
      ],
      placeholder: "พิมพ์คำถามของคุณที่นี่...",
      systemInstruction: "คุณคือ Saran Bot AI ของพรรคศรัณศิริประภา (เบอร์ 3) ชื่อของคุณหมายถึง 'แสงสว่างแห่งสิริมงคลที่เป็นที่พึ่ง'\n\nทีมงานของเรา (10 คน):\n1. แชมป์ (นายกองค์การฯ)\n2. ฟิว (อุปนายก)\n3. เฟิร์ส (เลขานุการ)\n4. ปาย (เหรัญญิก)\n5. อาชิ (ฝ่ายวิชาการ)\n6. อิคคิว (ฝ่ายระเบียบวินัย)\n7. มายด์ (ฝ่ายกิจกรรม)\n8. พะแพง (ฝ่ายประชาสัมพันธ์)\n9. แองจี้ (ฝ่ายศิลปะฯ)\n10. จูจีน (ฝ่ายกีฬาฯ)\n\nนโยบายหลัก 10 ข้อ:\n1. กิจกรรมเทศกาลและตลาดนัด\n2. สวัสดิการช้อนส้อมราคาถูก\n3. กล่องร้องทุกข์ (Hybrid)\n4. สนับสนุน E-sports\n5. คลังวิชาการออนไลน์\n6. พื้นที่สร้างสรรค์งานศิลปะ\n7. เวที Talent Show\n8. บริการแลกร่ม\n9. กินดี มีทางเลือก (Consumption for All)\n10. No Drama Space (พื้นที่ระบายใจ ไร้ตัวตน)\n\nกฎการตอบคำถาม:\n1. ยึดมั่นอุดมการณ์ **No Drama เน้นแก้ปัญหา** ตอบอย่างสุภาพ เป็นมืออาชีพ\n2. ใช้หัวข้อ (###) และรายการ (bullet points) เพื่อความชัดเจน\n3. เน้นคำสำคัญด้วย **ตัวหนา**\n4. สำคัญมาก: ทุกการตอบกลับต้องมีปุ่มทางลัด 2-3 ปุ่มที่ท้ายข้อความเสมอในรูปแบบ: [Button: ข้อความ | /path]\n- เส้นทาง: /policies, /candidates, /about, /contact\nตัวอย่าง: [Button: ดูโฉมหน้าทีมงาน | /candidates]\n\nให้ข้อมูลที่กระชับและเป็นประโยชน์ที่สุด"
    }
  }
};

export const CANDIDATES_DATA = (lang: Language): CandidateProfile[] => {
  const isEn = lang === Language.EN;
  const t = CONTENT[lang].candidate;

  return [
    {
      id: "1",
      role: t.rolePresident,
      name: isEn ? "Mr. Saranyapong Taduk" : "นายศรัณยพงศ์ ต๊ะดุก",
      nickname: isEn ? "Champ" : "แชมป์",
      grade: "M.4/5",
      image: "https://img5.pic.in.th/file/secure-sv1/29a608a15e91ee66c.png",
      vision: isEn 
        ? "Leading with empathy and efficiency. My goal is to transform student council into a true support system for everyone." 
        : "นำพาองค์กรด้วยความเข้าใจและประสิทธิภาพ เป้าหมายของผมคือเปลี่ยนสภานักเรียนให้เป็นที่พึ่งของทุกคนอย่างแท้จริง",
      quote: "No Drama, Just Action."
    },
    {
      id: "2",
      role: t.roleVice,
      name: isEn ? "Mr. Wit Janton" : "นายวิชญ์ จันทร์ต้น",
      nickname: isEn ? "Few" : "ฟิว",
      grade: "M.4/5",
      image: "https://img5.pic.in.th/file/secure-sv1/2-2c83a133a283883f5.png",
      vision: isEn 
        ? "Supporting the president and ensuring all departments work together seamlessly." 
        : "สนับสนุนประธานและดูแลให้ทุกฝ่ายทำงานร่วมกันอย่างราบรื่นเพื่อผลลัพธ์ที่ดีที่สุด",
      quote: "Together we achieve more."
    },
    {
      id: "3",
      role: t.roleSecretary,
      name: isEn ? "Ms. Yaowares Rattanarakmongkol" : "น.ส.เยาวเรศ รัตนรักษ์มงคล",
      nickname: isEn ? "First" : "เฟิร์ส",
      grade: "M.4/2",
      image: "https://img2.pic.in.th/2-15270de2f5dbdc98f.png",
      vision: isEn 
        ? "Keeping every detail organized so that our big plans can become reality without a hitch." 
        : "จัดการทุกรายละเอียดให้เป็นระเบียบ เพื่อให้แผนงานใหญ่ของเราเกิดขึ้นจริงได้อย่างไม่มีสะดุด",
      quote: "Organization is the key to success."
    },
    {
      id: "4",
      role: t.roleTreasurer,
      name: isEn ? "Ms. Pansa Chaichana" : "น.ส.พรรษา ชัยชนะ",
      nickname: isEn ? "Pai" : "ปาย",
      grade: "M.4/2",
      image: "https://img5.pic.in.th/file/secure-sv1/30d806a139b90e432.png",
      vision: isEn 
        ? "Managing the budget transparently to ensure every baht benefits the students directly." 
        : "บริหารงบประมาณอย่างโปร่งใส เพื่อให้ทุกบาททุกสตางค์เกิดประโยชน์กับนักเรียนโดยตรง",
      quote: "Transparency builds trust."
    },
    {
      id: "5",
      role: t.roleAcademic,
      name: isEn ? "Mr. Witthayatorn Pruangwichathorn" : "นายวิทยาธร เปรื่องวิชาธร",
      nickname: isEn ? "Ashi" : "อาชิ",
      grade: "M.4/4",
      image: "https://img5.pic.in.th/file/secure-sv1/3-10a82338c8db6b467.png",
      vision: isEn 
        ? "Creating a learning environment where resources are shared and everyone helps each other succeed." 
        : "สร้างบรรยากาศการเรียนรู้ที่แบ่งปันทรัพยากรและช่วยเหลือกันให้ทุกคนประสบความสำเร็จ",
      quote: "Knowledge grows when shared."
    },
    {
      id: "6",
      role: t.roleDiscipline,
      name: isEn ? "Mr. Sirawit Kanyamee" : "นายศิรวิชญ์ กันยะมี",
      nickname: isEn ? "Ikkyu" : "อิคคิว",
      grade: "M.4/4",
      image: "https://img2.pic.in.th/Your-paragraph-text-3a869b6ce5809583a.png",
      vision: isEn 
        ? "Upholding fair rules and fostering a respectful community where discipline comes from understanding." 
        : "สร้างวินัยจากความเข้าใจ และดูแลกฎระเบียบอย่างเป็นธรรมเพื่อสังคมโรงเรียนที่น่าอยู่",
      quote: "Discipline with Respect."
    },
    {
      id: "7",
      role: t.roleActivity,
      name: isEn ? "Ms. Nattaporn Tinna" : "น.ส.ณัฐพร ทินนา",
      nickname: isEn ? "Mind" : "มายด์",
      grade: "M.4/3",
      image: "https://img2.pic.in.th/Your-paragraph-text-1b2e51e74dc9d1caf.png",
      vision: isEn 
        ? "Activities that are actually fun and inclusive, creating memories that last a lifetime." 
        : "กิจกรรมที่สนุกและเข้าถึงได้จริง สร้างความทรงจำที่จะติดตัวเราไปตลอดชีวิต",
      quote: "Life is an event. Make it memorable."
    },
    {
      id: "8",
      role: t.rolePR,
      name: isEn ? "Ms. Napassorn Jantorn-ongart" : "น.ส.นภัสอร จันทร์องอาจ",
      nickname: isEn ? "Phaphaeng" : "พะแพง",
      grade: "M.4/1",
      image: "https://img5.pic.in.th/file/secure-sv1/Your-paragraph-text-2d94fed7a906d8491.png",
      vision: isEn 
        ? "Clear, fast, and creative communication. You will never miss an update." 
        : "การสื่อสารที่ชัดเจน รวดเร็ว และสร้างสรรค์ คุณจะไม่พลาดทุกข่าวสารสำคัญ",
      quote: "Communication connects us."
    },
    {
      id: "9",
      role: t.roleArt,
      name: isEn ? "Ms. Arnatshika Siripaet" : "น.ส.อาณัฏฐ์ศิกา ศิริแพทย์",
      nickname: isEn ? "Angie" : "แองจี้",
      grade: "M.4/4",
      image: "https://img2.pic.in.th/3-36b26581afd84bb24.png",
      vision: isEn 
        ? "Unleashing creativity in every corner of the school. Art is not just a subject, it's a vibe." 
        : "ปลดปล่อยความคิดสร้างสรรค์ในทุกมุมของโรงเรียน ศิลปะไม่ใชแค่วิชาเรียน แต่คือบรรยากาศ",
      quote: "Creativity takes courage."
    },
    {
      id: "10",
      role: t.roleSport,
      name: isEn ? "Ms. Nanamonutch Witheeudomsap" : "น.ส.ณนมณัชม์ วิถีอุดมทรัพย์",
      nickname: isEn ? "Jujean" : "จูจีน",
      grade: "M.4/3",
      image: "https://img2.pic.in.th/3-2fde0280e7f6e0a11.png",
      vision: isEn 
        ? "Promoting health and team spirit through diverse sports and E-sports competitions." 
        : "ส่งเสริมสุขภาพและสปิริตทีมผ่านกีฬาทีหลากหลายและการแข่งขัน E-sports",
      quote: "Strength in unity."
    },
  ];
};

export const POLICIES_DATA = (lang: Language): PolicyItem[] => {
  const isEn = lang === Language.EN;
  
  return [
    {
      id: 1,
      title: isEn ? "Seasonal Festivals & Market" : "กิจกรรมประจำเทศกาล (Seasonal Festivals)",
      why: isEn 
        ? "Students often face stress from academic pressure and lack communal spaces to relax during key festivals." 
        : "ช่วงเทศกาลสำคัญ นักเรียนมักมีความเครียดจากการเรียนและขาดพื้นที่ในการผ่อนคลายร่วมกัน",
      what: isEn 
        ? "Organize classroom board decorating contests and a 'Student Market' to foster fun and provide income opportunities." 
        : "จัดกิจกรรมประกวดบอร์ดประจำห้องและตลาดนัดนักเรียน (Market) เพื่อสร้างความสนุกและรายได้เสริม",
      how: isEn 
        ? "Coordinate with the Activity Department for after-school slots, set up market zones, and support contest budgets." 
        : "ร่วมกับฝ่ายกิจกรรมจัดสรรช่วงเวลาหลังเลิกเรียนหรือวันสำคัญ จัดพื้นที่ตลาดนัดและสนับสนุนงบประมาณการประกวด",
      audioUrl: "https://czspwisswarnhyfealhk.supabase.co/storage/v1/object/public/Sing/ScreenRecording_02-02-2569%2018-07-38_1.mp3",
      summary: isEn ? "Relax & Earn with Student Market" : "พื้นที่ผ่อนคลายและสร้างรายได้ด้วยตลาดนัดนักเรียน",
      imageUrl: "https://img5.pic.in.th/file/secure-sv1/IMG_3858ef7b7835acec2a0d.jpeg"
    },
    {
      id: 2,
      title: isEn ? "Affordable Student Cutlery" : "สวัสดิการช้อนส้อมราคาถูก (Student Cutlery)",
      why: isEn 
        ? "Forgetting cutlery causes inconvenience at lunch, and shared cutlery may not always meet hygiene standards." 
        : "ปัญหาการลืมช้อนส้อมทำให้เกิดความลำบากในการรับประทานอาหาร และการใช้ช้อนส่วนกลางอาจไม่เพียงพอหรือสุขอนามัยไม่ทั่วถึง",
      what: isEn 
        ? "Sell portable cutlery sets at the lowest possible price as a welfare option for students." 
        : "จัดจำหน่ายชุดช้อนส้อมพกพาในราคาถูกที่สุด เพื่อเป็นทางเลือกสวัสดิการให้นักเรียน",
      how: isEn 
        ? "Contact suppliers for wholesale rates and set up sales points at the Student Council room or near the cafeteria." 
        : "ติดต่อ Supplier เพื่อสั่งซื้อในราคาส่งและจัดวางจำหน่ายที่ห้ององค์การนักเรียนหรือจุดบริการใกล้โรงอาหาร",
      audioUrl: "https://czspwisswarnhyfealhk.supabase.co/storage/v1/object/public/Sing/ScreenRecording_02-02-2569%2018-13-22_1.mp3",
      summary: isEn ? "Convenient, Hygienic, Affordable" : "สะดวก สะอาด ประหยัด",
      imageUrl: "https://img5.pic.in.th/file/secure-sv1/Untitled-design5c5c622e5f4f931d.png"
    },
    {
      id: 3,
      title: isEn ? "Complaints Box (Hybrid System)" : "กล่องร้องทุกข์ (Complaints Box)",
      why: isEn 
        ? "School issues often go unresolved because students fear speaking up or lack an accessible, private channel." 
        : "ปัญหาในโรงเรียนมักไม่ถูกแก้ไขเพราะนักเรียนไม่กล้าบอกครูโดยตรง หรือไม่มีช่องทางที่เข้าถึงง่ายและเป็นส่วนตัว",
      what: isEn 
        ? "Install physical complaint boxes across buildings and launch a 24-hour online grievance system." 
        : "ติดตั้งกล่องร้องทุกข์ตามมุมตึก และเปิดระบบร้องทุกข์ออนไลน์ 24 ชั่วโมง",
      how: isEn 
        ? "Collect messages weekly for Council meetings and coordinate with school administration for tangible solutions." 
        : "รวบรวมข้อความทุกสัปดาห์เพื่อนำเข้าที่ประชุมองค์การฯ และประสานงานกับฝ่ายบริหารโรงเรียนเพื่อแก้ไขให้เห็นผลจริง",
      audioUrl: "https://czspwisswarnhyfealhk.supabase.co/storage/v1/object/public/Sing/ScreenRecording_02-02-2569%2018-21-27_1.mp3",
      summary: isEn ? "Your Voice Matters" : "ทุกเสียงของคุณมีความหมาย",
      imageUrl: "https://img2.pic.in.th/Untitled-design15d6b7276885426d.png"
    },
    {
      id: 4,
      title: isEn ? "E-sports Support" : "สนับสนุน E-sports (E-sports Support)",
      why: isEn 
        ? "Gaming skills are a modern career path and team-building skill that hasn't been seriously supported." 
        : "ทักษะด้านเกมไม่ใช่แค่การเล่นไปวันๆ แต่คือโอกาสในสายงานยุคใหม่และทักษะการทำงานเป็นทีมที่ยังไม่ได้รับการสนับสนุนอย่างจริงจัง",
      what: isEn 
        ? "Organize E-sports tournaments and create spaces for skill development for everyone." 
        : "จัดกิจกรรมแข่งขันทัวร์นาเมนต์และพื้นที่พัฒนาทักษะด้าน E-sports สำหรับทุกคน",
      how: isEn 
        ? "Host school-level matches and invite experts to teach team management and gaming discipline." 
        : "จัดการแข่งขันระดับโรงเรียน และเชิญผู้เชี่ยวชาญมาให้ความรู้เกี่ยวกับการบริหารจัดการทีมและวินัยในการเล่น",
      audioUrl: "https://czspwisswarnhyfealhk.supabase.co/storage/v1/object/public/Sing/ScreenRecording_02-02-2569%2018-23-13_1.mp3",
      summary: isEn ? "Level Up Professionally" : "ยกระดับเกมเมอร์สู่มืออาชีพ",
      imageUrl: "https://img2.pic.in.th/Untitled-design42de677cc71b2e88.png"
    },
    {
      id: 5,
      title: isEn ? "Academic Support Hub" : "คลังวิชาการออนไลน์ (Academic Support Hub)",
      why: isEn 
        ? "Access to past exams and university admission info (TGAT/TPAT/A-Level) is scattered and hard to find." 
        : "การเข้าถึงข้อสอบเก่าและข้อมูลการสอบต่อมหาลัย (TGAT/TPAT/A-Level) กระจัดกระจายและเข้าถึงยากสำหรับบางคน",
      what: isEn 
        ? "Consolidate past exams and admission news onto a website and information boards." 
        : "รวบรวมข้อสอบเก่าและประชาสัมพันธ์ข้อมูลศึกษาต่อผ่านเว็บไซต์และบอร์ดกระจายข่าว",
      how: isEn 
        ? "Develop an 'Academic Hub' webpage to host exam files and summarize admission rounds clearly." 
        : "พัฒนาหน้าเว็บ 'Academic Hub' รวบรวมไฟล์ข้อสอบ และจัดทำสรุปข่าวการรับสมัครในแต่ละรอบให้เข้าใจง่าย",
      audioUrl: "https://czspwisswarnhyfealhk.supabase.co/storage/v1/object/public/Sing/ScreenRecording_02-02-2569%2018-24-56_1.mp3",
      summary: isEn ? "Accessible Knowledge & Opportunities" : "ความรู้และโอกาสที่เข้าถึงง่าย",
      imageUrl: "https://img5.pic.in.th/file/secure-sv1/Untitled-design3686df2238e5ddf6.png"
    },
    {
      id: 6,
      title: isEn ? "Creative Arts Support" : "พื้นที่สร้างสรรค์งานศิลปะ (Arts Support)",
      why: isEn 
        ? "Artistic students lack platforms to showcase their work and opportunities to earn from their creativity." 
        : "นักเรียนที่มีความสามารถด้านศิลปะขาดพื้นที่ในการจัดแสดงผลงานและขาดโอกาสในการสร้างรายได้จากความคิดสร้างสรรค์",
      what: isEn 
        ? "Host design contests for bows/notebook covers to be produced and sold in school." 
        : "จัดกิจกรรมประกวดออกแบบโบว์และปกสมุด เพื่อนำมาผลิตและจำหน่ายจริงในโรงเรียน",
      how: isEn 
        ? "Open submissions to all students, let peers vote, and coordinate production to sell as school souvenirs." 
        : "เปิดรับผลงานจากนักเรียนทั่วโรงเรียน ให้เพื่อนๆ ร่วมโหวต และประสานงานการผลิตเพื่อจัดจำหน่ายเป็นของที่ระลึกโรงเรียน",
      audioUrl: "https://czspwisswarnhyfealhk.supabase.co/storage/v1/object/public/Sing/ScreenRecording_02-02-2569%2018-26-48_1.mp3",
      summary: isEn ? "Showcase Talent, Earn Income" : "ปล่อยของ สร้างรายได้",
      imageUrl: "https://img2.pic.in.th/IMG_1026.jpeg"
    },
    {
      id: 7,
      title: isEn ? "Talent Show (The Stage)" : "เวที Talent Show (The Stage)",
      why: isEn 
        ? "Expression is key, but activity spaces are often used for ceremonies rather than student showcases." 
        : "กล้าแสดงออกคือทักษะสำคัญ แต่ลานกิจกรรมเดิมมักถูกใช้เพื่อพิธีการมากกว่าการปล่อยของให้นักเรียน",
      what: isEn 
        ? "Allocate activity areas and free time as stages for all students to show their talents." 
        : "จัดสรรลานกิจกรรมและเวลาว่าง ให้เป็นเวทีสำหรับนักเรียนทุกคนได้แสดงความสามารถ",
      how: isEn 
        ? "Schedule monthly Talent Shows, open advance registration, and provide sound/light equipment support." 
        : "วางตารางกิจกรรม Talent Show รายเดือน เปิดรับสมัครผู้แสดงล่วงหน้า และสนับสนุนอุปกรณ์เสียง/แสง",
      audioUrl: "https://czspwisswarnhyfealhk.supabase.co/storage/v1/object/public/Sing/ScreenRecording_02-02-2569%2018-38-48_1.mp3",
      summary: isEn ? "This Stage is Yours" : "เวทีนี้เป็นของคุณ",
      imageUrl: "https://img5.pic.in.th/file/secure-sv1/IMG_3868d6e66ccf64e8589a.jpeg"
    },
    {
      id: 8,
      title: isEn ? "Umbrella Exchange" : "บัตรแลกร่ม (Umbrella Exchange)",
      why: isEn 
        ? "Rain hinders travel between buildings, putting students at risk of getting wet and sick." 
        : "ฝนตกเป็นอุปสรรคต่อการเดินทางระหว่างอาคาร ทำให้นักเรียนเสี่ยงต่อการเปียกฝนและเจ็บป่วย",
      what: isEn 
        ? "Umbrella lending service via student ID card for safe and convenient movement." 
        : "บริการยืมร่มผ่านบัตรนักเรียน เพื่อความสะดวกและปลอดภัยในการเคลื่อนที่ภายในโรงเรียน",
      how: isEn 
        ? "Stock spare umbrellas at main buildings; students swap IDs to borrow and return at drop-off points." 
        : "จัดซื้อร่มสำรองไว้ตามอาคารหลัก นักเรียนสามารถแลกบัตรยืมได้ทันที และนำมาคืนที่จุดรับคืนเพื่อรับบัตรคืน",
      audioUrl: "https://czspwisswarnhyfealhk.supabase.co/storage/v1/object/public/Sing/ScreenRecording_02-02-2569%2018-45-41_1.mp3",
      summary: isEn ? "Stay Dry, Stay Healthy" : "ไม่เปียก ไม่ป่วย",
      imageUrl: "https://img2.pic.in.th/Untitled-designd0690aef277e0ec5.png"
    },
    {
      id: 9,
      title: isEn ? "Good Food, Better Choices (Consumption for All)" : "กินดี มีทางเลือก (Consumption for All)",
      why: isEn 
        ? "Delicious and hygienic food is essential fuel for learning. Lunch should be an experience to look forward to, not just a routine." 
        : "เพราะอาหารที่อร่อยและถูกสุขลักษณะ คือพลังงานหลักในการเรียนรู้ของทุกคน เราเชื่อว่ามื้อเที่ยงไม่ควรเป็นเรื่องที่ต้องจำใจ แต่ควรเป็นมื้อที่ทุกคนรอคอยครับ",
      what: isEn 
        ? "A monthly menu voting system and 'Event Menus' featuring special off-schedule dishes at least once a month to diversify the cafeteria options." 
        : "ระบบประเมินความต้องการเมนูอาหารรายเดือน พร้อมจัดเซ็ต 'เมนูอีเวนต์' หรือเมนูพิเศษนอกตาราง อย่างน้อยเดือนละ 1 ครั้ง เพื่อเพิ่มความหลากหลายให้กับโรงอาหาร",
      how: isEn 
        ? "Develop a digital voting platform on the party website to coordinate directly with cafeteria vendors based on student preferences." 
        : "จัดทำระบบโหวตดิจิทัลบนหน้าเว็บพรรค เพื่อนำผลประเมินไปประสานงานร่วมกับร้านค้าในโรงอาหารโดยตรง พร้อมเปิดช่องทางเสนอเมนูที่ต้องการได้ตลอด",
      audioUrl: "https://czspwisswarnhyfealhk.supabase.co/storage/v1/object/public/Sing/791830078.015751.mp3",
      summary: isEn ? "Delicious lunch sets based on your votes." : "มื้อเที่ยงที่เลือกได้เอง เพื่อความสุขในการกิน",
      imageUrl: "https://img2.pic.in.th/IMG_3907d81acb012ffad48b.png"
    },
    {
      id: 10,
      title: isEn ? "No Drama Space (Anonymous Venting)" : "No Drama Space (พื้นที่ระบายใจ ไร้ตัวตน)",
      why: isEn 
        ? "Stress can be overwhelming and sharing it with someone can be difficult. We offer a safe, non-judgmental listening ear." 
        : "เพราะความเครียดและเรื่องไม่สบายใจเป็นเรื่องที่รอไม่ได้ แต่การจะบอกใครสักคนบางครั้งก็เป็นเรื่องยาก เราจึงอยากเป็นพื้นที่ปลอดภัยที่รับฟังคุณโดยไม่มีการตัดสินครับ",
      what: isEn 
        ? "A 100% anonymous chat system for counseling and emotional venting integrated into our website." 
        : "ระบบแชทให้คำปรึกษาและระบายความรู้สึกแบบ ไม่ระบุตัวตน 100% ผ่านหน้าเว็บไซต์ของพรรค",
      how: isEn 
        ? "Utilize an 'Empathy AI' designed for supportive listening with zero tracking of names, IDs, or personal data." 
        : "ใช้ระบบแชทอัจฉริยะที่ออกแบบมาเพื่อการรับฟัง (Empathy AI) ซึ่งจะไม่มีการจัดเก็บข้อมูลส่วนตัว ชื่อ หรือเลขประจำตัวใดๆ ทั้งสิ้น เพื่อให้มั่นใจได้ว่าความลับของคุณจะปลอดภัยและเป็นส่วนตัวที่สุดครับ",
      audioUrl: "https://czspwisswarnhyfealhk.supabase.co/storage/v1/object/public/Sing/ScreenRecording_02-03-2569-23-18-42_1.mp3",
      summary: isEn ? "A safe, anonymous space for your mind." : "พื้นที่ปลอดภัย ระบายความในใจแบบไร้ตัวตน",
      imageUrl: "https://img5.pic.in.th/file/secure-sv1/IMG_39096c66b831415c4a07.png"
    }
  ];
};
