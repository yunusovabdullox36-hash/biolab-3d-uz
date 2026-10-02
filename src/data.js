export const organs = {
  brain: {
    name: 'Miya', eyebrow: 'Asab tizimi', color: '#c89cff', accent: '#9f63ff',
    short: 'Fikr, xotira va butun tanani boshqaradi.',
    description: 'Miya — markaziy asab tizimining boshqaruv markazi. U sezgilarni qayta ishlaydi, harakatlarni muvofiqlashtiradi, xotira va fikrlash jarayonlarini boshqaradi.',
    facts: ['Taxminan 86 milliard neyron mavjud', 'Tana energiyasining qariyb 20% ini ishlatadi', 'Chap va o‘ng yarimsharlardan iborat'],
  },
  lungs: {
    name: 'O‘pka', eyebrow: 'Nafas olish tizimi', color: '#ff91ae', accent: '#ff5f89',
    short: 'Kislorodni qonga o‘tkazadi.',
    description: 'O‘pka nafas olayotganda kislorodni qonga o‘tkazadi va karbonat angidridni tashqariga chiqaradi. O‘ng o‘pka uch, chap o‘pka esa ikki bo‘lakdan iborat.',
    facts: ['Kuniga taxminan 20 000 marta nafas olamiz', 'Alveolalar gaz almashinuvini bajaradi', 'Chap o‘pka yurak uchun joy qoldiradi'],
  },
  heart: {
    name: 'Yurak', eyebrow: 'Qon aylanish tizimi', color: '#ff5c69', accent: '#ff3347',
    short: 'Qonni butun tana bo‘ylab haydaydi.',
    description: 'Yurak — to‘rt kamerali kuchli mushak. U kislorodga boy qonni tanaga, kislorodi kamaygan qonni esa o‘pkaga haydaydi.',
    facts: ['Bir kunda qariyb 100 000 marta uradi', 'To‘rtta kameraga ega', 'Tinch holatda daqiqasiga 5 litrcha qon haydaydi'],
  },
  liver: {
    name: 'Jigar', eyebrow: 'Hazm va moddalar almashinuvi', color: '#c87655', accent: '#9e4d36',
    short: 'Qonni tozalaydi va energiya saqlaydi.',
    description: 'Jigar organizmdagi eng katta ichki a’zo. U zararli moddalarni zararsizlantiradi, o‘t suyuqligini ishlab chiqaradi va oziq moddalarni qayta ishlaydi.',
    facts: ['500 dan ortiq vazifani bajaradi', 'O‘zini qisman tiklay oladi', 'Glikogen ko‘rinishida energiya saqlaydi'],
  },
  stomach: {
    name: 'Oshqozon', eyebrow: 'Hazm qilish tizimi', color: '#ffb071', accent: '#f37c3f',
    short: 'Ovqatni aralashtirib, parchalashni boshlaydi.',
    description: 'Oshqozon kuchli mushak devorlariga ega. Undagi kislota va fermentlar ovqatni parchalaydi hamda uni ingichka ichakka o‘tishga tayyorlaydi.',
    facts: ['Kuchli kislotali muhitga ega', 'Devorini himoya qiluvchi shilliq qavat bor', 'Ovqatni bir necha soat saqlashi mumkin'],
  },
  kidneys: {
    name: 'Buyraklar', eyebrow: 'Siydik ajratish tizimi', color: '#b97878', accent: '#8c4747',
    short: 'Qonni filtrlab, suv muvozanatini saqlaydi.',
    description: 'Buyraklar qondan chiqindilarni filtrlab siydik hosil qiladi. Ular tanadagi suv, tuz va kislota-ishqor muvozanatini nazorat qiladi.',
    facts: ['Har birida millionga yaqin nefron bor', 'Kuniga yuzlab litr qonni filtrlaydi', 'Qon bosimini boshqarishda qatnashadi'],
  },
}

export const bones = {
  skull: { name: 'Bosh suyagi', eyebrow: 'Skelet tizimi', color: '#e9f1e8', accent: '#9ccdbf', short: 'Miyani va sezgi organlarini himoya qiladi.', description: 'Bosh suyagi miyani tashqi zarbalardan himoya qiladigan murakkab suyaklar majmuasidir.', facts: ['Voyaga yetganda 22 ta suyak', 'Pastki jag‘ harakatlanuvchi', 'Miya uchun mustahkam qobiq'] },
  ribs: { name: 'Qovurg‘alar', eyebrow: 'Skelet tizimi', color: '#e9f1e8', accent: '#9ccdbf', short: 'Yurak va o‘pkani himoya qiladi.', description: 'Qovurg‘alar ko‘krak qafasini hosil qilib, yurak va o‘pkani himoya qiladi hamda nafas olishda qatnashadi.', facts: ['Odatda 12 juft', 'To‘sh suyagiga ulanadi', 'Nafasda ko‘tarilib-tushadi'] },
  spine: { name: 'Umurtqa pog‘onasi', eyebrow: 'Skelet tizimi', color: '#e9f1e8', accent: '#9ccdbf', short: 'Tanani tutib turadi va orqa miyani himoya qiladi.', description: 'Umurtqa pog‘onasi tanaga tayanch beradi, egiluvchanlikni ta’minlaydi va orqa miyani himoya qiladi.', facts: ['33–34 umurtqadan tuzilgan', 'Disklar zarbani yumshatadi', 'S shakli muvozanat beradi'] },
  pelvis: { name: 'Chanoq suyagi', eyebrow: 'Skelet tizimi', color: '#e9f1e8', accent: '#9ccdbf', short: 'Tana og‘irligini oyoqlarga uzatadi.', description: 'Chanoq suyagi umurtqani oyoqlar bilan bog‘laydi, ichki a’zolarni himoya qiladi va tana og‘irligini taqsimlaydi.', facts: ['Kuchli halqa shaklida', 'Son suyagi bilan bo‘g‘im hosil qiladi', 'Ichki a’zolarni qo‘llab-quvvatlaydi'] },
}

export const quiz = [
  { q: 'Qonni butun tana bo‘ylab qaysi organ haydaydi?', options: ['O‘pka', 'Yurak', 'Jigar', 'Buyrak'], answer: 1 },
  { q: 'Gaz almashinuvi o‘pkaning qaysi qismida bo‘ladi?', options: ['Alveola', 'Nefron', 'Neyron', 'Pay'], answer: 0 },
  { q: 'Markaziy asab tizimining boshqaruv markazi nima?', options: ['Oshqozon', 'Jigar', 'Miya', 'Yurak'], answer: 2 },
  { q: 'Qonni filtrlab, siydik hosil qiladigan organ?', options: ['Buyrak', 'O‘pka', 'Miya', 'Ichak'], answer: 0 },
  { q: 'Eng katta ichki a’zo qaysi?', options: ['Yurak', 'Jigar', 'Miya', 'Oshqozon'], answer: 1 },
  { q: 'Odamda odatda nechta juft qovurg‘a bo‘ladi?', options: ['8', '10', '12', '14'], answer: 2 },
  { q: 'Oshqozon qaysi tizimga kiradi?', options: ['Asab', 'Nafas', 'Hazm', 'Skelet'], answer: 2 },
  { q: 'Miya energiyaning taxminan necha foizini ishlatadi?', options: ['5%', '10%', '20%', '50%'], answer: 2 },
  { q: 'Orqa miyani nima himoya qiladi?', options: ['Qovurg‘a', 'Umurtqa pog‘onasi', 'Chanoq', 'Kurak'], answer: 1 },
  { q: 'Yurak nechta kameraga ega?', options: ['2', '3', '4', '5'], answer: 2 },
]
