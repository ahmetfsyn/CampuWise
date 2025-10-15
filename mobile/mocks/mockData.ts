import {
  Event,
  EventCategory,
  Marker,
  MarkerCategory,
  Topic,
  User,
} from "@/types/models";
import {
  Coffee,
  School,
  Library,
  Dumbbell,
  Hospital,
  BookOpen,
  Building2,
  Utensils,
  LucideIcon,
  List,
  Music,
  Palette,
  Laptop,
} from "lucide-react-native";
export type MapFilter = {
  id: string;
  name: MarkerCategory;
  displayName: string;
  icon: LucideIcon;
};

export type EventFilter = {
  id: string;
  name: EventCategory;
  displayName: string;
  icon: LucideIcon;
};

// EVENT FILTERS
export const eventFilters: EventFilter[] = [
  {
    id: "0",
    name: EventCategory.All,
    displayName: "Hepsi",
    icon: List,
  },
  {
    id: "1",
    name: EventCategory.Music,
    displayName: "Müzik",
    icon: Music,
  },
  {
    id: "2",
    name: EventCategory.Art,
    displayName: "Sanat",
    icon: Palette,
  },
  {
    id: "3",
    name: EventCategory.Technology,
    displayName: "Teknoloji",
    icon: Laptop,
  },
  {
    id: "4",
    name: EventCategory.Sport,
    displayName: "Spor",
    icon: Dumbbell,
  },
];

// MAP FILTERS
export const mapFilters: MapFilter[] = [
  {
    id: "1",
    name: MarkerCategory.Food,
    displayName: "Yemekler",
    icon: Utensils,
  },
  { id: "2", name: MarkerCategory.Cafe, displayName: "Kafeler", icon: Coffee },
  {
    id: "3",
    name: MarkerCategory.Faculties,
    displayName: "Fakülteler",
    icon: School,
  },
  {
    id: "4",
    name: MarkerCategory.Library,
    displayName: "Kütüphaneler",
    icon: Library,
  },
  {
    id: "5",
    name: MarkerCategory.Sport,
    displayName: "Spor Yerleri",
    icon: Dumbbell,
  },
  {
    id: "6",
    name: MarkerCategory.Hospital,
    displayName: "Hastaneler & Sağlık Ocakları",
    icon: Hospital,
  },
  {
    id: "7",
    name: MarkerCategory.BookStore,
    displayName: "Sahaflar & Kırtasiyeler",
    icon: BookOpen,
  },
  {
    id: "8",
    name: MarkerCategory.Dorm,
    displayName: "Yurtlar",
    icon: Building2,
  },
];

// MARKERS
export const markers: Marker[] = [
  // FOOD
  {
    id: "m1",
    category: MarkerCategory.Food,
    title: "Bartın Balık Restaurant",
    coordinate: { latitude: 41.6345, longitude: 32.3378 },
    address: "İnönü Cad. No:24, Merkez, 74100 Bartın",
    phoneNumber: "+90 378 123 45 67",
    workingHours: "Pzt - Cmt 10:00 - 22:00",
    description: "Merkezde uygun fiyatlı balık restoranı",
    imageUrl: "https://picsum.photos/1280/720?random=1",
  },
  {
    id: "m2",
    category: MarkerCategory.Cafe,
    title: "Köşe Kahve Evi",
    coordinate: { latitude: 41.6351, longitude: 32.3382 },
    address: "Kavaklı Sok. No:12, Merkez, 74100 Bartın",
    phoneNumber: "+90 378 234 56 78",
    workingHours: "Pzt - Paz 08:00 - 23:00",
    description: "Merkezde popüler kafe",
    imageUrl: "https://picsum.photos/1280/720?random=2",
  },
  {
    id: "m3",
    category: MarkerCategory.Faculties,
    title: "Mühendislik Fakültesi",
    coordinate: { latitude: 41.6348, longitude: 32.3495 },
    address: "Kutlubey Kampüsü, 74100 Bartın",
    phoneNumber: "+90 378 501 10 00",
    workingHours: "Pzt - Cum 08:30 - 17:30",
    description: "Kampüs içi fakülte binası",
    imageUrl: "https://picsum.photos/1280/720?random=3",
  },
  {
    id: "m4",
    category: MarkerCategory.Library,
    title: "Merkez Kütüphane",
    coordinate: { latitude: 41.6352, longitude: 32.3501 },
    address: "Kutlubey Kampüsü, 74100 Bartın",
    phoneNumber: "+90 378 501 10 60",
    workingHours: "Pzt - Cmt 08:00 - 22:00",
    description: "Kampüs ana kütüphanesi",
    imageUrl: "https://picsum.photos/1280/720?random=4",
  },
  {
    id: "m5",
    category: MarkerCategory.BookStore,
    title: "Bartın Kırtasiye & Sahaf",
    coordinate: { latitude: 41.636, longitude: 32.3387 },
    address: "Cumhuriyet Cad. No:18, Merkez, 74100 Bartın",
    phoneNumber: "+90 378 345 67 89",
    workingHours: "Pzt - Cmt 09:00 - 19:00",
    description: "Merkezde kırtasiye ve ikinci el kitap",
    imageUrl: "https://picsum.photos/1280/720?random=5",
  },
];

// USERS
export const users: User[] = [
  {
    id: "u1",
    fullName: "Alice Doe",
    email: "alice@example.com",
    imageUrl: "https://picsum.photos/1280/720?random=1",
    phoneNumber: "+90 123 456 78 90",
  },
  {
    id: "u2",
    fullName: "John Doe",
    email: "john@example.com",
    imageUrl: "https://picsum.photos/1280/720?random=2",
    phoneNumber: "+90 123 456 78 92",
  },
  {
    id: "u3",
    fullName: "Kate Doe",
    email: "kate@example.com",
    imageUrl: "https://picsum.photos/1280/720?random=3",
    phoneNumber: "+90 123 456 78 93",
  },
  {
    id: "u4",
    fullName: "Michael Brown",
    email: "michael@example.com",
    imageUrl: "https://picsum.photos/1280/720?random=4",
    phoneNumber: "+90 123 456 78 94",
  },
  {
    id: "u5",
    fullName: "Sophia Miller",
    email: "sophia@example.com",
    imageUrl: "https://picsum.photos/1280/720?random=5",
    phoneNumber: "+90 123 456 78 95",
  },
  {
    id: "u6",
    fullName: "Daniel Lee",
    email: "daniel@example.com",
    imageUrl: "https://picsum.photos/1280/720?random=6",
    phoneNumber: "+90 123 456 78 96",
  },
  {
    id: "u7",
    fullName: "Emma Johnson",
    email: "emma@example.com",
    imageUrl: "https://picsum.photos/1280/720?random=7",
    phoneNumber: "+90 123 456 78 97",
  },
  {
    id: "u8",
    fullName: "David Wilson",
    email: "david@example.com",
    imageUrl: "https://picsum.photos/1280/720?random=8",
    phoneNumber: "+90 123 456 78 98",
  },
  {
    id: "u9",
    fullName: "Olivia Martinez",
    email: "olivia@example.com",
    imageUrl: "https://picsum.photos/1280/720?random=9",
    phoneNumber: "+90 123 456 78 99",
  },
  {
    id: "u10",
    fullName: "Liam Taylor",
    email: "liam@example.com",
    imageUrl: "https://picsum.photos/1280/720?random=10",
    phoneNumber: "+90 123 456 79 00",
  },
];

// EVENTS
export const events: Event[] = [
  {
    id: "e1",
    place: "m3",
    title: "Jazz Akşamı",
    date: "2025-09-15",
    category: "music",
    description: "Rahatlatıcı jazz melodileri eşliğinde akşam keyfi.",
    imageUrl: "https://picsum.photos/1280/720?random=1",
    participants: [users[0], users[2], users[1], users[3], users[5], users[6]],
    tags: ["music", "jazz", "evening"],
  },
  {
    id: "e2",
    place: "m1",
    title: "Modern Sanat Atölyesi",
    date: "2025-09-20",
    category: "art",
    description: "Yaratıcılığını ortaya çıkaracak modern sanat çalışmaları.",
    imageUrl: "https://picsum.photos/1280/720?random=2",
    participants: [users[1]],
    tags: ["art", "workshop", "modern"],
  },
  {
    id: "e3",
    place: "m5",
    title: "Robotik Teknoloji Semineri",
    date: "2025-09-25",
    category: "technology",
    description: "Robotik dünyasındaki son gelişmeleri öğren.",
    imageUrl: "https://picsum.photos/1280/720?random=3",
    participants: [users[0], users[1], users[2]],
    tags: ["technology", "robotics", "seminar"],
  },
  {
    id: "e4",
    place: "m4",
    title: "Basketbol Turnuvası",
    date: "2025-10-01",
    category: "sports",
    description: "Takımını kur, heyecan dolu maçlara katıl.",
    imageUrl: "https://picsum.photos/1280/720?random=4",
    participants: [users[2]],
    tags: ["sports", "basketball", "tournament"],
  },
  {
    id: "e5",
    place: "m2",
    title: "Akustik Müzik Gecesi",
    date: "2025-10-05",
    category: "music",
    description: "Sakin ve huzurlu akustik performanslar.",
    imageUrl: "https://picsum.photos/1280/720?random=5",
    participants: [users[0]],
    tags: ["music", "acoustic", "night"],
  },
  {
    id: "e6",
    place: "m1",
    title: "Fotoğraf Sergisi",
    date: "2025-10-08",
    category: "art",
    description: "Yerel fotoğraf sanatçılarının eserleri sergileniyor.",
    imageUrl: "https://picsum.photos/1280/720?random=6",
    participants: [users[1], users[2]],
    tags: ["art", "photography", "exhibition"],
  },
  {
    id: "e7",
    place: "m3",
    title: "Yapay Zeka Atölyesi",
    date: "2025-10-10",
    category: "technology",
    description: "Yapay zeka temellerini öğren ve projeler geliştir.",
    imageUrl: "https://picsum.photos/1280/720?random=7",
    participants: [users[0]],
    tags: ["technology", "AI", "workshop"],
  },
  {
    id: "e8",
    place: "m5",
    title: "Futbol Maçı",
    date: "2025-10-12",
    category: "sports",
    description: "Haftalık futbol maçında yerini al.",
    imageUrl: "https://picsum.photos/1280/720?random=8",
    participants: [users[1], users[2]],
  },
  {
    id: "e9",
    place: "m4",
    title: "Rock Konseri",
    date: "2025-10-15",
    category: "music",
    description: "Enerjik rock müzik performansı kaçmaz.",
    imageUrl: "https://picsum.photos/1280/720?random=9",
    participants: [users[0], users[1]],
    tags: ["music", "rock", "concert"],
  },
  {
    id: "e10",
    place: "m2",
    title: "Heykel Atölyesi",
    date: "2025-10-18",
    category: "art",
    description: "Kendi heykelini yapmayı öğren.",
    imageUrl: "https://picsum.photos/1280/720?random=10",
    participants: [users[2]],
  },
  {
    id: "e11",
    place: "m3",
    title: "Kodlama Maratonu",
    date: "2025-10-20",
    category: "technology",
    description: "24 saat süren kodlama yarışmasına katıl.",
    imageUrl: "https://picsum.photos/1280/720?random=11",
    participants: [users[0], users[2]],
  },
  {
    id: "e12",
    place: "m5",
    title: "Voleybol Turnuvası",
    date: "2025-10-22",
    category: "sports",
    description: "Takımını kur ve turnuvada yerini al.",
    imageUrl: "https://picsum.photos/1280/720?random=12",
    participants: [users[1]],
  },
  {
    id: "e13",
    place: "m1",
    title: "Klasik Müzik Konseri",
    date: "2025-10-25",
    category: "music",
    description: "Klasik müzik eserleri ile huzurlu bir gece.",
    imageUrl: "https://picsum.photos/1280/720?random=13",
    participants: [users[0], users[1], users[2]],
  },
  {
    id: "e14",
    place: "m4",
    title: "Resim Yarışması",
    date: "2025-10-28",
    category: "art",
    description: "Yaratıcılığını konuştur ve yarışmaya katıl.",
    imageUrl: "https://picsum.photos/1280/720?random=14",
    participants: [users[1]],
  },
  {
    id: "e15",
    place: "m3",
    title: "Siber Güvenlik Semineri",
    date: "2025-10-30",
    category: "technology",
    description: "Siber güvenlik alanındaki yenilikleri öğren.",
    imageUrl: "https://picsum.photos/1280/720?random=15",
    participants: [users[0]],
  },
  {
    id: "e16",
    place: "m2",
    title: "Masa Tenisi Turnuvası",
    date: "2025-11-02",
    category: "sports",
    description: "Hızlı reflekslerini göster, turnuvada yer al.",
    imageUrl: "https://picsum.photos/1280/720?random=16",
    participants: [users[2]],
  },
  {
    id: "e17",
    place: "m5",
    title: "Blues Gecesi",
    date: "2025-11-05",
    category: "music",
    description: "Blues müziği ile keyifli bir akşam.",
    imageUrl: "https://picsum.photos/1280/720?random=17",
    participants: [users[0], users[2]],
  },
  {
    id: "e18",
    place: "m1",
    title: "Seramik Atölyesi",
    date: "2025-11-08",
    category: "art",
    description: "Kendi seramik ürünlerini tasarla ve yap.",
    imageUrl: "https://picsum.photos/1280/720?random=18",
    participants: [users[1]],
  },
  {
    id: "e19",
    place: "m4",
    title: "Yazılım Geliştirme Kursu",
    date: "2025-11-10",
    category: "technology",
    description: "Temel yazılım geliştirme becerilerini kazan.",
    imageUrl: "https://picsum.photos/1280/720?random=19",
    participants: [users[0], users[1]],
  },
  {
    id: "e20",
    place: "m3",
    title: "Atletizm Yarışması",
    date: "2025-11-12",
    category: "sports",
    description: "Hızını ve dayanıklılığını göster.",
    imageUrl: "https://picsum.photos/1280/720?random=20",
    participants: [users[2]],
  },
];

// TOPICS
export const topics: Topic[] = [
  {
    id: "t1",
    title: "Yemek Paylaşımı",
    description:
      "Yemek hakkını paylaşarak yurt arkadaşlarına destek olabilirsin.",
    imageUrl:
      "https://ik.imagekit.io/37qgyljxz/CampuWise/statics/eat-together.png",
  },
  {
    id: "t2",
    title: "Yurt Önerileri & Şikayetler",
    description: "Yurt ile ilgili öneri veya şikayette bulunabilirsin.",
    imageUrl:
      "https://ik.imagekit.io/37qgyljxz/CampuWise/statics/dorm-problems-min.png",
  },
  {
    id: "t3",
    title: "Üniversite Soruları",
    description: "Üniversite ile ilgili sorularını sorabilirsin.",
    imageUrl:
      "https://ik.imagekit.io/37qgyljxz/CampuWise/statics/frequenly-asks-abobut-university-min.png",
  },
  {
    id: "t4",
    title: "Anketler",
    description: "Birçok konudan anketi buradan bulabilirsin.",
    imageUrl:
      "https://ik.imagekit.io/37qgyljxz/CampuWise/statics/survey-min.png",
  },
  {
    id: "t5",
    title: "Staj & İş Fırsatları",
    description: "Kariyerine yardımcı olacak fırsatları keşfet.",
    imageUrl:
      "https://ik.imagekit.io/37qgyljxz/CampuWise/statics/internships-and-jobs-min.png",
  },
  {
    id: "t6",
    title: "İkinci El Satış & Takas",
    description: "Kullanmadığın eşyaları satabilir veya takas edebilirsin.",
    imageUrl:
      "https://ik.imagekit.io/37qgyljxz/CampuWise/statics/image-min.png",
  },
  {
    id: "t7",
    title: "Ödev & Ders Yardımı",
    description: "Notlarını paylaşarak arkadaşlarına yardımcı olabilirsin.",
    imageUrl:
      "https://ik.imagekit.io/37qgyljxz/CampuWise/statics/university-asks-min.png",
  },
  {
    id: "t8",
    title: "Geri Bildirim",
    description:
      "Uygulama hakkında geri bildirim vererek geliştirmeye yardımcı olabilirsin.",
    imageUrl:
      "https://ik.imagekit.io/37qgyljxz/CampuWise/statics/feedback-min.png",
  },
];
