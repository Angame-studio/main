export type GameStatus = 'released' | 'in-development' | 'coming-soon';

export type LocalizedText = {
  en: string;
  vi: string;
  fr: string;
  es: string;
  de: string;
};

export type Game = {
  id: string;
  title: string;
  tagline: LocalizedText;
  description: LocalizedText;
  genre: LocalizedText;
  status: GameStatus;
  /** Cover image — put your file at: public/games/covers/<id>.png (or .jpg) */
  coverImage: string | null;
  /** Screenshots — put files in: public/games/screenshots/ and list paths here */
  screenshots: string[];
  /** Download file — put your .zip/.exe at: public/games/downloads/<id>.zip */
  downloadUrl: string | null;
  /** Play in browser URL (itch.io embed, etc.) — null if not available */
  playUrl: string | null;
};

/* =========================================================================
   YOUR GAMES — All 4 games are filled in below
   =========================================================================

   IMAGE FILES — put your cover/screenshot images in these folders:
   ┌──────────────────────────────────────────────────────────────────┐
   │ public/games/covers/        ← cover images (one per game)        │
   │ public/games/screenshots/   ← screenshot images                  │
   │ public/games/downloads/     ← game download files (.zip, .exe)   │
   └──────────────────────────────────────────────────────────────────┘

   Then update the paths below to match your filenames. For example, if you
   add a file called "magikill.png" to public/games/covers/, set:
     coverImage: '/games/covers/magikill.png'

   DOWNLOAD FILES — put your game file (e.g. Magikill.zip) in:
     public/games/downloads/
   Then set:
     downloadUrl: '/games/downloads/Magikill.zip'

   PLAY URL — if your game is on itch.io and playable in browser, set:
     playUrl: 'https://angames.itch.io/magikill'
   Otherwise set it to null.
   ========================================================================= */

export const games: Game[] = [
  {
    id: 'business-master',
    title: 'Business Master',
    tagline: {
      en: 'Run your breakfast shop and outsmart your competitor',
      vi: 'Quản lý quán ăn sáng và vượt qua đối thủ cạnh tranh',
      fr: 'Gérez votre petit-déjeuner et dépassez votre concurrent',
      es: 'Administra tu tienda de desayuno y supera a tu competidor',
      de: 'Führe dein Frühstückslokal und übertriff deinen Konkurrenten',
    },
    description: {
      en: 'You rented a shop to sell noodles and coffee for breakfast, but Max — a person living next to your shop — also sells noodles. Now you are the shopkeeper. Manage your inventory, serve customers quickly, and outsmart Max to become the best breakfast spot in town.',
      vi: 'Bạn thuê một quán để bán mì và cà phê cho bữa sáng, nhưng Max — người hàng xóm cạnh quán bạn — cũng bán mì. Giờ bạn là người bán hàng. Quản lý hàng tồn, phục vụ khách nhanh chóng và vượt qua Max để trở thành quán ăn sáng tốt nhất khu vực.',
      fr: "Vous avez loué une boutique pour vendre des nouilles et du café pour le petit-déjeuner, mais Max — un voisin — vend aussi des nouilles. Vous êtes maintenant le commerçant. Gérez votre inventaire, servez vite les clients et dépassez Max.",
      es: 'Alquilaste una tienda para vender fideos y café para el desayuno, pero Max —un vecino— también vende fideos. Ahora eres el tendero. Administra tu inventario, atiende rápido y supera a Max.',
      de: 'Du hast einen Laden gemietet, um Nudeln und Kaffee für das Frühstück zu verkaufen, aber Max — ein Nachbar — verkauft auch Nudeln. Du bist jetzt der Verkäufer. Verwalte dein Inventar, bediene Kunden schnell und übertriff Max.',
    },
    genre: {
      en: 'Simulation',
      vi: 'Mô phỏng',
      fr: 'Simulation',
      es: 'Simulación',
      de: 'Simulation',
    },
    status: 'released',
    coverImage: '/games/covers/business-master.png',
    screenshots: [],
    downloadUrl: '/games/downloads/BusinessMaster.yyz',
    playUrl: null,
  },
  {
    id: 'magikill',
    title: 'Magikill',
    tagline: {
      en: 'Become a mighty magician — merge spells and unleash forbidden magic',
      vi: 'Trở thành pháp sư quyền năng — kết hợp phép thuật và giải phóng cấm thuật',
      fr: 'Devenez un puissant magicien — fusionnez des sorts et libérez la magie interdite',
      es: 'Conviértete en un poderoso mago — fusiona hechizos y libera magia prohibida',
      de: 'Werde ein mächtiger Magier — verschmelze Zauber und entfessle verbotene Magie',
    },
    description: {
      en: 'You will become a mighty magician and the enemy is attacking you. Cast your spells, merge them to create special attacks, and use your forbidden magic. Enjoy defeating the enemy with your spell combinations.',
      vi: 'Bạn sẽ trở thành một pháp sư quyền năng và kẻ thù đang tấn công bạn. Thi triển phép thuật, kết hợp chúng để tạo ra đòn tấn công đặc biệt và sử dụng cấm thuật. Hãy tận hưởng việc đánh bại kẻ thù bằng các tổ hợp phép thuật của bạn.',
      fr: "Vous deviendrez un puissant magicien et l'ennemi vous attaque. Lancez vos sorts, fusionnez-les pour créer des attaques spéciales et utilisez votre magie interdite. Profitez de vaincre l'ennemi avec vos combinaisons de sorts.",
      es: 'Te convertirás en un poderoso mago y el enemigo te ataca. Lanza tus hechizos, fúndelos para crear ataques especiales y usa tu magia prohibida. Disfruta derrotando al enemigo con tus combinaciones de hechizos.',
      de: 'Du wirst ein mächtiger Magier und der Feind greift dich an. Wirke deine Zauber, verschmelze sie, um Spezialangriffe zu erschaffen, und nutze deine verbotene Magie. Besiege den Feind mit deinen Zauberkombinationen.',
    },
    genre: {
      en: 'Action / Magic',
      vi: 'Hành động / Phép thuật',
      fr: 'Action / Magie',
      es: 'Acción / Magia',
      de: 'Action / Magie',
    },
    status: 'released',
    coverImage: 'https://images.pexels.com/photos/7978254/pexels-photo-7978254.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    screenshots: [],
    downloadUrl: '/games/downloads/Magikill.yyz',
    playUrl: null,
  },
  {
    id: 'pirate-invasion',
    title: 'Pirate Invasion',
    tagline: {
      en: 'Lead your pirate brig to invade an island defended by knights',
      vi: 'Dẫn đầu tàu cướp biển xâm chiếm hòn đảo do hiệp sĩ canh giữ',
      fr: "Menez votre brigantin pirate pour envahir une île défendue par des chevaliers",
      es: 'Lidera tu bergantín pirata para invadir una isla defendida por caballeros',
      de: 'Führe deine Piraten-Brigantine, um eine von Rittern verteidigte Insel zu erobern',
    },
    description: {
      en: 'Back to the golden age of piracy, you are the pirate captain and you lead your pirate brig to invade a small island. However, the knights are commanded to defend their island. Push them back and invade the island!',
      vi: 'Trở về thời kỳ hoàng kim của cướp biển, bạn là thuyền trưởng cướp biển dẫn đầu tàu brig xâm chiếm một hòn đảo nhỏ. Tuy nhiên, các hiệp sĩ được lệnh bảo vệ hòn đảo của họ. Đẩy lùi họ và xâm chiếm hòn đảo!',
      fr: "Retour à l'âge d'or de la piraterie, vous êtes le capitaine pirate et menez votre brigantin pour envahir une petite île. Cependant, les chevaliers sont chargés de défendre leur île. Repoussez-les et envahissez l'île !",
      es: 'Vuelve a la edad de oro de la piratería, eres el capitán pirata y lideras tu bergantín para invadir una pequeña isla. Sin embargo, los caballeros tienen la orden de defender su isla. ¡Repúlsalos e invade la isla!',
      de: 'Zurück im goldenen Zeitalter der Piraterie bist du der Piratenkapitän und führst deine Brigantine, um eine kleine Insel zu erobern. Die Ritter haben jedoch den Befehl, ihre Insel zu verteidigen. Dränge sie zurück und erober die Insel!',
    },
    genre: {
      en: 'Strategy / Action',
      vi: 'Chiến thuật / Hành động',
      fr: 'Stratégie / Action',
      es: 'Estrategia / Acción',
      de: 'Strategie / Action',
    },
    status: 'released',
    coverImage: 'https://images.pexels.com/photos/30104945/pexels-photo-30104945.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    screenshots: [],
    downloadUrl: '/games/downloads/PIRATE_INVASION.yyz',
    playUrl: null,
  },
  {
    id: 'the-tavern',
    title: 'The Tavern',
    tagline: {
      en: 'Our latest game — run a pirate tavern in the golden age',
      vi: 'Game mới nhất — điều hành quán rượu cướp biển thời hoàng kim',
      fr: "Notre dernier jeu — gérez une taverne de pirates à l'âge d'or",
      es: 'Nuestro último juego — dirige una taberna pirata en la edad de oro',
      de: 'Unser neuestes Spiel — führe eine Piraten-Taverne im goldenen Zeitalter',
    },
    description: {
      en: 'Our latest game. You will go back to the golden age of piracy and run a small tavern for pirates. Develop your tavern, serve pirate customers, and explore many things in this period.',
      vi: 'Game mới nhất của chúng tôi. Bạn sẽ trở về thời kỳ hoàng kim của cướp biển và điều hành một quán rượu nhỏ cho cướp biển. Phát triển quán của bạn, phục vụ khách hàng cướp biển và khám phá nhiều điều trong thời kỳ này.',
      fr: "Notre dernier jeu. Vous retournerez à l'âge d'or de la piraterie et gérez une petite taverne pour pirates. Développez votre taverne, servez les clients pirates et explorez cette époque.",
      es: 'Nuestro último juego. Volverás a la edad de oro de la piratería y dirigirás una pequeña taberna para piratas. Desarrolla tu taberna, atiende a los clientes pirata y explora esta época.',
      de: 'Unser neuestes Spiel. Du kehrst ins goldene Zeitalter der Piraterie zurück und führst eine kleine Taverne für Piraten. Entwickle deine Taverne, bediene Piraten-Kunden und entdecke diese Epoche.',
    },
    genre: {
      en: 'Management / Adventure',
      vi: 'Quản lý / Phiêu lưu',
      fr: 'Gestion / Aventure',
      es: 'Gestión / Aventura',
      de: 'Management / Abenteuer',
    },
    status: 'in-development',
    coverImage: 'https://images.pexels.com/photos/36064248/pexels-photo-36064248.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    screenshots: [],
    downloadUrl: '/games/downloads/TheTavern.yyz',
    playUrl: null,
  },
];
