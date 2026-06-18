// Procedural SVG art generators ported from the Doora prototype.
// makeScene() renders a unique illustrated 'photo' per provider/theme;
// makeAvatar() renders a deterministic avatar. Both return raw SVG strings
// (use via dangerouslySetInnerHTML or a small <SvgArt> wrapper).
/* eslint-disable @typescript-eslint/no-explicit-any */

export function makeScene(theme: string, variant: number, seedStr: string): string {
  // Generate a deterministic seed from the string
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) seed = ((seed << 5) - seed + seedStr.charCodeAt(i)) | 0;
  const rand = (n: number) => { seed = (seed * 9301 + 49297) % 233280; return (seed / 233280) * n; };

  // Per-theme palettes
  const palettes = {
    massage: ['#3A2C1F','#5C3F1F','#8B5A2B','#D4A574','#F5E6D3'],
    barber: ['#0A0A0A','#1F1F1F','#3A3A3A','#666','#C0A878'],
    physio: ['#0E2A3F','#1F4A6F','#2E6A8F','#5C9EB8','#A8C8D8'],
    chiro: ['#1F1F2F','#3F3F5F','#5F5F8F','#8080B0','#B0B0D0'],
    yoga: ['#1F2D1F','#3A5A3A','#7AB87A','#B8D8B8','#E8F0DC'],
    tattoo: ['#000','#1A1A1A','#2A1F1F','#4A2F2F','#8A5F5F'],
    nails: ['#4A1F33','#8A3F5F','#C66F8F','#E8A0BF','#F5D5E0'],
    lashes: ['#1A0E1A','#4A2040','#804060','#B080A0','#E8C0D8'],
    makeup: ['#3F1A1F','#6F2F35','#A04F5F','#C77B7B','#F0B0B0'],
    facial: ['#2F1F2F','#5F3F5F','#8F6F8F','#C8A0C8','#F0D8E8'],
    hair: ['#3F2F1F','#6F4F2F','#A07050','#E8B080','#F5DCB0'],
    pilates: ['#1F1F35','#3F3F55','#6070A0','#8090B0','#C0D0E0'],
    stretch: ['#1F2D2F','#3A5A60','#5A8090','#80B0C0','#B8D8E0'],
    pt: ['#0F1A2C','#1F3A5F','#3A5A8F','#6080B0','#A0C0E0'],
    waxing: ['#2F1F2F','#5F3F5F','#80608F','#B080A0','#D8B8C8'],
    brows: ['#2A1F1A','#4A3F2F','#806050','#A88068','#D8B098'],
    meditation: ['#1A2C2C','#3A5A5A','#5A8080','#80B0B0','#B0D8D8'],
    piercing: ['#1A1A2A','#3A3A4F','#5A5A7A','#8080A0','#B0B0D0'],
    bridal: ['#3A2435','#5F3F4F','#A06080','#E8B0C0','#F5DCE0'],
    skincare: ['#2F2A1F','#5F553F','#807050','#C8B080','#F0DCB8'],
    chef: ['#2C1F1F','#5C3F2F','#A06035','#C77B3F','#E8C088'],
    cleaning: ['#1F2C3F','#3F5570','#5C9EB8','#A0CCE0','#E0F0F5'],
    language: ['#1A2C3F','#3F5570','#7B9ECC','#B0CCE5','#E0EDF5'],
    music: ['#2A1F3F','#4F3F6F','#8060B0','#B090D0','#E0C8F0'],
    ivdrip: ['#1F2F2C','#3F5F55','#5A9E8F','#9CC8BC','#D8EDE5'],
    ac: ['#0F2A3F','#1F5070','#4BA0CC','#9CD0E5','#E0F0F5'],
    electrical: ['#2F2A0F','#5F5530','#A07F1F','#D4A030','#F0DC80'],
    plumbing: ['#1F2A35','#3F5570','#4F7090','#90B0C8','#D0E0EC'],
    photo: ['#1A1A2A','#3F3F5F','#5F5F8F','#A0A0C0','#E0E0F0'],
    video: ['#2A1A2A','#4F2F4F','#6A4A8A','#B080C8','#E0C0E8'],
    florist: ['#3A1F2F','#80405F','#D87BA0','#F0B0C8','#FCE0EC'],
    cakes: ['#3A2A1F','#7F5535','#E8A878','#F4D0AC','#FBEDD8'],
    entertainment: ['#2A1F3F','#5F3F70','#B070D0','#D0A0E0','#EDD8F5'],
    decorator: ['#3F1F2A','#80405A','#E8909F','#F4C0CC','#FBE0E5']
  };
  const pal = (palettes as Record<string, string[]>)[theme] || palettes.massage;

  // Scene compositions per theme — abstract but evocative
  let scene = '';

  if (theme === 'barber') {
    // Barbershop: vertical stripes (barber pole feel), chair silhouette, scissors
    if (variant === 0) {
      // Barber chair scene
      scene = `
        <rect x="0" y="0" width="400" height="280" fill="${pal[0]}"/>
        <rect x="0" y="0" width="400" height="50" fill="${pal[1]}"/>
        <circle cx="350" cy="25" r="6" fill="${pal[4]}" opacity="0.6"/>
        <circle cx="370" cy="25" r="6" fill="${pal[4]}" opacity="0.4"/>
        <path d="M 100 280 L 100 180 Q 100 160 130 160 L 270 160 Q 300 160 300 180 L 300 280 Z" fill="${pal[2]}"/>
        <rect x="160" y="100" width="80" height="70" rx="12" fill="${pal[3]}"/>
        <rect x="180" y="140" width="40" height="40" rx="4" fill="${pal[1]}"/>
        <line x1="0" y1="220" x2="400" y2="220" stroke="${pal[4]}" stroke-width="1" opacity="0.2"/>
      `;
    } else if (variant === 1) {
      // Scissors
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <g transform="translate(200,140) rotate(${20+rand(20)})">
          <circle cx="-50" cy="-30" r="22" fill="none" stroke="${pal[4]}" stroke-width="6"/>
          <circle cx="-50" cy="30" r="22" fill="none" stroke="${pal[4]}" stroke-width="6"/>
          <line x1="-30" y1="-15" x2="80" y2="-3" stroke="${pal[4]}" stroke-width="5"/>
          <line x1="-30" y1="15" x2="80" y2="3" stroke="${pal[3]}" stroke-width="5"/>
        </g>
      `;
    } else if (variant === 2) {
      // Razor / pomade
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <rect x="160" y="80" width="80" height="120" rx="6" fill="${pal[3]}"/>
        <rect x="170" y="100" width="60" height="30" rx="2" fill="${pal[4]}" opacity="0.8"/>
        <rect x="170" y="140" width="60" height="50" rx="2" fill="${pal[0]}" opacity="0.4"/>
        <circle cx="200" cy="220" r="3" fill="${pal[4]}" opacity="0.6"/>
        <circle cx="240" cy="230" r="2" fill="${pal[4]}" opacity="0.4"/>
        <circle cx="160" cy="235" r="2" fill="${pal[4]}" opacity="0.5"/>
      `;
    } else {
      // Comb pattern
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <rect x="80" y="100" width="240" height="80" rx="4" fill="${pal[3]}"/>
        ${Array.from({length: 18}).map((_,i)=>`<rect x="${90+i*13}" y="170" width="4" height="40" fill="${pal[3]}"/>`).join('')}
        <text x="200" y="240" text-anchor="middle" font-family="serif" font-size="14" fill="${pal[4]}" opacity="0.5">PRO TOOLS</text>
      `;
    }
  } else if (theme === 'massage' || theme === 'facial') {
    // Spa: zen circles, candles, oil bottles
    if (variant === 0) {
      // Massage table top view with towels
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <rect x="50" y="60" width="300" height="160" rx="20" fill="${pal[3]}"/>
        <rect x="70" y="80" width="80" height="120" rx="8" fill="${pal[4]}"/>
        <circle cx="110" cy="120" r="14" fill="${pal[2]}" opacity="0.5"/>
        <rect x="280" y="200" width="40" height="6" rx="3" fill="${pal[4]}" opacity="0.6"/>
        <rect x="290" y="215" width="30" height="4" rx="2" fill="${pal[4]}" opacity="0.4"/>
      `;
    } else if (variant === 1) {
      // Oil bottles
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        ${[140,200,260].map((x,i)=>`
          <rect x="${x-15}" y="${90+i*5}" width="30" height="${110-i*5}" rx="4" fill="${pal[2+i%3]}"/>
          <rect x="${x-8}" y="${78+i*5}" width="16" height="14" rx="2" fill="${pal[4]}"/>
          <rect x="${x-12}" y="${130+i*5}" width="24" height="20" fill="${pal[4]}" opacity="0.3"/>
        `).join('')}
      `;
    } else if (variant === 2) {
      // Stones stacked
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <ellipse cx="200" cy="220" rx="120" ry="22" fill="${pal[3]}"/>
        <ellipse cx="200" cy="180" rx="90" ry="18" fill="${pal[2]}"/>
        <ellipse cx="200" cy="145" rx="65" ry="14" fill="${pal[1]}"/>
        <ellipse cx="200" cy="118" rx="40" ry="10" fill="${pal[0]}"/>
        <ellipse cx="200" cy="100" rx="22" ry="6" fill="${pal[2]}" opacity="0.7"/>
      `;
    } else {
      // Zen circle + petal
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <circle cx="200" cy="140" r="80" fill="none" stroke="${pal[3]}" stroke-width="2" opacity="0.6"/>
        <circle cx="200" cy="140" r="50" fill="none" stroke="${pal[4]}" stroke-width="1" opacity="0.4"/>
        ${[0,72,144,216,288].map(a=>`<ellipse cx="${200+Math.cos(a*Math.PI/180)*65}" cy="${140+Math.sin(a*Math.PI/180)*65}" rx="14" ry="6" fill="${pal[3]}" opacity="0.5" transform="rotate(${a} ${200+Math.cos(a*Math.PI/180)*65} ${140+Math.sin(a*Math.PI/180)*65})"/>`).join('')}
      `;
    }
  } else if (theme === 'physio' || theme === 'chiro' || theme === 'pt' || theme === 'stretch') {
    // Clinical: body diagram, equipment
    if (variant === 0) {
      // Body silhouette
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <circle cx="200" cy="60" r="18" fill="${pal[3]}"/>
        <rect x="180" y="82" width="40" height="80" rx="14" fill="${pal[3]}"/>
        <rect x="172" y="90" width="56" height="50" rx="20" fill="${pal[3]}"/>
        <rect x="184" y="160" width="14" height="80" rx="6" fill="${pal[3]}"/>
        <rect x="202" y="160" width="14" height="80" rx="6" fill="${pal[3]}"/>
        <line x1="200" y1="100" x2="200" y2="160" stroke="${pal[4]}" stroke-width="1" stroke-dasharray="2,3" opacity="0.6"/>
        <circle cx="200" cy="125" r="6" fill="${pal[4]}" opacity="0.6"/>
      `;
    } else if (variant === 1) {
      // Dumbbells / equipment
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <g transform="translate(200,140)">
          <rect x="-80" y="-10" width="160" height="20" rx="4" fill="${pal[4]}"/>
          <rect x="-100" y="-22" width="20" height="44" rx="3" fill="${pal[3]}"/>
          <rect x="80" y="-22" width="20" height="44" rx="3" fill="${pal[3]}"/>
          <rect x="-118" y="-32" width="18" height="64" rx="3" fill="${pal[2]}"/>
          <rect x="100" y="-32" width="18" height="64" rx="3" fill="${pal[2]}"/>
        </g>
      `;
    } else if (variant === 2) {
      // Treatment bed
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <rect x="50" y="120" width="300" height="60" rx="6" fill="${pal[3]}"/>
        <rect x="60" y="120" width="80" height="60" rx="6" fill="${pal[4]}" opacity="0.5"/>
        <rect x="80" y="180" width="6" height="60" fill="${pal[2]}"/>
        <rect x="314" y="180" width="6" height="60" fill="${pal[2]}"/>
      `;
    } else {
      // Yoga band / tools
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <path d="M 60 140 Q 200 60 340 140 Q 200 220 60 140 Z" fill="none" stroke="${pal[3]}" stroke-width="6"/>
        <path d="M 60 140 Q 200 100 340 140" fill="none" stroke="${pal[4]}" stroke-width="2" opacity="0.6"/>
        <circle cx="60" cy="140" r="10" fill="${pal[3]}"/>
        <circle cx="340" cy="140" r="10" fill="${pal[3]}"/>
      `;
    }
  } else if (theme === 'yoga' || theme === 'pilates' || theme === 'meditation') {
    // Lotus, mat, meditation pose
    if (variant === 0) {
      // Lotus pose silhouette
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <circle cx="200" cy="100" r="22" fill="${pal[3]}"/>
        <path d="M 200 122 Q 220 130 230 150 Q 240 180 250 200 L 150 200 Q 160 180 170 150 Q 180 130 200 122 Z" fill="${pal[3]}"/>
        <ellipse cx="200" cy="210" rx="100" ry="14" fill="${pal[2]}"/>
        <circle cx="200" cy="155" r="3" fill="${pal[4]}"/>
      `;
    } else if (variant === 1) {
      // Yoga mat rolled
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <rect x="60" y="120" width="280" height="50" rx="25" fill="${pal[3]}"/>
        <circle cx="60" cy="145" r="25" fill="${pal[2]}"/>
        <circle cx="60" cy="145" r="14" fill="${pal[4]}" opacity="0.5"/>
        <circle cx="60" cy="145" r="6" fill="${pal[1]}"/>
      `;
    } else if (variant === 2) {
      // Singing bowl
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <ellipse cx="200" cy="200" rx="100" ry="14" fill="${pal[1]}"/>
        <path d="M 100 200 Q 200 240 300 200 L 280 130 Q 200 110 120 130 Z" fill="${pal[3]}"/>
        <ellipse cx="200" cy="130" rx="80" ry="14" fill="${pal[4]}"/>
        <line x1="200" y1="40" x2="200" y2="130" stroke="${pal[4]}" stroke-width="3"/>
        <ellipse cx="200" cy="40" rx="6" ry="3" fill="${pal[4]}"/>
      `;
    } else {
      // Sun salutation arc
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <path d="M 60 220 Q 200 40 340 220" fill="none" stroke="${pal[4]}" stroke-width="3"/>
        <circle cx="340" cy="220" r="40" fill="${pal[3]}" opacity="0.6"/>
        <circle cx="60" cy="220" r="20" fill="${pal[3]}" opacity="0.4"/>
        <rect x="0" y="220" width="400" height="60" fill="${pal[2]}" opacity="0.5"/>
      `;
    }
  } else if (theme === 'tattoo' || theme === 'piercing') {
    // Tattoo: ink splash, geometric, needle
    if (variant === 0) {
      // Tattoo machine
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <g transform="translate(200,140) rotate(${15+rand(20)})">
          <rect x="-30" y="-50" width="60" height="80" rx="6" fill="${pal[3]}"/>
          <rect x="-20" y="-30" width="40" height="20" fill="${pal[4]}" opacity="0.8"/>
          <line x1="0" y1="30" x2="0" y2="80" stroke="${pal[4]}" stroke-width="3"/>
          <circle cx="0" cy="85" r="3" fill="${pal[4]}"/>
        </g>
      `;
    } else if (variant === 1) {
      // Geometric design
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <g transform="translate(200,140)" stroke="${pal[4]}" stroke-width="1.5" fill="none" opacity="0.85">
          <circle r="60"/>
          <polygon points="0,-60 52,30 -52,30"/>
          <polygon points="0,60 -52,-30 52,-30"/>
          <circle r="20"/>
        </g>
      `;
    } else if (variant === 2) {
      // Ink drops / splash
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <circle cx="${100+rand(50)}" cy="${100+rand(60)}" r="${30+rand(20)}" fill="${pal[0]}"/>
        <circle cx="${250+rand(40)}" cy="${140+rand(40)}" r="${20+rand(15)}" fill="${pal[0]}"/>
        <circle cx="${180+rand(30)}" cy="${200+rand(30)}" r="${12+rand(8)}" fill="${pal[0]}"/>
        <circle cx="${320+rand(20)}" cy="${80+rand(20)}" r="${8+rand(6)}" fill="${pal[0]}"/>
      `;
    } else {
      // Fine line floral
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <g transform="translate(200,140)" stroke="${pal[4]}" stroke-width="1" fill="none">
          <path d="M 0 -60 Q 20 -40 0 -20 Q -20 -40 0 -60 Z"/>
          <path d="M 50 -10 Q 30 10 10 -10 Q 30 -30 50 -10 Z"/>
          <path d="M 0 40 Q 20 60 0 80 Q -20 60 0 40 Z"/>
          <path d="M -50 10 Q -70 -10 -50 -30 Q -30 -10 -50 10 Z"/>
          <line x1="0" y1="-60" x2="0" y2="80" stroke-dasharray="2,4"/>
          <circle r="6" fill="${pal[4]}"/>
        </g>
      `;
    }
  } else if (theme === 'nails' || theme === 'lashes' || theme === 'brows') {
    // Beauty: nail polish, palette, eye
    if (variant === 0) {
      // Polish bottle
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <rect x="160" y="120" width="80" height="100" rx="6" fill="${pal[3]}"/>
        <rect x="180" y="100" width="40" height="22" rx="3" fill="${pal[4]}"/>
        <rect x="190" y="86" width="20" height="14" rx="2" fill="${pal[4]}"/>
        <rect x="170" y="140" width="60" height="30" fill="${pal[4]}" opacity="0.5"/>
      `;
    } else if (variant === 1) {
      // Nail set fan
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        ${[0,1,2,3,4].map(i=>`<ellipse cx="${130+i*40}" cy="160" rx="14" ry="28" fill="${pal[1+i%4]}" transform="rotate(${(i-2)*8} ${130+i*40} 160)"/>`).join('')}
        <rect x="100" y="200" width="200" height="30" rx="6" fill="${pal[2]}" opacity="0.4"/>
      `;
    } else if (variant === 2) {
      // Eye / lash
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <path d="M 100 140 Q 200 80 300 140 Q 200 200 100 140" fill="${pal[4]}"/>
        <circle cx="200" cy="140" r="30" fill="${pal[1]}"/>
        <circle cx="200" cy="140" r="12" fill="${pal[0]}"/>
        ${[0,30,60,90,120,150,180].map(a=>`<line x1="${200+Math.cos((a-180)*Math.PI/180)*55}" y1="${140+Math.sin((a-180)*Math.PI/180)*30}" x2="${200+Math.cos((a-180)*Math.PI/180)*75}" y2="${140+Math.sin((a-180)*Math.PI/180)*45}" stroke="${pal[4]}" stroke-width="2"/>`).join('')}
      `;
    } else {
      // Palette swatches
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        ${[0,1,2,3,4].map(i=>`<circle cx="${120+i*40}" cy="140" r="22" fill="${pal[i]}"/>`).join('')}
      `;
    }
  } else if (theme === 'makeup' || theme === 'bridal') {
    // Makeup: lipstick, palette, mirror
    if (variant === 0) {
      // Lipstick
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <rect x="180" y="120" width="40" height="100" rx="4" fill="${pal[4]}"/>
        <path d="M 180 120 L 200 80 L 220 120 Z" fill="${pal[3]}"/>
        <rect x="170" y="220" width="60" height="14" rx="4" fill="${pal[3]}"/>
      `;
    } else if (variant === 1) {
      // Palette
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <rect x="80" y="100" width="240" height="100" rx="8" fill="${pal[3]}"/>
        ${[0,1,2,3].map(i=>`${[0,1,2].map(j=>`<rect x="${100+i*55}" y="${115+j*28}" width="40" height="20" rx="2" fill="${pal[(i+j)%5]}"/>`).join('')}`).join('')}
      `;
    } else if (variant === 2) {
      // Brushes
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        ${[0,1,2,3].map(i=>`
          <rect x="${130+i*30}" y="100" width="14" height="100" fill="${pal[3]}"/>
          <ellipse cx="${137+i*30}" cy="90" rx="14" ry="18" fill="${pal[4]}" opacity="0.7"/>
        `).join('')}
        <rect x="100" y="200" width="200" height="30" rx="6" fill="${pal[2]}"/>
      `;
    } else {
      // Bridal flowers
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        ${Array.from({length: 7}).map((_,i)=>`<circle cx="${150+rand(100)}" cy="${100+rand(80)}" r="${15+rand(10)}" fill="${pal[3+i%2]}" opacity="0.8"/>`).join('')}
        ${Array.from({length: 7}).map(()=>`<circle cx="${150+rand(100)}" cy="${100+rand(80)}" r="${5+rand(4)}" fill="${pal[4]}"/>`).join('')}
      `;
    }
  } else if (theme === 'hair' || theme === 'waxing') {
    // Hair styling: scissors, wave, hairdryer
    if (variant === 0) {
      // Hair wave silhouette
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <path d="M 80 80 Q 120 60 160 90 Q 200 120 240 90 Q 280 60 320 80 Q 340 140 320 200 Q 280 240 240 220 Q 200 200 160 220 Q 120 240 80 200 Z" fill="${pal[3]}"/>
        <path d="M 80 80 Q 120 60 160 90 Q 200 120 240 90 Q 280 60 320 80" fill="none" stroke="${pal[4]}" stroke-width="2" opacity="0.6"/>
      `;
    } else if (variant === 1) {
      // Hairdryer
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <g transform="translate(200,140) rotate(${-15+rand(10)})">
          <rect x="-50" y="-30" width="80" height="60" rx="30" fill="${pal[3]}"/>
          <rect x="-50" y="-20" width="30" height="40" rx="14" fill="${pal[4]}" opacity="0.7"/>
          <rect x="20" y="20" width="14" height="50" rx="6" fill="${pal[3]}"/>
        </g>
      `;
    } else if (variant === 2) {
      // Curling iron
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <rect x="120" y="130" width="160" height="20" rx="10" fill="${pal[3]}"/>
        <rect x="100" y="125" width="30" height="30" rx="6" fill="${pal[4]}"/>
        <circle cx="280" cy="140" r="20" fill="none" stroke="${pal[2]}" stroke-width="3"/>
      `;
    } else {
      // Salon scene
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <rect x="80" y="60" width="240" height="120" rx="8" fill="${pal[3]}"/>
        <rect x="100" y="80" width="200" height="80" fill="${pal[4]}" opacity="0.5"/>
        <rect x="150" y="180" width="100" height="60" rx="6" fill="${pal[2]}"/>
      `;
    }
  } else if (theme === 'chef') {
    // Chef: plate, pan, knife, ingredients
    if (variant === 0) {
      // Plated dish (top-down)
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <circle cx="200" cy="140" r="100" fill="${pal[4]}"/>
        <circle cx="200" cy="140" r="92" fill="${pal[3]}" opacity="0.4"/>
        <circle cx="200" cy="140" r="60" fill="${pal[2]}"/>
        <ellipse cx="180" cy="125" rx="18" ry="10" fill="${pal[4]}" opacity="0.7"/>
        <ellipse cx="220" cy="150" rx="14" ry="8" fill="${pal[1]}" opacity="0.6"/>
        <circle cx="200" cy="160" r="4" fill="${pal[4]}"/>
        <circle cx="190" cy="135" r="3" fill="${pal[4]}"/>
      `;
    } else if (variant === 1) {
      // Knife + cutting board
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <rect x="80" y="100" width="240" height="120" rx="8" fill="${pal[4]}" opacity="0.8"/>
        <line x1="100" y1="120" x2="320" y2="120" stroke="${pal[3]}" stroke-width="1" opacity="0.4"/>
        <line x1="100" y1="200" x2="320" y2="200" stroke="${pal[3]}" stroke-width="1" opacity="0.4"/>
        <g transform="translate(200,160) rotate(${15+rand(15)})">
          <rect x="-80" y="-4" width="120" height="8" fill="${pal[1]}"/>
          <rect x="40" y="-8" width="40" height="16" rx="2" fill="${pal[3]}"/>
        </g>
      `;
    } else if (variant === 2) {
      // Pan with fire
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <ellipse cx="200" cy="180" rx="100" ry="20" fill="${pal[1]}"/>
        <ellipse cx="200" cy="160" rx="100" ry="20" fill="${pal[3]}"/>
        <rect x="295" y="155" width="80" height="10" rx="3" fill="${pal[1]}"/>
        <path d="M 160 130 Q 170 100 180 130 Q 190 110 200 130 Q 210 100 220 130 Q 230 110 240 130 Z" fill="${pal[4]}" opacity="0.7"/>
        <ellipse cx="200" cy="155" rx="60" ry="10" fill="${pal[4]}" opacity="0.4"/>
      `;
    } else {
      // Wine + grapes
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <path d="M 180 80 L 180 130 Q 180 160 200 165 Q 220 160 220 130 L 220 80 Z" fill="${pal[3]}"/>
        <ellipse cx="200" cy="80" rx="20" ry="4" fill="${pal[4]}"/>
        <rect x="195" y="165" width="10" height="50" fill="${pal[3]}"/>
        <ellipse cx="200" cy="220" rx="40" ry="6" fill="${pal[4]}" opacity="0.5"/>
        ${[0,1,2,3,4,5].map(i=>`<circle cx="${260+(i%3)*15}" cy="${180+Math.floor(i/3)*15}" r="8" fill="${pal[2]}" opacity="0.8"/>`).join('')}
      `;
    }
  } else if (theme === 'cleaning') {
    // Cleaning: sparkle, spray bottle, broom, bubbles
    if (variant === 0) {
      // Spray bottle + bubbles
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <rect x="160" y="110" width="60" height="100" rx="4" fill="${pal[3]}"/>
        <rect x="170" y="80" width="40" height="36" rx="6" fill="${pal[4]}"/>
        <rect x="205" y="60" width="40" height="14" rx="3" fill="${pal[4]}"/>
        <rect x="170" y="130" width="40" height="20" fill="${pal[4]}" opacity="0.5"/>
        ${[280, 300, 320, 290, 310].map((x,i)=>`<circle cx="${x}" cy="${70+i*20}" r="${4+rand(4)}" fill="${pal[4]}" opacity="${0.4+rand(0.3)}"/>`).join('')}
      `;
    } else if (variant === 1) {
      // Sparkles (cleaning shine)
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        ${Array.from({length: 12}).map(()=>{
          const x = 50+rand(300), y = 30+rand(220), s = 10+rand(20);
          return `<g transform="translate(${x},${y})"><path d="M 0 -${s} L 3 -3 L ${s} 0 L 3 3 L 0 ${s} L -3 3 L -${s} 0 L -3 -3 Z" fill="${pal[4]}" opacity="${0.5+rand(0.5)}"/></g>`;
        }).join('')}
      `;
    } else if (variant === 2) {
      // Bucket + mop
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <path d="M 130 130 L 145 220 L 255 220 L 270 130 Z" fill="${pal[3]}"/>
        <ellipse cx="200" cy="130" rx="70" ry="14" fill="${pal[4]}"/>
        <ellipse cx="200" cy="130" rx="60" ry="10" fill="${pal[2]}"/>
        <rect x="280" y="60" width="6" height="160" fill="${pal[3]}"/>
        <ellipse cx="283" cy="60" rx="30" ry="14" fill="${pal[4]}"/>
        <line x1="270" y1="60" x2="296" y2="60" stroke="${pal[1]}" stroke-width="1"/>
        <line x1="265" y1="65" x2="301" y2="65" stroke="${pal[1]}" stroke-width="1"/>
      `;
    } else {
      // Stacked folded towels (laundry)
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        ${[0,1,2,3].map(i=>`
          <rect x="${130+i*4}" y="${200-i*30}" width="${140-i*4}" height="26" rx="3" fill="${pal[i+1]}" opacity="${1-i*0.1}"/>
          <line x1="${135+i*4}" y1="${213-i*30}" x2="${265-i*4}" y2="${213-i*30}" stroke="${pal[0]}" stroke-width="1" opacity="0.3"/>
        `).join('')}
      `;
    }
  } else if (theme === 'language') {
    // Books, speech bubbles, alphabet
    if (variant === 0) {
      // Open book
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <path d="M 80 100 L 200 90 L 320 100 L 320 220 L 200 210 L 80 220 Z" fill="${pal[3]}"/>
        <line x1="200" y1="90" x2="200" y2="210" stroke="${pal[1]}" stroke-width="2"/>
        ${[110,130,150,170,190].map(y=>`<line x1="100" y1="${y}" x2="190" y2="${y-1}" stroke="${pal[4]}" stroke-width="1" opacity="0.4"/>`).join('')}
        ${[110,130,150,170,190].map(y=>`<line x1="210" y1="${y-1}" x2="300" y2="${y}" stroke="${pal[4]}" stroke-width="1" opacity="0.4"/>`).join('')}
      `;
    } else if (variant === 1) {
      // Speech bubbles
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <rect x="60" y="80" width="160" height="80" rx="14" fill="${pal[3]}"/>
        <path d="M 80 160 L 100 180 L 100 160 Z" fill="${pal[3]}"/>
        <rect x="180" y="140" width="160" height="80" rx="14" fill="${pal[4]}"/>
        <path d="M 320 220 L 300 240 L 300 220 Z" fill="${pal[4]}"/>
        <text x="140" y="125" text-anchor="middle" font-family="serif" font-size="22" fill="${pal[0]}">Halo</text>
        <text x="260" y="185" text-anchor="middle" font-family="serif" font-size="22" fill="${pal[0]}">Hello</text>
      `;
    } else if (variant === 2) {
      // Alphabet / globe
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <circle cx="200" cy="140" r="80" fill="${pal[3]}"/>
        <ellipse cx="200" cy="140" rx="80" ry="30" fill="none" stroke="${pal[4]}" stroke-width="1" opacity="0.5"/>
        <ellipse cx="200" cy="140" rx="40" ry="80" fill="none" stroke="${pal[4]}" stroke-width="1" opacity="0.5"/>
        <ellipse cx="200" cy="140" rx="80" ry="80" fill="none" stroke="${pal[4]}" stroke-width="1" opacity="0.5"/>
        <text x="120" y="100" font-family="serif" font-size="18" fill="${pal[4]}" opacity="0.7">A</text>
        <text x="280" y="100" font-family="serif" font-size="18" fill="${pal[4]}" opacity="0.7">语</text>
        <text x="120" y="200" font-family="serif" font-size="18" fill="${pal[4]}" opacity="0.7">ñ</text>
        <text x="280" y="200" font-family="serif" font-size="18" fill="${pal[4]}" opacity="0.7">あ</text>
      `;
    } else {
      // Notebook + pencil
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <rect x="120" y="80" width="160" height="160" rx="6" fill="${pal[4]}"/>
        <rect x="120" y="80" width="20" height="160" fill="${pal[3]}"/>
        ${[110,140,170,200,230].map(y=>`<line x1="150" y1="${y}" x2="260" y2="${y}" stroke="${pal[2]}" stroke-width="1" opacity="0.4"/>`).join('')}
        <g transform="translate(290,180) rotate(35)"><rect x="0" y="-4" width="80" height="8" fill="${pal[2]}"/><path d="M 80 -4 L 90 0 L 80 4 Z" fill="${pal[0]}"/></g>
      `;
    }
  } else if (theme === 'music') {
    // Notes, guitar, piano keys
    if (variant === 0) {
      // Music notes on staff
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        ${[0,1,2,3,4].map(i=>`<line x1="40" y1="${110+i*15}" x2="360" y2="${110+i*15}" stroke="${pal[4]}" stroke-width="1" opacity="0.5"/>`).join('')}
        <ellipse cx="100" cy="155" rx="12" ry="9" fill="${pal[3]}" transform="rotate(-15 100 155)"/>
        <line x1="111" y1="148" x2="111" y2="110" stroke="${pal[3]}" stroke-width="2"/>
        <ellipse cx="180" cy="140" rx="12" ry="9" fill="${pal[3]}" transform="rotate(-15 180 140)"/>
        <line x1="191" y1="133" x2="191" y2="100" stroke="${pal[3]}" stroke-width="2"/>
        <ellipse cx="270" cy="170" rx="12" ry="9" fill="${pal[3]}" transform="rotate(-15 270 170)"/>
        <line x1="281" y1="163" x2="281" y2="115" stroke="${pal[3]}" stroke-width="2"/>
        <path d="M 281 115 Q 320 105 320 130" fill="none" stroke="${pal[3]}" stroke-width="2"/>
      `;
    } else if (variant === 1) {
      // Guitar shape
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <ellipse cx="200" cy="190" rx="70" ry="55" fill="${pal[3]}"/>
        <ellipse cx="200" cy="190" rx="20" ry="20" fill="${pal[0]}"/>
        <rect x="195" y="30" width="10" height="135" fill="${pal[2]}"/>
        <rect x="185" y="30" width="30" height="20" rx="3" fill="${pal[4]}"/>
        ${[0,1,2,3,4,5].map(i=>`<line x1="${196+i*1.5}" y1="50" x2="${196+i*1.5}" y2="245" stroke="${pal[4]}" stroke-width="0.5" opacity="0.7"/>`).join('')}
      `;
    } else if (variant === 2) {
      // Piano keys
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <rect x="50" y="100" width="300" height="120" rx="4" fill="${pal[4]}"/>
        ${[0,1,2,3,4,5,6].map(i=>`<rect x="${50+i*43}" y="105" width="42" height="110" fill="${pal[4]}" stroke="${pal[0]}" stroke-width="1.5"/>`).join('')}
        ${[0,1,3,4,5].map(i=>`<rect x="${78+i*43}" y="105" width="28" height="70" fill="${pal[0]}"/>`).join('')}
      `;
    } else {
      // Headphones / microphone
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <path d="M 130 140 Q 130 80 200 80 Q 270 80 270 140" fill="none" stroke="${pal[3]}" stroke-width="8"/>
        <rect x="115" y="135" width="35" height="50" rx="14" fill="${pal[3]}"/>
        <rect x="250" y="135" width="35" height="50" rx="14" fill="${pal[3]}"/>
        <ellipse cx="132" cy="160" rx="10" ry="14" fill="${pal[4]}" opacity="0.6"/>
        <ellipse cx="268" cy="160" rx="10" ry="14" fill="${pal[4]}" opacity="0.6"/>
      `;
    }
  } else if (theme === 'ivdrip') {
    // IV bag, droplet, syringe
    if (variant === 0) {
      // IV bag on stand
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <line x1="200" y1="20" x2="200" y2="220" stroke="${pal[4]}" stroke-width="3"/>
        <circle cx="200" cy="20" r="4" fill="${pal[4]}"/>
        <rect x="170" y="60" width="60" height="80" rx="6" fill="${pal[3]}" opacity="0.7"/>
        <rect x="170" y="80" width="60" height="50" fill="${pal[4]}" opacity="0.5"/>
        <line x1="200" y1="140" x2="200" y2="220" stroke="${pal[2]}" stroke-width="2"/>
        <circle cx="200" cy="225" r="6" fill="${pal[4]}"/>
        <ellipse cx="200" cy="260" rx="40" ry="6" fill="${pal[2]}" opacity="0.4"/>
      `;
    } else if (variant === 1) {
      // Vitamins
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        ${[0,1,2,3,4].map(i=>`
          <rect x="${80+i*50}" y="${90+(i%2)*20}" width="40" height="100" rx="20" fill="${pal[2+(i%3)]}"/>
          <rect x="${80+i*50}" y="${130+(i%2)*20}" width="40" height="20" fill="${pal[4]}" opacity="0.5"/>
        `).join('')}
      `;
    } else if (variant === 2) {
      // Droplets
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        ${Array.from({length: 7}).map(()=>{
          const x = 60+rand(280), y = 50+rand(180), s = 18+rand(15);
          return `<path d="M ${x} ${y} Q ${x-s/2} ${y+s/2} ${x-s/3} ${y+s} Q ${x+s/3} ${y+s} ${x+s/2} ${y+s/2} Z" fill="${pal[3]}" opacity="${0.5+rand(0.4)}"/>`;
        }).join('')}
      `;
    } else {
      // Syringe
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <g transform="translate(200,140) rotate(${30+rand(20)})">
          <rect x="-80" y="-12" width="120" height="24" rx="3" fill="${pal[4]}"/>
          <rect x="-80" y="-18" width="20" height="36" rx="3" fill="${pal[3]}"/>
          <rect x="-90" y="-8" width="14" height="16" rx="2" fill="${pal[2]}"/>
          <line x1="40" y1="0" x2="100" y2="0" stroke="${pal[2]}" stroke-width="2"/>
        </g>
      `;
    }
  } else if (theme === 'ac') {
    // AC unit, snowflakes, vent
    if (variant === 0) {
      // AC unit on wall
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <rect x="80" y="80" width="240" height="80" rx="10" fill="${pal[4]}"/>
        <rect x="90" y="100" width="220" height="40" rx="3" fill="${pal[3]}" opacity="0.5"/>
        ${[0,1,2,3,4,5,6,7,8,9].map(i=>`<line x1="${100+i*22}" y1="110" x2="${100+i*22}" y2="135" stroke="${pal[1]}" stroke-width="2"/>`).join('')}
        <rect x="280" y="142" width="30" height="14" rx="2" fill="${pal[2]}"/>
      `;
    } else if (variant === 1) {
      // Snowflakes
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        ${Array.from({length: 8}).map(()=>{
          const x = 60+rand(280), y = 40+rand(200), s = 14+rand(20);
          return `<g transform="translate(${x},${y})" stroke="${pal[4]}" stroke-width="${1.5+rand(1)}" opacity="${0.5+rand(0.5)}">
            <line x1="0" y1="-${s}" x2="0" y2="${s}"/>
            <line x1="-${s}" y1="0" x2="${s}" y2="0"/>
            <line x1="${-s*0.7}" y1="${-s*0.7}" x2="${s*0.7}" y2="${s*0.7}"/>
            <line x1="${s*0.7}" y1="${-s*0.7}" x2="${-s*0.7}" y2="${s*0.7}"/>
          </g>`;
        }).join('')}
      `;
    } else if (variant === 2) {
      // Wrench + screwdriver
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <g transform="translate(150,140) rotate(${30+rand(20)})">
          <rect x="-50" y="-5" width="80" height="10" fill="${pal[4]}"/>
          <circle cx="-50" cy="0" r="14" fill="${pal[4]}"/>
          <circle cx="-50" cy="0" r="6" fill="${pal[0]}"/>
        </g>
        <g transform="translate(260,140) rotate(${-30+rand(20)})">
          <rect x="-30" y="-4" width="70" height="8" fill="${pal[4]}"/>
          <rect x="-40" y="-8" width="12" height="16" rx="2" fill="${pal[3]}"/>
        </g>
      `;
    } else {
      // Cold air streams
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <rect x="100" y="60" width="200" height="40" rx="6" fill="${pal[3]}"/>
        ${[0,1,2,3,4,5].map(i=>`<path d="M ${130+i*28} 100 Q ${130+i*28} 160 ${120+i*28} 220" fill="none" stroke="${pal[4]}" stroke-width="2" opacity="${0.8-i*0.1}"/>`).join('')}
      `;
    }
  } else if (theme === 'electrical') {
    // Lightbulb, plug, wires, lightning bolt
    if (variant === 0) {
      // Lightbulb
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <circle cx="200" cy="120" r="60" fill="${pal[3]}"/>
        <circle cx="200" cy="120" r="50" fill="${pal[4]}" opacity="0.7"/>
        <rect x="180" y="180" width="40" height="14" fill="${pal[2]}"/>
        <rect x="178" y="195" width="44" height="10" rx="2" fill="${pal[1]}"/>
        <rect x="182" y="208" width="36" height="10" rx="2" fill="${pal[1]}"/>
        ${[0,45,90,135,180,225,270,315].map(a=>`<line x1="${200+Math.cos(a*Math.PI/180)*75}" y1="${120+Math.sin(a*Math.PI/180)*75}" x2="${200+Math.cos(a*Math.PI/180)*90}" y2="${120+Math.sin(a*Math.PI/180)*90}" stroke="${pal[4]}" stroke-width="2"/>`).join('')}
      `;
    } else if (variant === 1) {
      // Plug & socket
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <rect x="140" y="80" width="120" height="120" rx="14" fill="${pal[3]}"/>
        <circle cx="180" cy="130" r="6" fill="${pal[0]}"/>
        <circle cx="220" cy="130" r="6" fill="${pal[0]}"/>
        <rect x="195" y="155" width="10" height="20" rx="2" fill="${pal[0]}"/>
      `;
    } else if (variant === 2) {
      // Lightning bolt
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <polygon points="220,40 140,150 200,150 180,240 280,120 220,120 240,40" fill="${pal[4]}"/>
      `;
    } else {
      // Wires
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <path d="M 50 80 Q 200 50 350 100 Q 200 150 50 200 Q 200 230 350 220" fill="none" stroke="${pal[3]}" stroke-width="4"/>
        <path d="M 50 100 Q 200 70 350 120 Q 200 170 50 220" fill="none" stroke="${pal[4]}" stroke-width="3" opacity="0.7"/>
      `;
    }
  } else if (theme === 'plumbing') {
    // Pipes, wrench, faucet
    if (variant === 0) {
      // Pipe joint
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <rect x="60" y="120" width="120" height="40" fill="${pal[3]}"/>
        <rect x="180" y="60" width="40" height="160" fill="${pal[3]}"/>
        <rect x="220" y="120" width="120" height="40" fill="${pal[3]}"/>
        <rect x="155" y="115" width="90" height="50" fill="${pal[4]}" stroke="${pal[2]}" stroke-width="2"/>
        <circle cx="200" cy="50" r="14" fill="${pal[4]}"/>
        <circle cx="200" cy="230" r="14" fill="${pal[4]}"/>
      `;
    } else if (variant === 1) {
      // Faucet + drops
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <rect x="180" y="60" width="40" height="40" fill="${pal[3]}"/>
        <rect x="190" y="100" width="20" height="50" fill="${pal[3]}"/>
        <rect x="170" y="50" width="60" height="14" rx="3" fill="${pal[3]}"/>
        ${[0,1,2,3,4].map(i=>`<path d="M ${198+rand(4)} ${160+i*20} Q ${195+rand(4)} ${170+i*20} ${197+rand(4)} ${178+i*20} Q ${201+rand(4)} ${170+i*20} ${200+rand(4)} ${160+i*20} Z" fill="${pal[4]}" opacity="0.7"/>`).join('')}
      `;
    } else if (variant === 2) {
      // Wrench
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <g transform="translate(200,140) rotate(${45+rand(20)})">
          <rect x="-80" y="-8" width="120" height="16" fill="${pal[3]}"/>
          <path d="M -90 -20 L -60 -20 L -60 -8 L -75 -8 L -75 8 L -60 8 L -60 20 L -90 20 Z" fill="${pal[3]}"/>
          <path d="M 50 -20 L 80 -20 L 80 20 L 50 20 L 50 8 L 65 8 L 65 -8 L 50 -8 Z" fill="${pal[3]}"/>
        </g>
      `;
    } else {
      // Drain swirl
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        ${[0,1,2,3,4].map(i=>`<circle cx="200" cy="140" r="${80-i*15}" fill="none" stroke="${pal[2+i%3]}" stroke-width="2" opacity="${0.4+i*0.1}"/>`).join('')}
        <path d="M 280 100 Q 250 140 280 180" fill="none" stroke="${pal[4]}" stroke-width="2" opacity="0.6"/>
      `;
    }
  } else if (theme === 'photo') {
    // Camera, lens, aperture
    if (variant === 0) {
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <rect x="100" y="100" width="200" height="120" rx="14" fill="${pal[3]}"/>
        <rect x="135" y="85" width="40" height="20" rx="3" fill="${pal[3]}"/>
        <circle cx="200" cy="160" r="44" fill="${pal[1]}"/>
        <circle cx="200" cy="160" r="34" fill="${pal[4]}"/>
        <circle cx="200" cy="160" r="20" fill="${pal[0]}"/>
        <rect x="265" y="115" width="20" height="8" rx="2" fill="${pal[4]}"/>
      `;
    } else if (variant === 1) {
      // Aperture blades
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <g transform="translate(200,140)">
          ${[0,60,120,180,240,300].map(a=>`<polygon points="0,-70 ${Math.cos((a+30)*Math.PI/180)*70},${Math.sin((a+30)*Math.PI/180)*70} 0,0" fill="${pal[3]}" opacity="0.8" transform="rotate(${a})"/>`).join('')}
          <circle r="12" fill="${pal[0]}"/>
        </g>
      `;
    } else if (variant === 2) {
      // Light flare / flash
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <circle cx="200" cy="140" r="60" fill="${pal[4]}" opacity="0.3"/>
        <circle cx="200" cy="140" r="30" fill="${pal[4]}" opacity="0.6"/>
        ${[0,45,90,135].map(a=>`<line x1="${200+Math.cos(a*Math.PI/180)*40}" y1="${140+Math.sin(a*Math.PI/180)*40}" x2="${200+Math.cos(a*Math.PI/180)*100}" y2="${140+Math.sin(a*Math.PI/180)*100}" stroke="${pal[4]}" stroke-width="2" opacity="0.5"/>`).join('')}
      `;
    } else {
      // Polaroid stack
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        ${[8,4,0].map((_o,i)=>`<g transform="translate(${180+i*8},${90+i*8}) rotate(${(i-1)*5})"><rect x="0" y="0" width="80" height="100" fill="${pal[4]}"/><rect x="6" y="6" width="68" height="68" fill="${pal[2]}"/></g>`).join('')}
      `;
    }
  } else if (theme === 'video') {
    // Film reel, slate, cinema
    if (variant === 0) {
      // Film reel
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <circle cx="200" cy="140" r="80" fill="${pal[3]}"/>
        <circle cx="200" cy="140" r="20" fill="${pal[0]}"/>
        ${[0,60,120,180,240,300].map(a=>`<circle cx="${200+Math.cos(a*Math.PI/180)*50}" cy="${140+Math.sin(a*Math.PI/180)*50}" r="14" fill="${pal[0]}"/>`).join('')}
      `;
    } else if (variant === 1) {
      // Clapperboard
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <rect x="100" y="100" width="200" height="140" rx="4" fill="${pal[4]}"/>
        <g transform="translate(100,100)">
          <polygon points="0,-10 200,-10 200,20 0,20" fill="${pal[3]}"/>
          ${[0,1,2,3,4].map(i=>`<polygon points="${i*40},20 ${i*40+25},-10 ${i*40+40},20 ${i*40+15},-10" fill="${pal[4]}"/>`).join('')}
        </g>
        <line x1="120" y1="160" x2="280" y2="160" stroke="${pal[1]}" stroke-width="1.5"/>
        <line x1="120" y1="190" x2="240" y2="190" stroke="${pal[1]}" stroke-width="1.5"/>
        <line x1="120" y1="220" x2="220" y2="220" stroke="${pal[1]}" stroke-width="1.5"/>
      `;
    } else if (variant === 2) {
      // Drone
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <rect x="180" y="125" width="40" height="30" rx="6" fill="${pal[3]}"/>
        ${[[-50,-15],[50,-15],[-50,15],[50,15]].map(([x,y])=>`
          <line x1="200" y1="140" x2="${200+x}" y2="${140+y}" stroke="${pal[3]}" stroke-width="3"/>
          <circle cx="${200+x}" cy="${140+y}" r="22" fill="none" stroke="${pal[4]}" stroke-width="1" opacity="0.5"/>
          <ellipse cx="${200+x}" cy="${140+y}" rx="22" ry="3" fill="${pal[4]}" opacity="0.7"/>
        `).join('')}
        <rect x="195" y="155" width="10" height="14" fill="${pal[4]}"/>
      `;
    } else {
      // Frame timeline
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        ${[0,1,2,3,4,5].map(i=>`<rect x="${50+i*55}" y="${100+(i%2)*20}" width="48" height="80" rx="3" fill="${pal[3]}" opacity="${0.6+i*0.07}"/><rect x="${56+i*55}" y="${108+(i%2)*20}" width="36" height="48" fill="${pal[2]}"/>`).join('')}
      `;
    }
  } else if (theme === 'florist') {
    // Bouquet, single rose, floral arch
    if (variant === 0) {
      // Bouquet
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        ${Array.from({length: 9}).map((_,i)=>{
          const x = 200 + (i%3 - 1) * 35 + rand(15) - 7;
          const y = 110 + Math.floor(i/3) * 30 + rand(10) - 5;
          return `<circle cx="${x}" cy="${y}" r="${18+rand(8)}" fill="${pal[2+(i%3)]}" opacity="0.92"/>`;
        }).join('')}
        ${Array.from({length: 9}).map((_,i)=>{
          const x = 200 + (i%3 - 1) * 35;
          const y = 110 + Math.floor(i/3) * 30;
          return `<circle cx="${x}" cy="${y}" r="5" fill="${pal[4]}"/>`;
        }).join('')}
        <path d="M 195 200 L 190 250 L 210 250 L 205 200 Z" fill="${pal[0]}"/>
        <rect x="180" y="205" width="40" height="6" fill="${pal[4]}" opacity="0.6"/>
      `;
    } else if (variant === 1) {
      // Single rose
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        ${[40,30,22,15,8].map((r,i)=>`<circle cx="200" cy="110" r="${r}" fill="${pal[2+i%3]}" opacity="${1-i*0.1}"/>`).join('')}
        <path d="M 200 145 L 200 240" stroke="${pal[0]}" stroke-width="4"/>
        <ellipse cx="180" cy="180" rx="22" ry="8" fill="${pal[0]}" transform="rotate(-30 180 180)"/>
        <ellipse cx="220" cy="210" rx="20" ry="7" fill="${pal[0]}" transform="rotate(30 220 210)"/>
      `;
    } else if (variant === 2) {
      // Floral arch
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <path d="M 50 240 Q 200 30 350 240" fill="none" stroke="${pal[1]}" stroke-width="6"/>
        ${Array.from({length: 14}).map((_,i)=>{
          const t = i / 13;
          const x = 50 + t * 300;
          const y = 240 - Math.sin(t * Math.PI) * 210;
          return `<circle cx="${x}" cy="${y}" r="${12+rand(6)}" fill="${pal[2+(i%3)]}" opacity="0.9"/>`;
        }).join('')}
      `;
    } else {
      // Floral pattern
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        ${Array.from({length: 12}).map(()=>{
          const x = 60+rand(280), y = 30+rand(220);
          return `<g transform="translate(${x},${y})">${[0,72,144,216,288].map(a=>`<ellipse cx="${Math.cos(a*Math.PI/180)*10}" cy="${Math.sin(a*Math.PI/180)*10}" rx="10" ry="5" fill="${pal[3]}" opacity="0.7" transform="rotate(${a})"/>`).join('')}<circle r="4" fill="${pal[4]}"/></g>`;
        }).join('')}
      `;
    }
  } else if (theme === 'cakes') {
    // Tiered cake, slice, candles, cupcake
    if (variant === 0) {
      // Tiered wedding cake
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <ellipse cx="200" cy="240" rx="140" ry="12" fill="${pal[1]}"/>
        <rect x="100" y="170" width="200" height="60" rx="4" fill="${pal[4]}"/>
        <rect x="125" y="120" width="150" height="50" rx="4" fill="${pal[4]}"/>
        <rect x="150" y="80" width="100" height="40" rx="4" fill="${pal[4]}"/>
        <line x1="100" y1="200" x2="300" y2="200" stroke="${pal[2]}" stroke-width="1" opacity="0.5"/>
        <line x1="125" y1="145" x2="275" y2="145" stroke="${pal[2]}" stroke-width="1" opacity="0.5"/>
        <line x1="200" y1="70" x2="200" y2="50" stroke="${pal[3]}" stroke-width="2"/>
        <ellipse cx="200" cy="46" rx="6" ry="8" fill="${pal[3]}"/>
      `;
    } else if (variant === 1) {
      // Single round cake with candles
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <ellipse cx="200" cy="220" rx="120" ry="14" fill="${pal[2]}"/>
        <rect x="80" y="130" width="240" height="90" rx="6" fill="${pal[4]}"/>
        <ellipse cx="200" cy="130" rx="120" ry="18" fill="${pal[3]}"/>
        ${[0,1,2,3,4].map(i=>`<rect x="${135+i*30}" y="80" width="6" height="40" fill="${pal[2]}"/><ellipse cx="${138+i*30}" cy="76" rx="4" ry="8" fill="${pal[3]}"/>`).join('')}
      `;
    } else if (variant === 2) {
      // Cupcake
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <path d="M 130 200 L 145 130 L 255 130 L 270 200 Z" fill="${pal[2]}"/>
        ${[0,1,2,3,4].map(i=>`<line x1="${145+i*22}" y1="130" x2="${145+i*22}" y2="200" stroke="${pal[1]}" stroke-width="1" opacity="0.6"/>`).join('')}
        <ellipse cx="200" cy="130" rx="65" ry="12" fill="${pal[4]}"/>
        <circle cx="170" cy="115" r="22" fill="${pal[4]}"/>
        <circle cx="200" cy="100" r="22" fill="${pal[4]}"/>
        <circle cx="230" cy="115" r="22" fill="${pal[4]}"/>
        <circle cx="200" cy="100" r="6" fill="${pal[3]}"/>
      `;
    } else {
      // Cake slice
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <path d="M 100 220 L 300 220 L 250 80 L 150 80 Z" fill="${pal[4]}"/>
        <path d="M 100 220 L 300 220 L 280 195 L 120 195 Z" fill="${pal[3]}"/>
        <path d="M 130 145 L 270 145 L 260 130 L 140 130 Z" fill="${pal[3]}" opacity="0.7"/>
        <circle cx="200" cy="80" r="8" fill="${pal[2]}"/>
      `;
    }
  } else if (theme === 'entertainment') {
    // Microphone, magic hat, balloons, juggling
    if (variant === 0) {
      // Microphone
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <ellipse cx="200" cy="120" rx="32" ry="48" fill="${pal[3]}"/>
        <rect x="190" y="160" width="20" height="40" fill="${pal[2]}"/>
        <rect x="170" y="200" width="60" height="12" rx="4" fill="${pal[4]}"/>
        ${[0,1,2,3,4].map(i=>`<line x1="${180+i*10}" y1="90" x2="${180+i*10}" y2="150" stroke="${pal[1]}" stroke-width="1"/>`).join('')}
      `;
    } else if (variant === 1) {
      // Top hat + magic wand
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <ellipse cx="200" cy="200" rx="90" ry="14" fill="${pal[0]}"/>
        <rect x="140" y="100" width="120" height="100" fill="${pal[0]}"/>
        <rect x="140" y="190" width="120" height="15" fill="${pal[3]}"/>
        <g transform="translate(290,140) rotate(-25)">
          <rect x="0" y="-3" width="80" height="6" fill="${pal[3]}"/>
          <rect x="0" y="-3" width="10" height="6" fill="${pal[4]}"/>
          <rect x="70" y="-3" width="10" height="6" fill="${pal[4]}"/>
        </g>
        ${Array.from({length: 5}).map(()=>`<g transform="translate(${100+rand(60)},${60+rand(40)})"><path d="M 0 -8 L 2 -2 L 8 0 L 2 2 L 0 8 L -2 2 L -8 0 L -2 -2 Z" fill="${pal[4]}" opacity="${0.6+rand(0.4)}"/></g>`).join('')}
      `;
    } else if (variant === 2) {
      // Balloons bunch
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        ${([
          [160,80,28,pal[2]], [200,70,30,pal[3]], [240,85,26,pal[4]],
          [180,120,24,pal[3]], [220,115,22,pal[2]]
        ] as [number,number,number,string][]).map(([x,y,r,c])=>`
          <ellipse cx="${x}" cy="${y}" rx="${r-3}" ry="${r}" fill="${c}"/>
          <path d="M ${x} ${y+r} L ${x+2} ${y+r+5} L ${x-2} ${y+r+10}" stroke="${pal[0]}" stroke-width="1.5" fill="none"/>
        `).join('')}
        ${[160,180,200,220,240].map((x,i)=>`<path d="M ${x} ${85+i*5+i*3} Q 200 200 200 240" fill="none" stroke="${pal[1]}" stroke-width="1" opacity="0.6"/>`).join('')}
      `;
    } else {
      // Spotlights / stage
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <path d="M 100 50 L 130 220 L 160 220 L 145 50 Z" fill="${pal[4]}" opacity="0.4"/>
        <path d="M 200 50 L 220 220 L 260 220 L 240 50 Z" fill="${pal[3]}" opacity="0.4"/>
        <path d="M 300 50 L 280 220 L 310 220 L 330 50 Z" fill="${pal[4]}" opacity="0.4"/>
        <rect x="0" y="220" width="400" height="60" fill="${pal[1]}"/>
        <ellipse cx="200" cy="240" rx="50" ry="8" fill="${pal[3]}" opacity="0.5"/>
      `;
    }
  } else if (theme === 'decorator') {
    // Backdrop, candles, balloons + arch
    if (variant === 0) {
      // Proposal setup with hearts
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <rect x="0" y="220" width="400" height="60" fill="${pal[1]}"/>
        ${[120,180,240,300].map((x,i)=>`<rect x="${x-3}" y="${190-i%2*10}" width="6" height="${30+i%2*10}" fill="${pal[3]}"/><ellipse cx="${x}" cy="${188-i%2*10}" rx="4" ry="6" fill="${pal[4]}"/>`).join('')}
        ${Array.from({length: 5}).map(()=>{
          const x = 60+rand(280), y = 60+rand(100);
          return `<path d="M ${x} ${y+10} C ${x-12} ${y-5} ${x-12} ${y+15} ${x} ${y+25} C ${x+12} ${y+15} ${x+12} ${y-5} ${x} ${y+10} Z" fill="${pal[3]}" opacity="0.9"/>`;
        }).join('')}
      `;
    } else if (variant === 1) {
      // Balloon arch
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <path d="M 60 240 Q 200 50 340 240" fill="none" stroke="${pal[0]}" stroke-width="2" opacity="0.4"/>
        ${Array.from({length: 18}).map((_,i)=>{
          const t = i / 17;
          const x = 60 + t * 280;
          const y = 240 - Math.sin(t * Math.PI) * 190;
          return `<ellipse cx="${x}" cy="${y}" rx="${10+rand(4)}" ry="${12+rand(4)}" fill="${pal[2+(i%3)]}" opacity="0.95"/>`;
        }).join('')}
      `;
    } else if (variant === 2) {
      // Picnic blanket / table
      scene = `
        <rect width="400" height="280" fill="${pal[0]}"/>
        <rect x="80" y="140" width="240" height="100" rx="6" fill="${pal[3]}"/>
        ${[0,1,2,3,4,5].map(i=>`<line x1="${80+i*40}" y1="140" x2="${80+i*40}" y2="240" stroke="${pal[4]}" stroke-width="1" opacity="0.4"/>`).join('')}
        <circle cx="140" cy="170" r="14" fill="${pal[2]}"/>
        <circle cx="200" cy="180" r="16" fill="${pal[4]}"/>
        <circle cx="260" cy="170" r="14" fill="${pal[2]}"/>
        <rect x="190" y="195" width="20" height="40" fill="${pal[2]}"/>
        <ellipse cx="200" cy="195" rx="10" ry="3" fill="${pal[4]}"/>
      `;
    } else {
      // Cake table / dessert station with garlands
      scene = `
        <rect width="400" height="280" fill="${pal[1]}"/>
        <path d="M 30 80 Q 100 70 200 80 Q 300 90 370 75" fill="none" stroke="${pal[3]}" stroke-width="3"/>
        ${[60,110,160,210,260,310,360].map((x,i)=>`<ellipse cx="${x}" cy="${75+(i%2)*8+8}" rx="8" ry="6" fill="${pal[2+i%3]}" opacity="0.8"/>`).join('')}
        <rect x="100" y="150" width="200" height="90" fill="${pal[4]}"/>
        <rect x="130" y="170" width="40" height="50" fill="${pal[3]}"/>
        <rect x="180" y="175" width="40" height="45" fill="${pal[2]}"/>
        <rect x="230" y="180" width="40" height="40" fill="${pal[3]}"/>
      `;
    }
  } else {
    // Default abstract fallback for any unmatched theme
    scene = `
      <rect width="400" height="280" fill="${pal[0]}"/>
      <circle cx="${100+rand(200)}" cy="${80+rand(120)}" r="${40+rand(40)}" fill="${pal[2]}" opacity="0.6"/>
      <circle cx="${100+rand(200)}" cy="${80+rand(120)}" r="${30+rand(30)}" fill="${pal[3]}" opacity="0.5"/>
      <circle cx="${100+rand(200)}" cy="${80+rand(120)}" r="${20+rand(20)}" fill="${pal[4]}" opacity="0.4"/>
    `;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block;">${scene}</svg>`;
}

// Avatar SVG (for team members and reviews)

export function makeAvatar(_theme: string, seedStr: string): string {
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) seed = ((seed << 5) - seed + seedStr.charCodeAt(i)) | 0;
  const rand = (n: number) => { seed = (seed * 9301 + 49297) % 233280; return (seed / 233280) * n; };

  const hue = Math.floor(rand(360));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="width:100%;height:100%;display:block;">
    <defs><linearGradient id="g${seed}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue},35%,40%)"/><stop offset="1" stop-color="hsl(${(hue+40)%360},35%,25%)"/></linearGradient></defs>
    <rect width="100" height="100" fill="url(#g${seed})"/>
    <circle cx="50" cy="42" r="14" fill="hsl(${hue},25%,75%)" opacity="0.85"/>
    <path d="M 25 100 Q 25 70 50 70 Q 75 70 75 100 Z" fill="hsl(${hue},25%,75%)" opacity="0.85"/>
  </svg>`;
}

