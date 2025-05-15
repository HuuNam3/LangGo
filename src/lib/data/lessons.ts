export interface ILesson {
  id: string;
  image: string;
  instructor: string;
  
  level: string;
  translations: {
    en: {
      duration: string;
      title: string;
    };
    zh: {
      duration: string;
      title: string;
    };
    vi: {
      duration: string;
      title: string;
    };
  };
}

export const beginnerLessons: ILesson[] = [
  {
    id: "1",
    image: "/images/basic.jpg",
    instructor: "Li Wei",
    level: "Beginner",
    translations: {
      en: {
        duration: "45 min",
        title: "Basic Mandarin Pronunciation",
      },
      zh: {
        duration: "45 分钟",
        title: "基础普通话发音",
      },
      vi: {
        duration: "45 phút",
        title: "Phát âm tiếng Trung cơ bản",
      },
    },
  },
  {
    id: "2",
    image: "/images/basic.jpg",
    instructor: "Zhang Min",
    level: "Beginner",
    translations: {
      en: {
        duration: "60 min",
        title: "Essential Chinese Characters",
      },
      zh: {
        duration: "60 分钟",
        title: "基本汉字",
      },
      vi: {
        duration: "60 phút",
        title: "Chữ Hán cơ bản",
      },
    },
  },
  {
    id: "3",
    image: "/images/basic.jpg",
    instructor: "Chen Jie",
    level: "Beginner",
    translations: {
      en: {
        duration: "30 min",
        title: "Daily Greetings & Phrases",
      },
      zh: {
        duration: "30 分钟",
        title: "日常问候语和短语",
      },
      vi: {
        duration: "30 phút",
        title: "Chào hỏi và cụm từ hàng ngày",
      },
    },
  },
  {
    id: "4",
    image: "/images/basic.jpg",
    instructor: "Wang Mei",
    level: "Beginner",
    translations: {
      en: {
        duration: "40 min",
        title: "Numbers & Counting in Mandarin",
      },
      zh: {
        duration: "40 分钟",
        title: "数字和计数",
      },
      vi: {
        duration: "40 phút",
        title: "Số và đếm số trong tiếng Trung",
      },
    },
  },
];

export const testTakerLessons: ILesson[] = [
  {
    id: "5",
    image: "/images/basic.jpg",
    instructor: "Dr. Liu Yang",
    level: "Intermediate",
    translations: {
      en: {
        duration: "90 min",
        title: "HSK Level 3 Vocabulary",
      },
      zh: {
        duration: "90 分钟",
        title: "HSK三级词汇",
      },
      vi: {
        duration: "90 phút",
        title: "Từ vựng HSK cấp 3",
      },
    },
  },
  {
    id: "6",
    image: "/images/basic.jpg",
    instructor: "Prof. Wu Hao",
    level: "Intermediate",
    translations: {
      en: {
        duration: "75 min",
        title: "HSK Exam Strategies",
      },
      zh: {
        duration: "75 分钟",
        title: "HSK考试策略",
      },
      vi: {
        duration: "75 phút",
        title: "Chiến lược thi HSK",
      },
    },
  },
  {
    id: "7",
    image: "/images/basic.jpg",
    instructor: "Zhao Ling",
    level: "Intermediate",
    translations: {
      en: {
        duration: "60 min",
        title: "Grammar for HSK Level 4",
      },
      zh: {
        duration: "60 分钟",
        title: "HSK四级语法",
      },
      vi: {
        duration: "60 phút",
        title: "Ngữ pháp HSK cấp 4",
      },
    },
  },
  {
    id: "8",
    image: "/images/basic.jpg",
    instructor: "Sun Jing",
    level: "Intermediate",
    translations: {
      en: {
        duration: "120 min",
        title: "Practice Test: HSK Level 2",
      },
      zh: {
        duration: "120 分钟",
        title: "HSK二级模拟测试",
      },
      vi: {
        duration: "120 phút",
        title: "Đề thi thử HSK cấp 2",
      },
    },
  },
];

export const communicationLessons: ILesson[] = [
  {
    id: "9",
    image: "/images/basic.jpg",
    instructor: "Lin Feng",
    level: "Practical",
    translations: {
      en: {
        duration: "55 min",
        title: "Business Mandarin Essentials",
      },
      zh: {
        duration: "55 分钟",
        title: "商务汉语基础",
      },
      vi: {
        duration: "55 phút",
        title: "Tiếng Trung trong kinh doanh cơ bản",
      },
    },
  },
  {
    id: "10",
    image: "/images/basic.jpg",
    instructor: "Huang Xiao",
    level: "Practical",
    translations: {
      en: {
        duration: "45 min",
        title: "Travel Conversations",
      },
      zh: {
        duration: "45 分钟",
        title: "旅游会话",
      },
      vi: {
        duration: "45 phút",
        title: "Hội thoại du lịch",
      },
    },
  },
  {
    id: "11",
    image: "/images/basic.jpg",
    instructor: "Tang Wei",
    level: "Practical",
    translations: {
      en: {
        duration: "35 min",
        title: "Restaurant & Food Ordering",
      },
      zh: {
        duration: "35 分钟",
        title: "餐厅点餐",
      },
      vi: {
        duration: "35 phút",
        title: "Gọi món và đặt đồ ăn",
      },
    },
  },
  {
    id: "12",
    image: "/images/basic.jpg",
    instructor: "Gao Min",
    level: "Practical",
    translations: {
      en: {
        duration: "50 min",
        title: "Making Friends in Chinese",
      },
      zh: {
        duration: "50 分钟",
        title: "用中文交朋友",
      },
      vi: {
        duration: "50 phút",
        title: "Kết bạn bằng tiếng Trung",
      },
    },
  },
]; 