export const ANNOUNCEMENT_TYPES = {
  General: {
    emoji: "📢",
    description: "General Announcement"
  },
  Maintenance: {
    emoji: "🛠️",
    description: "Maintenance / Tech Issues"
  },
  "Product Update": {
    emoji: "🚀",
    description: "Product or Feature Update"
  },
  Process: {
    emoji: "🧠",
    description: "Process / Team Knowledge"
  },
  Office: {
    emoji: "🏢",
    description: "Office / Culture / HR"
  },
  Celebration: {
    emoji: "🎉",
    description: "Celebrations / Events"
  }
};

export const CATEGORIES = Object.keys(ANNOUNCEMENT_TYPES); 